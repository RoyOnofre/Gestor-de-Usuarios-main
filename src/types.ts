export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
