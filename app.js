//varable
const container = document.querySelector("#container");
const listitem = document.querySelector("#list-item");

//EventListener
eventListener();
function eventListener() {
  document.querySelector("#addtext").addEventListener("click", addtext);
  document.querySelector("#list-item").addEventListener("click", removeItem);
  document.addEventListener("DOMContentLoaded", loadLocalstorage);
}

//function

//add note list
function addtext(e) {
  const inpute = document.querySelector("#inpute");
  setLocalstorage(inpute.value);
  if (inpute.value == "") {
    container.innerHTML = `<div class="alert alert-danger alert-dismissible fade show text-right" role="alert">
    <strong>نباید کادر خالی رها شود 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    return;
  }
  listitem.insertAdjacentHTML("beforeend", cratehtml(inpute.value));
  inpute.value = "";
}
//add to local storage
function setLocalstorage(note) {
  const notes = getLocalstorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}
// get to local storag
function getLocalstorage() {
  let notes;
  let getFromLs = localStorage.getItem("notes");
  if (getFromLs === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFromLs);
  }
  return notes;
}
//load in localStorage
function loadLocalstorage() {
  const notes = getLocalstorage();
  notes.forEach(function (note) {
    listitem.insertAdjacentHTML("beforeend", cratehtml(note));
  });
}
//remove item
function removeItem(e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.closest(".todo-item").remove();
    let note = document.querySelector("#note").value;
    removeNoteLocalStorage(note);
  }
}
// also Remove note from localStorage
function removeNoteLocalStorage(noteContent) {
  console.log(noteContent);
  // delete X from the contetn
  const noteDelete = noteContent.substring(0, noteContent.length - 1);

  // get notes from localstorage
  const notesFromLS = getLocalstorage();

  notesFromLS.forEach(function (note, index) {
    if (note === noteDelete) {
      notesFromLS.splice(index, 1);
    }
  });
}
//item add note
function cratehtml(inpute) {
  let item = `
    <div class="row px-3 align-items-center todo-item rounded">
    <div class="col-auto m-1 p-0 d-flex align-items-center">
        <h2 class="m-0 p-0">
            <i class="fa fa-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"
                data-placement="bottom" title="Mark as complete"></i>
            <i class="fa fa-check-square-o text-primary btn m-0 p-0" data-toggle="tooltip"
                data-placement="bottom" title="Mark as todo"></i>
        </h2>
    </div>
    <div class="col px-1 m-1 d-flex align-items-center">
            <input id="note" type="text"
                class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
                readonly value="${inpute}" title="Buy groceries for next week" />
            <input type="text"
                class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"
                value="Buy groceries for next week" />
        </div>
        <div class="col-auto m-1 p-0 px-3 d-none">
        </div>
        <div class="col-auto m-1 p-0 todo-actions">
            <div class="row d-flex align-items-center justify-content-end">
                <h5 class="m-0 p-0 px-2">
                    <i class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip"
                        data-placement="bottom" title="Edit todo"></i>
                </h5>
                <h5 class="m-0 p-0 px-2">
                    <i  class="remove fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip"
                        data-placement="bottom" title="Delete todo"></i>
                </h5>
            </div>
        </div>
    </div>`;
  return item;
}
