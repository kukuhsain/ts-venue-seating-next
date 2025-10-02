import { useState, useEffect } from 'react';
import { Venue } from '@/types/venue';

/**
 * Custom hook to fetch venue data from a JSON file
 * @param venueFile - The path to the venue JSON file (e.g., '/venue.json')
 * @returns An object containing venue data, loading state, and error
 */
export function useVenue(venueFile: string) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(venueFile)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch venue data: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: Venue) => {
        setVenue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load venue data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      });
  }, [venueFile]);

  return { venue, loading, error };
}

