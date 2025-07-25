const BackSide = ({ nowPlaying, frontHeight }) => {
  // console.log("Back:", nowPlaying);

  // const songTitle = nowPlaying?.song || "No song playing";
  // const artistName = nowPlaying?.artist || "Unknown Artist";
  // const albumCover = nowPlaying?.albumArt || "https://via.placeholder.com/300";

  // console.log("Backside height: ", frontHeight, "px");
  return (
    <div
      className="w-[275] bg-white p-4 rounded-lg drop-shadow-xl shadow-xl flex flex-col items-center justify-end"
      id="back-side"
      style={{
        height: nowPlaying && frontHeight ? `${frontHeight}px` : "112px",
      }}
    >
      {/* <button
        className="relative inline-block w-32 leading-[2.5em] m-5 cursor-pointer overflow-hidden border-2 border-[#333]
      z-1 text-[#333] text-[17px] rounded-md font-medium transition-colors duration-500 
      before:z-[-1] before:absolute before:top-full before:left-full before:h-[150px] before:w-[200px] before:bg-[#333] before:rounded-full before:transition-all before:duration-700 hover:text-white hover:before:top-[-30px] hover:before:left-[-30px] active:before:bg-[#333] active:before:transition-none"
        onClick={() => window.open("https://a-n-v.vercel.app/links", "_blank")}
      >
        Get in touch
      </button> */}
    </div>
  );
};

export default BackSide;
