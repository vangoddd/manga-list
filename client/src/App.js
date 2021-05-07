import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
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
    const response = await fetch("/api/all");
    const data = await response.json();
    return data;
  };

  function groupBy(data, key) {
    return data.reduce((acc, x) => {
      acc[x[key]] = [...(acc[x[key]] || []), x];
      return acc;
    }, {});
  }

  function capitalize(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }

  const groupedSauce = groupBy(sauces, "tags");

  return (
    <div className="App">
      <div className="container mt-5">
        <Header />

        {Object.entries(groupedSauce).map(([tags, sauce]) => {
          return (
            <>
              <hr className="divider"></hr>
              <div className="row justify-content-center" key={tags}>
                <div className="col-6" key={tags}>
                  <Sauces sauces={sauce} tags={capitalize(tags)} />
                </div>
              </div>
            </>
          );
        })}

        <Footer />
      </div>
    </div>
  );
}

export default App;
