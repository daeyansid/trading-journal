"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from "next/image";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Trading Journal Dashboard</h1>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome to your Trading Journal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium">{user.username}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="font-bold mb-2">Trading Plans</h3>
            <p className="text-gray-600">Manage your trading strategies and plans</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              View Plans
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h3 className="font-bold mb-2">Daily Trades</h3>
            <p className="text-gray-600">Record and review your daily trading activities</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              View Trades
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
            <h3 className="font-bold mb-2">Accounts</h3>
            <p className="text-gray-600">Manage your trading accounts and balances</p>
            <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
              View Accounts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
