export class PostResponse {
  private text: string;
  private title: string;
  private time: Date;
  private username: string;
  constructor(text: string, title: string, time: Date, username: string) {
    this.text = text;
    this.title = title;
    this.time = time;
    this.username = username;
  }
}
