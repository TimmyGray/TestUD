import { Component, ViewChild, OnInit,AfterViewInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  providers: [TodoService]
})
export class PaginatorComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  numberOfPages!: Array<any>;
  currentPage: number=0;

  constructor(private readonly todoserv: TodoService) {
    this.getPage();
  }


  private getPage() {
    this.numberOfPages = new Array(10);
    this.numberOfPages.forEach(p => {
      p=false;
    });
    this.numberOfPages[0] = true;
    //this.todoserv.getTodo().subscribe({
    //  next: (count => { this.numberOfPages = count; }),
    //  error: (() => {
    //    this.numberOfPages = new Array(5);
    //    console.log(this.numberOfPages.length);
    //  })
    //})

  }

  clickPage(i: number) {

    if (this.numberOfPages.length > i && i>=0) {
      this.numberOfPages[this.currentPage] = !this.numberOfPages[this.currentPage];
      this.numberOfPages[i] = !this.numberOfPages[i];
      this.currentPage = i;
      console.log(this.currentPage);

    }
  }

}
