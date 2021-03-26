import "./Template.css";

const Template = ({ text, children, btnText, btnOnClick }) => (
  <div className="template">
    <div className="template-header">
      <h1>Pet Shelter</h1>
      <button onClick={btnOnClick}>{btnText}</button>
    </div>
    <p>{text}</p>
    {children}
  </div>
);

export default Template;
