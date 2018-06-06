import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { StopTimingPage } from '../stop-timing/stop-timing';
import { BooksProvider } from '../../providers/books/books';
import { BookModel } from '../../models/book-model/book-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public booksService: BooksProvider,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidLoad(){
    this.booksService.load();
  }

  newBook(): void {
    let prompt = this.alertCtrl.create({
      title: 'New Book',
      message: 'Enter data for your new book',
      inputs: [
        { name: 'title', placeholder: 'Title' },
        { name: 'author', placeholder: 'Author'  },
        { name: 'pagesNumber', placeholder: 'Number of Pages' }
      ],
      buttons: [
        { text: 'Cancel'},
        { text: 'Add', 
          handler: (data) => {
            let book = new BookModel(
              data.title, 
              data.author, 
              data.pagesNumber,
              0,
              new Date(), 
              0, 
              false);
            this.booksService.addBook(book);
          }
        }
      ]
    });
    prompt.present();
  }

  editBook(book): void {
    let prompt = this.alertCtrl.create({
      title: 'Edit Book',
      message: 'Enter a new name for your new book',
      inputs: [
        { name: 'title', placeholder: 'Title' },
        { name: 'author', placeholder: 'Author'  },
        { name: 'pagesNumber', placeholder: 'Number of Pages' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: (data) => {
            this.booksService.editBook(book, data.title, data.author, data.pagesNumber);
          }
        }
      ]
    });
    prompt.present();
  }

  toggleTimer(book): void {
    if(!book.active){
      if(!this.booksService.bookActive){
        this.booksService.startTiming(book, false);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'You are already timing a book. You must stop it before timing a new book.',
          buttons: ['OK']
        });
        alert.present();
      }
    } else {
      let elapsedTime = this.booksService.stopTiming(book);
      let modal = this.modalCtrl.create(StopTimingPage, {
        elapsedTime: elapsedTime
      });
      modal.onDidDismiss((data) => {
        let modifiedSeconds: number = parseInt(data[0]);
        let pagesRead: number = parseInt(data[1]);
        if(modifiedSeconds > elapsedTime) {
          let difference = modifiedSeconds - elapsedTime;
          this.booksService.increaseSeconds(book, difference);
        } else {
          let difference = elapsedTime - modifiedSeconds;
          this.booksService.decreaseSeconds(book, difference);
        }
        this.booksService.addReadPages(book, pagesRead);
      });
      modal.present();
    }
  }

}
