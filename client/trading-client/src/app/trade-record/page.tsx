"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';

export default function TradeRecordPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Trade Records</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Track Your Trades</h2>
                
                <div className="flex flex-wrap items-center gap-4">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="all">All Trades</option>
                    <option value="open">Open Positions</option>
                    <option value="closed">Closed Positions</option>
                    <option value="profitable">Profitable</option>
                    <option value="loss">Loss</option>
                  </select>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm">
                    Record New Trade
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Symbol</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Entry Date</th>
                    <th className="py-3 px-4 text-left">Entry Price</th>
                    <th className="py-3 px-4 text-left">Exit Date</th>
                    <th className="py-3 px-4 text-left">Exit Price</th>
                    <th className="py-3 px-4 text-left">P/L</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t">
                    <td className="py-3 px-4">AAPL</td>
                    <td className="py-3 px-4">Long</td>
                    <td className="py-3 px-4">May 10, 2024</td>
                    <td className="py-3 px-4">$175.50</td>
                    <td className="py-3 px-4">May 15, 2024</td>
                    <td className="py-3 px-4">$182.25</td>
                    <td className="py-3 px-4 text-green-600">+$675.00</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Closed</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2 text-sm">View</button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">MSFT</td>
                    <td className="py-3 px-4">Long</td>
                    <td className="py-3 px-4">May 12, 2024</td>
                    <td className="py-3 px-4">$405.75</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4 text-blue-600">+$240.00</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">Open</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2 text-sm">View</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Close</button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">TSLA</td>
                    <td className="py-3 px-4">Short</td>
                    <td className="py-3 px-4">May 9, 2024</td>
                    <td className="py-3 px-4">$178.20</td>
                    <td className="py-3 px-4">May 14, 2024</td>
                    <td className="py-3 px-4">$185.40</td>
                    <td className="py-3 px-4 text-red-600">-$360.00</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs">Closed</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2 text-sm">View</button>
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
