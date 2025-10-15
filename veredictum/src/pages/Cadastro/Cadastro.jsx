import { useNavigate } from "react-router-dom";
import LayoutIniciais from "../../components/PagIniciais/LayoutIniciais";
import ImgSide from "../../components/PagIniciais/ImgSide";
import InfoSide from "../../components/PagIniciais/InfoSide";
import FormIniciais from "../../components/PagIniciais/FormIniciais";
import imgCadastro from "./../../assets/img/img-cadastro.png";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const fields = [
    { label: "Nome", type: "text", name: "nome", placeholder: "Nome" },
    { label: "E-mail", type: "email", name: "email", placeholder: "E-mail" },
    { label: "Senha", type: "password", name: "senha", placeholder: "Senha" },
  ];

  async function handleCadastro(formData) {
    try {
      const response = await fetch("http://localhost:8080/usuarios/cadastrar-inativo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          isAtivo: true,   
          isAdm: false,   
          fkAdm: 1         
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
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
  );
}

export default Cadastro;
