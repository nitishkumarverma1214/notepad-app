import { textarea, notes } from "./map.js";
import { updateUnderline, updateBold } from "./addNote.js";
// active will mark the active note. it is 0-indexed.
export let active = 0;
export const btnBgColor = "#888";
export const boldBtn = document.querySelector(".bold-div");

export const underlineBtn = document.querySelector(".underline-div");

const copyBtn = document.querySelector(".copy-div");

const saveBtn = document.querySelector(".save-div");
const selectedText = document.querySelector("textarea");

boldBtn.addEventListener("click", function (event) {
  console.log(selectedText);
  console.log("placeholder:" + selectedText.placeholder);

  if (selectedText.value.length) {
    if (window.getComputedStyle(selectedText).fontWeight === "700") {
      selectedText.style.fontWeight = 400;
      updateBold(active, false);
      boldBtn.style.backgroundColor = "";
    } else {
      selectedText.style.fontWeight = 700;
      updateBold(active, true);
      boldBtn.style.backgroundColor = btnBgColor;
    }
  } else {
    alert("Nothing to bold");
  }
});

underlineBtn.addEventListener("click", function (event) {
  // const selectedText = document.querySelector("textarea");
  console.log(getComputedStyle(selectedText).textDecoration.split(" ")[0]);
  if (selectedText.value.length !== 0) {
    console.log(selectedText.value.length);
    if (
      getComputedStyle(selectedText).textDecoration.split(" ")[0] === "none"
    ) {
      console.log(getComputedStyle(selectedText).textDecoration);
      console.log("not underline");
      selectedText.style.textDecoration = "underline";
      updateUnderline(active, true);
      underlineBtn.style.backgroundColor = btnBgColor;
    } else {
      console.log("underline");
      selectedText.style.textDecoration = "none";
      updateUnderline(active, false);
      underlineBtn.style.backgroundColor = "";
    }
  } else {
    alert("Nothing to underline");
  }
});

copyBtn.addEventListener("click", function (event) {
  const content = document.getElementById("editorId").value;

  if (content.length !== 0) {
    navigator.clipboard.writeText(content).then(
      () => {
        alert("Text Copied");
      },
      () => {
        alert("Text not copied");
      }
    );
  } else {
    alert("Nothing to copy");
  }
});

saveBtn.addEventListener("click", function (event) {
  // const selectedText = document.querySelector("textarea");
  /* need to track the current/active note. */
  console.log(active);
  console.log(notes[active]);
  console.log(selectedText.value);
  textarea[notes[active][0]] = selectedText.value;
  console.log(notes[active]);
  alert("your notes is saved.");
});

export function setActive(act) {
  active = act;
}

// reset the bold and underline when the content of text is empty

selectedText.addEventListener(
  "input",
  function (event) {
    if (
      (event.inputType === "deleteContentBackward" ||
        event.inputType === "deleteContentForward") &&
      selectedText.value.length === 0
    ) {
      selectedText.style.textDecoration = "none";
      selectedText.style.fontWeight = 400;
      console.log(selectedText);
      underlineBtn.style.backgroundColor = "";
      boldBtn.style.backgroundColor = "";
    }

    // console.log(event);
  },
  false
);
