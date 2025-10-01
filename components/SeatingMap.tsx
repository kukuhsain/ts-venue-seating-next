'use client';

import { useState } from 'react';
import { Seat, SelectedSeat } from '@/types/venue';
import SeatDetails from '@/components/SeatDetails';
import SelectionSummary from '@/components/SelectionSummary';
import { MapPin, Keyboard, Flame } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useVenue } from '@/hooks/useVenue';

const PRICE_TIERS: Record<number, number> = {
  1: 150,
  2: 100,
  3: 75,
  4: 50,
};

const PRICE_TIER_COLORS: Record<number, string> = {
  1: '#ef4444', // red-500 - Most expensive
  2: '#f97316', // orange-500
  3: '#eab308', // yellow-500
  4: '#22c55e', // green-500 - Least expensive
};

export default function SeatingMap() {
  const { venue, loading, error } = useVenue('/venue2.json');
  const [selectedSeats, setSelectedSeats, clearSelectedSeats] = useLocalStorage<SelectedSeat[]>(
    'venue-selected-seats',
    []
  );
  const [focusedSeat, setFocusedSeat] = useState<SelectedSeat | null>(null);
  const [isHeatMapEnabled, setIsHeatMapEnabled] = useState(false);

  const handleSeatClick = (
    seat: Seat,
    sectionId: string,
    sectionLabel: string,
    rowIndex: number
  ) => {
    if (seat.status !== 'available') {
      return;
    }

    const selectedSeat: SelectedSeat = {
      ...seat,
      sectionId,
      sectionLabel,
      rowIndex,
    };

    setFocusedSeat(selectedSeat);

    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.length < 8) {
      setSelectedSeats([...selectedSeats, selectedSeat]);
    }
  };

  const handleSeatKeyDown = (
    e: React.KeyboardEvent,
    seat: Seat,
    sectionId: string,
    sectionLabel: string,
    rowIndex: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSeatClick(seat, sectionId, sectionLabel, rowIndex);
    }
  };

  const getSeatColor = (seat: Seat) => {
    // If heat-map is enabled, color by price tier
    if (isHeatMapEnabled && seat.status === 'available') {
      return PRICE_TIER_COLORS[seat.priceTier] || '#6b7280';
    }

    // Show selected seats in green
    if (selectedSeats.some((s) => s.id === seat.id)) {
      return '#10b981'; // green-500
    }

    // Otherwise, color by status
    switch (seat.status) {
      case 'available':
        return '#3b82f6'; // blue-500
      case 'reserved':
        return '#f59e0b'; // amber-500
      case 'sold':
        return '#6b7280'; // gray-500
      case 'held':
        return '#8b5cf6'; // violet-500
      default:
        return '#6b7280';
    }
  };

  const getSeatStroke = (seat: Seat) => {
    if (focusedSeat?.id === seat.id) {
      return '#ffffff';
    }
    return '#1f2937';
  };

  const getSeatStrokeWidth = (seat: Seat) => {
    if (focusedSeat?.id === seat.id) {
      return 3;
    }
    return 1;
  };

  const clearSelection = () => {
    clearSelectedSeats();
    setFocusedSeat(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading venue...</div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          {error ? error.message : 'Failed to load venue data'}
        </div>
      </div>
    );
  }

  const subtotal = selectedSeats.reduce(
    (sum, seat) => sum + PRICE_TIERS[seat.priceTier],
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>
        <p className="text-gray-600 mb-6">
          Select up to 8 seats for your event
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seating Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Seating Map
                  </h2>
                  <button
                    onClick={() => setIsHeatMapEnabled(!isHeatMapEnabled)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isHeatMapEnabled
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label="Toggle heat-map view"
                    aria-pressed={isHeatMapEnabled}
                  >
                    <Flame className={`w-4 h-4 ${isHeatMapEnabled ? 'text-orange-600' : ''}`} />
                    Heat-map
                  </button>
                </div>
                {isHeatMapEnabled ? (
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span>$150 (Tier 1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <span>$100 (Tier 2)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span>$75 (Tier 3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span>$50 (Tier 4)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <span>Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                      <span>Sold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                      <span>Held</span>
                    </div>
                  </div>
                )}

                {/* Keyboard Navigation Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <Keyboard className="w-4 h-4" />
                    Keyboard Navigation
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
                        Tab
                      </kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
                        Enter
                      </kbd>
                      <span>/</span>
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
                        Space
                      </kbd>
                      <span>Select</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
                        Shift + Tab
                      </kbd>
                      <span>Back</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-auto">
                <svg
                  width={venue.map.width}
                  height={venue.map.height}
                  viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
                  className="w-full h-auto"
                  style={{ maxHeight: '600px' }}
                >
                  {venue.sections.map((section) =>
                    section.rows.map((row) =>
                      row.seats.map((seat) => {
                        const transformedX =
                          seat.x * section.transform.scale + section.transform.x;
                        const transformedY =
                          seat.y * section.transform.scale + section.transform.y;

                        const isSelected = selectedSeats.some((s) => s.id === seat.id);
                        const seatLabel = `${section.label}, Row ${row.index}, Seat ${seat.col}, Price $${PRICE_TIERS[seat.priceTier]}, ${seat.status}${isSelected ? ', currently selected' : ''}`;

                        return (
                          <circle
                            key={seat.id}
                            cx={transformedX}
                            cy={transformedY}
                            r={12}
                            fill={getSeatColor(seat)}
                            stroke={getSeatStroke(seat)}
                            strokeWidth={getSeatStrokeWidth(seat)}
                            className={
                              seat.status === 'available'
                                ? 'cursor-pointer hover:opacity-80 transition-opacity focus:outline-none'
                                : 'cursor-not-allowed'
                            }
                            style={
                              seat.status === 'available' && focusedSeat?.id === seat.id
                                ? { filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }
                                : undefined
                            }
                            tabIndex={seat.status === 'available' ? 0 : -1}
                            role={seat.status === 'available' ? 'button' : undefined}
                            aria-label={seatLabel}
                            aria-pressed={seat.status === 'available' ? isSelected : undefined}
                            onClick={() =>
                              handleSeatClick(
                                seat,
                                section.id,
                                section.label,
                                row.index
                              )
                            }
                            onKeyDown={(e) =>
                              handleSeatKeyDown(
                                e,
                                seat,
                                section.id,
                                section.label,
                                row.index
                              )
                            }
                            onMouseEnter={() =>
                              setFocusedSeat({
                                ...seat,
                                sectionId: section.id,
                                sectionLabel: section.label,
                                rowIndex: row.index,
                              })
                            }
                            onMouseLeave={() => {
                              if (focusedSeat?.id === seat.id) {
                                setFocusedSeat(null);
                              }
                            }}
                            onFocus={() =>
                              setFocusedSeat({
                                ...seat,
                                sectionId: section.id,
                                sectionLabel: section.label,
                                rowIndex: row.index,
                              })
                            }
                            onBlur={() => {
                              if (focusedSeat?.id === seat.id) {
                                setFocusedSeat(null);
                              }
                            }}
                          />
                        );
                      })
                    )
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar with Details and Summary */}
          <div className="lg:col-span-1 space-y-6">
            <SelectionSummary
              selectedSeats={selectedSeats}
              priceTiers={PRICE_TIERS}
              subtotal={subtotal}
              onClearSelection={clearSelection}
              onRemoveSeat={(seatId) =>
                setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId))
              }
            />
            <SeatDetails seat={focusedSeat} priceTiers={PRICE_TIERS} />
          </div>
        </div>
      </div>
    </div>
  );
}

