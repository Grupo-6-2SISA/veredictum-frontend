import { useState } from "react";
import { Link } from "react-router-dom";

function FormIniciais({ fields, buttonText, onSubmit, showForgotPassword = false }) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.senha && formData.senha.length < 6) {
      alert("Senha insuficiente. Certifique-se de que haja ao menos 6 caracteres");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (formData.nome && formData.nome.length < 2) {
      alert("O nome deve ter pelo menos 2 caracteres. Por favor, revise o campo.");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-field" key={field.name} style={{ position: "relative" }}>
          <label>{field.label}</label>
          <input
            type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            required
          />
          {field.type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "35px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              aria-label="Mostrar ou esconder senha"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
        </div>
      ))}
      {showForgotPassword && (
        <div className="forgot-password-row">
          <Link to="/recuperarSenha" className="forgot-password-link">
            Esqueceu sua senha? Recupere aqui
          </Link>
        </div>
      )}
      <button type="submit" className="register-button">
        {buttonText}
      </button>
    </form>
  );
}

export default FormIniciais;