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

O projeto está organizado em uma estrutura padrão de aplicações React com **Vite**. Esta abordagem promove a modularização, a reutilização de código e a facilidade de manutenção.

```
veredictum-frontend/
├── veredictum/                    # Diretório principal da aplicação
│   ├── node_modules/              # Módulos e dependências (gerado após npm install)
│   ├── public/                    # Arquivos estáticos servidos diretamente
│   │
│   ├── src/                       # Código-fonte da aplicação React
│   │   ├── assets/                # Recursos estáticos
│   │   │   ├── fonts/             # Fontes customizadas
│   │   │   ├── images/            # Imagens (PNG, JPG, etc.)
│   │   │   └── svg/               # Ícones e ilustrações SVG
│   │   │
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── Button/
│   │   │   ├── ButtonAgenda/
│   │   │   ├── Listagem/
│   │   │   ├── MonthPicker/
│   │   │   └── Sidebar/
│   │   │
│   │   ├── pages/                 # Páginas/telas da aplicação
│   │   │   ├── Agenda/
│   │   │   │   └── Support/       # Modais e componentes auxiliares
│   │   │   ├── Clientes/
│   │   │   ├── Dashboard/
│   │   │   ├── Despesas/
│   │   │   ├── Funcionarios/
│   │   │   ├── Login/
│   │   │   └── NotaFiscal/
│   │   │
│   │   ├── services/              # Lógica de comunicação com API
│   │   │
│   │   ├── App.jsx                # Componente raiz com roteamento
│   │   ├── App.css                # Estilos globais do App
│   │   ├── index.css              # Estilos base + variáveis CSS
│   │   └── main.jsx               # Ponto de entrada da aplicação
│   │
│   ├── .gitignore                 # Arquivos ignorados pelo Git
│   ├── eslint.config.js           # Configuração do ESLint
│   ├── index.html                 # HTML principal (entry point do Vite)
│   ├── package.json               # Dependências e scripts NPM
│   ├── package-lock.json          # Lock de versões das dependências
│   ├── vite.config.js             # Configuração do Vite
│   └── instalaDependencia.bat     # Script automatizado de instalação (Windows)
│
└── README.md                      # Documentação do projeto (este arquivo)
```

### Descrição Detalhada

#### 📂 Diretórios Principais

- **`veredictum/`**: Pasta raiz da aplicação React com Vite
  - **`node_modules/`**: Dependências instaladas (não commitado no Git)
  - **`public/`**: Arquivos públicos servidos estaticamente (favicon, etc.)
  - **`src/`**: Todo o código-fonte React
    - **`assets/`**: Recursos visuais organizados por tipo (fontes, imagens, SVGs)
    - **`components/`**: Componentes UI reutilizáveis (botões, tabelas, modais, sidebar)
    - **`pages/`**: Componentes de páginas completas organizados por módulo funcional
      - Cada pasta representa um módulo completo da aplicação (Agenda, Clientes, Dashboard, etc.)
      - Subpastas como `Support/` contêm componentes auxiliares específicos do módulo
    - **`services/`**: Funções de integração com APIs e lógica de comunicação externa
  
#### 📄 Arquivos de Configuração

- **`App.jsx`**: Componente principal com definição de rotas
- **`main.jsx`**: Entry point que renderiza o App no DOM
- **`index.html`**: HTML base usado pelo Vite
- **`vite.config.js`**: Configurações do build tool (aliases, plugins)
- **`package.json`**: Metadados do projeto e gerenciamento de dependências
- **`instalaDependencia.bat`**: Script automatizado para instalação (Windows)
- **`.gitignore`**: Define o que o Git deve ignorar (node_modules, .env, etc.)

-----

## 🛠️ Pré-requisitos e Instalação

### Opção 1: Instalação Automatizada (Recomendado para Windows)

**Execute o script `instalaDependencia.bat` na raiz do projeto:**

1. Navegue até a pasta do projeto:
```bash
cd "c:\Users\DELL_GUUH\Downloads\veredictum-frontend\veredictum"
```

2. Execute o script de instalação:
```bash
instalaDependencia.bat
```

O script irá:
- ✅ Verificar se o Node.js está instalado
- ✅ Instalar todas as dependências principais (axios, prop-types, chart.js, date-fns)
- ✅ Configurar Tailwind CSS, PostCSS e Autoprefixer
- ✅ Gerar arquivos de configuração automaticamente

3. Após a execução, adicione as diretivas do Tailwind em `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Opção 2: Instalação Manual

Recomenda-se executar os passos abaixo no terminal (PowerShell/CMD) a partir da pasta raiz do projeto:

1. **Node.js**
   - Instalar Node.js (recomenda-se versão LTS: 16.x ou 18.x).
   - Verifique: `node -v && npm -v`

2. **Instalar dependências do projeto**
```bash
cd "c:\Users\DELL_GUUH\Downloads\veredictum-frontend\veredictum"
npm install
```

3. **Pacotes úteis (se não estiverem no package.json)**

- **axios** (cliente HTTP)
```bash
npm install axios
```

- **prop-types** (validação de props em componentes React)
```bash
npm install prop-types
```

- **chart.js** (gráficos)
```bash
npm install chart.js
```

- **date-fns** (utilitários de data)
```bash
npm install date-fns
```

- **Tailwind CSS** (opcional, caso queira usar)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Após gerar o arquivo de configuração, adicione em `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **Configurar variáveis de ambiente / backend**
- Certifique-se de que o backend (API) esteja rodando (por exemplo em `http://localhost:8080`).
- Ajuste variáveis (se houver) em `.env.local` ou conforme a configuração do projeto.

5. **Rodar o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Verificações rápidas**
- Abra DevTools → Network / Console para checar chamadas ao backend (rotas e CORS).
- Confirme que `sessionStorage` contém chaves usadas pela aplicação (ex.: `isAdmin`, `userName`) após login.

### 📝 Observações:
- Se estiver usando **yarn** ou **pnpm**, substitua os comandos `npm` pelos equivalentes (`yarn` / `pnpm`).
- Para produção, siga o processo padrão de build: `npm run build`.
- **Linux/macOS:** Se não estiver no Windows, siga a **Opção 2 (Instalação Manual)** ou adapte o script `.bat` para `.sh`.

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

  - **Nomenclatura de Classes:** `className="nome-do-bloco__elemento--modificador"`
  - **Arquivos:** Você pode usar arquivos de CSS específicos para cada componente, importando-os diretamente.

### ☕ JavaScript/React (`camelCase`)

O código JavaScript deve seguir o padrão `camelCase` e as convenções do React.

  - **Hooks**: Use `useState`, `useEffect` e outros hooks para gerenciar o estado e o ciclo de vida dos componentes.
  - **Componentes**: Nomeie os componentes com `PascalCase` (ex: `FuncionariosPage.jsx`).
  - **Funções**: As funções dentro dos componentes devem usar verbos de ação (ex: `handleToggleChange`).

-----

## 🚀 Padrões de Commits e GitHub

A seção de padrões de commits e branches se mantém **inalterada**, pois as boas práticas de versionamento são independentes da tecnologia utilizada no projeto.

### 📌 Formato do Commit

```bash
<tipo>(<escopo opcional>): <descrição curta no presente e imperativo>

[Corpo opcional explicando o motivo da mudança, o que foi alterado e impactos]

[Issue relacionada, se houver]
```

### 📊 Tipos de Commits (Conventional Commits)

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

### 🏆 Exemplos de Commits Bem Escritos

#### ✅ Commit Simples

```bash
feat(user): adicionar validação de e-mail no cadastro
```

#### 📜 Commit com Corpo Explicativo

```bash
fix(auth): corrigir erro na geração de token JWT

O erro acontecia porque o tempo de expiração estava sendo passado como string 
ao invés de um número inteiro. Agora, a conversão para `Long` foi corrigida.

Fixes #42
```

#### 🔄 Commit para Atualização de Dependências

```bash
chore(deps): atualizar Spring Boot para versão 3.1.0
```

### 🚦 Padrão de Branches

| Branch                           | Descrição                               |
| -------------------------------- | --------------------------------------- |
| 🌍 `main`                        | versão estável do projeto.             |
| ⚙️ `develop`                     | branch principal para desenvolvimento. |
| 🔛 `feature/nome-da-feature`     | novas funcionalidades.                 |
| 🐞 `bugfix/nome-do-bug`          | correções de bugs.                     |
| 🔥 `hotfix/nome-do-hotfix`       | correções urgentes na produção.        |
| 🔖 `release/versao`              | preparação de novas versões.          |

#### Criar uma nova branch
Para criar uma nova branch e mudar para ela, use o comando:
```bash 
git checkout -b nome-da-branch
```
Ou, se você estiver usando uma versão mais recente do Git, pode usar:
```bash
git switch -c nome-da-branch
```
Exemplo: Se você quiser criar uma branch chamada `feature/nova-funcionalidade`:
```bash
git checkout -b feature/nova-funcionalidade
```
Ou:
```bash
git switch -c feature/nova-funcionalidade
```
Isso cria a branch e muda automaticamente para ela.

#### Dar push para o repositório remoto
Depois de fazer o commit, envie (push) a nova branch para o repositório remoto com o comando:
```bash
git push -u origin nome-da-branch
```
Exemplo:
```bash
git push -u origin feature/nova-funcionalidade
```
O `-u` (ou `--set-upstream`) faz com que a branch local seja associada à branch remota, então nas próximas vezes, você pode apenas rodar `git push` ou `git pull` sem precisar especificar o nome da branch.

-----

## 📦 Scripts Disponíveis

| Comando             | Descrição                                      |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento           |
| `npm run build`     | Gera a build de produção                       |
| `npm run preview`   | Visualiza a build de produção localmente       |
| `npm run lint`      | Executa o linter (ESLint)                      |

-----

## 🤝 Contribuindo

1. Crie uma branch para sua feature/bugfix
2. Commit suas mudanças seguindo os padrões acima
3. Faça push para o repositório remoto
4. Abra um Pull Request para `develop`

-----

## 📄 Licença

Este projeto é propriedade de **LAW & CODE** e destina-se ao uso interno do escritório Veredictum.

-----

**Desenvolvido com ❤️ pela equipe LAW & CODE**