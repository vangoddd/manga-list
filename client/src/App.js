import Header from "./components/Header.js";
import Sauces from "./components/Sauces.js";
import { useState } from "react";

function App() {
  const [sauces, setSauces] = useState([
    {
      id: 1,
      code: "255662",
      tags: "shibari",
    },
    {
      id: 3,
      code: "177013",
      tags: "Sad",
    },
    {
      id: 4,
      code: "203511",
      tags: "shibari",
    },
  ]);

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
            <Sauces sauces={sauces} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
