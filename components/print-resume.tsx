import { education, experience, profile, skillGroups } from "@/config/resume";
import { siteConfig } from "@/config/site";

/**
 * Compact resume that only appears when the page is printed (Cmd/Ctrl+P).
 * The interactive site is hidden in print; this is generated from the same
 * data in config/resume.ts, so it never goes out of date.
 */
export function PrintResume() {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return (
    <div aria-hidden className="print-only">
      <header className="pr-head">
        <div>
          <h1>{profile.name}</h1>
          <p className="pr-title">{profile.title}</p>
        </div>
        <p className="pr-contact">
          {profile.location}
          <br />
          {profile.email}
          <br />
          {profile.linkedin
            .replace(/^https?:\/\/(www\.)?/, "")
            .replace(/\/$/, "")}
          <br />
          {host}
        </p>
      </header>

      <p className="pr-summary">{profile.summary[0]}</p>

      <h2>Skills</h2>
      <dl className="pr-skills">
        {skillGroups.map((g) => (
          <div key={g.id}>
            <dt>{g.title}</dt>
            <dd>{g.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <h2>Experience</h2>
      {experience.map((r) => (
        <section key={r.id} className="pr-role">
          <div className="pr-role-head">
            <strong>
              {r.title}, {r.company}
            </strong>
            <span>
              {r.period}
              {r.location ? ` | ${r.location}` : ""}
            </span>
          </div>
          <ul>
            {r.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Education</h2>
      {education.map((e) => (
        <div key={e.school} className="pr-role-head">
          <strong>
            {e.credential}, {e.school}
          </strong>
          <span>{e.period}</span>
        </div>
      ))}
    </div>
  );
}
