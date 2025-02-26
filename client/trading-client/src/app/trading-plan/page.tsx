"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { tradingPlanApi } from '@/services/trading_plan';
import { TradingPlan, TradingPlanCreate } from '@/types/trading_plan.types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';

export default function TradingPlanPage() {
  const [plans, setPlans] = useState<TradingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState<TradingPlanCreate>({
    day: new Date().getDate(),  // Changed to get current day number
    account_balance: 0,
    daily_target: 0,
    required_lots: 0,
    rounded_lots: 0,
    risk_usd: 0,
    risk_percentage: 0,
    stop_loss_pips: 0,
    take_profit_pips: 0,
    status: 'pending',
    reason: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<TradingPlan | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tradingPlanApi.getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Failed to load trading plans');
      if (error instanceof Error && 
          (error.message.includes('401') || error.message.includes('Authentication required'))) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tradingPlanApi.create(formData);
      setShowForm(false);
      fetchPlans();
      // Reset form
      setFormData({
        day: new Date().getDate(),  // Changed to get current day number
        account_balance: 0,
        daily_target: 0,
        required_lots: 0,
        rounded_lots: 0,
        risk_usd: 0,
        risk_percentage: 0,
        stop_loss_pips: 0,
        take_profit_pips: 0,
        status: 'pending',
        reason: ''
      });
    } catch (error) {
      console.error('Error creating trading plan:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleStatusUpdate = async (planId: number, newStatus: string) => {
    try {
      const updatedPlan = await tradingPlanApi.updateStatus(planId, { status: newStatus });
      
      // Update only the changed plan in the state
      setPlans(currentPlans => 
        currentPlans.map(plan => 
          plan.id === planId ? updatedPlan : plan
        )
      );

      // Show success message
      Swal.fire({
        title: 'Status Updated!',
        text: `Plan status has been updated to ${newStatus}`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update status',
        icon: 'error',
        timer: 2000
      });
    }
  };

  const ViewModal = ({ plan, isOpen, onClose }: { plan: TradingPlan | null, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen || !plan) return null;

    return (
      <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Trading Plan Details</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Day:</label>
              <p>{plan.day}</p>
            </div>
            <div>
              <label className="font-semibold">Account Balance:</label>
              <p>${plan.account_balance}</p>
            </div>
            <div>
              <label className="font-semibold">Daily Target:</label>
              <p>${plan.daily_target}</p>
            </div>
            <div>
              <label className="font-semibold">Required Lots:</label>
              <p>{plan.required_lots}</p>
            </div>
            <div>
              <label className="font-semibold">Rounded Lots:</label>
              <p>{plan.rounded_lots}</p>
            </div>
            <div>
              <label className="font-semibold">Risk USD:</label>
              <p>${plan.risk_usd}</p>
            </div>
            <div>
              <label className="font-semibold">Risk Percentage:</label>
              <p>{plan.risk_percentage}%</p>
            </div>
            <div>
              <label className="font-semibold">Stop Loss (pips):</label>
              <p>{plan.stop_loss_pips}</p>
            </div>
            <div>
              <label className="font-semibold">Take Profit (pips):</label>
              <p>{plan.take_profit_pips}</p>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <p>{plan.status}</p>
            </div>
            <div className="col-span-2">
              <label className="font-semibold">Reason:</label>
              <p>{plan.reason}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">Loading trading plans...</div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="text-red-600">{error}</div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  const TableRow = ({ plan }: { plan: TradingPlan }) => (
    <tr key={plan.id} className="border-b">
      <td className="px-4 py-2">{plan.day}</td>
      <td className="px-4 py-2">${plan.account_balance}</td>
      <td className="px-4 py-2">${plan.daily_target}</td>
      <td className="px-4 py-2">{plan.required_lots}</td>
      <td className="px-4 py-2">{plan.rounded_lots}</td>
      <td className="px-4 py-2">${plan.risk_usd}</td>
      <td className="px-4 py-2">{plan.risk_percentage}%</td>
      <td className="px-4 py-2">{plan.stop_loss_pips}</td>
      <td className="px-4 py-2">{plan.take_profit_pips}</td>
      <td className="px-4 py-2">
        <select
          value={plan.status || ''}
          onChange={(e) => plan.id && handleStatusUpdate(plan.id, e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="failed">Failed</option>
        </select>
      </td>
      <td className="px-4 py-2">{plan.reason}</td>
      <td className="px-4 py-2">
        <button
          onClick={() => {
            setSelectedPlan(plan);
            setIsViewModalOpen(true);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black">
          <h1 className="text-3xl font-bold mb-6">Trading Plans</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-black">Manage Your Trading Strategies</h2>
              <p className="mb-4 text-black">Document your trading strategies, goals, and rules to follow.</p>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  {showForm ? 'Cancel' : 'Create New Plan'}
                </button>
              </div>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg text-black">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Balance</label>
                    <input
                      type="number"
                      name="account_balance"
                      value={formData.account_balance}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Daily Target</label>
                    <input
                      type="number"
                      name="daily_target"
                      value={formData.daily_target}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Risk USD</label>
                    <input
                      type="number"
                      name="risk_usd"
                      value={formData.risk_usd}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Risk Percentage</label>
                    <input
                      type="number"
                      name="risk_percentage"
                      value={formData.risk_percentage}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stop Loss (pips)</label>
                    <input
                      type="number"
                      name="stop_loss_pips"
                      value={formData.stop_loss_pips}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Take Profit (pips)</label>
                    <input
                      type="number"
                      name="take_profit_pips"
                      value={formData.take_profit_pips}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Reason</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Plan
                  </button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Balance</th>
                    <th className="px-4 py-2">Target</th>
                    <th className="px-4 py-2">Required Lots</th>
                    <th className="px-4 py-2">Rounded Lots</th>
                    <th className="px-4 py-2">Risk (USD)</th>
                    <th className="px-4 py-2">Risk (%)</th>
                    <th className="px-4 py-2">SL Pips</th>
                    <th className="px-4 py-2">TP Pips</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Reason</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id} plan={plan} />
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
      <ViewModal
        plan={selectedPlan}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedPlan(null);
        }}
      />
    </ProtectedRoute>
  );
}
