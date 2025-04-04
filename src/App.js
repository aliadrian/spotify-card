import { useState, useMemo } from "react";
import { withClick } from "./components/clickFunction";
import FrontSide from "./components/Front";
import BackSide from "./components/Back";
import TiltCard from "./components/TiltCard";
import {
  NowPlayingProvider,
  useNowPlaying,
} from "./components/NowPlayingContext";

function AppContent() {
  const { nowPlaying } = useNowPlaying();
  const ClickableCard = useMemo(() => withClick(FrontSide, BackSide), []);

  return (
    <div className="App bg-[#222] grid place-content-center h-[100dvh]">
      <div
        className="w-[300px] hover:cursor-pointer"
        style={{ height: nowPlaying ? "436px" : "112px" }}
      >
        <ClickableCard />
      </div>
      <TiltCard />
    </div>
  );
}

function App() {
  return (
    <NowPlayingProvider>
      <AppContent />
    </NowPlayingProvider>
  );
}

export default App;
