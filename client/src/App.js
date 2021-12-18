import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Sauces from "./components/Sauces.js";
import AddSauce from "./components/AddSauce.js";
import SauceDetail from "./components/SauceDetail.js";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [sauces, setSauces] = useState([]);
  const [searchTerm, setSearch] = useState("");

  useEffect(() => {
    const getSauce = async () => {
      const dataFromServer = await getData();
      setSauces(dataFromServer);
    };

    getSauce();
  }, []);

  // add sauce
  const handleAddSauce = (sauce) => {
    const addSauceToServer = async () => {
      await sendSauce({ code: sauce.code, tags: sauce.lowerCaseTag });

      setSauces([...sauces, { code: sauce.code, tags: sauce.lowerCaseTag }]);
    };

    addSauceToServer();
  };

  // send sauce
  const sendSauce = async (sauce) => {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sauce),
    });
    const data = await response.json();
    return data;
  };

  // fetch data from server
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

  const groupedSauce = groupBy(sauces, "genre");

  return (
    <Router>
      <div className='App'>
        <div className='container mt-5'>
          <Header />

          <Route
            path='/'
            exact
            render={(props) => (
              <>
                <div className='container col-6 mt-3 h-100'>
                  <div className='row align-items-center h-100'>
                    <div className='col-10'>
                      <input
                        type='tesxt'
                        className='form-control search-bar'
                        id='searchBar'
                        placeholder='Search ...'
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                      ></input>
                    </div>
                    <div className='col-2'>
                      <Link to='/addsauce'>
                        <i className='fa fa-plus fa-lg plus '></i>
                      </Link>
                    </div>
                  </div>
                </div>

                {Object.entries(groupedSauce)
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val[0].toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                    return null;
                  })
                  .map(([genre, sauce]) => {
                    return (
                      <div key={genre}>
                        <hr className='divider' key={capitalize(genre)}></hr>
                        <div className='row justify-content-center' key={genre}>
                          <div className='col-6' key={genre}>
                            <Sauces
                              sauces={sauce}
                              genre={capitalize(genre)}
                              key={sauce}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          />
          <Route
            path='/addsauce'
            component={() => <AddSauce onAdd={handleAddSauce} />}
          />

          <Route path='/detail/:id' component={SauceDetail} />

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
