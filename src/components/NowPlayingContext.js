import { createContext, useContext, useState } from "react";

const NowPlayingContext = createContext();

// Custom hook for easy usage
export const useNowPlaying = () => useContext(NowPlayingContext);

export const NowPlayingProvider = ({ children }) => {
  const [nowPlaying, setNowPlaying] = useState(null);

  return (
    <NowPlayingContext.Provider value={{ nowPlaying, setNowPlaying }}>
      {children}
    </NowPlayingContext.Provider>
  );
};
