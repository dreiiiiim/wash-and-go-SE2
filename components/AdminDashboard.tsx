import React, { useState } from 'react';
import { Booking, BookingStatus } from '../types';
import { CheckCircle, XCircle, Clock, ExternalLink, Calendar, CarFront, Banknote } from 'lucide-react';
import { format } from 'date-fns';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
}

export default function AdminDashboard({ bookings, onUpdateStatus }: AdminDashboardProps) {
  const [filter, setFilter] = useState<BookingStatus | 'ALL'>('ALL');

  const filteredBookings = bookings.filter(b => filter === 'ALL' || b.status === filter);

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED: return 'bg-green-100 text-green-800';
      case BookingStatus.CANCELLED: return 'bg-red-100 text-red-800';
      case BookingStatus.COMPLETED: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">ADMIN DASHBOARD</h2>
          <p className="text-gray-500 text-sm">Manage bookings and verify down payments.</p>
        </div>
        
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                filter === s ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Booking ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Service Info</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Schedule</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Payment</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No bookings found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">{b.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{b.customerName}</div>
                      <div className="text-xs text-gray-500">{b.customerPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{b.vehicleSize}</span>
                        {b.fuelType && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded font-medium">{b.fuelType}</span>}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-1">{b.serviceName}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Calendar size={14} className="text-gray-400"/> {b.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                        <Clock size={14} className="text-gray-400"/> {b.timeSlot}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900 font-bold">DP: ₱{b.downPaymentAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total: ₱{b.totalPrice.toLocaleString()}</div>
                      {b.paymentProofUrl && (
                        <a 
                          href={b.paymentProofUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                        >
                          <ExternalLink size={10} /> View Proof
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                       {b.status === BookingStatus.PENDING && (
                         <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => onUpdateStatus(b.id, BookingStatus.CONFIRMED)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                              title="Verify & Confirm"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => onUpdateStatus(b.id, BookingStatus.CANCELLED)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                         </div>
                       )}
                       {b.status === BookingStatus.CONFIRMED && (
                          <button 
                              onClick={() => onUpdateStatus(b.id, BookingStatus.COMPLETED)}
                              className="text-xs font-bold text-gray-500 hover:text-gray-900 border px-3 py-1 rounded-md"
                          >
                             MARK DONE
                          </button>
                       )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}