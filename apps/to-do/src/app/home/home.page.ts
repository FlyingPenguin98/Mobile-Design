import { Component,NgZone,OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {TodoService} from '../todo.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos:string[];
  reorderIsDisabled = true;

  constructor (public alertController:AlertController,private _ngZone: NgZone,private todoService: TodoService){}

  ngOnInit(){
    this.todos = this.todoService.getTodos();
  }

  async presentAddNewPrompt(){
    console.log('It works so far!');
    const addTodoAlert = await this.alertController.create(
      {
        header: 'Add a Todo',
        message: 'Enter your todo',
        inputs:[
          {
            type:'text',
            name:'newTodoItem',
            placeholder:'New Item'
          }
        ],
        buttons:[
          {
            text:'Cancel',
            role:'cancel',
            handler:() =>{
              console.log('Confirm Cancel');
            }
          },{
            text:'OK',
            handler:(inputData)=>{
              let todo;
              if(inputData.newTodoItem){
                todo = inputData.newTodoItem.trim();
                if(todo !== ''){
                  this._ngZone.run(() =>{
                    this.todoService.addTodo(todo);
                  });
                } else {
                  console.log('The input string is empty.');
                }
                } else{
                  console.log('The input string is not set.');
                }
                return todo;
              }
            }
        ]
      });
      await addTodoAlert.present();
  }
  removeItem(todo){
    this.todoService.removeTodo(todo);
  }
  toggleReorder(){
    this.reorderIsDisabled = !this.reorderIsDisabled;
  }
  reorderItems(indexes){
    console.log('About to rearrange to-do items');
    console.log(indexes);
    const element = this.todos[indexes.detail.from];
    this.todos.splice(indexes.detail.from,1);
    this.todos.splice(indexes.detail.to,0,element);
    indexes.detail.complete();
  }
     


}
