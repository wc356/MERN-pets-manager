import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Template from "../../components/Template/Template";
import Utils from "../../utils/Utils";
import "./View.css";

const View = ({ id: petId, removeFromDom }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState(0);
  const [skill_1, setSkill_1] = useState("");
  const [skill_2, setSkill_2] = useState("");
  const [skill_3, setSkill_3] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    axios
      .get(`${Utils.URLS.GET_PET}${petId}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setLikes(res.data.likes);
        setSkill_1(res.data.skill_1);
        setSkill_2(res.data.skill_2);
        setSkill_3(res.data.skill_3);
      })
      .catch((err) => console.log(err));
  }, [petId]);

  const deletePet = (petId) => {
    axios
      .delete(`${Utils.URLS.DELETE_PET}${petId}`)
      .then((res) => {
        console.log(res);
        removeFromDom(petId);
      })
      .catch((err) => console.log(err));
  };

  const renderPetContent = () => {
    const renderRow = (label, value) => (
      <div className="row">
        <p className="bold">{label}</p>
        <p>{value}</p>
      </div>
    );

    const renderSkillsRow = (label, skill1, skill2, skill3) => (
      <div className="row">
        <p className="bold">{label}</p>
        <div className="skills-container">
          <p>{skill1}</p>
          <p>{skill2}</p>
          <p>{skill3}</p>
        </div>
      </div>
    );

    return (
      <div className="petcontent-container">
        {renderRow("Pet type:", type)}
        {renderRow("Description:", description)}
        {renderSkillsRow("Skills:", skill_1, skill_2, skill_3)}
      </div>
    );
  };

  const increaseLike = (petId, likeNums) => {
    axios
      .put(`${Utils.URLS.UPDATE_PET}${petId}`, { likes: likeNums + 1 })
      .then((res) => {
        console.log(res);
        setLikes(res.data.likes);
        setDisableBtn(true);
      })
      .catch((err) => console.log(err));
  };

  const renderLikes = () => (
    <>
      <p>Likes: {likes}</p>
      <button disabled={disableBtn} onClick={() => increaseLike(petId, likes)}>
        Like {name}
      </button>
    </>
  );

  return (
    <Template
      text={`Details about: ${name}`}
      btnText="back to home"
      btnOnClick={() => navigate("/")}
    >
      <div className="view__btn-container">
        <Button
          text={`Adopt ${name}`}
          onClick={(e) => {
            deletePet(petId);
            navigate("/");
          }}
        />
      </div>
      {renderPetContent()}
      {renderLikes()}
    </Template>
  );
};

export default View;
