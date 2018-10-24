import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from './to-do-list.model';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  @Input() todoArrayElement : {ToDo};
  @Output() onRemoveToDo = new EventEmitter<number>();
  @Output() onSetAsDoneToDo = new EventEmitter<number>();
  @Output() onOpenDialog = new EventEmitter<number>();
  @Output() onSwitchPositions = new EventEmitter<{firstPos: string,secondPos: string}>();


  constructor() { }

  ngOnInit() {
    
  }

  removeToDo(event){
    var id = event.target.parentElement.parentElement.parentElement.id;
    this.onRemoveToDo.emit(id);
  }

  setAsDoneToDo(event){
    var id = event.target.parentElement.parentElement.parentElement.id;
    this.onSetAsDoneToDo.emit(id);
  }

  openDialog(event){
    if(event.target.tagName == 'P'){
      var id = event.target.parentElement.id;
      this.onOpenDialog.emit(id);
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drag(event) {
    event.dataTransfer.setData("sourceParentId", event.target.id);
  }
    
  drop(event) {
    event.preventDefault();
    var sourceParentId = event.dataTransfer.getData("sourceParentId");
  
    var source : HTMLInputElement = <HTMLInputElement>document.getElementById(sourceParentId);    
    var target : HTMLInputElement = <HTMLInputElement>document.getElementById(event.target.id);

    var sP = source.parentElement;    
    var sC = source;    
    var tP = event.target.parentElement.parentElement;
    var tC = event.target.parentElement;

    this.onSwitchPositions.emit({firstPos : sC.id, secondPos : tC.id});

    sP.appendChild(tC);
    tP.appendChild(sC);
  }
 }
