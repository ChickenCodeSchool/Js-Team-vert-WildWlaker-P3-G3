import "./ForgetPassword.css";
import { useState } from "react";
import { Link } from "react-router";
import connexionImg from "../../assets/images/Connexion-img.png";
import logo from "../../assets/images/logo-wedoo.png";

function ForgetPassword() {
  const [identifier, setIdentifier] = useState("");
  const [submitted, _setSubmitted] = useState(false);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const isUsername = identifier.trim().length >= 3;
  const identifierValid = isEmail || isUsername;
  const formValid = identifierValid;

  return (
    <>
      <div className="navbar-forgetpassword">
        <Link to="/" className="nav-forgetpassword">
          <img src={logo} alt="logo-wedoo" />
          <h1>
            WE<i>D</i>OO
          </h1>
        </Link>
      </div>
      <div className="forgetPassword-section">
        <div className="forgetPassword-img-text">
          <img
            src={connexionImg}
            alt="forgetPassword-img"
            className="forgetPassword-img"
          />
          <div className="forgetPassword-text">
            <h2>Facilitez vos prochains événements.</h2>
            <p className="forgetPassword-parag">
              Wedoo vous propose une expérience utilisateur simple et efficace.
            </p>
          </div>
        </div>
        <form className="forgetPassword-content">
          <div className="wel-para-title-forgetPassword">
            <h2>Mot de passe oublier ?</h2>
            <p className="Welcome-forgetPassword-para">
              Entrez votre email ou votre pseudo pour recevoir un lien de
              réinitialisation.
            </p>
          </div>
          <div className="email-input-label-forgetPassword">
            <label htmlFor="email" className="email-forgetPassword">
              Pseudo ou Email
            </label>
            <br />
            <input
              type="text"
              placeholder="Entrez votre pseudo ou email"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`email-input-forgetPassword ${submitted && !identifierValid ? "input-error" : ""}`}
            />
            {identifier && (
              <p className={identifierValid ? "success" : "error"}>
                {identifierValid ? "" : "✗ Pseudo ou Adresse mail incorrect"}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="button-forgetPassword-submit"
            disabled={!formValid}
          >
            Envoyer
          </button>
          <h5 className="register-link-connection-forgetPassword">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="register-link-forgetPassword">
              Se connecter
            </Link>
          </h5>
          <h5 className="register-link-connection-forgetPassword">
            Pas encore inscrit ?{""}
            <Link to="/register" className="register-link-forgetPassword">
              {" "}
              Rejoins nous ici
            </Link>
          </h5>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
