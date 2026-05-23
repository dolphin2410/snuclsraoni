import { useState } from "react";
import GamePage from "./GamePage";
import { gameSchema } from "./util/game";
import './App.css'

function App() {
  const [pageRef, setPageRef] = useState(0);

  return (
    <div className="App">
      <h1>라오니 점수 관리자</h1>
      {gameSchema.length > pageRef && <h2>{gameSchema[pageRef].name} <span className="description">[{gameSchema[pageRef].qType}]</span></h2>}
      <GamePage index={pageRef} setPageRef={setPageRef} />
    </div>
  );
}

export default App;
