import { Document, Page, Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";
import type { CVData } from "../types";

interface CVDocumentProps {
  data: CVData;
  photoSrc: string | null;
}

const C = {
  dark:    "#1e1e2e",
  surface: "#313244",
  overlay: "#45475a",
  primary: "#b4befe",
  mauve:   "#cba6f7",
  muted:   "#6c7086",
  light:   "#cdd6f4",
  white:   "#ffffff",
  rule:    "#dce0e8",
} as const;

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    backgroundColor: C.white,
    color: C.dark,
  },

  // ── Header (page 1 only — no fixed) ─────────────────
  header: {
    backgroundColor: C.dark,
    paddingHorizontal: 36,
    paddingVertical: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 7,
    marginRight: 24,
    objectFit: "cover",
  },
  headerRight: {
    flex: 1,
  },
  headerName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 26,
    color: C.white,
    marginBottom: 3,
  },
  headerProfession: {
    fontSize: 11,
    color: C.primary,
    marginBottom: 10,
  },
  headerContacts: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerContactText: {
    fontSize: 8.5,
    color: C.light,
    marginRight: 16,
    marginBottom: 2,
  },
  headerContactLink: {
    fontSize: 8.5,
    color: C.light,
    marginRight: 16,
    marginBottom: 2,
    textDecoration: "none",
  },

  // ── Body ────────────────────────────────────────────
  body: {
    paddingHorizontal: 36,
    paddingTop: 22,
    paddingBottom: 36,
  },

  // ── Section title ────────────────────────────────────
  // Rendered inside the first item's wrap={false} block
  // so a lone heading can never be stranded at page bottom.
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.primary,
    letterSpacing: 1.8,
    borderBottomWidth: 0.5,
    borderBottomColor: C.rule,
    paddingBottom: 4,
    marginBottom: 10,
  },

  // ── About ────────────────────────────────────────────
  aboutBlock: {
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 9.5,
    color: C.overlay,
    lineHeight: 1.65,
  },

  // ── Skills + Languages (two-column, kept together) ───
  twoCol: {
    flexDirection: "row",
    marginBottom: 16,
  },
  skillsCol: {
    flex: 1,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillCell: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingRight: 8,
  },
  skillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.primary,
    marginRight: 7,
    flexShrink: 0,
  },
  skillText: {
    fontSize: 9,
    color: C.overlay,
  },
  colGap: {
    width: 32,
  },
  langsCol: {
    width: 155,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  langName: {
    fontSize: 9,
    color: C.overlay,
  },
  langLevel: {
    fontSize: 8,
    color: C.primary,
    fontFamily: "Helvetica-Oblique",
  },

  // ── Timeline items (exp / edu) ───────────────────────
  // Each item is wrapped with wrap={false} at the call site.
  // Section title is inside the first item's wrap={false} block.
  expSection: {
    marginBottom: 16,
  },
  timelineItem: {
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: C.primary,
    marginBottom: 10,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.dark,
    marginBottom: 2,
  },
  itemDates: {
    fontSize: 8,
    color: C.mauve,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 1.55,
  },

  // ── Projects ─────────────────────────────────────────
  projectsSection: {
    marginBottom: 16,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  projectBullet: {
    fontSize: 9,
    color: C.primary,
    marginRight: 7,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.dark,
    flex: 1,
  },
  projectDesc: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 1.55,
    marginBottom: 4,
    paddingLeft: 16,
  },
  projectLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 16,
  },
  projectLink: {
    fontSize: 8.5,
    color: C.primary,
    marginRight: 14,
    textDecoration: "none",
  },
});

function fmtDate(d: string): string {
  const m = d?.match(/^(\d{4})-(\d{2})/);
  if (!m) return d || "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m[2]) - 1]} ${m[1]}`;
}

function dateRange(from: string, to: string): string {
  return `${fmtDate(from)} — ${to ? fmtDate(to) : "Present"}`;
}

export default function CVDocument({ data, photoSrc }: CVDocumentProps) {
  const contactLinks = data.links.filter((l) => !l.url.includes("mail.google.com"));

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header — page 1 only, no fixed prop ── */}
        <View style={s.header}>
          {photoSrc && <Image src={photoSrc} style={s.photo} />}
          <View style={s.headerRight}>
            <Text style={s.headerName}>{data.frist_name} {data.last_name}</Text>
            <Text style={s.headerProfession}>{data.profession}</Text>
            <View style={s.headerContacts}>
              <Text style={s.headerContactText}>{data.email}</Text>
              {contactLinks.map((l) => (
                <Link key={l.name} src={l.url} style={s.headerContactLink}>
                  {l.name}
                </Link>
              ))}
            </View>
          </View>
        </View>

        <View style={s.body}>

          {/* ── About — no wrap={false}, text can be long ── */}
          {!!data.about && (
            <View style={s.aboutBlock}>
              <Text style={s.sectionTitle}>ABOUT</Text>
              <Text style={s.aboutText}>{data.about}</Text>
            </View>
          )}

          {/* ── Skills + Languages — compact, safe to keep together ── */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <View style={s.twoCol} wrap={false}>
              {data.skills.length > 0 && (
                <View style={s.skillsCol}>
                  <Text style={s.sectionTitle}>SKILLS</Text>
                  <View style={s.skillsGrid}>
                    {data.skills.map((skill) => (
                      <View key={skill.name} style={s.skillCell}>
                        <View style={s.skillDot} />
                        <Text style={s.skillText}>{skill.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {data.skills.length > 0 && data.languages.length > 0 && (
                <View style={s.colGap} />
              )}
              {data.languages.length > 0 && (
                <View style={s.langsCol}>
                  <Text style={s.sectionTitle}>LANGUAGES</Text>
                  {data.languages.map((lang) => (
                    <View key={lang.name} style={s.langRow}>
                      <Text style={s.langName}>{lang.name}</Text>
                      <Text style={s.langLevel}>{lang.level}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* ── Experience ── */}
          {data.experience_units.length > 0 && (
            <View style={s.expSection}>
              {data.experience_units.map((exp, i) => (
                // wrap={false}: title+first item together; subsequent items don't split
                <View key={i} wrap={false}>
                  {i === 0 && <Text style={s.sectionTitle}>EXPERIENCE</Text>}
                  <View style={s.timelineItem}>
                    <Text style={s.itemTitle}>{exp.name}</Text>
                    <Text style={s.itemDates}>{dateRange(exp.from_date, exp.to_date)}</Text>
                    {!!exp.description && <Text style={s.itemDesc}>{exp.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ── Education ── */}
          {data.education_units.length > 0 && (
            <View style={s.expSection}>
              {data.education_units.map((edu, i) => (
                <View key={i} wrap={false}>
                  {i === 0 && <Text style={s.sectionTitle}>EDUCATION</Text>}
                  <View style={s.timelineItem}>
                    <Text style={s.itemTitle}>{edu.name}</Text>
                    <Text style={s.itemDates}>{dateRange(edu.from_date, edu.to_date)}</Text>
                    {!!edu.description && <Text style={s.itemDesc}>{edu.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ── Projects ── */}
          {data.projects.length > 0 && (
            <View style={s.projectsSection}>
              {data.projects.map((proj, i) => (
                <View key={i} wrap={false}>
                  {i === 0 && <Text style={s.sectionTitle}>PROJECTS</Text>}
                  <View style={s.projectItem}>
                    <View style={s.projectTitleRow}>
                      <Text style={s.projectBullet}>◆</Text>
                      <Text style={s.projectTitle}>{proj.name}</Text>
                    </View>
                    {!!proj.description && (
                      <Text style={s.projectDesc}>{proj.description}</Text>
                    )}
                    {proj.links.length > 0 && (
                      <View style={s.projectLinks}>
                        {proj.links.map((link) => (
                          <Link key={link.name} src={link.url} style={s.projectLink}>
                            {link.name}
                          </Link>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
}
