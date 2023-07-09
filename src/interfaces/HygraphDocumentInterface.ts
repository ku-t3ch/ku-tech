export interface Document {
  id: string;
  name?: string;
  file: File[];
  createdAt?: string;
}

export interface File {
  mimeType?: string;
  fileName?: string;
  url?: string;
}
