import React from "react";
import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isTokenValid(token) {
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload) return false;
  if (payload.exp && typeof payload.exp === "number") {
    const now = Date.now() / 1000;
    return payload.exp > now;
  }
  return true;
}

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true" || localStorage.getItem("isAuthenticated") === "true";
  const isAtivoFlag = sessionStorage.getItem("isAtivo") === "true" || localStorage.getItem("isAtivo") === "true";
  let userName = sessionStorage.getItem("userName") || localStorage.getItem("userName");

  // Permite acesso se houver JWT válido OR se foi definido fallback de autenticação e usuário está ativo.
  const hasValidJwt = token && isTokenValid(token);
  const fallbackOk = isAuthenticated && isAtivoFlag;

  if (!hasValidJwt && !fallbackOk) {
    // limpa possíveis lixo e força login
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isAtivo");
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAtivo");
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/login" replace />;
  }

  // se temos JWT mas sem userName, extrai do payload
  if (!userName && hasValidJwt) {
    const payload = parseJwt(token);
    const candidatoNome = payload?.nome || payload?.name || payload?.preferred_username || payload?.email;
    if (candidatoNome) {
      sessionStorage.setItem("userName", candidatoNome);
      userName = candidatoNome;
    }
  }

  // se não há userName, mas fallback ok, ainda permitimos (UX friendly)
  if (!userName && !fallbackOk) {
    // fallback já foi verificado acima, double-check
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Checagem admin: permite via flag isAdmin ou campo do token
  if (requireAdmin) {
    const isAdminFlag = sessionStorage.getItem("isAdmin") === "true" || localStorage.getItem("isAdmin") === "true";
    if (!isAdminFlag) {
      const payload = parseJwt(token || "");
      const roles = payload?.roles || payload?.role || [];
      const hasAdmin = Array.isArray(roles) ? roles.includes("ADMIN") || roles.includes("admin") : roles === "ADMIN" || roles === "admin";
      if (!hasAdmin) return <Navigate to="/VisaoGeral" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;