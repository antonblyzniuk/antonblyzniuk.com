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

// A4 = 595 × 841pt. Horizontal padding = 36 each side → content width = 523pt.
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    backgroundColor: C.white,
    color: C.dark,
  },

  // ── Header — renders once on page 1 only ──────────────
  header: {
    backgroundColor: C.dark,
    paddingHorizontal: 36,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 6,
    marginRight: 22,
    objectFit: "cover",
  },
  headerRight: {
    flex: 1,
  },
  headerName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
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
  contactText: {
    fontSize: 8.5,
    color: C.light,
    marginRight: 14,
    marginBottom: 2,
  },
  contactLink: {
    fontSize: 8.5,
    color: C.light,
    marginRight: 14,
    marginBottom: 2,
    textDecoration: "none",
  },

  // ── Fixed footer — appears on every page ──────────────
  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: C.rule,
    paddingTop: 5,
  },
  footerName: {
    fontSize: 7.5,
    color: C.muted,
  },
  footerPage: {
    fontSize: 7.5,
    color: C.muted,
  },

  // ── Body ─────────────────────────────────────────────
  body: {
    paddingHorizontal: 36,
    paddingTop: 20,
    paddingBottom: 48, // extra room for footer
  },

  // ── Shared section title ──────────────────────────────
  // Always placed inside the first item's wrap={false} block
  // so it can never be orphaned at the bottom of a page.
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.primary,
    letterSpacing: 1.8,
    borderBottomWidth: 0.5,
    borderBottomColor: C.rule,
    paddingBottom: 4,
    marginBottom: 9,
  },

  // ── About ─────────────────────────────────────────────
  aboutBlock: {
    marginBottom: 14,
  },
  aboutText: {
    fontSize: 9,
    color: C.overlay,
    lineHeight: 1.6,
  },

  // ── Skills + Languages (two-column, kept together) ────
  twoCol: {
    flexDirection: "row",
    marginBottom: 14,
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
    paddingRight: 6,
  },
  skillDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: C.primary,
    marginRight: 6,
    flexShrink: 0,
  },
  skillText: {
    fontSize: 8.5,
    color: C.overlay,
  },
  colGap: {
    width: 28,
  },
  langsCol: {
    width: 148,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  langName: {
    fontSize: 8.5,
    color: C.overlay,
  },
  langLevel: {
    fontSize: 7.5,
    color: C.primary,
    fontFamily: "Helvetica-Oblique",
  },

  // ── Experience / Education (timeline) ─────────────────
  timelineSection: {
    marginBottom: 14,
  },
  timelineItem: {
    paddingLeft: 11,
    borderLeftWidth: 1.5,
    borderLeftColor: C.primary,
    marginBottom: 9,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: C.dark,
    marginBottom: 2,
  },
  itemDates: {
    fontSize: 7.5,
    color: C.mauve,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 3,
  },
  itemDesc: {
    fontSize: 8.5,
    color: C.muted,
    lineHeight: 1.5,
  },

  // ── Projects (2-column grid) ──────────────────────────
  // Projects are paired into rows of 2 so that with many
  // projects the section stays compact and multi-page safe.
  projectsSection: {
    marginBottom: 14,
  },
  projectRow: {
    flexDirection: "row",
    marginBottom: 9,
  },
  // Left card gets a right border + margin acting as column gap
  projectCardLeft: {
    flex: 1,
    paddingRight: 14,
    marginRight: 14,
    borderRightWidth: 0.5,
    borderRightColor: C.rule,
  },
  projectCard: {
    flex: 1,
  },
  projectTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  projectBullet: {
    fontSize: 8,
    color: C.primary,
    marginRight: 5,
    lineHeight: 1.2,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: C.dark,
    flex: 1,
  },
  projectDesc: {
    fontSize: 8.5,
    color: C.muted,
    lineHeight: 1.5,
    marginBottom: 3,
    paddingLeft: 13,
  },
  projectLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 13,
  },
  projectLink: {
    fontSize: 8,
    color: C.primary,
    marginRight: 10,
    textDecoration: "none",
  },
});

function fmtDate(d: string): string {
  const m = d?.match(/^(\d{4})-(\d{2})/);
  if (!m) return d || "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m[2]) - 1]} ${m[1]}`;
}

function dateRange(from: string, to: string): string {
  return `${fmtDate(from)} — ${to ? fmtDate(to) : "Present"}`;
}

export default function CVDocument({ data, photoSrc }: CVDocumentProps) {
  const contactLinks = data.links.filter((l) => !l.url.includes("mail.google.com"));

  // Group projects into rows of 2 for the two-column layout
  const projectRows: (typeof data.projects)[] = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    projectRows.push(data.projects.slice(i, i + 2));
  }

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Fixed footer on every page ── */}
        <View fixed style={s.footer}>
          <Text style={s.footerName}>
            {data.first_name} {data.last_name} — {data.profession}
          </Text>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>

        {/* ── Header — page 1 only, no fixed ── */}
        <View style={s.header}>
          {photoSrc && <Image src={photoSrc} style={s.photo} />}
          <View style={s.headerRight}>
            <Text style={s.headerName}>{data.first_name} {data.last_name}</Text>
            <Text style={s.headerProfession}>{data.profession}</Text>
            <View style={s.headerContacts}>
              <Text style={s.contactText}>{data.email}</Text>
              {contactLinks.map((l) => (
                <Link key={l.name} src={l.url} style={s.contactLink}>
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

          {/* ── Skills + Languages — compact, safe to keep as one block ── */}
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
            <View style={s.timelineSection}>
              {data.experience_units.map((exp, i) => (
                <View key={i} wrap={false}>
                  {i === 0 && <Text style={s.sectionTitle}>EXPERIENCE</Text>}
                  <View style={s.timelineItem}>
                    <Text style={s.itemTitle}>{exp.name}</Text>
                    <Text style={s.itemDates}>{dateRange(exp.from_date, exp.to_date)}</Text>
                    {!!exp.description && (
                      <Text style={s.itemDesc}>{exp.description}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ── Education ── */}
          {data.education_units.length > 0 && (
            <View style={s.timelineSection}>
              {data.education_units.map((edu, i) => (
                <View key={i} wrap={false}>
                  {i === 0 && <Text style={s.sectionTitle}>EDUCATION</Text>}
                  <View style={s.timelineItem}>
                    <Text style={s.itemTitle}>{edu.name}</Text>
                    <Text style={s.itemDates}>{dateRange(edu.from_date, edu.to_date)}</Text>
                    {!!edu.description && (
                      <Text style={s.itemDesc}>{edu.description}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ── Projects (2-column grid) ── */}
          {projectRows.length > 0 && (
            <View style={s.projectsSection}>
              {projectRows.map((pair, rowIdx) => (
                <View key={rowIdx} wrap={false}>
                  {rowIdx === 0 && <Text style={s.sectionTitle}>PROJECTS</Text>}
                  <View style={s.projectRow}>
                    {pair.map((proj, colIdx) => (
                      <View
                        key={proj.name}
                        style={colIdx === 0 && pair.length === 2
                          ? s.projectCardLeft
                          : s.projectCard}
                      >
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
                    ))}
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
