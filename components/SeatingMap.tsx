'use client';

import { useState, useEffect } from 'react';
import { Venue, Seat, SelectedSeat } from '@/types/venue';
import SeatDetails from '@/components/SeatDetails';
import SelectionSummary from '@/components/SelectionSummary';

const PRICE_TIERS: Record<number, number> = {
  1: 150,
  2: 100,
  3: 75,
  4: 50,
};

export default function SeatingMap() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [focusedSeat, setFocusedSeat] = useState<SelectedSeat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/venue2.json')
      .then((res) => res.json())
      .then((data: Venue) => {
        setVenue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load venue data:', err);
        setLoading(false);
      });
  }, []);

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

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.some((s) => s.id === seat.id)) {
      return '#10b981'; // green-500
    }

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
    setSelectedSeats([]);
    setFocusedSeat(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading venue...</div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Failed to load venue data</div>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Seating Chart
                </h2>
                <div className="flex flex-wrap gap-4 text-sm">
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
              </div>

              <div className="border border-gray-200 rounded-lg overflow-auto">
                <svg
                  width={venue.map.width}
                  height={venue.map.height}
                  viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
                  className="w-full h-auto"
                  style={{ maxHeight: '600px' }}
                >
                  {/* Stage indicator */}
                  <rect
                    x={venue.map.width / 2 - 150}
                    y={20}
                    width={300}
                    height={40}
                    fill="#1f2937"
                    rx={4}
                  />
                  <text
                    x={venue.map.width / 2}
                    y={45}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    STAGE
                  </text>

                  {venue.sections.map((section) =>
                    section.rows.map((row) =>
                      row.seats.map((seat) => {
                        const transformedX =
                          seat.x * section.transform.scale + section.transform.x;
                        const transformedY =
                          seat.y * section.transform.scale + section.transform.y;

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
                                ? 'cursor-pointer hover:opacity-80 transition-opacity'
                                : 'cursor-not-allowed'
                            }
                            onClick={() =>
                              handleSeatClick(
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
                          >
                            <title>{seat.id}</title>
                          </circle>
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

