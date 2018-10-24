import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  @Input() dialogToDoCon;
  @Input() dialogToDoPos;
  @Output() onCloseDialog = new EventEmitter();
  @Output() onUpdateToDo = new EventEmitter<{position: number, content: string}>();

  constructor() { }

  ngOnInit() {
  }

  closeModal(){
    this.onCloseDialog.emit();
  }

  editToDo(inputContent : HTMLInputElement){
    this.onUpdateToDo.emit({
      position : this.dialogToDoPos,
      content : this.dialogToDoCon
    })
  }

}
