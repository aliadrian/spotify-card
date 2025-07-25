import { useState, useEffect, useRef } from "react";
import SpotifyLogo from "./SpotifyLogo";
import { fetchNowPlaying } from "./services/spotifyService";

const FrontSide = ({ setNowPlayingForBack, progress, setFrontHeight }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const frontRef = useRef(null);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const song = await fetchNowPlaying();
        // console.log("Fetched song:", song);

        if (song && frontRef.current) {
          setNowPlaying(song); // Updates local state
          setNowPlayingForBack(song); // Sends data to BackSide.js via `withClick.js`
          const height = frontRef.current.offsetHeight;
          setFrontHeight?.(height);
          // console.log(
          //   "Frontside height: ",
          //   frontRef.current.offsetHeight,
          //   "px"
          // );
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    getNowPlaying();
    const interval = setInterval(getNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  const durationMs = nowPlaying?.durationMs ?? 1;
  const progressMs = progress ?? 0;

  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);
  const progressMin = Math.floor(progressMs / 60000);
  const progressSec = Math.floor((progressMs % 60000) / 1000);
  const progressPercentage = nowPlaying ? (progress / durationMs) * 100 : 0;

  return (
    <div
      className="bg-white p-4 rounded-lg w-[275px] drop-shadow-xl shadow-xl"
      id="front-side"
      ref={frontRef}
    >
      <div className="flex mb-4 gap-2">
        <SpotifyLogo />
        <p className="text-black text-lg font-bold self-center">
          {nowPlaying ? "Currently Listening To" : "No Music Playing"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {nowPlaying ? (
          <>
            <div className="rounded-md">
              <img
                src={nowPlaying.albumArt}
                alt="Album Cover"
                className="relative w-full h-full rounded-md"
              />
              <p className="text-base">{nowPlaying.song}</p>
              <p className="text-xs">{nowPlaying.artist}</p>
            </div>

            <div className="relative w-full h-2 bg-gray-300 rounded">
              <div
                className="absolute left-0 top-0 h-2 bg-green-500 rounded"
                style={{
                  width: isNaN(progressPercentage)
                    ? "0%"
                    : `${progressPercentage}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-700">
              <span>
                {progressMin}:{progressSec.toString().padStart(2, "0")}
              </span>
              <span>
                {durationMin}:{durationSec.toString().padStart(2, "0")}
              </span>
            </div>
          </>
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
