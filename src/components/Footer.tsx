import { CVData } from "../types";
import { Github, Linkedin, Mail, Globe, Instagram, Send } from "lucide-react";

interface FooterProps {
  data: CVData;
}

function getLinkIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("github")) return <Github className="w-4 h-4" />;
  if (n.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (n.includes("instagram")) return <Instagram className="w-4 h-4" />;
  if (n.includes("telegram")) return <Send className="w-4 h-4" />;
  if (n.includes("mail") || n.includes("email")) return <Mail className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t border-border mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-foreground">
              {data.first_name} {data.last_name}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{data.headline}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              {data.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            {data.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {getLinkIcon(link.name)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {data.first_name} {data.last_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
