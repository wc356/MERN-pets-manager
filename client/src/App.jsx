import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./utils/Utils";
import { navigate, Router } from "@reach/router";
import Main from "./views/Main/Main";
import New from "./views/New/New";
import View from "./views/View/View";
import Edit from "./views/Edit/Edit";

function App() {
  const [pets, setPets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(Utils.URLS.GET_ALL_PETS)
      .then((res) => {
        console.log(res);
        setPets(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const createPet = (pet) => {
    axios
      .post(Utils.URLS.CREATE_PET, pet)
      .then((res) => {
        const newAr = [...pets, res.data];
        newAr.sort((a, b) => (a.type > b.type ? 1 : -1));
        setPets(newAr);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const errResponse = err.response.data.errors;
        const errArr = [];
        for (const key of Object.keys(errResponse)) {
          errArr.push(errResponse[key].message);
        }
        setErrors(errArr);
      });
  };

  const removeFromDom = (petId) => {
    setPets(pets.filter((pet) => pet._id !== petId));
  };

  return (
    <div className="App">
      <Router>
        <Main
          path="/"
          removeFromDom={removeFromDom}
          pets={pets}
          loaded={loaded}
        />
        <New
          path="/new"
          createPet={createPet}
          errors={errors}
          setErrors={setErrors}
        />
        <View path="/pets/:id" removeFromDom={removeFromDom} />
        <Edit path="/pets/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
