let d = document;
let table = d.getElementById('tableData');
let form = d.getElementById('formAddPupuls');

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

