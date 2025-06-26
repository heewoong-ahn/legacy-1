'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, LoginRequest } from '@/types/auth';
import { 
  login as loginApi, 
  logout as logoutApi,
  getStoredUser, 
  setStoredUser,
  setTokens,
  getAccessToken,
  refreshAccessToken
} from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  // 앱 시작 시 저장된 사용자 정보 확인
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const storedUser = getStoredUser();
        const accessToken = getAccessToken();

        if (storedUser && accessToken) {
          // 토큰이 유효한지 확인
          const newToken = await refreshAccessToken();
          if (newToken) {
            setUser(storedUser);
          } else {
            // 토큰이 만료되었으면 사용자 정보 제거
            setUser(null);
          }
        }
      } catch (error) {
        console.error('인증 초기화 실패:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await loginApi(credentials);
      
      setTokens(response.accessToken, response.refreshToken);
      setStoredUser(response.user);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };



  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
} 