import { AppDB } from "./db-init.js";
import selectionHandler from "./db-remover.js";

const ROW_PREFIX= 'ROW';

const showIndivualRecord = function(snapshot) {
  const rowKey = ROW_PREFIX + snapshot.key;
  const expenseRecord = snapshot.val();

  const table = document.querySelector('#budgetTable tbody');
  const tableRow = document.createElement('tr');

  tableRow.setAttribute('id', rowKey);

  // 1. DoP
  const tdDate = document.createElement('td');
  tdDate.appendChild(document.createTextNode(expenseRecord.date));
  tableRow.appendChild(tdDate);

  // 2. Description
  const tdDescription = document.createElement('td');
  tdDescription.appendChild(document.createTextNode(expenseRecord.description));
  tableRow.appendChild(tdDescription);

  // 3. Catagory
  const tdCatagory = document.createElement('td');
  tdCatagory.appendChild(document.createTextNode(expenseRecord.catagory));
  tableRow.appendChild(tdCatagory);

  // 4. Amount
  const tdAmount = document.createElement('td');
  tdAmount.appendChild(document.createTextNode(expenseRecord.amount));
  tableRow.appendChild(tdAmount);

  // 5. Select
  const tdCheckIt = document.createElement('td');
  const checkIt = document.createElement('input');
  checkIt.setAttribute('id', snapshot.key);
  checkIt.setAttribute('type', 'checkbox');
  checkIt.addEventListener('change', selectionHandler);
  tdCheckIt.appendChild(checkIt);
  tableRow.appendChild(tdCheckIt);

  table.appendChild(tableRow);
};

const showSummary = function(snapshot) {
  removeOldTotal();

  const data = snapshot.val();
  const tableBody = document.querySelector('#budgetTable tbody');
  const totalRow = document.createElement('tr');
  totalRow.setAttribute('id', 'total');

  let total = 0;
  for(let key in data){
    total += Number(data[key].amount);
  }

  const tdTotal = document.createElement('td');
  tdTotal.appendChild(document.createTextNode(`Total: ${total.toFixed(2)}`));
  totalRow.appendChild(tdTotal);

  tableBody.appendChild(totalRow);
};

const removeOldTotal = () => {
  const totalRow = document.getElementById('total');
  
  if(totalRow !== null){
    totalRow.parentNode.removeChild(totalRow);
  }
}

const whichOneIsGone = function(snapshot) {
  const whichKey = snapshot.key;
  const keyId = ROW_PREFIX + whichKey;
  const victimRow = document.getElementById(keyId);
  victimRow.parentNode.removeChild(victimRow);
};

AppDB.ref("budget").on("value", showSummary);
AppDB.ref("budget").on("child_added", showIndivualRecord);
AppDB.ref("budget").on("child_removed", whichOneIsGone);

