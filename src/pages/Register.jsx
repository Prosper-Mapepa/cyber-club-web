import { useState } from "react";
import { apiUrl } from "../api";
import { DISCORD_URL, GROUPME_URL, INSTAGRAM_URL } from "../links";

const INTERESTS = [
  "CTF Competitions",
  "Linux",
  "Ethical Hacking",
  "Defensive Security",
  "Outreach",
  "Guest Speakers",
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  major: "",
  classYear: "Freshman",
  experienceLevel: "Beginner",
  interests: [],
  notes: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleInterest(interest) {
    setForm((current) => {
      const exists = current.interests.includes(interest);
      return {
        ...current,
        interests: exists
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(apiUrl("/api/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      setStatus({
        type: "success",
        message:
          "You're registered. Join GroupMe, Discord, and Instagram so you don't miss updates.",
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Join</p>
        <h1>Register</h1>
        <p className="lede">
          Open to all CMU students. Takes about a minute.
        </p>
      </section>

      <section className="panel panel-narrow">
        {status.message ? (
          <div className={status.type === "success" ? "success" : "error"}>
            {status.message}
            {status.type === "success" ? (
              <div className="hero-actions" style={{ marginTop: "0.9rem" }}>
                <a className="btn btn-gold" href={GROUPME_URL}>
                  Open GroupMe
                </a>
                <a className="btn btn-outline dark" href={DISCORD_URL}>
                  Open Discord
                </a>
                <a className="btn btn-outline dark" href={INSTAGRAM_URL}>
                  Open Instagram
                </a>
              </div>
            ) : null}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Your information</legend>
            <div className="form-grid">
              <label>
                First name
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={updateField}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={updateField}
                  autoComplete="family-name"
                  required
                />
              </label>
              <label className="full">
                CMU email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="chippewa@cmich.edu"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>At CMU</legend>
            <div className="form-grid">
              <label>
                Major
                <input
                  name="major"
                  value={form.major}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Class year
                <select
                  name="classYear"
                  value={form.classYear}
                  onChange={updateField}
                >
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>Graduate</option>
                </select>
              </label>
              <label className="full">
                Cybersecurity experience
                <select
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={updateField}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Interests</legend>
            <p className="hint">Optional. Pick anything you want to try.</p>
            <div className="checks">
              {INTERESTS.map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    checked={form.interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="full">
            Anything else?
            <textarea
              name="notes"
              rows="3"
              maxLength="500"
              value={form.notes}
              onChange={updateField}
              placeholder="Optional"
            />
          </label>

          <div className="form-actions">
            <button className="btn btn-gold" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit registration"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
