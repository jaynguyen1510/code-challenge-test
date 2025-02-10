import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span
          className="navbar-brand cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Currency Swap
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <span
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span
              className={`nav-link ${
                location.pathname === "/swap" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/swap")}
            >
              Swap
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
