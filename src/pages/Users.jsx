import { useEffect, useMemo, useState } from "react";
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

  const officers = useMemo(
    () => users.filter((person) => person.role !== "admin"),
    [users],
  );

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Directory</p>
        <h1>Officers</h1>
        <p className="lede">
          Advisor, president, vice president, treasurer, and social media roles.
        </p>
      </section>

      <section className="panel">
        {error ? <div className="error">{error}</div> : null}

        {officers.length ? (
          <div className="user-grid">
            {officers.map((person) => (
              <article className="card person-card" key={person.id}>
                <p className="role-chip">{person.roleLabel}</p>
                <h3>
                  {person.firstName} {person.lastName}
                </h3>
                <p>{person.email}</p>
              </article>
            ))}
          </div>
        ) : (
          !error && (
            <p className="empty-note">
              No officers have been added yet. An admin can add them from the
              admin page.
            </p>
          )
        )}

        <p className="panel-note">
          Need to manage accounts? <Link to="/admin">Sign in as admin</Link>
        </p>
      </section>
    </main>
  );
}
