'use client';

import { SelectedSeat } from '@/types/venue';

interface SeatDetailsProps {
  seat: SelectedSeat | null;
  priceTiers: Record<number, number>;
}

export default function SeatDetails({ seat, priceTiers }: SeatDetailsProps) {
  if (!seat) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Seat Details
        </h3>
        <p className="text-gray-500 text-sm">
          Click or hover over a seat to view details
        </p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    available: 'bg-blue-100 text-blue-800',
    reserved: 'bg-amber-100 text-amber-800',
    sold: 'bg-gray-100 text-gray-800',
    held: 'bg-violet-100 text-violet-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seat Details</h3>
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-500">Section</span>
          <p className="font-semibold text-gray-900">{seat.sectionLabel}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Row</span>
          <p className="font-semibold text-gray-900">{seat.rowIndex}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Seat</span>
          <p className="font-semibold text-gray-900">{seat.col}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Price</span>
          <p className="font-semibold text-gray-900">
            ${priceTiers[seat.priceTier]}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status</span>
          <p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                statusColors[seat.status]
              }`}
            >
              {seat.status.charAt(0).toUpperCase() + seat.status.slice(1)}
            </span>
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Seat ID</span>
          <p className="font-mono text-sm text-gray-700">{seat.id}</p>
        </div>
      </div>
    </div>
  );
}

