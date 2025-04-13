import createClient from './supabase.ts';

export interface AuthData {
  email: string;
  password: string;
  name?: string;
  role?: 'student' | 'teacher';
}

const supabase = createClient();

export const authService = {
  async signUp(data: AuthData) {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return authData;
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  },

  async signIn(data: Omit<AuthData, 'name' | 'role'>) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return authData;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) throw error;
  },

  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getUserRole() {
    const user = await this.getUser();
    return user?.user_metadata?.role || null;
  }
}; 