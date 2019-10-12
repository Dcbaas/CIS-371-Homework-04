// In db-remover.js

// Checkbox change listener
export default function(changeEvent) {
    // The ID of the checkbox is also the key of the record in Firebase
    const whichKey = changeEvent.target.id;
    if (changeEvent.target.checked) {
      alert(`${whichKey} is selected`);
    } else {
      alert(`${whichKey} is deselected`);
    }
  }
  