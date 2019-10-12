import { AppDB } from "./db-init.js";
import selectionHandler from "./db-remover.js";

const ROW_PREFIX= 'ROW';

const showIndivualRecord = function(snapshot) {
  const rowKey = ROW_PREFIX + snapshot.key;
  const expenseRecord = snapshot.val();

  const table = document.querySelector('#budgetTable tbody');
  const tableRow = document.createElement('tr');

  tableRow.setAttribute('id', rowKey);

  const tdAmount = document.createElement('td');
  tdAmount.appendChild(document.createTextNode(expenseRecord.amount));
  tableRow.appendChild(tdAmount);

  const tdDescription = document.createElement('td');
  tdDescription.appendChild(document.createTextNode(expenseRecord.description));
  tableRow.appendChild(tdDescription);

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
  // console.log(data);
  for(let key in data){
    // console.log(data[key]);
    total += Number(data[key].amount);
  }

  const tdAmount = document.createElement('td');
  tdAmount.appendChild(document.createTextNode(total));
  totalRow.appendChild(tdAmount);

  const tdDescription = document.createElement('td');
  tdDescription.appendChild(document.createTextNode('Total'));
  totalRow.appendChild(tdDescription);

  const tdFiller = document.createElement('td');
  totalRow.appendChild(tdFiller);

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
  // This would be the key of the deleted record in Firebase
  // alert(whichKey + " is disappearing....");
  const keyId = ROW_PREFIX + whichKey;
  const victimRow = document.getElementById(keyId);
  victimRow.parentNode.removeChild(victimRow);
};

// Attach two different listeners to the "budget" node
// value listener and child_added listener
AppDB.ref("budget").on("value", showSummary);
AppDB.ref("budget").on("child_added", showIndivualRecord);
AppDB.ref("budget").on("child_removed", whichOneIsGone);

