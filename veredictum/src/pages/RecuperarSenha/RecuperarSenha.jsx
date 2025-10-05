import { useNavigate } from "react-router-dom";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import voltarIcon from "./../../assets/img/voltar-icon.png";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import logo from "./../../assets/svg/logo_vectorized.svg";
import "../../pages/Cadastro/Cadastro.css"; 
import "./RecuperarSenha.css";

function RecuperarSenha() {
  const navigate = useNavigate();

  const fields = [
    { label: "ID", type: "text", name: "id", placeholder: "ID" },
    { label: "E-mail", type: "email", name: "email", placeholder: "E-mail" },
    { label: "Senha", type: "password", name: "senha", placeholder: "Senha" },
    { label: "Repetir Senha", type: "password", name: "repetirSenha", placeholder: "Repetir Senha" },
  ];

  async function handleRecuperar(formData) {
  if (!formData.id) {
    alert("Por favor insira o ID.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email || "")) {
    alert("E-mail inválido.");
    return;
  }

  if (!formData.senha || formData.senha.length < 6) {
    alert("Senha com mínimo 6 caracteres.");
    return;
  }

  if (formData.senha !== formData.repetirSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/usuarios/alterar-senha/${formData.id}/${formData.email}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: formData.senha }),
      }
    );

    if (res.ok) {
      alert("Senha alterada com sucesso!");
      navigate("/login");
    } else {
      const text = await res.text();
      alert("Erro: " + (text || "Falha ao alterar a senha."));
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
}
  return (
    <LayoutIniciais
      leftContent={
        <div className="login-content">
          <div className="logo-inline-left">
            <img src={logo} alt="Veredictum" className="logo" />
            <span className="spanLogo">Veredictum</span>
          </div>
          <p className="subtitle-logo">Gestão do Escritório de Advocacia</p>
        </div>
      }
      rightContent={
        <>
          <div className="back-button">
            <img src={voltarIcon} alt="Voltar" onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
          </div>

          <div className="formRecSenha">
            <div>
              <span>Recuperação de Senha</span>
            </div>

            <FormIniciais
              fields={fields}
              buttonText="Salvar"
              onSubmit={handleRecuperar}
              showForgotPassword={false}
              forgotPhrase=""
            />
          </div>
        </>
      }
    />
  );
}

export default RecuperarSenha;