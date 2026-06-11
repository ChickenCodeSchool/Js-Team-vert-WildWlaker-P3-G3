import "./ChangePassword.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import connexionImg from "../../assets/images/Connexion-img.png";
import eye from "../../assets/images/eye.png";
import hide from "../../assets/images/hide.png";
import logo from "../../assets/images/logo-wedoo.png";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const passwordRules = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const passwordValid = Object.values(passwordRules).every(Boolean);

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const formValid = currentPassword !== "" && passwordValid && passwordsMatch;

  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      const res = await fetch(
        "http://localhost:3310/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword: password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Mot de passe modifié avec succès");

      navigate("/connexion");
    } catch (error) {
      console.error("CHANGE PASSWORD ERROR :", error);
      alert(`Erreur : ${String(error)}`);
    }
  };

  return (
    <>
      <div className="navbar-changepassword">
        <Link to="/" className="nav-changepassword">
          <img src={logo} alt="logo-wedoo" />
          <h1>
            WE<i>D</i>OO
          </h1>
        </Link>
      </div>
      <div className="changepassword-section">
        <div className="changepassword-img-text">
          <img
            src={connexionImg}
            alt="changepassword-img"
            className="changepassword-img"
          />
          <div className="changepassword-text">
            <h2>Facilitez vos prochains événements.</h2>
            <p className="changepassword-parag">
              Wedoo vous propose une expérience utilisateur simple et efficace.
            </p>
          </div>
        </div>
        <form
          className="changepassword-content"
          onSubmit={handleChangePassword}
        >
          <div className="changepassword-para-title">
            <h2>Changez votre mot de passe.</h2>
          </div>
          <div className="password-input-label-changepassword">
            <label htmlFor="password" className="password-changepassword">
              Ancien mot de passe
            </label>
            <br />
            <div className="container-password-changepassword">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Entrer votre ancien mot de passe"
                required
                className="input-focus password-input-confor-changepassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <img
                  src={showCurrentPassword ? eye : hide}
                  alt="afficher/ne pas afficher"
                  className="img-password-eye"
                />
              </button>
            </div>
          </div>
          <div className="password-input-label-changepassword">
            <label htmlFor="password" className="password-changepassword">
              Nouveau mot de passe
            </label>
            <br />
            <div className="container-password-changepassword">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrer votre nouveau mot de passe"
                required
                className="input-focus password-input-changepassword"
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
          <div className="password-input-label-changepassword">
            <label htmlFor="password" className="password-changepassword">
              Confirmez le mot de passe
            </label>
            <br />
            <div className="container-password-changepassword">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer votre mot de passe"
                required
                className="input-focus password-input-confor-changepassword"
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
            className="button-changepassword-submit"
            disabled={!formValid}
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
