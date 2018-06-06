import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BookModel } from '../../models/book-model/book-model';
import { reorderArray } from 'ionic-angular';

@Injectable()

export class BooksProvider {

  books: any[] = [];
  bookActive = false;
  timerInterval: any;
  secondsElapsed: number = 0;

  constructor(public storage: Storage) {

  }

  load(): void {
    this.storage.get('books').then((books) => {
      if(books) {
        for(let book of books){
          let savedBook = new BookModel(
            book.name,
            book.author, 
            book.pagesNumber,
            book.pagesRead,
            new Date(book.lastChecked), 
            book.totalSeconds,
            book.active);
          this.books.push(savedBook);
          if(book.active){
            this.startTiming(savedBook, true);
          }
        }
      }
    });
    this.storage.get('time').then((time) => {
      this.secondsElapsed = time;
    });
  }

  save(): void {
    this.storage.set('books', this.books);
    this.storage.set('time', this.secondsElapsed);
  }

  reorder(indexes): void {
    this.books = reorderArray(this.books, indexes);
    this.save();
  }

  startTiming(book, restarting): void {
    this.bookActive = true;
    if(!restarting){
      book.setIsActive(true);
      book.setLastChecked(new Date());
    }
    this.timerInterval = setInterval(() => {
      let now = new Date();
      let timeDifference = now.getTime() - book.lastChecked.getTime();
      let seconds = timeDifference / 1000;
      this.secondsElapsed += seconds;
      book.addToTotalSeconds(seconds);
      book.setLastChecked(now);
      this.save();
    }, 1000);
  }

  stopTiming(book): number {
    let totalTimeElapsed = this.secondsElapsed;
    this.bookActive = false;
    book.setIsActive(false);
    clearInterval(this.timerInterval);
    this.timerInterval = false;
    this.secondsElapsed = 0;
    this.save();
    return totalTimeElapsed;
  }

  increaseSeconds(book, amount): void {
    book.addToTotalSeconds(amount);
    this.save();
  }

  decreaseSeconds(book, amount): void {
    book.deductFromTotalSeconds(amount);
    this.save();
  }

  addBook(book): void {
    this.books.push(book);
    this.save();
  }

  editBook(book, title, author, pagesNumber): void{
    book.setName(title);
    book.setAuthor(author);
    book.setPagesNumber(pagesNumber);
    this.save();
  }

  removeBook(book): void {
    let index = this.books.indexOf(book);
    if(index > -1){
      this.books.splice(index, 1);
      this.save();
    }
  }

  addReadPages(book, pagesRead: number): void {
    book.addReadPages(pagesRead);
    this.save();
  }
}
