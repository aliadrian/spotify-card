import { withClick } from "./components/clickFunction";
import FrontSide from "./components/Front";
import BackSide from "./components/Back";
import TiltCard from "./components/TiltCard";

function App() {
  const ClickableCard = withClick(FrontSide, BackSide);

  return (
    <div className="App bg-[#222] grid place-content-center h-[100dvh]">
      {/* TODO - change height and remove margin-top from clickFunction.js when a song is not playing */}
      <div className="w-[300px] h-[396px] hover:cursor-pointer">
        <ClickableCard />
      </div>
      <TiltCard />
    </div>
  );
}

export default App;
