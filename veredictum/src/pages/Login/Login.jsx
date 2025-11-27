import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import ImgSide from "../../components/PagIniciais/ImgSide";
import InfoSide from "../../components/PagIniciais/InfoSide";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import SwitchAlert from "../../components/SwitchAlert/SwitchAlert";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import "../Cadastro/Cadastro.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
      const res = await fetch(`${API_BASE_URL}/usuarios/logar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // backend message fallback
        const msg = data.message || data.msg || "Credenciais inválidas.";
        switchAlert(msg, "error");
        return;
      }

      // Tenta extrair token (se houver)
      const token =
        data.token ||
        data.accessToken ||
        data.access_token ||
        data.jwt ||
        data.tokenJwt ||
        data.data?.token ||
        null;

      // Extrai campos do usuário no caso do backend retornar o objeto do usuário
      const usuario = data.usuario || data.user || data; // aceita resposta direta com campos
      const isAtivoRaw =
        data.is_ativo ??
        data.isAtivo ??
        data.is_ativo_usuario ??
        usuario?.is_ativo ??
        usuario?.isAtivo ??
        usuario?.is_ativo ??
        null;
      const isAdmRaw =
        data.is_adm ??
        data.isAdm ??
        data.isAdmin ??
        usuario?.is_adm ??
        usuario?.isAdm ??
        usuario?.isAdmin ??
        false;
      const userId = usuario?.id_usuario ?? usuario?.id ?? data.id_usuario ?? null;
      const nome =
        usuario?.nome || usuario?.name || data.nome || data.name || formData.email;

      // Normalize flags
      const isAtivo =
        isAtivoRaw === null
          ? null
          : !!(Number(isAtivoRaw) || isAtivoRaw === true || isAtivoRaw === "true");
      const isAdm = !!(Number(isAdmRaw) || isAdmRaw === true || isAdmRaw === "true");

      // Se backend informa que usuário está inativo, bloqueia login
      if (isAtivo === false) {
        switchAlert("Usuário inativo. Entre em contato com o administrador.", "error");
        return;
      }

      // Salva token se houver
      if (token) {
        sessionStorage.setItem("token", token);
      }

      // Marca sessão autenticada (fallback quando não há JWT)
      sessionStorage.setItem("isAuthenticated", "true");
      if (isAtivo !== null) sessionStorage.setItem("isAtivo", String(isAtivo));
      sessionStorage.setItem("isAdmin", String(isAdm));
      if (userId) sessionStorage.setItem("userId", String(userId));
      sessionStorage.setItem("userName", nome);

      switchAlert("Login realizado com sucesso!", "success", 900);
      // Navega após breve delay para que o usuário veja a notificação
      setTimeout(() => navigate("/VisaoGeral", { replace: true }), 700);
    } catch (err) {
      console.error("Erro na requisição:", err);
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