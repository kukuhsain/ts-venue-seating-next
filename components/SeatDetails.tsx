'use client';

import { SelectedSeat } from '@/types/venue';
import { Info } from 'lucide-react';

interface SeatDetailsProps {
  seat: SelectedSeat | null;
  priceTiers: Record<number, number>;
}

export default function SeatDetails({ seat, priceTiers }: SeatDetailsProps) {
  if (!seat) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Info className="w-5 h-5" />
          Seat Details
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Click, hover, or navigate with keyboard to view seat details
        </p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    available: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    reserved: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
    sold: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
    held: 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        Seat Details
      </h3>
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Section</span>
          <p className="font-semibold text-gray-900 dark:text-white">{seat.sectionLabel}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Row</span>
          <p className="font-semibold text-gray-900 dark:text-white">{seat.rowIndex}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Seat</span>
          <p className="font-semibold text-gray-900 dark:text-white">{seat.col}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
          <p className="font-semibold text-gray-900 dark:text-white">
            ${priceTiers[seat.priceTier]}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
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
          <span className="text-sm text-gray-500 dark:text-gray-400">Seat ID</span>
          <p className="font-mono text-sm text-gray-700 dark:text-gray-300">{seat.id}</p>
        </div>
      </div>
    </div>
  );
}

