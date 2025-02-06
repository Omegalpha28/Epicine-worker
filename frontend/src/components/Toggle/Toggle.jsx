import "./Toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <button
        className={`toggle-button ${isChecked ? "dark" : "light"}`}
        onClick={handleChange}
      >
        {isChecked ? "Dark Theme" : "Light Theme"}
      </button>
    </div>
  );
};
