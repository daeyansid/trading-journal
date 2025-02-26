import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Trading Journal
                </Link>

                <div className="flex gap-4">
                    {user ? (
                        <>
                            <span className="hidden md:inline">Welcome, {user.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                            >
                                Logout
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
        </nav>
    );
}
