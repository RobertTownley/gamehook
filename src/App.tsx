import { Scene, Sphere } from "./gamehook";

function Ball() {
  return (
    <Sphere
      position={{ x: 0, y: 0, z: -5 }}
      velocity={[0, 0, 0.1]}
      onClick={() => {
        console.log("Clicking!");
      }}
    />
  );
}

function App() {
  return (
    <Scene>
      <Ball />
    </Scene>
  );
}

export default App;
