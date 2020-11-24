export class BookListDTO {
  constructor(
    public readonly name: string,
    public readonly author: string,
    public readonly price: string,
    public readonly version: number,
  ) {}
}