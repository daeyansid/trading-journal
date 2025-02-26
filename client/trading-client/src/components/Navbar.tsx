"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Trading Journal
        </Link>

        {user && (
          <div className="hidden md:flex space-x-4">
            <Link href="/accounts" className="hover:text-gray-300">
              Accounts
            </Link>
            <Link href="/trading-plan" className="hover:text-gray-300">
              Trading Plan
            </Link>
            <Link href="/daily-book" className="hover:text-gray-300">
              Trading Daily Book
            </Link>
            <Link href="/trade-record" className="hover:text-gray-300">
              Trade Record
            </Link>
          </div>
        )}

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="hidden md:inline">
                Welcome, {user.username}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden bg-gray-700 p-4 mt-2">
          <Link href="/accounts" className="block py-2 hover:text-gray-300">
            Accounts
          </Link>
          <Link href="/trading-plan" className="block py-2 hover:text-gray-300">
            Trading Plan
          </Link>
          <Link href="/daily-book" className="block py-2 hover:text-gray-300">
            Trading Daily Book
          </Link>
          <Link href="/trade-record" className="block py-2 hover:text-gray-300">
            Trade Record
          </Link>
        </div>
      )}
    </nav>
  );
}
