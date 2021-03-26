import { navigate } from "@reach/router";
import PetForm from "../../components/PetForm/PetForm";
import Template from "../../components/Template/Template";
import "./New.css";

const New = ({ createPet, errors, setErrors }) => {
  const renderErrors = () =>
    errors.map((error, key) => (
      <p key={key} className="errors">
        {error}
      </p>
    ));

  return (
    <Template
      text="Know a pet needing a home?"
      btnText="back to home"
      btnOnClick={() => {
        navigate("/");
        setErrors([]);
      }}
    >
      {errors && renderErrors()}
      <PetForm
        initName=""
        initType=""
        initDesc=""
        initSkill_1=""
        initSkill_2=""
        initSkill_3=""
        buttonText="Add Pet"
        onSubmit={createPet}
        isCreate={true}
      />
    </Template>
  );
};

export default New;
