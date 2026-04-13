import express from "express";
import { createServer as createViteServer } from "vite";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-123";
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Database setup
  const db = new sqlite3.Database("users.db", (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to SQLite database.");
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error("Table creation error:", err.message);
      else console.log("Users table ready.");
    });

    // Create or update default admin users
    const defaultAdmins = [
      { username: "roy", password: "12345", email: "roy@example.com" }
    ];

    defaultAdmins.forEach(async (admin) => {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      db.get("SELECT * FROM users WHERE username = ?", [admin.username], (err, row) => {
        if (err) {
          console.error(`Error checking for user ${admin.username}:`, err.message);
          return;
        }
        if (!row) {
          db.run(
            "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
            [admin.username, hashedPassword, admin.email, "admin"],
            (err) => {
              if (err) console.error(`Error creating user ${admin.username}:`, err.message);
              else console.log(`Default admin user created: ${admin.username} / ${admin.password}`);
            }
          );
        } else {
          // Update password to ensure it's correct
          db.run(
            "UPDATE users SET password = ? WHERE username = ?",
            [hashedPassword, admin.username],
            (err) => {
              if (err) console.error(`Error updating password for ${admin.username}:`, err.message);
              else console.log(`Password ensured for user: ${admin.username}`);
            }
          );
        }
      });
    });
  });

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for user: ${username}`);
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user: any) => {
      if (err) {
        console.error("Login database error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        console.log(`Login failed: User ${username} not found`);
        return res.status(400).json({ error: "Usuario no encontrado" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        console.log(`Login failed: Invalid password for user ${username}`);
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      console.log(`Login successful for user: ${username}`);
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
      res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    });
  });

  app.get("/api/users", authenticateToken, (req, res) => {
    db.all("SELECT id, username, email, role, created_at FROM users", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.post("/api/users", authenticateToken, async (req, res) => {
    const { username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, role || "user"],
      function (err) {
        if (err) return res.status(400).json({ error: "Username already exists" });
        res.json({ id: this.lastID, username, email, role });
      }
    );
  });

  app.put("/api/users/:id", authenticateToken, async (req, res) => {
    const { username, email, role, password } = req.body;
    const { id } = req.params;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        "UPDATE users SET username = ?, email = ?, role = ?, password = ? WHERE id = ?",
        [username, email, role, hashedPassword, id],
        function (err) {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ message: "User updated successfully" });
        }
      );
    } else {
      db.run(
        "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?",
        [username, email, role, id],
        function (err) {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ message: "User updated successfully" });
        }
      );
    }
  });

  app.delete("/api/users/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "User deleted successfully" });
    });
  });

  // Database Explorer Endpoint (Admin Only)
  app.get("/api/admin/db-explorer", authenticateToken, (req: any, res: any) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const tables = ["users"]; // Add more tables here if created
    const explorerData: any = {};

    let completed = 0;
    tables.forEach((table) => {
      db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
        if (err) {
          explorerData[table] = { error: err.message };
        } else {
          explorerData[table] = rows;
        }
        completed++;
        if (completed === tables.length) {
          res.json(explorerData);
        }
      });
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
