export interface NewsInterface<T> {
  [key: string]: T;
}
export interface Info {
  createdAt: string;
  id: string;
  publishedAt: string;
  title: string;
  content: Content;
  cover: Cover;
  tag: Tag[];
  createdBy?: CreatedBy;
}

export interface Content {
  markdown?: string;
  html?: string;
  text?: string;
}

export interface Cover {
  url: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CreatedBy {
  name: string;
}
