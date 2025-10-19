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

## 🛠️ Pré-requisitos e instalação (antes de rodar o projeto)

Recomenda-se executar os passos abaixo no terminal (PowerShell/CMD) a partir da pasta raiz do projeto:

1. Node.js
   - Instalar Node.js (recomenda-se versão LTS: 16.x ou 18.x).
   - Verifique: node -v && npm -v

2. Instalar dependências do projeto
```
cd "c:\Users\DELL_GUUH\Downloads\veredictum-frontend\veredictum"
npm install
```

3. Pacotes úteis (se não estiverem no package.json)
- axios (cliente HTTP)
```
npm install axios
```

- prop-types (validação de props em componentes React)
```
npm install prop-types
```

- Chart.js (Visualização de gráficos via JS)
```
npm install chart.js
```

- Tailwind CSS (opcional, caso queira usar)
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Após gerar o arquivo de configuração, adicione em src/index.css:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Configurar variáveis de ambiente / backend
- Certifique-se de que o backend (API) esteja rodando (por exemplo em http://localhost:8080).
- Ajuste variáveis (se houver) em .env.local ou conforme a configuração do projeto.

5. Rodar o servidor de desenvolvimento
```
npm run dev
```

6. Verificações rápidas
- Abra DevTools → Network / Console para checar chamadas ao backend (rotas e CORS).
- Confirme que sessionStorage contém chaves usadas pela aplicação (ex.: isAdmin, userName) após login.

Observações:
- Se estiver usando yarn ou pnpm, substitua os comandos npm pelos equivalentes (yarn / pnpm).
- Para produção, siga o processo padrão de build: npm run build.

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

## 📌 Formato do Commit

```bash
<tipo>(<escopo opcional>): <descrição curta no presente e imperativo>

[Corpo opcional explicando o motivo da mudança, o que foi alterado e impactos]

[Issue relacionada, se houver]
```

## 📊 Tipos de Commits (Conventional Commits)

| Prefixo        | Significado                                         |
| -------------- | --------------------------------------------------- |
| 🎉 `feat`      | Adição de nova funcionalidade                       |
| 🐛 `fix`       | Correção de bugs                                    |
| 🏗️ `refactor` | Refatoração do código (sem mudar funcionalidade)    |
| 🛠️ `chore`    | Mudanças na configuração, dependências              |
| 🎨 `style`     | Alterações de formatação, lint, espaços, indentação |
| 🧪 `test`      | Adição ou correção de testes                        |
| 📖 `docs`      | Alterações na documentação                          |
| 🔧 `ci`        | Mudanças na configuração de CI/CD                   |
| ⚡ `perf`       | Melhorias de performance                            |
| ⏪ `revert`     | Reversão de commit                                  |

## 🏆 Exemplos de Commits Bem Escritos

### ✅ Commit Simples

```bash
feat(user): adicionar validação de e-mail no cadastro
```

### 📜 Commit com Corpo Explicativo

```bash
fix(auth): corrigir erro na geração de token JWT

O erro acontecia porque o tempo de expiração estava sendo passado como string 
ao invés de um número inteiro. Agora, a conversão para `Long` foi corrigida.

Fixes #42
```

### 🔄 Commit para Atualização de Dependências

```bash
chore(deps): atualizar Spring Boot para versão 3.1.0
```

# 🚦Padrão de branches

| Branch                                        | Descrição                               |
| --------------------------------------------- | --------------------------------------- |
| 🌍 `main`                                     | versão estável do projeto.             |
| ⚙ `develop`                                  | branch principal para desenvolvimento. |
| 🔛 `feature/nome-da-feature`                  | novas funcionalidades.                 |
| 🐞 `bugfix/nome-do-bug`                       | correções de bugs.                     |
| 🔥 `hotfix/nome-do-hotfix`                    | correções urgentes na produção.        |
| 🔖 `release/versao`                           | preparação de novas versões.          |



## Criar uma nova branch
Para criar uma nova branch e mudar para ela, use o comando:
```bash 
git checkout -b nome-da-branch
```
Ou, se você estiver usando uma versão mais recente do Git, pode usar:
```bash
git switch -c nome-da-branch
```
Exemplo: Se você quiser criar uma branch chamada feature/nova-funcionalidade:
```bash
git checkout -b feature/nova-funcionalidade
```
Ou:
```bash
git switch -c feature/nova-funcionalidade
```
Isso cria a branch e muda automaticamente para ela.

## Dar push para o repositório remoto
Depois de fazer o commit, envie (push) a nova branch para o repositório remoto com o comando:
```bash
git push -u origin nome-da-branch
```
Exemplo:
```bash
git push -u origin feature/nova-funcionalidade
```
O -u (ou --set-upstream) faz com que a branch local seja associada à branch remota, então nas próximas vezes, você pode apenas rodar git push ou git pull sem precisar especificar o nome da branch.
