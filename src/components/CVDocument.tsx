import { Document, Page, Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";
import type { CVData } from "../types";

const C = {
  dark:    "#1e1e2e",
  surface: "#313244",
  overlay: "#45475a",
  primary: "#b4befe",
  mauve:   "#cba6f7",
  muted:   "#6c7086",
  sub:     "#a6adc8",
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

  // ── Header ────────────────────────────────────────
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
    fontSize: 28,
    color: C.white,
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  headerProfession: {
    fontSize: 12,
    color: C.primary,
    marginBottom: 11,
    fontFamily: "Helvetica",
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

  // ── Body ──────────────────────────────────────────
  body: {
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 36,
  },
  section: {
    marginBottom: 18,
  },
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

  // ── About ─────────────────────────────────────────
  aboutText: {
    fontSize: 9.5,
    color: C.overlay,
    lineHeight: 1.65,
  },

  // ── Skills grid (2 columns) ───────────────────────
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

  // ── Two-column (skills + languages) ──────────────
  twoCol: {
    flexDirection: "row",
    marginBottom: 18,
  },
  col: {
    flex: 1,
  },
  colGap: {
    width: 32,
  },

  // ── Languages ─────────────────────────────────────
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

  // ── Timeline items (exp / edu) ────────────────────
  timelineItem: {
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: C.primary,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
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

  // ── Projects ──────────────────────────────────────
  projectItem: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 3,
  },
  projectBullet: {
    fontSize: 11,
    color: C.primary,
    marginRight: 6,
    lineHeight: 1,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: C.dark,
    flex: 1,
  },
  projectDesc: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 1.55,
    marginBottom: 4,
    paddingLeft: 17,
  },
  projectLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 17,
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

export default function CVDocument({ data }: { data: CVData }) {
  const mainPhoto = data.photos.find((p) => p.is_main)?.image ?? data.photos[0]?.image;
  const contactLinks = data.links.filter((l) => !l.url.includes("mail.google.com"));

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header with photo ── */}
        <View style={s.header}>
          {mainPhoto && <Image src={mainPhoto} style={s.photo} />}
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

          {/* ── About ── */}
          {!!data.about && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>ABOUT</Text>
              <Text style={s.aboutText}>{data.about}</Text>
            </View>
          )}

          {/* ── Skills + Languages side by side ── */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <View style={s.twoCol}>
              {data.skills.length > 0 && (
                <View style={s.col}>
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
                <View style={{ width: 160 }}>
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
            <View style={s.section}>
              <Text style={s.sectionTitle}>EXPERIENCE</Text>
              {data.experience_units.map((exp, i) => (
                <View key={i} style={s.timelineItem}>
                  <Text style={s.itemTitle}>{exp.name}</Text>
                  <Text style={s.itemDates}>{dateRange(exp.from_date, exp.to_date)}</Text>
                  {!!exp.description && <Text style={s.itemDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* ── Education ── */}
          {data.education_units.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>EDUCATION</Text>
              {data.education_units.map((edu, i) => (
                <View key={i} style={s.timelineItem}>
                  <Text style={s.itemTitle}>{edu.name}</Text>
                  <Text style={s.itemDates}>{dateRange(edu.from_date, edu.to_date)}</Text>
                  {!!edu.description && <Text style={s.itemDesc}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* ── Projects ── */}
          {data.projects.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>PROJECTS</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={s.projectItem}>
                  <View style={s.projectHeader}>
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
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
}
