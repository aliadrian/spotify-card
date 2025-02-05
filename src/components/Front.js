import { useState, useEffect } from "react";
import SpotifyLogo from "./SpotifyLogo";
import { fetchNowPlaying } from "./services/spotifyService";

const FrontSide = () => {
    const [nowPlaying, setNowPlaying] = useState(null);

    useEffect(() => {
        const getNowPlaying = async () => {
            try {
                const song = await fetchNowPlaying();
                setNowPlaying(song); // ✅ Safe update
            } catch (error) {
                console.error("Error fetching Spotify data:", error);
            }
        };

        getNowPlaying();
        const interval = setInterval(getNowPlaying, 10000); // Refresh every 10s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-4 pb-5 rounded-lg w-[300px] drop-shadow-xl shadow-xl" id="front-side">
            <div className="flex mb-4 gap-2">
                <SpotifyLogo />
                <p className="text-black text-lg font-bold self-center">Currently Listening To</p>
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
                    <p className="text-center text-gray-500">Not playing anything</p> // ✅ Safe fallback
                )}
            </div>
        </div>
    );
};

export default FrontSide;
