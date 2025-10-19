function LogoRecSenha({ logoSrc, title, subtitle }) {
  return (
    <div className="logo-row">
      <div className="group-logo-title">
        <img src={logoSrc} alt="Veredictum" />
        <span className="logo-title">{title}</span>
      </div>
      <p className="subtitle-logo">{subtitle}</p>
    </div>
  );
}

export default LogoRecSenha;