import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from'../Book';
 
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    books: Book[] = [];
    status:string='';
 
 
  constructor(private bookService: BookService) { }
 
  ngOnInit(): void {
      this.books=this.bookService.getBooks();
      this.bookService.bookListEmitter.subscribe((updatedBooks:Book[])=>{
          this.books=updatedBooks;
      });
      this.bookService.statusEmitter.subscribe((message: string) =>{
          this.status = message;
      });
 
  // Fill the code
  }
 
    displayBooks(): void{
        this.books = this.bookService.getBooks();
     
    }
 
}