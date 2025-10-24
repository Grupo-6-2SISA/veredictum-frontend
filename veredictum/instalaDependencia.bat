@echo off
echo ======================================
echo Instalando dependências do projeto React
echo ======================================

REM Verifica se o Node.js está instalado
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js não está instalado. Instale o Node.js antes de continuar.
    pause
    exit /b
)

REM Instalar dependências principais
echo.
echo Instalando axios, prop-types, chart.js e date-fns...
npm install axios prop-types chart.js date-fns

REM Instalar dependências de desenvolvimento do Tailwind CSS
echo.
echo Instalando Tailwind CSS, PostCSS e Autoprefixer...
npm install -D tailwindcss postcss autoprefixer

REM Gerar arquivos de configuração do Tailwind
echo.
echo Gerando arquivos de configuração do Tailwind CSS...
npx tailwindcss init -p

REM Instrução final para adicionar diretivas no index.css
echo.
echo ======================================
echo 🚀 Instalação concluída!
echo --------------------------------------
echo Adicione as seguintes linhas em src/index.css:
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo --------------------------------------
echo Agora você pode iniciar o projeto com:
echo npm run dev
echo ======================================

pause
