import Header from "./components/Header.js";
import Sauces from "./components/Sauces.js";

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <Header />
          </div>
        </div>

        <hr className="divider"></hr>

        <div className="row justify-content-center">
          <div className="col-6">
            <Sauces />
          </div>
        </div>

        <hr className="divider"></hr>

        <div className="row justify-content-center">
          <div className="col-6">
            <Sauces />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
