import { AppDB } from "./db-init.js";

const myHandler = function(event) {
  const dateField = document.getElementById("doe");
  const descriptionField = document.getElementById("what");
  const amountField = document.getElementById("amt");
  const catagoryField = document.getElementById("catagory");

  const date = dateField.value;
  const description = descriptionField.value;
  const amount = Number(amountField.value);
  const catagory = catagoryField.value;

  if (
    date === "" ||
    date === null ||
    description === "" ||
    description === null ||
    amount === "" ||
    amount === null ||
    catagory === "" ||
    catagory === null
  ) {
    alert("No values for one of the fields. Nothing commited");
    return;
  }
  AppDB.ref("budget")
    .push()
    .set({
      date: date,
      description: description,
      amount: amount,
      catagory: catagory
    });
};

const theButton = document.getElementById("addBtn");
theButton.addEventListener("click", myHandler);
