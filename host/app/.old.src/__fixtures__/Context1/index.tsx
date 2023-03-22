import React from 'react';

export interface Tracker {
  meta: string;
}

export const TrackerDefaultValue: Tracker = {
  meta: 'default',
};

export const TrackerContext = React.createContext<Tracker>(TrackerDefaultValue);

export const useTracker = () => {
  return React.useContext<Tracker>(TrackerContext);
};

export interface TrackerProviderProps extends Tracker {
  children?: React.ReactNode;
}

export const TrackerProvider: React.FC<TrackerProviderProps> = (props) => {
  return <TrackerContext.Provider value={props}>{props.children}</TrackerContext.Provider>;
};

export default TrackerProvider;
