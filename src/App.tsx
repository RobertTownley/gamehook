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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "calc(100vh - 127px)",
        }}
      >
        <Scene width={800} height={600}>
          <Ball />
        </Scene>
      </div>
    </div>
  );
}

export default App;
