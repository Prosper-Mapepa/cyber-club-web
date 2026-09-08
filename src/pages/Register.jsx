import { useState } from "react";
import { apiUrl } from "../api";

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
          "You're registered. Join GroupMe and Discord so you don't miss meetings.",
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
        <p className="eyebrow">Student portal</p>
        <h1>Register with the club</h1>
        <p className="lede">
          Open to all CMU students. No prior cybersecurity experience required.
        </p>
      </section>

      <section className="form-shell">
        {status.message ? (
          <div className={status.type === "success" ? "success" : "error"}>
            {status.message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
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
              CMU email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="chippewa@cmich.edu"
                required
              />
            </label>
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
            <label>
              Experience
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
            <div className="full">
              <p>Interests</p>
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
            </div>
            <label className="full">
              Anything we should know?
              <textarea
                name="notes"
                rows="4"
                maxLength="500"
                value={form.notes}
                onChange={updateField}
              />
            </label>
          </div>
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
