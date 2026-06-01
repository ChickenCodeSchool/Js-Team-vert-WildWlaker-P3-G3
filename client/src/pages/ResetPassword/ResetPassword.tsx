import "./ResetPassword.css";
import { useState } from "react";
import { Link } from "react-router";
import connexionImg from "../../assets/images/Connexion-img.png";
import eye from "../../assets/images/eye.png";
import hide from "../../assets/images/hide.png";
import logo from "../../assets/images/logo-wedoo.png";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRules = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const passwordValid = Object.values(passwordRules).every(Boolean);

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const formValid = passwordValid && passwordsMatch;

  return (
    <>
      <div className="navbar-resetpassword">
        <Link to="/" className="nav-resetpassword">
          <img src={logo} alt="logo-wedoo" />
          <h1>
            WE<i>D</i>OO
          </h1>
        </Link>
      </div>
      <div className="resetpassword-section">
        <div className="resetpassword-img-text">
          <img
            src={connexionImg}
            alt="resetpassword-img"
            className="resetpassword-img"
          />
          <div className="resetpassword-text">
            <h2>Facilitez vos prochains événements.</h2>
            <p className="resetpassword-parag">
              Wedoo vous propose une expérience utilisateur simple et efficace.
            </p>
          </div>
        </div>
        <form className="resetpassword-content">
          <div className="resetpassword-para-title">
            <h2>Changez votre mot de passe.</h2>
          </div>
          <div className="password-input-label-resetpassword">
            <label htmlFor="password" className="password-resetpassword">
              Nouveau mot de passe
            </label>
            <br />
            <div className="container-password-resetpassword">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrer votre nouveau mot de passe"
                required
                className="password-input-resetpassword"
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
                  className="img-password-eye"
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
          <div className="password-input-label-resetpassword">
            <label htmlFor="password" className="password-resetpassword">
              Confirmez le mot de passe
            </label>
            <br />
            <div className="container-password-resetpassword">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer votre mot de passe"
                required
                className="password-input-confor-resetpassword"
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
                  className="img-password-eye"
                />
              </button>
            </div>
            {password !== confirmPassword && confirmPassword !== "" && (
              <p className="error">✗ Le mot de passe ne correspond pas</p>
            )}
          </div>
          <button
            type="submit"
            className="button-resetpassword-submit"
            disabled={!formValid}
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
