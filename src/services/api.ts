import { CVData } from "../types";

export async function fetchCVData(): Promise<CVData> {
  const response = await fetch("/api/cv");
  if (!response.ok) {
    throw new Error(`Failed to fetch CV data: ${response.statusText}`);
  }

  return response.json();
}
