import { NavLink, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";

export default function App() {
  return (
    <AuthProvider>
      <header className="site-header">
        <NavLink to="/" className="brand">
          <img src="/assets/logo.png" alt="CMU Cybersecurity Club logo" />
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
          <NavLink to="/users">Users</NavLink>
          <a href="/#community">Community</a>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <NavLink className="btn btn-gold" to="/register">
          Join the club
        </NavLink>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="site-footer">
        <div>
          <strong>CMU Cybersecurity Club</strong>
          <div>Open to all Central Michigan University students.</div>
        </div>
        <div>Maroon &amp; gold. Hands-on. All experience levels welcome.</div>
      </footer>
    </AuthProvider>
  );
}
