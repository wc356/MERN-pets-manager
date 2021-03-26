import { useState } from "react";
import "./PetForm.css";

const PetForm = (props) => {
  const {
    initName,
    initType,
    initDesc,
    initSkill_1,
    initSkill_2,
    initSkill_3,
    buttonText,
    onSubmit,
    isCreate,
    id,
  } = props;

  const [name, setName] = useState(initName);
  const [type, setType] = useState(initType);
  const [description, setDescription] = useState(initDesc);
  const [skill_1, setSkill_1] = useState(initSkill_1);
  const [skill_2, setSkill_2] = useState(initSkill_2);
  const [skill_3, setSkill_3] = useState(initSkill_3);

  const handleSubmit = (e) => {
    e.preventDefault();

    const petValuesToUpdate = {
      name,
      type,
      description,
      skill_1,
      skill_2,
      skill_3,
    };
    isCreate ? onSubmit(petValuesToUpdate) : onSubmit(id, petValuesToUpdate);
  };

  const renderPetInputField = (label, inputValue, setState) => (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );

  return (
    <form className="petform-container" onSubmit={handleSubmit}>
      <div className="left">
        {renderPetInputField("Pet Name", name, setName)}
        {renderPetInputField("Pet Type", type, setType)}
        {renderPetInputField("Pet Description", description, setDescription)}
        <button type="submit">{buttonText}</button>
      </div>
      <div className="right">
        {renderPetInputField("Skill 1", skill_1, setSkill_1)}
        {renderPetInputField("Skill 2", skill_2, setSkill_2)}
        {renderPetInputField("Skill 3", skill_3, setSkill_3)}
      </div>
    </form>
  );
};

export default PetForm;
