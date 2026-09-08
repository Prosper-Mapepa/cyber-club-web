import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="brand">
          <img src="/seal.svg" alt="CMU Cybersecurity Club seal" />
          <span className="brand-copy">
            <small>Central Michigan University</small>
            <strong>Cybersecurity Club</strong>
          </span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <a href="/#about">About</a>
          <a href="/#community">Community</a>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <NavLink className="btn btn-gold" to="/register">
          Join the club
        </NavLink>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <footer className="site-footer">
        <div>
          <strong>CMU Cybersecurity Club</strong>
          <div>Open to all Central Michigan University students.</div>
        </div>
        <div>Maroon &amp; gold. Hands-on. All experience levels welcome.</div>
      </footer>
    </>
  );
}
