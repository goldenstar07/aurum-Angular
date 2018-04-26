export class User{
  name?: string;
  uid?: string;
  status?: string;

  constructor(name?: string, uid?: string, status?: string) {
    this.name = name;
    this.uid = uid;
    this.status = status;
  }
}
