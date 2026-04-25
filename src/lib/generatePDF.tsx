import { pdf } from "@react-pdf/renderer";
import CVDocument from "../components/CVDocument";
import type { CVData } from "../types";

export async function generateCVPDF(data: CVData): Promise<void> {
  const blob = await pdf(<CVDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CV_${data.frist_name}_${data.last_name}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
