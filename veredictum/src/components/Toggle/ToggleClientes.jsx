import PropTypes from 'prop-types';
import '../Css/Main.css';
import './ToggleClientes.css';

const ToggleClientes = ({ checked, onChange, label, id, name, disabled }) => {
  return (
    <label className="clientes-toggle-switch">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        name={name}
        disabled={disabled}
      />
      <span className="clientes-slider"></span>
    </label>
  );
};

ToggleClientes.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ToggleClientes;


 