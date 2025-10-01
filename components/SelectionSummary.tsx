'use client';

import { SelectedSeat } from '@/types/venue';

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Selected Seats ({selectedSeats.length}/8)
        </h3>
        {selectedSeats.length > 0 && (
          <button
            onClick={onClearSelection}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {selectedSeats.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No seats selected. Click on available seats to select them.
        </p>
      ) : (
        <>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {selectedSeats.map((seat) => (
              <div
                key={seat.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {seat.sectionLabel}
                  </p>
                  <p className="text-xs text-gray-600">
                    Row {seat.rowIndex}, Seat {seat.col}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900">
                    ${priceTiers[seat.priceTier]}
                  </span>
                  <button
                    onClick={() => onRemoveSeat(seat.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove seat"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">
                Subtotal
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${subtotal}
              </span>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              disabled={selectedSeats.length === 0}
            >
              Continue to Checkout
            </button>
            {selectedSeats.length === 8 && (
              <p className="text-xs text-amber-600 mt-2 text-center">
                Maximum seats selected (8/8)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

