import { certificates as mockCertificates } from "@/app/(site)/mock/certificates";
import type { Certificate } from "@/app/(site)/types";

// Detecta a porta atual durante o runtime
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

export async function getCertificates(): Promise<Certificate[]> {
  // Retorna dados mock imediatamente para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCertificates), 400);
    });
  }
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/certificates`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch certificates from API");
    }

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      console.warn(
        "API returned no certificates, using mock data as fallback."
      );
      return mockCertificates;
    }

    return items.map((item: any) => ({
      title: item.title,
      issued: item.issueDate,
      logo: item.imageUrl ?? item.imagePath ?? "",
      alt: item.title,
      description: item.tags?.join(" • "),
      category: item.tags?.[0] ?? "Outros",
    }));
  } catch (error) {
    console.error(
      "Error fetching certificates from API, falling back to mock data:",
      error
    );
    return mockCertificates;
  }
}
