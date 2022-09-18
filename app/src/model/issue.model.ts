
export type AuthorInfo = {
  name: string;
  avatar: string;
}

export type Comment = {
  id: string;
  author: AuthorInfo;
  bodyHTML: string;
  createdAt: string;
}

export type Issue = {
  id: string;
  title: string;
  author: AuthorInfo;
  body: string;
  createdAt: string;
  closed: boolean;
  number: number;
};

export type IssueDetail = {
  id: string;
  title: string;
  author: AuthorInfo;
  bodyHTML: string;
  createdAt: string;
  closed: boolean;
  number: number;
  comments: Comment[];
};
