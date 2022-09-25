import { textarea, notes } from "./map.js";
import {
  active,
  setActive,
  boldBtn,
  underlineBtn,
  btnBgColor
} from "./index.js";

const selectedText = document.querySelector("textarea");

const addNoteBtn = document.querySelector("#add-note");
let noteList = document.querySelector(".list");
let btnList = document.querySelectorAll(".select-note");
let count = 1;

const noteOneBtn = document.getElementById("0");
console.log(noteOneBtn);
// update note1 btn with color
noteOneBtn.style.backgroundColor = "orange";
// add listener to note1 btn
noteOneBtn.addEventListener("click", function (event) {
  let currId = noteOneBtn.id;
  // let currBtn = btn;
  showNote(noteOneBtn.id);
  highlightSelected(active, currId);
  setActive(currId);
});

function showNote(active) {
  // ['abc','cd']

  let actText = textarea[notes[active][0]];
  if (actText !== "" && notes[active][1] === true) {
    selectedText.style.fontWeight = 700;
    boldBtn.style.backgroundColor = btnBgColor;
  } else {
    selectedText.style.fontWeight = 400;
    boldBtn.style.backgroundColor = "";
  }
  if (actText !== "" && notes[active][2] === true) {
    selectedText.style.textDecoration = "underline";
    underlineBtn.style.backgroundColor = btnBgColor;
  } else {
    selectedText.style.textDecoration = "none";
    underlineBtn.style.backgroundColor = "";
  }
  //console.log(notes);
  //console.log(textarea);
  const textCont = document.getElementById("editorId");
  textCont.value = actText;
}
export function updateBold(active, val) {
  notes[active][1] = val;
}
export function updateUnderline(active, val) {
  notes[active][2] = val;
}

function highlightSelected(oldbtn, newbtn) {
  let btnList = document.getElementsByClassName("select-note");
  //console.log(btnList);
  //console.log("oldId:" + oldbtn);
  //console.log("newbtn:" + newbtn);

  btnList[oldbtn].style.backgroundColor = "";
  btnList[newbtn].style.backgroundColor = "orange";
}

addNoteBtn.addEventListener("click", function (event) {
  let div = document.createElement("div");
  let input = document.createElement("input");
  input.value = "note-" + count;
  input.className = "input-box";

  let btn = document.createElement("button");
  btn.innerHTML = '<img src="./resources/edit-icon.svg" alt="edit" />';
  btn.id = count;

  // Found the bug it should be className not class
  btn.className = "select-note";

  div.appendChild(input);
  div.appendChild(btn);
  noteList.appendChild(div);
  textarea.push("");
  notes[count] = [count, false, false]; //{0:[1,f,f],1:}
  updateBold(count, false);
  updateUnderline(count, false);

  let prevbtnId = active;

  // update the active to the count value.
  setActive(count);

  let newbtnId = active;
  //console.log(active);
  showNote(active);

  count++;
  console.log(noteList);
  btnList = document.getElementsByClassName("select-note");
  console.log(btnList);
  console.log("prevbtnId " + prevbtnId);
  console.log("newbtnId " + newbtnId);

  highlightSelected(prevbtnId, newbtnId);

  // We need to add the event listener every time when a new element is add to div.list

  btn.addEventListener("click", function (event) {
    let currId = btn.id;
    // let currBtn = btn;
    showNote(currId);
    console.log("old " + active);
    console.log("new " + currId);

    highlightSelected(active, currId);
    setActive(currId);
    //console.log(currId);
  });
});
