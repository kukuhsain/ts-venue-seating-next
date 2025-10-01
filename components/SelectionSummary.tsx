'use client';

import { SelectedSeat } from '@/types/venue';
import { ShoppingCart, X, Trash2, CreditCard } from 'lucide-react';

interface SelectionSummaryProps {
  selectedSeats: SelectedSeat[];
  priceTiers: Record<number, number>;
  subtotal: number;
  onClearSelection: () => void;
  onRemoveSeat: (seatId: string) => void;
}

export default function SelectionSummary({
  selectedSeats,
  priceTiers,
  subtotal,
  onClearSelection,
  onRemoveSeat,
}: SelectionSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Selected Seats ({selectedSeats.length}/8)
        </h3>
        {selectedSeats.length > 0 && (
          <button
            onClick={onClearSelection}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium flex items-center gap-1"
            aria-label="Clear all selected seats"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {selectedSeats.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No seats selected. Click or use keyboard to select available seats.
        </p>
      ) : (
        <>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {selectedSeats.map((seat) => (
              <div
                key={seat.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {seat.sectionLabel}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Row {seat.rowIndex}, Seat {seat.col}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${priceTiers[seat.priceTier]}
                  </span>
                  <button
                    onClick={() => onRemoveSeat(seat.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    aria-label={`Remove seat ${seat.sectionLabel} Row ${seat.rowIndex} Seat ${seat.col}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Subtotal
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${subtotal}
              </span>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={selectedSeats.length === 0}
              aria-label={`Continue to checkout with ${selectedSeats.length} seat${selectedSeats.length !== 1 ? 's' : ''}`}
            >
              <CreditCard className="w-5 h-5" />
              Continue to Checkout
            </button>
            {selectedSeats.length === 8 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 text-center">
                Maximum seats selected (8/8)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

