import { AppDB } from "./db-init.js";

// alert("Inside DB reader");

const showIndivualRecord = function(snapshot) {
  const expenseRecord = snapshot.val();
  const table = document.querySelector('#budgetTable tbody');
  const tableRow = document.createElement('tr');

  const tdAmount = document.createElement('td');
  tdAmount.appendChild(document.createTextNode(expenseRecord.amount));
  tableRow.appendChild(tdAmount);

  const tdDescription = document.createElement('td');
  tdDescription.appendChild(document.createTextNode(expenseRecord.description));
  tableRow.appendChild(tdDescription);

  table.appendChild(tableRow);
};

const showSummary = function(snapshot) {
  const data = snapshot.val();
  const tableBody = document.querySelector('#budgetTable tbody');
  const totalRow = document.createElement('tr');
  totalRow.setAttribute('id', 'total');

  let total = 0;
  for(let key in data){
    total += Number(data[key].amount);
  }

  const tdAmount = document.createElement('td');
  tdAmount.appendChild(document.createTextNode(total));
  totalRow.appendChild(tdAmount);

  const tdDescription = document.createElement('td');
  tdDescription.appendChild(document.createTextNode('Total'));
  totalRow.appendChild(tdDescription);

  tableBody.appendChild(totalRow);
};

// Attach two different listeners to the "budget" node
// value listener and child_added listener
AppDB.ref("budget").on("value", showSummary);
AppDB.ref("budget").on("child_added", showIndivualRecord);

