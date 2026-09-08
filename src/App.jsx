import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth";
import { DISCORD_URL, GROUPME_URL, INSTAGRAM_URL } from "./links";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const onRegister = pathname === "/register";
  const onFlyer = pathname === "/flyer";

  useEffect(() => {
    if (hash) {
      const node = document.getElementById(hash.slice(1));
      if (node) {
        node.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      {onFlyer ? null : (
        <header className="site-header">
          <NavLink to="/" className="brand" onClick={close}>
            <img src="/assets/logo.png" alt="" />
            <span className="brand-copy">
              <small>Central Michigan University</small>
              <strong>Cybersecurity Club</strong>
            </span>
          </NavLink>

          <button
            className="nav-toggle"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={open ? "nav-links open" : "nav-links"}>
            <NavLink to="/" end onClick={close}>
              Home
            </NavLink>
            <Link to="/#about" onClick={close}>
              About
            </Link>
            <NavLink to="/users" onClick={close}>
              Officers
            </NavLink>
            <Link to="/#community" onClick={close}>
              Community
            </Link>
            <NavLink to="/register" onClick={close}>
              Register
            </NavLink>
            <NavLink to="/admin" onClick={close} className="nav-quiet">
              Admin
            </NavLink>
            <NavLink to="/flyer" onClick={close} className="nav-quiet">
              Flyer
            </NavLink>
          </nav>

          {onRegister ? (
            <span className="header-spacer" />
          ) : (
            <NavLink className="btn btn-gold header-cta" to="/register" onClick={close}>
              Join the club
            </NavLink>
          )}
        </header>
      )}

      <Outlet />

      {onFlyer ? null : (
        <footer className="site-footer">
          <div>
            <strong>CMU Cybersecurity Club</strong>
            <p>Open to every CMU student. No experience required.</p>
          </div>
          <div className="footer-links">
            <Link to="/register">Register</Link>
            <Link to="/users">Officers</Link>
            <Link to="/flyer">Flyer</Link>
            <a href={GROUPME_URL} target="_blank" rel="noreferrer">
              GroupMe
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer">
              Discord
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </footer>
      )}
    </>
  );
}
