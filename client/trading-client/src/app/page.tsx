"use client";

import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto mt-10 px-4 sm:px-6">
        {user ? (
          // Authenticated user view
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Trading Journal Dashboard</h1>
              <p className="mt-2 text-black">Track, analyze, and improve your trading performance</p>
              <span className="text-sm text-gray-500">Last login: {new Date().toLocaleDateString()}</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-lg font-medium text-black">{user.username || "Not Provided"}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-black">{user.email || "Not Provided"}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Link href="/accounts" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg text-black">Accounts</h3>
                  <p className="text-black text-sm">Manage your trading accounts and balances</p>
                  <div className="mt-4 text-blue-600 text-sm font-medium">View Accounts →</div>
                </div>
              </Link>

              <Link href="/trading-plan" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg text-black">Trading Plans</h3>
                  <p className="text-black text-sm">Create and manage your trading strategies</p>
                  <div className="mt-4 text-green-600 text-sm font-medium">View Plans →</div>
                </div>
              </Link>

              <Link href="/daily-book" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg text-black">Daily Trades</h3>
                  <p className="text-black text-sm">Record and review your daily trading activities</p>
                  <div className="mt-4 text-purple-600 text-sm font-medium">View Trades →</div>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          // Public home page for non-authenticated users
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Trading Journal</h1>
              <p className="text-xl text-black max-w-2xl">
                Your all-in-one solution for tracking, analyzing, and improving your trading performance
              </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
                <h3 className="text-xl font-bold mb-2 text-black">Track Trades</h3>
                <p className="text-black">Record and monitor all your trades in one place</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 text-center">
                <h3 className="text-xl font-bold mb-2 text-black">Create Plans</h3>
                <p className="text-black">Develop and stick to your trading strategies</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500 text-center">
                <h3 className="text-xl font-bold mb-2 text-black">Analyze Performance</h3>
                <p className="text-black">Gain insights from your trading history</p>
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <Link href="/login" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-100 transition-colors">
                Register
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
