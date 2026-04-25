import { pdf } from "@react-pdf/renderer";
import CVDocument from "../components/CVDocument";
import type { CVData } from "../types";

async function toBase64(url: string): Promise<string | null> {
  try {
    // Cloudinary serves over both HTTP and HTTPS; force HTTPS to avoid mixed-content blocks
    const safeUrl = url.replace(/^http:\/\//, "https://");
    const res = await fetch(safeUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateCVPDF(data: CVData): Promise<void> {
  const rawPhotoUrl =
    data.photos.find((p) => p.is_main)?.image ?? data.photos[0]?.image ?? null;

  const photoSrc = rawPhotoUrl ? await toBase64(rawPhotoUrl) : null;

  const blob = await pdf(<CVDocument data={data} photoSrc={photoSrc} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CV_${data.frist_name}_${data.last_name}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
