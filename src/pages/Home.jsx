import { Link } from "react-router-dom";

const activities = [
  {
    title: "Meetings",
    body: "Weekly gatherings for discussion, demos, and skill-building with other CMU students.",
  },
  {
    title: "CTF competitions",
    body: "Practice Capture the Flag challenges as a team and compete with peers.",
  },
  {
    title: "Guest speakers",
    body: "Hear directly from professionals working in cybersecurity.",
  },
  {
    title: "Outreach",
    body: "Share what we learn with campus and the broader community.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Central Michigan University</p>
          <h1>Learn cybersecurity by doing.</h1>
          <p>
            The Cybersecurity Club is open to all CMU students, regardless of
            experience level. Our goal is to expand our knowledge of
            cybersecurity through hands-on practice and direct interaction with
            professionals in the field.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/register">
              Student registration
            </Link>
            <a className="btn btn-outline" href="#community">
              Join GroupMe &amp; Discord
            </a>
          </div>
        </div>
        <div className="seal-wrap">
          <img src="/seal.svg" alt="Cybersecurity Club seal" />
        </div>
      </section>

      <section className="section" id="about">
        <h2>About the club</h2>
        <p className="muted">
          The Cyber Security Club is a community that encourages social,
          academic, and professional growth among students interested in
          cybersecurity. Members will engage in meetings, Capture the Flag (CTF)
          competitions, outreach, and guest speaker events. In addition, members
          will practice skills and techniques (e.g., Linux, Ethical Hacking,
          Defensive Security, etc.) relevant to the industry.
        </p>
        <div className="grid">
          {activities.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt" id="community">
        <h2>Stay in the loop</h2>
        <p className="muted">
          Please join our GroupMe for announcements. We also have a Discord for
          chat, questions, and practice sessions.
        </p>
        <div className="community">
          <a
            href="https://web.groupme.com/join_group/100711092/qcumGgXOMe"
            target="_blank"
            rel="noreferrer"
          >
            <h3>GroupMe</h3>
            <p>Announcements, meeting reminders, and club updates.</p>
          </a>
          <a href="https://discord.gg/d9bRP4jg6k" target="_blank" rel="noreferrer">
            <h3>Discord</h3>
            <p>Hang out, ask questions, and team up for CTFs.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
