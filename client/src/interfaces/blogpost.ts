export interface BlogPostInterface {
    id: string;
    posterId: string;
    title: string;
    text: string;
    likes: number;
    dislikes: number;
    date_createrd: Date;
  }