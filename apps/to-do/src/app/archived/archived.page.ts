import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit {
  archivedItems = [];
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.archivedItems = this.todoService.getArchivedTodos();
  }

}
