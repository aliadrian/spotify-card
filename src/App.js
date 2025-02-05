import { withClick } from "./components/clickFunction";
import FrontSide from "./components/Front";
import BackSide from "./components/Back";

function App() {
  const ClickableCard = withClick(FrontSide, BackSide);

  return (
    <div className="App bg-[#222] grid place-content-center h-[100dvh]">
        <div className="w-[300px] h-[350px] hover:cursor-pointer">
          <ClickableCard />
        </div>
    </div>
  );
}

export default App;
