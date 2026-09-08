import { DISCORD_URL, GROUPME_URL, INSTAGRAM_URL } from "../links";

const codes = [
  {
    label: "GroupMe",
    detail: "Announcements",
    href: GROUPME_URL,
    src: "/assets/qr-groupme.png",
  },
  {
    label: "Discord",
    detail: "Chat & CTFs",
    href: DISCORD_URL,
    src: "/assets/qr-discord.png",
  },
  {
    label: "Instagram",
    detail: "@cyber.cmu",
    href: INSTAGRAM_URL,
    src: "/assets/qr-instagram.png",
  },
];

export default function Flyer() {
  return (
    <div className="flyer-page">
      <div className="flyer-toolbar no-print">
        <p>
          Print in color on US Letter. Turn on “Background graphics” so the maroon
          prints.
        </p>
        <button className="btn btn-gold" type="button" onClick={() => window.print()}>
          Print flyer
        </button>
      </div>

      <article className="flyer">
        <img className="flyer-logo" src="/assets/logo.png" alt="CMU Cybersecurity Club" />
        <p className="flyer-kicker">Central Michigan University</p>
        <h1>Cybersecurity Club</h1>
        <p className="flyer-sub">Open to every student. No experience required.</p>
        <p className="flyer-pitch">
          Scan to join. Meetings, CTFs, guest speakers, Linux, and defensive
          security.
        </p>

        <div className="flyer-codes">
          {codes.map((code) => (
            <a className="flyer-code" key={code.label} href={code.href}>
              <img src={code.src} alt={`${code.label} QR code`} />
              <strong>{code.label}</strong>
              <span>{code.detail}</span>
            </a>
          ))}
        </div>

        <p className="flyer-foot">Hands-on. All majors welcome.</p>
      </article>
    </div>
  );
}
