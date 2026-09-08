import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(apiUrl("/api/users"))
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to load users.");
        }
        setUsers(data.users);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Leadership</p>
        <h1>Club users &amp; officers</h1>
        <p className="lede">
          Advisor, president, vice president, treasurer, social media, and admin
          accounts for the Cybersecurity Club.
        </p>
      </section>

      <section className="form-shell users-shell">
        {error ? <div className="error">{error}</div> : null}
        {users.length === 0 && !error ? (
          <p className="muted">No users have been added yet.</p>
        ) : (
          <div className="user-grid">
            {users.map((person) => (
              <article className="card" key={person.id}>
                <p className="role-chip">{person.roleLabel}</p>
                <h3>
                  {person.firstName} {person.lastName}
                </h3>
                <p className="muted">{person.email}</p>
              </article>
            ))}
          </div>
        )}
        <p className="admin-link">
          <Link to="/admin">Admin sign in</Link>
        </p>
      </section>
    </main>
  );
}
