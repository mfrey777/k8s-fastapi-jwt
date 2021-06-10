export class User {
  public email: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;
  public tenant: string;

  constructor(
    email = '',
    id = '',
    token = '',
    tokenExpirationDate = new Date(),
    tenant = ''
  ) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
    this.tenant = tenant;
  }

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
