"use client";

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const result = await register(username, email, password);
        if (result.success) {
            router.push('/login');
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <Navbar />

            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-800">
                            Login here
                        </Link>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-600 hover:text-gray-800">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
