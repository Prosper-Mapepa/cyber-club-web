import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api";
import { DISCORD_URL, GROUPME_URL, INSTAGRAM_URL } from "../links";

const activities = [
  {
    tag: "01",
    title: "Meetings",
    body: "Weekly sessions for demos, discussion, and practice with other students.",
  },
  {
    tag: "02",
    title: "CTF competitions",
    body: "Team up for Capture the Flag challenges and learn by solving problems.",
  },
  {
    tag: "03",
    title: "Guest speakers",
    body: "Hear from people working in cybersecurity.",
  },
  {
    tag: "04",
    title: "Outreach",
    body: "Share skills with campus and the wider community.",
  },
];

const steps = [
  {
    n: "1",
    title: "Register",
    body: "Tell us who you are. Takes about a minute.",
    to: "/register",
    label: "Open form",
  },
  {
    n: "2",
    title: "Join chat",
    body: "GroupMe for announcements. Discord for questions and CTFs.",
    to: "#community",
    label: "See links",
  },
  {
    n: "3",
    title: "Show up",
    body: "Come to a meeting. Beginners are expected, not the exception.",
    to: "#about",
    label: "What we do",
  },
];

const binaries = ["01001000", "SEC", "0xCMU", "CTF", "101101", "ROOT", "SSH", "0110"];

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
        <div className="cyber-field" aria-hidden="true">
          <svg className="cyber-net" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="net" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffc82e" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffc82e" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#net)" strokeWidth="1">
              <path className="net-line" d="M40 80 L180 140 L320 70 L480 160 L640 90 L760 150" />
              <path className="net-line delay" d="M60 320 L200 260 L360 340 L520 240 L700 310" />
              <path className="net-line" d="M180 140 L200 260 L360 340 L480 160" />
              <path className="net-line delay" d="M320 70 L360 340 L640 90" />
            </g>
            <g fill="#ffc82e">
              <circle className="net-node" cx="180" cy="140" r="3.5" />
              <circle className="net-node d2" cx="320" cy="70" r="3" />
              <circle className="net-node d3" cx="480" cy="160" r="4" />
              <circle className="net-node d2" cx="200" cy="260" r="3" />
              <circle className="net-node" cx="360" cy="340" r="3.5" />
              <circle className="net-node d3" cx="640" cy="90" r="3" />
              <circle className="net-node d2" cx="520" cy="240" r="3" />
            </g>
          </svg>
          <div className="scanline" />
          <div className="binary-rain">
            {binaries.map((token, index) => (
              <span key={token} style={{ animationDelay: `${index * 1.1}s`, left: `${8 + index * 12}%` }}>
                {token}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Central Michigan University</p>
          <h1>Learn cybersecurity by doing.</h1>
          <p className="terminal-line">
            <span className="prompt">guest@cmu:~$</span>{" "}
            <span className="typed">practice --linux --ctf --defense</span>
          </p>
          <p>
            Open to all CMU students. Register, join chat, then come to a
            meeting — no prior experience needed.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/register">
              Register now
            </Link>
            <a className="btn btn-outline" href="#join">
              How to join
            </a>
          </div>
        </div>

        <div className="seal-wrap">
          <div className="radar" aria-hidden="true" />
          <img src="/assets/logo.png" alt="Cybersecurity Club logo" />
        </div>
      </section>

      <section className="section" id="join">
        <div className="section-intro">
          <h2>Join in three steps</h2>
          <p className="muted">Start here if you are new. You can do this today.</p>
        </div>
        <div className="steps">
          {steps.map((step) =>
            step.to.startsWith("#") ? (
              <a className="step-card" href={step.to} key={step.n}>
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="step-link">{step.label}</span>
              </a>
            ) : (
              <Link className="step-card" to={step.to} key={step.n}>
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="step-link">{step.label}</span>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="section alt" id="about">
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
              <p className="card-tag">{item.tag}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="officers">
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

      <section className="section alt" id="community">
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
