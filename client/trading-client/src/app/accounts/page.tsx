"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AccountsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Trading Accounts</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Manage Your Trading Accounts</h2>
              <p className="mb-4">Keep track of your different trading accounts and their performance metrics.</p>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Add New Account
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Account Name</th>
                    <th className="py-3 px-4 text-left">Broker</th>
                    <th className="py-3 px-4 text-left">Balance</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t">
                    <td className="py-3 px-4">Main Trading</td>
                    <td className="py-3 px-4">Interactive Brokers</td>
                    <td className="py-3 px-4">$25,000.00</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Test Account</td>
                    <td className="py-3 px-4">TD Ameritrade</td>
                    <td className="py-3 px-4">$10,000.00</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs">Demo</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
