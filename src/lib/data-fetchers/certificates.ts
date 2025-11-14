import { certificates as mockCertificates } from "@/app/(site)/mock/certificates";
import type { Certificate } from "@/app/(site)/types";
import { fetchData } from "./index";

export async function getCertificates(): Promise<Certificate[]> {
  return fetchData({
    endpoint: "certificates",
    mockData: mockCertificates,
    devDelay: 400,
    transform: (item: any) => ({
      title: item.title,
      issued: item.issueDate,
      logo: item.imageUrl ?? item.imagePath ?? "",
      alt: item.title,
      description: item.tags?.join(" • "),
      category: item.tags?.[0] ?? "Outros",
    }),
  });
}
