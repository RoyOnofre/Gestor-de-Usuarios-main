import React, { useState, useEffect, useCallback } from "react";
import {
  User as UserIcon,
  Users,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  Shield,
  Mail,
  Lock,
  LayoutDashboard,
  ChevronRight,
  MoreVertical,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "react-hot-toast";
import { User, AuthState } from "./types";
import LandingPage from "./LandingPage";

const API_URL = ""; // Relative to current host

export default function App() {
  const [showLanding, setShowLanding] = useState(!localStorage.getItem("hasVisitedLanding"));
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { token: null, user: null };
  });

  const [users, setUsers] = useState<User[]>([]);
  const [dbData, setDbData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "database">("dashboard");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!auth.token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchDbData = useCallback(async () => {
    if (!auth.token || auth.user?.role !== "admin") return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/db-explorer`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch database data");
      const data = await res.json();
      setDbData(data);
    } catch (error) {
      toast.error("Error al cargar la base de datos");
    } finally {
      setLoading(false);
    }
  }, [auth.token, auth.user?.role]);

  useEffect(() => {
    if (auth.token) {
      fetchUsers();
      if (auth.user?.role === "admin") {
        fetchDbData();
      }
    }
  }, [auth.token, fetchUsers, fetchDbData, auth.user?.role]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      setAuth({ token: data.token, user: data.user });
      toast.success(`Bienvenido, ${data.user.username}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    toast.success("Sesión cerrada");
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("Usuario eliminado");
      fetchUsers();
    } catch (error) {
      toast.error("Error al eliminar usuario");
    }
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const url = editingUser ? `${API_URL}/api/users/${editingUser.id}` : `${API_URL}/api/users`;
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save user");
      }

      toast.success(editingUser ? "Usuario actualizado" : "Usuario creado");
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnterApp = () => {
    localStorage.setItem("hasVisitedLanding", "true");
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  if (!auth.token) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden relative"
        >
          {/* Back Button */}
          <button 
            onClick={() => setShowLanding(true)}
            className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all"
            title="Volver a la Landing Page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="p-8">
            <div className="flex justify-center mb-8 mt-2">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-2">ProUser Manager</h2>
            <p className="text-neutral-500 text-center mb-8">Ingresa tus credenciales para continuar</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Usuario</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
              <p className="text-sm text-neutral-400">
                ¿Olvidaste tu contraseña? Contacta al administrador.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-neutral-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-neutral-900 tracking-tight">ProUser</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${activeTab === "dashboard" ? "bg-indigo-50 text-indigo-700" : "text-neutral-500 hover:bg-neutral-50"
              }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${activeTab === "users" ? "bg-indigo-50 text-indigo-700" : "text-neutral-500 hover:bg-neutral-50"
              }`}
          >
            <Users className="w-5 h-5" />
            Usuarios
          </button>
          {auth.user?.role === "admin" && (
            <button
              onClick={() => { setActiveTab("database"); fetchDbData(); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${activeTab === "database" ? "bg-indigo-50 text-indigo-700" : "text-neutral-500 hover:bg-neutral-50"
                }`}
            >
              <Shield className="w-5 h-5" />
              Base de Datos
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              {auth.user?.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">{auth.user?.username}</p>
              <p className="text-xs text-neutral-500 truncate capitalize">{auth.user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-neutral-900">Gestión de Usuarios</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
              />
            </div>
            <button
              onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Nuevo Usuario
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "database" ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-900">Explorador de Base de Datos</h2>
                  <button
                    onClick={fetchDbData}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-semibold transition-all"
                  >
                    Actualizar
                  </button>
                </div>

                {dbData && Object.entries(dbData).map(([tableName, rows]: [string, any]) => (
                  <div key={tableName} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                      <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Tabla: {tableName}</h3>
                      <span className="text-xs text-neutral-500 font-medium">{rows.length} registros</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50/50 border-b border-neutral-200">
                            {rows.length > 0 && Object.keys(rows[0]).map((key) => (
                              <th key={key} className="px-6 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {rows.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-neutral-50/30 transition-colors">
                              {Object.values(row).map((val: any, j: number) => (
                                <td key={j} className="px-6 py-3 text-sm text-neutral-600 truncate max-w-[200px]">
                                  {typeof val === 'string' && val.length > 50 ? val.substring(0, 50) + '...' : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Total Usuarios", value: users.length, icon: Users, color: "bg-blue-500" },
                    { label: "Administradores", value: users.filter(u => u.role === 'admin').length, icon: Shield, color: "bg-indigo-500" },
                    { label: "Usuarios Activos", value: users.length, icon: CheckCircle2, color: "bg-emerald-500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-neutral-100`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                          <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Usuario</th>
                          <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Rol</th>
                          <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Fecha Registro</th>
                          <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                              Cargando usuarios...
                            </td>
                          </tr>
                        ) : filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                              No se encontraron usuarios.
                            </td>
                          </tr>
                        ) : filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 font-semibold text-sm">
                                  {user.username[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-neutral-900">{user.username}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-neutral-600 text-sm">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-neutral-500 text-sm">
                              {new Date(user.created_at || "").toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
                                  className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">
                  {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Usuario</label>
                    <input
                      name="username"
                      defaultValue={editingUser?.username}
                      required
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Rol</label>
                    <select
                      name="role"
                      defaultValue={editingUser?.role || "user"}
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingUser?.email}
                    required
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    {editingUser ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                  </label>
                  <input
                    name="password"
                    type="password"
                    required={!editingUser}
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 transition-all"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
