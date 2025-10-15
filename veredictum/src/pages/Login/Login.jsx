import { useNavigate } from "react-router-dom";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import ImgSide from "../../components/PagIniciais/ImgSide";
import InfoSide from "../../components/PagIniciais/InfoSide";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import "../Cadastro/Cadastro.css";

function Login() {
  const navigate = useNavigate();

  const fields = [
    { label: "E-mail", type: "email", name: "email", placeholder: "E-mail" },
    { label: "Senha", type: "password", name: "senha", placeholder: "Senha" },
  ];

  async function handleLogin(formData) {
    if (formData.senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
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

        // 1. TENTA PEGAR 'isAdm' ou 'isAdmin'
        const isAdminValue = data.isAdm !== undefined ? data.isAdm : data.isAdmin;

        // 2. NORMALIZA para string 'true' ou 'false' antes de salvar (boas práticas)
        const isAdminString = isAdminValue === true || isAdminValue === 'true' || isAdminValue === 1 ? 'true' : 'false';

        sessionStorage.setItem("userEmail", formData.email);
        sessionStorage.setItem("userName", data.nome);
        sessionStorage.setItem("isAdmin", isAdminString);



        alert("Login realizado com sucesso!");
        navigate("/VisaoGeral");
      } else if (response.status === 404) {
        alert("E-mail não encontrado. Certifique-se de que esteja cadastrado no nosso sistema.");
      } else if (response.status === 400) {
        alert("E-mail ou senha incorretos.");
      } else if (response.status === 401) {
        alert("Usuário inativo. Entre em contato com o administrador.");
      } else {
        alert("Erro ao tentar logar.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Falha de conexão com o servidor.");
    }
  }

  return (
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
  );
}

export default Login;