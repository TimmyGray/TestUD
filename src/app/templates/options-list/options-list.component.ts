import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { filter } from 'rxjs';
import { fromEvent, map, switchMap,exhaustMap, exhaust } from 'rxjs';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css'],
  providers: [TodoService]
})
export class OptionsListComponent implements OnInit, AfterViewInit {
  @ViewChild('optionsList', { static: false })
  optionsList!: ElementRef;

  @ViewChild('scrollBar', { static: false })
  scrollBar!: ElementRef;

  options!: Array<any>;

  trackHeight: number = 219.658;
  thumbHeight: number = 103.117;
  thumbY: number = 0;
  captureY!: number;
  isMouseDown: boolean = false;

  constructor(private readonly todoserv: TodoService) { }

  ngAfterViewInit(): void {
    fromEvent(this.scrollBar.nativeElement, 'mousedown').pipe(
      map((e) => {
        this.captureScroll(e);
      }),
      filter(() => this.isMouseDown),
      exhaustMap(() => fromEvent(this.scrollBar.nativeElement, 'mousemove').pipe(
        map((e) => {
          this.scrollOptions(e);

        })
      )),
      exhaustMap(() => fromEvent(this.scrollBar.nativeElement, 'mouseup').pipe(
        map(() => this.isMouseDown = false)
      ))
    ).subscribe();

  }
    ngOnInit(): void {
      this.getOptions();
    }

  captureScroll(e: any) {
    this.isMouseDown = true;
    this.captureY = e.clientY;
    let contentHeight = this.optionsList.nativeElement.scrollHeight;
    let contentVisibleHeight = this.optionsList.nativeElement.clientHeight;
    let scrollTop = this.optionsList.nativeElement.scrollTop;

    console.log(contentHeight);
    console.log(contentVisibleHeight);
    console.log(scrollTop);
    console.log(this.captureY);


  }
  scrollOptions(e:any) {

    let contentHeight = this.optionsList.nativeElement.scrollHeight;
    let contentVisibleHeight = this.optionsList.nativeElement.clientHeight;
    let scrollTop = this.optionsList.nativeElement.scrollTop + e.clientY - this.captureY;

    console.log(contentHeight);
    console.log(contentVisibleHeight);
    console.log(scrollTop);
    this.optionsList.nativeElement.scrollTop = scrollTop;
    let thumbHeight = (contentVisibleHeight / contentHeight) * contentVisibleHeight;
    this.thumbY = -(scrollTop / contentHeight) * (contentVisibleHeight - thumbHeight);

    console.log(thumbHeight);
    console.log(this.thumbY);
  }

  private getOptions() {

    this.options = new Array();
    for (let i = 0; i < 10; i++) {
      this.options.push({ text: "Options option", isActive: false });
    }
    //this.todoserv.getTodo2().subscribe({
    //  next: (OPT => { this.options = OPT; }),
    //  error: (() => {
    //    this.options = new Array(5);
        
    //  })
    //})
  }


  clickOpt(i:number) {

    this.options[i].isActive = !this.options[i].isActive;

  }

}
