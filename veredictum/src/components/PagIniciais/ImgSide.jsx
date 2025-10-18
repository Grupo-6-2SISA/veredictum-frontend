import { Link } from "react-router-dom";

function ImgSide({ title, subtitle, linkTo, linkText }) {
  return (
    <div className="login-content">
      <span>{title}</span>
      <span>{subtitle}</span>
      {linkTo && <Link to={linkTo} className="login-btn">{linkText}</Link>}
    </div>
  );
}

export default ImgSide;
