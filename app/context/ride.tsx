import React, { createContext, useState, useContext } from 'react';

type RideContextType = {
  rideDetails: any;
  updateRideDetails: (details: any) => void;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC = ({ children }:any) => {
  const [rideDetails, setRideDetails] = useState<any>(null);

  const updateRideDetails = (details: any) => {
    setRideDetails(details);
  };

  return (
    <RideContext.Provider value={{ rideDetails, updateRideDetails }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
};
