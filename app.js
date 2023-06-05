const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const courseInput = document.getElementById('course');
const searchInput = document.getElementById('search');
const table = document.getElementById('table').getElementsByTagName('tbody')[0];
let data = JSON.parse(localStorage.getItem('data')) || [];

function addRow(item) {
    const row = table.insertRow();
    row.insertCell().innerHTML = item.name;
    row.insertCell().innerHTML = item.phone;
    row.insertCell().innerHTML = item.course;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Удалить';
    deleteButton.addEventListener('click', function() {
        deleteRow(item);
    });
    row.insertCell().appendChild(deleteButton);
}

function deleteRow(item) {
    const index = data.findIndex(i => i.name === item.name && i.phone === item.phone && i.course === item.course);
    if (index > -1) {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
        table.deleteRow(index);
    }
}

function filterTable(searchQuery) {
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerHTML.toLowerCase().includes(searchQuery.toLowerCase())) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

data.forEach(addRow);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = nameInput.value;
    const phone = phoneInput.value;
    const course = courseInput.value;
    const item = { name, phone, course };
    data.push(item);
    localStorage.setItem('data', JSON.stringify(data));
    addRow(item);
    form.reset();
});

searchInput.addEventListener('input', function() {
    filterTable(searchInput.value);
});
