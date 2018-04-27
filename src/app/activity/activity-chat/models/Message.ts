export class Message{
  mid?:string;
  text?: string;
  author?: string;
  date?: string;
  hotelId?: string;

  constructor(mid?: string, text?: string, author?: string, date?: string) {
    this.mid = mid;
    this.text = text;
    this.author = author;
    this.date = date;
    this.hotelId;
  }
}
