function LayoutIniciais({ leftContent, rightContent }) {
  return (
    <div className="cadastro-container">
      <div className="left-side">{leftContent}</div>
      <div className="right-side">{rightContent}</div>
    </div>
  );
}

export default LayoutIniciais;
