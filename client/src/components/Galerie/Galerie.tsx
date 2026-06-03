import "./Galerie.css";

function Galerie() {
  return (
    <section className="galerie">
      <div className="galerie-header">
        <h1>Nom de l'événement</h1>

        <button type="button" className="galerie-button">
          Ajouter une photo
        </button>
      </div>

      <div className="galerie-grid">
        <div className="photo grande" />
        <div className="photo" />
        <div className="photo" />
        <div className="photo" />
        <div className="photo" />
        <div className="photo" />
      </div>
    </section>
  );
}

export default Galerie;
