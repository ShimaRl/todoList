import { Component } from '@angular/core';
import { ToDo } from './to-do-list/to-do-list.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoCollection : AngularFirestoreCollection<any> = this.db.collection('/todos', ref => ref.orderBy('position'));//[new ToDo(4, 'test content 0', true),new ToDo(6, 'test content 1', false),new ToDo(1, 'test content 2', false)];
  todos = this.todoCollection.valueChanges();
  displayUpdateDialog = 'none';
  dialogToDoContent = '';
  dialogToDoPosition = -1;
  jj= 0;

  constructor(private db: AngularFirestore){
  }

  addToDoItem(event, inputContent : HTMLInputElement){
    if(event.key == 'Enter'){
      var content = inputContent.value;
      if(content != '' && content != null){
        this.todoCollection.ref.get().then(querySnapShot => {
          var next = querySnapShot.docs.sort(((x, y) => x.data().position - y.data().position))[querySnapShot.size - 1].data().position + 1;
            this.todoCollection.add({
              position: next,
              content: content,
              isDone: false
          })
          .catch((err) => {
              console.log(err);
          });
      });
          
      } 
      inputContent.value = '';
    }
  }

  removeToDoItem(position){
    this.todoCollection.ref.where("position", "==", Number(position)).limit(1)
    .get()
    .then(querySnapshot => {
        this.todoCollection.doc(querySnapshot.docs[0].id).delete();
    })
    .catch(function(error) {
       console.log("Error deleting document: ", error);
    });
  }

  updateToDoItem(inputData : {position: number, content: string}){
    if(inputData.content != '' && inputData.content != null){
      this.todoCollection.ref.where('position', '==', Number(inputData.position))
      .get()
      .then(querySnapShot => {
        this.todoCollection.doc(querySnapShot.docs[0].id).update({
          content: inputData.content
        });
      });
    }
    this.displayUpdateDialog = 'none';
  }

  setAsDoneToDoItem(position){
    this.todoCollection.ref.where('position', '==', Number(position))
      .get()
      .then(querySnapShot => {
        this.todoCollection.doc(querySnapShot.docs[0].id).update({
          isDone: true
        });
      });
  }

  openEditDialog(position){
    this.todoCollection.ref.where('position', '==', Number(position))
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.dialogToDoContent = doc.data().content;
          this.dialogToDoPosition = doc.data().position; 
        });
      });
    this.displayUpdateDialog = 'block';    
  }

  closeEditDialog(){
    this.displayUpdateDialog = 'none';
  }

  switchPositions(positions: {firstPos: string, secondPos: string}){
    this.todoCollection.ref.where('position', '==', Number(positions.firstPos))
    .get()
    .then(querySnapShot => {
      this.todoCollection.doc(querySnapShot.docs[0].id).update({
          position: Number(positions.secondPos)
      });
    });

  this.todoCollection.ref.where('position', '==', Number(positions.secondPos))
    .get()
    .then(querySnapShot => {    
      this.todoCollection.doc(querySnapShot.docs[0].id).update({
          position: Number(positions.firstPos)
      });
    });
  
  }

  

    // sortArray(){
  //   var sorted = todos.sort(((x, y) => x.position - y.position));
  //   var result = sorted;
  //   sorted.forEach((element, index) => {
  //     result[index].position = index;
  //   });
  //   this.sortedArray = result;
  // }

  // getSize(){
  //   this.todoCollection.ref.get().then(querySnapShot => {
  //     this.todoCollectionSize = querySnapShot.size;
  //   });
  //   return this.todoCollectionSize;
  // }
}
