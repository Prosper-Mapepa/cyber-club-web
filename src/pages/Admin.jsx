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
      setStatus({ type: "success", message: `${data.user.roleLabel} account added.` });
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
          <p className="lede">Manage club users and officer roles.</p>
        </section>
        <section className="form-shell">
          {status.message ? <div className="error">{status.message}</div> : null}
          <form onSubmit={handleLogin}>
            <div className="form-grid">
              <label className="full">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label className="full">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>
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
        <p className="eyebrow">Admin</p>
        <h1>Users</h1>
        <p className="lede">
          Signed in as {user.firstName} {user.lastName}. Add officers and other
          admins below.
        </p>
      </section>

      <section className="form-shell users-shell">
        {status.message ? (
          <div className={status.type === "success" ? "success" : "error"}>
            {status.message}
          </div>
        ) : null}

        <h2>All users</h2>
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
                  <td>{person.roleLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Add user</h2>
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
            <label>
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
            <label className="full">
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
            <button className="btn btn-outline dark" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
