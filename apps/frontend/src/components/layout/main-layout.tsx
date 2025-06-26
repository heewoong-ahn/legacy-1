'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            AI 과제 플랫폼
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/tasks" className="text-gray-600 hover:text-gray-800">
              과제 관리
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
              대시보드
            </Link>
            {user && (
              <>
                <span className="text-gray-700">{user.name}님</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
    </div>
  );
} 