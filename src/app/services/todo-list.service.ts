import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.baseUrl + '/get');
  }

  addTask(data: any) {
    return this.http.post(this.baseUrl + '/add', data);
  }

  updateTask(id: number, isCompleted: boolean) {
    return this.http.put(this.baseUrl + '/update/' + id, {
      isCompleted,
    });
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }
}
