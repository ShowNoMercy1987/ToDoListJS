"use strict";

let form = document.getElementById("form");
let input = document.getElementById("input");
let submit = document.getElementById("button");

let toDoList = document.getElementById("toDoList");

let list = [];

if (localStorage.getItem("todo")) {
  list = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

function addTask() {
  let newTodo = {
    todo: input.value,
    checked: false,
    importtant: false,
  };

  if (input.value == "") {
    alert("Поле ввода не заполнено!");
    return;
  } else {
    list.push(newTodo);
    console.log(list);
  }
}

function displayMessages() {
  let displayMessage = "";

  if(list.length === 0) toDoList.innerHTML = '';

  list.forEach((item, index) => {
    displayMessage += `
      <li class='list-li'>
        <input type='checkbox' id='item_${index}' ${
      item.checked ? "checked" : ""
    }>
        <label class='${
          item.importtant ? "important" : ""
        }' for='item_${index}'>${item.todo}</label>
      </li>
    `;

    toDoList.innerHTML = displayMessage;
  });
}

toDoList.addEventListener("change", function (e) {
  //Получаем значение label
  let valueLabel = toDoList.querySelector(
    "[for=" + e.target.getAttribute("id") + "]"
  ).innerHTML;
  // console.log(valueLabel)

  list.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(list));
      console.log(item.checked);
    }
  });
});

toDoList.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  list.forEach(function (item, i) {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        list.splice(i, 1);
      } else {
        item.importtant = !item.importtant;
      }

      displayMessages();
      localStorage.setItem("todo", JSON.stringify(list));
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTask();

  displayMessages();

  localStorage.setItem("todo", JSON.stringify(list));

  form.reset();
});
