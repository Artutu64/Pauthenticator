import Page from "./Page";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Page>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Aligner en haut
          height: "100vh",
          textAlign: "center",
          paddingTop: "15vh", // Décaler le contenu vers le haut
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            fontWeight: "bold",
            color: "#000",
            marginBottom: "10px",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Oups, cette page est introuvable !
        </p>
        <p
          style={{
            color: "#777",
            fontSize: "1rem",
            marginBottom: "20px",
          }}
        >
          Le lien est peut-être corrompu ou la page a été supprimée.
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 24px",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: "600",
            textTransform: "uppercase",
            borderRadius: "4px",
            textDecoration: "none",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          Retour à l'accueil
        </Link>
      </div>
    </Page>
  );
};

export default Page404;
