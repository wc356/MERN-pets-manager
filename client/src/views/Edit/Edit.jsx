import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import PetForm from "../../components/PetForm/PetForm";
import Template from "../../components/Template/Template";
import Utils from "../../utils/Utils";

const Edit = ({ id: petId }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill_1, setSkill_1] = useState("");
  const [skill_2, setSkill_2] = useState("");
  const [skill_3, setSkill_3] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${Utils.URLS.GET_PET}${petId}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setSkill_1(res.data.skill_1);
        setSkill_2(res.data.skill_2);
        setSkill_3(res.data.skill_3);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [petId]);

  const updatePet = (petId, petValuesToUpdate) => {
    axios
      .put(`${Utils.URLS.UPDATE_PET}${petId}`, petValuesToUpdate)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Template
      text={`Edit ${name}`}
      btnText="back to home"
      btnOnClick={() => navigate("/")}
    >
      {loaded && (
        <PetForm
          initName={name}
          initType={type}
          initDesc={description}
          initSkill_1={skill_1}
          initSkill_2={skill_2}
          initSkill_3={skill_3}
          buttonText="Edit Pet"
          onSubmit={updatePet}
          id={petId}
          isCreate={false}
        />
      )}
    </Template>
  );
};

export default Edit;
