"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';

export default function DailyBookPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Trading Daily Book</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Daily Trading Journal</h2>
                
                <div className="flex items-center space-x-4">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">Select Date:</label>
                  <input 
                    type="date" 
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded px-3 py-2 text-sm" 
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm">
                    New Entry
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">May 15, 2024</h3>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Market Overview</h4>
                  <p className="text-sm text-gray-600">
                    S&P 500 opened lower following weak economic data. Tech stocks showing strength despite market weakness.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">Trading Performance</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Total Trades: <span className="font-medium">5</span></p>
                      <p className="text-gray-600">Win Rate: <span className="font-medium">60%</span></p>
                    </div>
                    <div>
                      <p className="text-green-600">Profit: <span className="font-medium">+$450.25</span></p>
                      <p className="text-gray-600">ROI: <span className="font-medium">1.8%</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">
                    Followed my trading plan well today. Was patient with entries and didn't chase trades. 
                    Need to work on taking profits too early on winning trades.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Tomorrow's Plan</h4>
                  <p className="text-sm text-gray-600">
                    Watch for continuation in tech sector. Set wider profit targets and use trailing stops.
                    Focus on high-probability setups only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
