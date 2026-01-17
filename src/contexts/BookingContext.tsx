import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel, Room } from '@/types';

interface BookingState {
  hotel: Hotel | null;
  room: Room | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  roomsCount: number;
}

interface BookingContextType extends BookingState {
  setBookingDetails: (details: Partial<BookingState>) => void;
  clearBooking: () => void;
  getTotalNights: () => number;
  getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  hotel: null,
  room: null,
  checkIn: null,
  checkOut: null,
  guests: 2,
  roomsCount: 1,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setBookingDetails = (details: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...details }));
  };

  const clearBooking = () => {
    setState(initialState);
  };

  const getTotalNights = () => {
    if (!state.checkIn || !state.checkOut) return 0;
    const diffTime = state.checkOut.getTime() - state.checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTotalPrice = () => {
    const nights = getTotalNights();
    if (!state.room || nights === 0) return 0;
    return state.room.pricePerNight * nights * state.roomsCount;
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setBookingDetails,
        clearBooking,
        getTotalNights,
        getTotalPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
