export interface ArticleResponse {
  status: string;
  copyright: string;
  response: Response;
}

export interface Response {
  docs: Doc[];
  meta: Meta;
}

interface Meta {
  hits: number;
  offset: number;
  time: number;
}

export interface Doc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  subsection_name?: string;
  print_section?: string;
  print_page?: string;
}

interface Byline {
  original: string;
  person: Person[];
  organization?: string;
}

interface Person {
  firstname: string;
  middlename?: any;
  lastname: string;
  qualifier?: any;
  title?: any;
  role: string;
  organization: string;
  rank: number;
}

interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

interface Headline {
  main: string;
  kicker?: string;
  content_kicker?: any;
  print_headline?: string;
  name?: any;
  seo?: any;
  sub?: any;
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption?: any;
  credit?: any;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}

interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}
