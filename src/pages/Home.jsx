import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api";
import { DISCORD_URL, GROUPME_URL, INSTAGRAM_URL } from "../links";

const activities = [
  {
    title: "Meetings",
    body: "Weekly sessions for demos, discussion, and practice with other students.",
  },
  {
    title: "CTF competitions",
    body: "Team up for Capture the Flag challenges and learn by solving problems.",
  },
  {
    title: "Guest speakers",
    body: "Hear from people working in cybersecurity.",
  },
  {
    title: "Outreach",
    body: "Share skills with campus and the wider community.",
  },
];

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/users"))
      .then((response) => response.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => setUsers([]));
  }, []);

  const officers = users.filter((person) => person.role !== "admin");

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Central Michigan University</p>
          <h1>Learn cybersecurity by doing.</h1>
          <p>
            Open to all CMU students, at any experience level. We learn through
            hands-on practice and conversations with people in the field.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/register">
              Register
            </Link>
            <a className="btn btn-outline" href="#community">
              GroupMe &amp; Discord
            </a>
          </div>
        </div>
        <div className="seal-wrap">
          <img src="/assets/logo.png" alt="Cybersecurity Club logo" />
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-intro">
          <h2>What we do</h2>
          <p className="muted">
            The Cyber Security Club is a community for social, academic, and
            professional growth. Members take part in meetings, Capture the Flag
            (CTF) competitions, outreach, and guest speaker events, and practice
            skills used in the industry — Linux, ethical hacking, defensive
            security, and more.
          </p>
        </div>
        <div className="grid">
          {activities.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt" id="officers">
        <div className="section-intro">
          <h2>Officers</h2>
          <p className="muted">
            {officers.length
              ? "The students and advisors who run the club."
              : "Officer profiles will appear here as they are added."}
          </p>
        </div>
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
          <p className="empty-note">
            No officers listed yet.{" "}
            <Link to="/users">View the full directory</Link>
          </p>
        )}
      </section>

      <section className="section" id="community">
        <div className="section-intro">
          <h2>Stay in the loop</h2>
          <p className="muted">
            Announcements go to GroupMe. Discord is for questions and CTF
            practice. Follow us on Instagram at @cyber.cmu.
          </p>
        </div>
        <div className="community">
          <a href={GROUPME_URL} target="_blank" rel="noreferrer">
            <p className="eyebrow">Chat</p>
            <h3>GroupMe</h3>
            <p>Meeting reminders and club updates.</p>
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer">
            <p className="eyebrow">Practice</p>
            <h3>Discord</h3>
            <p>Ask questions and team up for CTFs.</p>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <p className="eyebrow">Photos</p>
            <h3>Instagram</h3>
            <p>Follow @cyber.cmu for club posts.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
