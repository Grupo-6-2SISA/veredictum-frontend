import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import ImgSide from "../../components/PagIniciais/ImgSide";
import InfoSide from "../../components/PagIniciais/InfoSide";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import SwitchAlert from "../../components/SwitchAlert/SwitchAlert";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "info",
    duration: 3000,
  });

  // use 'switchAlert' to match naming used across the app
  const switchAlert = (message, type = "info", duration = 3000) => {
    setAlert({ visible: true, message, type, duration });
  };

  const hideAlert = () => setAlert((a) => ({ ...a, visible: false }));

  const fields = [
    { label: "Nome", type: "text", name: "nome", placeholder: "Nome" },
    { label: "E-mail", type: "email", name: "email", placeholder: "E-mail" },
    { label: "Senha", type: "password", name: "senha", placeholder: "Senha" },
  ];

  async function handleCadastro(formData) {
    if (!formData || typeof formData !== "object") return;

    // validação básica antes de enviar
    const nome = (formData.nome || "").trim();
    const email = (formData.email || "").trim();
    const senha = (formData.senha || "").trim();

    if (!nome || !email || !senha) {
      switchAlert("Cadastro incompleto. Preencha nome, e‑mail e senha.", "error", 3500);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      switchAlert("E‑mail inválido. Informe um e‑mail no formato válido.", "error", 3500);
      return;
    }

    if (senha.length < 6) {
      switchAlert("Senha insuficiente. Use ao menos 6 caracteres.", "error", 3500);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios/cadastrar-inativo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          isAtivo: true,
          isAdm: false,
          fkAdm: 1,
        }),
      });

      if (response.ok) {
        switchAlert("Cadastro realizado com sucesso! Faça login para acessar.", "success", 2500);
        setTimeout(() => navigate("/login"), 900);
        return;
      }

      // Mensagens do servidor / status
      if (response.status === 409) {
        switchAlert("E‑mail já cadastrado. Faça login ou recupere a senha.", "error", 4000);
      } else if (response.status >= 400 && response.status < 500) {
        // Se o backend retornar detalhes sobre campos faltantes, tenta mostrar mensagem específica
        let serverMsg = "Dados inválidos. Verifique e tente novamente.";
        try {
          const body = await response.json();
          if (body && body.message) serverMsg = body.message;
          else if (body && body.errors) serverMsg = "Cadastro incompleto. Verifique os campos.";
        } catch (e) {
          // keep default
        }
        switchAlert(serverMsg, "error", 3500);
      } else {
        switchAlert("Erro no servidor ao cadastrar. Tente novamente mais tarde.", "error", 3500);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      switchAlert("Falha de conexão com o servidor.", "error", 3500);
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
            title="Já tem uma conta?"
            subtitle="Faça login aqui"
            linkTo="/login"
            linkText="Login"
          />
        }
        rightContent={
          <InfoSide>
            <FormIniciais
              fields={fields}
              buttonText="Cadastrar"
              onSubmit={handleCadastro}
            />
          </InfoSide>
        }
      />
    </>
  );
}

export default Cadastro;