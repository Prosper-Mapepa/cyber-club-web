import { useEffect, useState } from "react";
import { apiUrl } from "../api";
import { useAuth } from "../auth";

const ROLES = [
  { value: "advisor", label: "Advisor" },
  { value: "president", label: "President" },
  { value: "vice_president", label: "Vice President" },
  { value: "treasurer", label: "Treasurer" },
  { value: "social_media", label: "Social Media" },
  { value: "admin", label: "Admin" },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "advisor",
};

export default function Admin() {
  const { login, logout, token, user, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function loadUsers() {
    const response = await fetch(apiUrl("/api/users"));
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to load users.");
    }
    setUsers(data.users);
  }

  useEffect(() => {
    if (isAdmin) {
      loadUsers().catch((err) =>
        setStatus({ type: "error", message: err.message }),
      );
    }
  }, [isAdmin]);

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "", message: "" });
    try {
      await login(email, password);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(apiUrl("/api/users"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to add user.");
      }
      setForm(emptyForm);
      await loadUsers();
      setStatus({ type: "success", message: `${data.user.roleLabel} added.` });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setBusy(false);
    }
  }

  if (!isAdmin) {
    return (
      <main>
        <section className="page-hero">
          <p className="eyebrow">Admin</p>
          <h1>Sign in</h1>
          <p className="lede">For officers who manage the directory.</p>
        </section>
        <section className="panel panel-login">
          {status.message ? <div className="error">{status.message}</div> : null}
          <form onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            <div className="form-actions">
              <button className="btn btn-gold" type="submit" disabled={busy}>
                {busy ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-row">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Directory</h1>
            <p className="lede">
              Signed in as {user.firstName} {user.lastName}.
            </p>
          </div>
          <button className="btn btn-outline" type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </section>

      <section className="admin-layout">
        {status.message ? (
          <div className={status.type === "success" ? "success" : "error"}>
            {status.message}
          </div>
        ) : null}

        <div className="panel">
          <h2>People</h2>
          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((person) => (
                  <tr key={person.id}>
                    <td>
                      {person.firstName} {person.lastName}
                    </td>
                    <td>{person.email}</td>
                    <td>
                      <span className="role-chip">{person.roleLabel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h2>Add someone</h2>
          <p className="hint">
            Choose a role, then share the password with that person privately.
          </p>
          <form onSubmit={handleCreate}>
            <div className="form-grid">
              <label>
                First name
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={updateField}
                  required
                />
              </label>
              <label className="full">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  minLength="8"
                  required
                />
              </label>
              <label>
                Role
                <select name="role" value={form.role} onChange={updateField}>
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-actions">
              <button className="btn btn-gold" type="submit" disabled={busy}>
                {busy ? "Saving..." : "Add user"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
