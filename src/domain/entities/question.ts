import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}


export class Question {
  public id: string;
  public title: string;
  public content: string;
  public slug: Slug;
  public authorId: string;

  constructor({authorId, content, title, slug}: QuestionProps, id?: string) {
    this.title = title;
    this.content = content;
    this.slug = slug;
    this.authorId = authorId;
    this.id = id ?? randomUUID()
  }
}