# ⚖️ Veredictum - Front-End (React + Vite)

> Desenvolvido por **LAW & CODE**

Este documento serve como guia central para o desenvolvimento do front-end do projeto Veredictum, agora utilizando **React** e a ferramenta de build **Vite**. Ele detalha o escopo, os objetivos e os padrões de código que devem ser seguidos por todos os integrantes da equipe.

-----

### ✨ Links

  - **🎨 Protótipo (Figma):** [Acessar o Design do Veredictum](https://www.figma.com/design/meiG9fy7id9U1DlL7A6RVk/Prot%C3%B3tipo-Veredictum---Grupo-6?node-id=0-1&p=f&t=16LDYPX1MWmyOh9Y-0)
  - **🗃️ Repositórios:** [Organização Grupo-6-2SISA no GitHub](https://github.com/Grupo-6-2SISA)

-----

## 🎯 Sobre o Projeto

Com o objetivo de atender às principais necessidades identificadas, o Projeto Veredictum foi desenvolvido com foco na organização, eficiência e praticidade da gestão do escritório. A aplicação contará com telas de cadastro e login, além de uma funcionalidade para recuperação de senha, garantindo segurança e fácil acesso à plataforma.

Entre os recursos, estão:

  - **Gestão de clientes e funcionários:** Interface intuitiva para cadastrar, visualizar, atualizar e excluir informações de forma prática e organizada.
  - **Controle financeiro:** Telas dedicadas à gestão de despesas e emissão de notas fiscais, facilitando o controle contábil do escritório.
  - **Agenda e relacionamento:** Módulo que organiza os atendimentos diários e mensais, exibe os aniversariantes do mês, e permite filtrar por período, contribuindo para um relacionamento mais próximo com os clientes.
  - **Dashboard administrativo:** Painel central com indicadores e dados relevantes, oferecendo uma visão ampla e estratégica da administração do escritório.
  - **Histórico de envio de e-mails:** Página específica para visualizar todos os e-mails enviados dentro de um determinado intervalo de tempo, promovendo maior controle da comunicação institucional.

-----

## 📁 Estrutura de Pastas e Arquivos

O projeto agora está organizado em uma estrutura padrão de aplicações React com **Vite**. Esta abordagem promove a modularização, a reutilização de código e a facilidade de manutenção.

```
.
├── node_modules/        # Módulos e dependências do projeto
├── public/              # Arquivos estáticos que serão copiados diretamente (ex: index.html, favicons)
├── src/                 # Código-fonte da aplicação React
│   ├── assets/          # Mídia, imagens e SVGs (arquivos que serão importados no JS)
│   ├── components/      # Componentes de UI reutilizáveis (botões, modais, cabeçalho)
│   ├── pages/           # Componentes que representam as telas da aplicação
│   ├── services/        # Funções de requisições para a API (ex: API de funcionários)
│   ├── App.jsx          # Componente principal que define as rotas da aplicação
│   ├── index.css        # Estilos CSS globais da aplicação
│   └── main.jsx         # Ponto de entrada da aplicação (renderiza o App.jsx)
├── .gitignore           # Arquivos e pastas a serem ignorados pelo Git
├── package.json         # Metadados do projeto e lista de dependências
├── vite.config.js       # Arquivo de configuração do Vite
└── README.md            # Documentação do projeto
```

### Descrição Detalhada

#### Diretórios Raiz

  - **`node_modules/`**: Contém todos os pacotes e dependências instalados via npm.
  - **`public/`**: Contém arquivos estáticos que não serão processados pelo Vite e serão servidos diretamente, como o `index.html` e o favicon.
  - **`src/`**: O diretório central do projeto React.
      - **`assets/`**: Onde os ativos estáticos como imagens, ícones e SVGs são armazenados. Eles podem ser importados diretamente nos componentes.
      - **`components/`**: Contém os componentes menores e reutilizáveis, como modais, botões, formulários e o switch de ativação.
      - **`pages/`**: Cada "tela" ou "página" do projeto é um componente React completo, como `FuncionariosPage.jsx` ou `Dashboard.jsx`.
      - **`services/`**: Módulo para centralizar a lógica de comunicação com a API (funções de `fetch`).

#### Arquivos Raiz

  - **`App.jsx`**: É o componente principal que contém a estrutura base e a lógica de roteamento do aplicativo.
  - **`main.jsx`**: O ponto de entrada da aplicação. Ele renderiza o componente `App` no elemento root do HTML.
  - **`vite.config.js`**: Arquivo de configuração para o Vite, onde você pode definir aliases, plugins e outras configurações de build.
  - **`package.json`**: Gerencia dependências e scripts de automação.
  - **`README.md`**: Este documento.

-----

## 💻 Padrões de Código

Os padrões de código se mantêm os mesmos, com uma pequena adaptação para a sintaxe do React (JSX).

### 📜 JSX Semântico

A sintaxe JSX permite usar HTML semântico dentro do JavaScript.

  - **Estrutura:** Use tags como `<header>`, `<nav>`, `<main>` e `<footer>`.
  - **Formulários:** As propriedades `htmlFor` e `className` são usadas em vez de `for` e `class`.
  - **Eventos:** Eventos são definidos com `camelCase`, como `onClick` e `onChange`.

### 🎨 CSS (BEM + `kebab-case`)

A metodologia BEM ainda é adotada para a nomenclatura de classes, mas as classes são aplicadas nos componentes React.

  - **Nomeclatura de Classes:** `className="nome-do-bloco__elemento--modificador"`
  - **Arquivos:** Você pode usar arquivos de CSS específicos para cada componente, importando-os diretamente.

### ☕ JavaScript/React (`camelCase`)

O código JavaScript deve seguir o padrão `camelCase` e as convenções do React.

  - **Hooks**: Use `useState`, `useEffect` e outros hooks para gerenciar o estado e o ciclo de vida dos componentes.
  - **Componentes**: Nomeie os componentes com `PascalCase` (ex: `FuncionariosPage.jsx`).
  - **Funções**: As funções dentro dos componentes devem usar verbos de ação (ex: `handleToggleChange`).

-----

# 🚀 Padrões de Commits e GitHub

A seção de padrões de commits e branches se mantém **inalterada**, pois as boas práticas de versionamento são independentes da tecnologia utilizada no projeto.
