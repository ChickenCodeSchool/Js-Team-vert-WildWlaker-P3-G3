import axios from "axios";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthRequireProps {
  children: ReactNode;
}

// Composant "garde" : enveloppe une page à protéger.
// Il demande au back si la session est valide AVANT d'afficher le contenu.
const AuthRequire = ({ children }: AuthRequireProps) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/authVerif`, {
        withCredentials: true, // envoie le cookie httpOnly
      })
      .then(() => setChecking(false))
      .catch(() => navigate("/connexion"));
  }, [navigate]);

  // Tant qu'on n'a pas la réponse, on n'affiche pas le contenu protégé
  // (sinon il "flasherait" avant la redirection).
  if (checking) return <p>Chargement…</p>;

  return <>{children}</>;
};

export default AuthRequire;
