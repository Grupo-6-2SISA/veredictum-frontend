import PropTypes from 'prop-types';
import '../Css/Main.css';
import './Toggle.css';

const Toggle = ({ checked, onChange, label }) => {
  return (
    <label className="toggle-switch">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider"></span>
    </label>
  );
};

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Toggle;


 