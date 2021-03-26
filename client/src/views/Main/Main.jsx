import { navigate } from "@reach/router";
import Button from "../../components/Button/Button";
import Template from "../../components/Template/Template";
import "./Main.css";

const Main = ({ pets, loaded }) => {
  const renderPets = () =>
    pets.map((pet, key) => (
      <tr key={key}>
        <td>{pet.name}</td>
        <td>{pet.type}</td>
        <td className="btn-container">
          <Button
            text="details"
            onClick={(e) => navigate(`/pets/${pet._id}`)}
          />{" "}
          |{" "}
          <Button
            text="edit"
            onClick={(e) => navigate(`/pets/${pet._id}/edit`)}
          />
        </td>
      </tr>
    ));

  const renderTable = () => (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
        {renderPets()}
      </tbody>
    </table>
  );

  return (
    <>
      {loaded && (
        <Template
          text="These pets are looking for a good home"
          btnText="Add a pet to the shelter"
          btnOnClick={() => navigate("/new")}
        >
          {renderTable()}
        </Template>
      )}
    </>
  );
};

export default Main;
