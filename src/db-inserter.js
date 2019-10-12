import { AppDB } from "./db-init.js";

const myHandler = function(event) {
  const descriptionField = document.getElementById('what');
  const amountField = document.getElementById("amt");
  const description = descriptionField.value;
  const amount = Number(amountField.value); // convert string to number
  if(description === '' || 
    description === null || 
    amount === '' || 
    amount === null){
    alert('No values for one of the fields. Nothing commited');
    return;
  }
  AppDB.ref('budget')
  .push()
  .set({ description: description, amount: amount });
};

const theButton = document.getElementById('addBtn');
theButton.addEventListener("click", myHandler);
