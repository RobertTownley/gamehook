import { Scene, Sphere } from "./gamehook";

function Ball() {
  return (
    <Sphere
      velocity={[0, 0, 0.1]}
      onClick={() => {
        console.log("Clicking!");
      }}
    />
  );
}

function App() {
  return (
    <div>
      <p>This is the scene</p>
      <Scene>
        <Ball />
      </Scene>
    </div>
  );
}

export default App;
