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
  createdBy?: CreatedBy
}

export interface Content {
  markdown?: string;
  html?: string;
}

export interface Cover {
  url: string;
}

export interface CreatedBy {
    name: string
  }
  
