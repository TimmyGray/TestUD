import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
//Условный сервис обращающийся к базе данных для получения количества страниц.Или нечто аналогичное для динамического изменения количества отображаемых pageitem
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url: string = 'https://localhost:3000/todo'
  constructor(private readonly client: HttpClient) { }

  getTodo(): Observable<any> {

    return this.client.get<any>(this.url);

  }

  getTodo2(): Observable<any> {

    return this.client.get<any>(this.url+'/opt');

  }
}
