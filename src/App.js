import "./App.css";
import { Cards } from "./cards.js";
import { Sidebar } from "./sidebar.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Cards></Cards>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}

export default App;
