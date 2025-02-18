import { useState, useEffect } from "react";
import SpotifyLogo from "./SpotifyLogo";
import { fetchNowPlaying } from "./services/spotifyService";

const FrontSide = ({ setNowPlayingForBack, setFrontHeight }) => {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const song = await fetchNowPlaying();
        // console.log("Fetched song:", song);

        if (song) {
          setNowPlaying(song); // Updates local state
          setNowPlayingForBack(song); // Sends data to BackSide.js via `withClick.js`
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    getNowPlaying();
    const interval = setInterval(getNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  // console.log("FrontSide rendering. nowPlaying:", nowPlaying); // Debug Log

  return (
    <div
      className="bg-white p-4 rounded-lg w-[300px] drop-shadow-xl shadow-xl"
      id="front-side"
    >
      <div className="flex mb-4 gap-2">
        <SpotifyLogo />
        <p className="text-black text-lg font-bold self-center">
          {nowPlaying ? "Currently Listening To" : "No Music Playing"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {nowPlaying ? (
          <div className="rounded-md">
            <img
              src={nowPlaying.albumArt}
              alt="Album Cover"
              className="relative w-full h-full rounded-md"
            />
            <p className="text-base">{nowPlaying.song}</p>
            <p className="text-xs">{nowPlaying.artist}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Not playing anything for now
          </p> // Safe fallback
        )}
      </div>
    </div>
  );
};

export default FrontSide;
