let d = document;
let table = d.getElementById('tableData');
let form = d.getElementById('formAddPupuls');

// добавление новой строки в таблицу
function addRow()
{
  const surnamePupil = d.getElementById('surnamePupil');
  const scoreMath = d.getElementById('scoreMath');
  const scoreRus = d.getElementById('scoreRus');
  const scoreRead = d.getElementById('scoreRead');

  if (!parseInt(surnamePupil.value) && parseInt(scoreMath.value) && parseInt(scoreRus.value) && parseInt(scoreRead.value)) {
    let row = table.getElementsByTagName('tbody')[0].insertRow(-1);
    row.insertCell(-1).appendChild(d.createTextNode(surnamePupil.value));
    row.insertCell(-1).appendChild(d.createTextNode(scoreMath.value));
    row.insertCell(-1).appendChild(d.createTextNode(scoreRus.value));
    row.insertCell(-1).appendChild(d.createTextNode(scoreRead.value));
    let dltBtn = d.createElement(type = "tr");
    dltBtn.innerHTML = '<input type="button" value="X" name="newdlt" onclick="deleteRow(this.parentNode)">';
    row.insertCell(-1).appendChild(dltBtn);
    surnamePupil.value = '';
    scoreMath.value = '';
    scoreRus.value = '';
    scoreRead.value = '';
  } 
  else {
    alert('Ошибка! Заполните все поля формы.');
  }
}

// событие при нажатии на кнопку "Добавить"
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addRow();
});

// событие при нажатии на заголовки таблицы
table.addEventListener('click', (e) => {
  const et = e.target;
  if (et.nodeName !== 'TH') return;
  const index = et.cellIndex;
  const type = et.getAttribute('dataType');
  sortTable(index, type, colIndex === index);
  colIndex = (colIndex === index) ? -1 : index;
})

// удаление строки таблицы
function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

//сортировка таблицы
let colIndex = -1;

const sortTable = function (index, type, isSorted){
  const tbody = table.querySelector('tbody');

  const compare = function (rowA, rowB){
    const rowDataA = rowA.cells[index].innerHTML;
    const rowDataB = rowB.cells[index].innerHTML;

    switch (type) {
      case 'integer':
        return rowDataA - rowDataB;
        break;
      case 'text':
        if (rowDataA < rowDataB) 
          return -1;
        else
          if (rowDataA > rowDataB) 
            return 1;
        return 0;
        break;
    }
  }

  let rows = [].slice.call(tbody.rows);
  rows.sort(compare);
  if (isSorted)
    rows.reverse();

  table.removeChild(tbody);
  for (let i = 0; i < rows.length; i++){
    tbody.appendChild(rows[i]);
  }

  table.appendChild(tbody);
}