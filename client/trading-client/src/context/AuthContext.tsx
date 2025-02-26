"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Define types for authentication
type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_FAST_API_BACKEND_URL;

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  register: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check both cookie and localStorage for backwards compatibility
        const userCookie = Cookies.get('user');
        const token = localStorage.getItem('access_token');

        if (userCookie) {
          // If user data exists in cookie, parse and set it
          setUser(JSON.parse(userCookie));
        } else if (token) {
          // If only token exists, fetch user data from API
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data
          const response = await axios.get(`${API_URL}/user/me`);
          setUser(response.data);
          
          // Store user data in cookie
          Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear invalid token and user data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        Cookies.remove('user');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post(`${API_URL}/token`, formData);
      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      const userResponse = await axios.get(`${API_URL}/user/me`);
      setUser(userResponse.data);
      
      Cookies.set('user', JSON.stringify(userResponse.data), { expires: 7 });
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to login. Please try again.';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/user/register`, {
        username,
        email,
        password
      });
      
      const loginResult = await login(username, password);
      if (!loginResult.success) {
        return { success: false, error: 'Registration successful but login failed' };
      }
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    try {
      // No need to call backend for logout with token-based auth
      // Just remove tokens and user data
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Remove cookie
      Cookies.remove('user');
      
      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];
      
      // Clear user state
      setUser(null);
      setIsLoading(false);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
