import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import connexionImg from "../../assets/images/Connexion-img.png";
import eye from "../../assets/images/eye.png";
import hide from "../../assets/images/hide.png";
import logo from "../../assets/images/logo-wedoo.png";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, _setSubmitted] = useState(false);

  const usernameValid = username.trim().length >= 3;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRules = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const passwordValid = Object.values(passwordRules).every(Boolean);

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const formValid =
    usernameValid &&
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    acceptedTerms;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message || "Inscription réussie 🎉");

      console.log("USER CREATED:", data);

      navigate("/connexion");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Erreur serveur");
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="navbar-register">
          <Link to="/" className="nav-register">
            <img src={logo} alt="logo-wedoo" />
            <h1>
              WE<i>D</i>OO
            </h1>
          </Link>
        </div>
        <div className="register-section">
          <div className="register-img-text">
            <img
              src={connexionImg}
              alt="register-img"
              className="register-img"
            />
            <div className="register-text">
              <h2>Facilitez vos prochains événements.</h2>
              <p className="register-parag">
                Wedoo vous propose une expérience utilisateur simple et
                efficace.
              </p>
            </div>
          </div>
          <form className="register-content" onSubmit={handleSubmit}>
            <div className="wel-para-title-register">
              <h2 className="Welcome-title-register">Bienvenue</h2>
              <p className="Welcome-para-register">Inscrivez-vous à WEDOO.</p>
            </div>
            <div className="id-input-label-register">
              <label htmlFor="identifiant" className="id-register">
                Identifiant
              </label>
              <br />
              <input
                type="text"
                placeholder="Entrez votre pseudo"
                required
                className={`input-focus id-input-register ${
                  submitted && !usernameValid ? "input-error" : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {username && (
                <p className={usernameValid ? "success" : "error"}>
                  {usernameValid ? "✓ Pseudo valide" : "✗ Minimum 3 caractères"}
                </p>
              )}
            </div>
            <div className="email-input-label-register">
              <label htmlFor="email" className="email-register">
                Adresse email
              </label>
              <br />
              <input
                type="email"
                placeholder="nom@wedoo.com"
                required
                className={`input-focus email-input-register ${
                  submitted && !emailValid ? "input-error" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email && (
                <p className={emailValid ? "success" : "error"}>
                  {emailValid ? "✓ Email valide" : "✗ Adresse email invalide"}
                </p>
              )}
            </div>

            <div className="password-input-label-register">
              <label htmlFor="password" className="password-register">
                Mots de Passe
              </label>
              <br />
              <div className="container-password-register">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mots de passe"
                  required
                  className="input-focus password-input-register"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eye : hide}
                    alt="afficher/ne pas afficher"
                    className="img-password-eye-register"
                  />
                </button>
              </div>
              <div>
                <p className={passwordRules.length ? "success" : "error"}>
                  Minimum 12 caractères
                </p>

                <p className={passwordRules.uppercase ? "success" : "error"}>
                  Une majuscule
                </p>

                <p className={passwordRules.lowercase ? "success" : "error"}>
                  Une minuscule
                </p>

                <p className={passwordRules.number ? "success" : "error"}>
                  Un chiffre
                </p>

                <p className={passwordRules.special ? "success" : "error"}>
                  Un caractère spécial
                </p>
              </div>
            </div>
            <div className="password-input-label-register">
              <label htmlFor="password" className="password-register">
                Confirmez le mots de passe
              </label>
              <br />
              <div className="container-password-register">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmez votre mots de passe"
                  required
                  className="input-focus password-input-confor-register"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? eye : hide}
                    alt="afficher/ne pas afficher"
                    className="img-password-eye-register"
                  />
                </button>
              </div>
              {password !== confirmPassword && confirmPassword !== "" && (
                <p className="error-register">
                  ✗ Les mots de passe ne correspond pas
                </p>
              )}
            </div>

            <div className="checkbox-input-label-register">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="remember" className="label-checkbox-register">
                {" "}
                J'accepte les{" "}
                <span className="cgd-register">
                  conditions générales d'utilisation{" "}
                </span>
                de WEDOO
              </label>
            </div>
            <button
              type="submit"
              className="button-register-submit"
              disabled={!formValid}
            >
              Valider
            </button>
            <h5 className="register-link-connection">
              Déjà un compte ?{" "}
              <Link to="/connexion" className="register-link">
                Se connecter
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
