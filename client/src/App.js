import Header from "./components/Header.js";
import Sauces from "./components/Sauces.js";
import { useEffect, useState } from "react";

function App() {
  const [sauces, setSauces] = useState([]);

  useEffect(() => {
    const getSauce = async () => {
      const dataFromServer = await getData();
      setSauces(dataFromServer);
    };

    getSauce();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/all");
    const data = await response.json();
    return data;
  };

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
