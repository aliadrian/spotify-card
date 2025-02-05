const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;

const fetchAccessToken = async () => {
    try {
        const encodedCredentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`); // Correct encoding

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encodedCredentials}`, 
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: REFRESH_TOKEN,
                scope: "user-read-playback-state user-modify-playback-state streaming"
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Error fetching access token:", errorData);
            return null;
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("⚠️ Unexpected Error Fetching Access Token:", error);
        return null;
    }
};

export const fetchNowPlaying = async () => {
    const accessToken = await fetchAccessToken();

    if (!accessToken) {
        console.error("⚠️ No access token available. Check logs for errors.");
        return null;
    }

    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok || response.status === 204) {
            console.warn("⚠️ No song currently playing.");
            return null;
        }

        const data = await response.json();
        if (!data.item) return null;

        console.log("🎵 Now Playing:", data.item.name);
        return {
            song: data.item.name,
            artist: data.item.artists.map((artist) => artist.name).join(", "),
            albumArt: data.item.album.images[0].url,
        };
    } catch (error) {
        console.error("⚠️ Error fetching now playing:", error);
        return null;
    }
};

export { fetchAccessToken };