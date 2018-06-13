export class BookModel {
  constructor(public name: string,
    public author: string,
    public pagesNumber: number,
    public lastPage: number,
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

  setLastPage(lastPage: number) {
    this.lastPage = lastPage;
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