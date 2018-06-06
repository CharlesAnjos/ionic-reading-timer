export class BookModel {
  constructor(public name: string,
    public author: string,
    public pagesNumber: number,
    public pagesRead: number,
    public lastChecked: Date,
    public totalSeconds: number,
    public active: boolean) {

  }

  setName(name: string): void {
    this.name = name;
  }

  setAuthor(author: string): void {
    this.author = author;
  }

  setPagesNumber(pagesNumber: number) {
    this.pagesNumber = pagesNumber;
  }

  addReadPages(pagesRead: number) {
    this.pagesRead += pagesRead;
  }

  setLastChecked(lastChecked: Date): void {
    this.lastChecked = lastChecked;
  }

  addToTotalSeconds(totalSeconds: number): void {
    this.totalSeconds += totalSeconds;
  }

  deductFromTotalSeconds(totalSeconds: number): void {
    this.totalSeconds -= totalSeconds;
  }

  setIsActive(active: boolean): void {
    this.active = active;
  }
}