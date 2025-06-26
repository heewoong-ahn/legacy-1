'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTasks } from '@/lib/task-api';
import { useAuth } from '@/contexts/auth-context';
import { Task } from '@/types/task';

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">과제 요청 목록</h1>
        {user?.role === 'USER' && (
          <Link href="/tasks/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            과제 요청하기
          </Link>
        )}
      </div>

      {isLoading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!isLoading && !error && (
        <div className="bg-white shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <span className="font-semibold">{task.title}</span>
                    <span className="text-sm text-gray-500">{task.status}</span>
                  </div>
                  <p className="text-gray-600">{task.description}</p>
                </li>
              ))
            ) : (
              <p className="p-4 text-gray-500">요청된 과제가 없습니다.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 