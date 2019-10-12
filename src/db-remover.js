import { AppDB } from './db-init'
// In db-remover.js
let userSelections = [];
const delBtn = document.getElementById("deleteBtn");

// Checkbox change listener
export default function(changeEvent) {
  // The ID of the checkbox is also the key of the record in Firebase
  const whichKey = changeEvent.target.id;
  if (changeEvent.target.checked) {
    /* add the selected key to the array */
    userSelections.push(whichKey);
  } else {
    /* remove the deselected key from the array */
    userSelections = userSelections.filter(element => {
      return element !== whichKey;
    });
  }
}

delBtn.addEventListener("click", event => {
  userSelections.forEach(victimKey => {
    AppDB.ref("budget")
      .child(victimKey)
      .remove();
  });
});
