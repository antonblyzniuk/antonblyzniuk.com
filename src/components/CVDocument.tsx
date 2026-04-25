import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { CVData } from "../types";

const C = {
  dark: "#1e1e2e",
  surface: "#313244",
  primary: "#b4befe",
  muted: "#6c7086",
  light: "#cdd6f4",
  white: "#ffffff",
  accent: "#fab387",
} as const;

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    backgroundColor: C.white,
    color: C.dark,
  },
  header: {
    backgroundColor: C.dark,
    paddingHorizontal: 32,
    paddingVertical: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    color: C.white,
    marginBottom: 4,
  },
  profession: {
    fontSize: 11,
    color: C.primary,
  },
  contactItem: {
    fontSize: 8.5,
    color: C.light,
    marginBottom: 3,
    textAlign: "right",
  },
  body: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.primary,
    borderBottomWidth: 0.5,
    borderBottomColor: C.surface,
    paddingBottom: 3,
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  aboutText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: C.surface,
  },
  twoCol: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  colSpacer: {
    width: 24,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletMark: {
    fontSize: 8,
    color: C.primary,
    marginRight: 5,
    width: 8,
  },
  bulletText: {
    fontSize: 9,
    color: C.surface,
    flex: 1,
    lineHeight: 1.4,
  },
  timelineItem: {
    marginBottom: 10,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.dark,
    marginBottom: 1,
  },
  itemDates: {
    fontSize: 8,
    color: C.primary,
    marginBottom: 3,
  },
  itemDesc: {
    fontSize: 9,
    color: C.muted,
    lineHeight: 1.5,
  },
  projectLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  linkText: {
    fontSize: 8.5,
    color: C.primary,
    marginRight: 12,
  },
});

function fmtDate(d: string): string {
  const m = d?.match(/^(\d{4})-(\d{2})/);
  if (!m) return d || "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m[2]) - 1]} ${m[1]}`;
}

function dateRange(from: string, to: string): string {
  return `${fmtDate(from)} – ${to ? fmtDate(to) : "Present"}`;
}

export default function CVDocument({ data }: { data: CVData }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.name}>{data.frist_name} {data.last_name}</Text>
            <Text style={s.profession}>{data.profession}</Text>
          </View>
          <View>
            <Text style={s.contactItem}>{data.email}</Text>
            {data.links.slice(0, 5).map((link) => (
              <Link key={link.name} src={link.url} style={s.contactItem}>
                {link.name}
              </Link>
            ))}
          </View>
        </View>

        <View style={s.body}>
          {/* About */}
          {!!data.about && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>ABOUT</Text>
              <Text style={s.aboutText}>{data.about}</Text>
            </View>
          )}

          {/* Skills + Languages */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <View style={[s.section, s.twoCol]}>
              {data.skills.length > 0 && (
                <View style={s.col}>
                  <Text style={s.sectionTitle}>SKILLS</Text>
                  {data.skills.map((skill) => (
                    <View key={skill.name} style={s.bulletRow}>
                      <Text style={s.bulletMark}>▸</Text>
                      <Text style={s.bulletText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.skills.length > 0 && data.languages.length > 0 && (
                <View style={s.colSpacer} />
              )}
              {data.languages.length > 0 && (
                <View style={s.col}>
                  <Text style={s.sectionTitle}>LANGUAGES</Text>
                  {data.languages.map((lang) => (
                    <View key={lang.name} style={s.bulletRow}>
                      <Text style={s.bulletMark}>▸</Text>
                      <Text style={s.bulletText}>{lang.name} — {lang.level}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Experience */}
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

          {/* Education */}
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

          {/* Projects */}
          {data.projects.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>PROJECTS</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={s.timelineItem}>
                  <Text style={s.itemTitle}>{proj.name}</Text>
                  {!!proj.description && <Text style={s.itemDesc}>{proj.description}</Text>}
                  {proj.links.length > 0 && (
                    <View style={s.projectLinks}>
                      {proj.links.map((link) => (
                        <Link key={link.name} src={link.url} style={s.linkText}>
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
