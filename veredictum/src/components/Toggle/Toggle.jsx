import PropTypes from 'prop-types';
import '../Css/Main.css';
import './Toggle.css';

const Toggle = ({ checked, onChange, label, id, name, disabled }) => {
  return (
    <label className="toggle-switch">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        name={name}
        disabled={disabled}
      />
      <span className="slider"></span>
    </label>
  );
};

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Toggle;


 