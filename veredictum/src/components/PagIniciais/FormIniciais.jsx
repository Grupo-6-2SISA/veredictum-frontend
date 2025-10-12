import { useState } from "react";
import { Link } from "react-router-dom";

function FormIniciais({ fields, buttonText, onSubmit, showForgotPassword = false }) {
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.senha.length < 6) {
      alert("Senha insuficiente. Certifique-se de que haja ao menos 6 caracteres");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (formData.nome && formData.nome.length < 2) {
      alert("O nome deve ter pelo menos 2 caracteres. Por favor, revise o campo.");
      return;
    }




    onSubmit(formData); // manda os dados para o Cadastro.jsx
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-field" key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      {showForgotPassword && (
        <div className="forgot-password-row" >
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
