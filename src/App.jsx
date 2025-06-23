import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Anunay" symbol="X"/>
          <Player initialName="Ahan" symbol="O"/>
        </ol>
        Game Board
      </div>
      Log
    </main>
  );
}

export default App;
