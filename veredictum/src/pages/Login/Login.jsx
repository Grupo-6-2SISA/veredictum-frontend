import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import ImgSide from "../../components/PagIniciais/ImgSide";
import InfoSide from "../../components/PagIniciais/InfoSide";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import SwitchAlert from "../../components/SwitchAlert/SwitchAlert";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import "../Cadastro/Cadastro.css";

function Login() {
  const navigate = useNavigate();

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

  const fields = [
    { label: "E-mail", type: "email", name: "email", placeholder: "E-mail" },
    { label: "Senha", type: "password", name: "senha", placeholder: "Senha" },
  ];

  async function handleLogin(formData) {
    if (!formData || typeof formData !== "object") return;

    if (!formData.senha || formData.senha.length < 6) {
      switchAlert(
        "Senha insuficiente. Certifique-se de que haja ao menos 6 caracteres.",
        "error"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      switchAlert("Por favor, insira um e-mail válido.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios/logar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

       if (response.ok) {
          const data = await response.json();
          const isAdminValue =
            data.isAdm !== undefined ? data.isAdm : data.isAdmin;
          const isAdminString =
            isAdminValue === true || isAdminValue === "true" || isAdminValue === 1
              ? "true"
              : "false";

          sessionStorage.setItem("userEmail", formData.email);
          sessionStorage.setItem("userName", data.nome);
          sessionStorage.setItem("isAdmin", isAdminString);
          // flag que ProtectedRoute irá checar
          sessionStorage.setItem("isAuthenticated", "true");

        switchAlert("Login realizado com sucesso!", "success", 900);
        setTimeout(() => navigate("/VisaoGeral"), 900);
        return;
      }

      // Status handling
      if (response.status === 404) {
        switchAlert("E-mail inválido. Cadastre-se para acessar o sistema.", "error");
      } else if (response.status === 400 || response.status === 403) {
        switchAlert("Credenciais inválidas. Verifique seu e-mail e senha.", "error");
      } else if (response.status === 401) {
        switchAlert("Usuário inativo. Entre em contato com o administrador.", "error");
      } else {
        switchAlert("Erro ao tentar logar.", "error");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      switchAlert("Falha de conexão com o servidor.", "error");
    }
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

      <LayoutIniciais
        leftContent={
          <ImgSide
            imgSrc={imgCadastro}
            title="Não tem uma conta?"
            subtitle="Cadastre-se aqui"
            linkTo="/cadastro"
            linkText="Cadastre-se"
          />
        }
        rightContent={
          <InfoSide>
            <FormIniciais
              fields={fields}
              buttonText="Entrar"
              onSubmit={handleLogin}
              showForgotPassword={true}
            />
          </InfoSide>
        }
      />
    </>
  );
}

export default Login;