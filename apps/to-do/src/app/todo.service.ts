import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos = ['Submit Project 3', 'Study Angular docs', 'Review Ionic components'];
  private archivedTodos =[];

  constructor() { }
  public getTodos(){
    return this.todos;
  }
  public addTodo(todo:string){
    this.todos.push(todo);
  }
  public removeTodo(todo){
    let i;
    for(i=0;i<this.todos.length;i++){
      if(this.todos[i] ==todo){
        this.todos.splice(i,1);
        this.archivedTodos.push(todo);
      }
    }
    console.log("hello");
  }
  public getArchivedTodos(){
    return this.archivedTodos;
  }
}

