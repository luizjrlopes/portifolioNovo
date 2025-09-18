export type CertificateItem = {
  id: string;
  title: string;
  org: string;
  issueDate: string;
  verifyUrl?: string;
  imageUrl: string;
  tags?: string[];
};

export type CertificatesResponse = {
  version: number;
  updatedAt: string;
  items: CertificateItem[];
};

export type PaginatedResponse<TItem> = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: TItem[];
};

export type ArticleItem = {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  pdfPath?: string;
  pdfUrl?: string;
  tags?: string[];
  createdAt?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
  imagePath?: string;
  imageUrl?: string;
  tags?: string[];
};
