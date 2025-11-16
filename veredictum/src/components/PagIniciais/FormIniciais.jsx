import { useState } from "react";
import { Link } from "react-router-dom";
import SwitchAlert from "../SwitchAlert/SwitchAlert"; // ...existing code...

function FormIniciais({ fields, buttonText, onSubmit, showForgotPassword = false }) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // switch alert state
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "info",
    duration: 3000,
  });

  const switchAlert = (message, type = "info", duration = 3000) => {
    setAlert({ visible: true, message, type, duration });
  };

  const hideAlert = () => setAlert((a) => ({ ...a, visible: false }));

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.senha && formData.senha.length < 6) {
      switchAlert("Senha insuficiente. Certifique-se de que haja ao menos 6 caracteres", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      switchAlert("Por favor, insira um e-mail válido.", "error");
      return;
    }
    if (formData.nome && formData.nome.length < 2) {
      switchAlert("O nome deve ter pelo menos 2 caracteres. Por favor, revise o campo.", "error");
      return;
    }

    onSubmit(formData);
  }

  return (
    <>
      <SwitchAlert
        visible={alert.visible}
        message={alert.message}
        type={alert.type}
        duration={alert.duration}
        onClose={hideAlert}
      />

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
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.93 10.93 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-3.26 4.74M1 1l22 22" />
                  </svg>
                )}

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
        <button type="submitt" className="register-button">
          {buttonText}
        </button>
      </form>
    </>
  );
}

export default FormIniciais;