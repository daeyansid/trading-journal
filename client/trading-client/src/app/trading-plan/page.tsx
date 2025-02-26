"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TradingPlanPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Trading Plans</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Manage Your Trading Strategies</h2>
              <p className="mb-4">Document your trading strategies, goals, and rules to follow.</p>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Create New Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Swing Trading Strategy</h3>
                  <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">Stocks</span>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Focus on capturing short to medium-term gains over a period of days to weeks.</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Created: 10/05/2023</span>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">View</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">Edit</button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Day Trading Plan</h3>
                  <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Forex</span>
                </div>
                <p className="text-gray-600 mb-3 text-sm">Short-term strategy focusing on intraday price movements.</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Created: 07/12/2023</span>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">View</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
