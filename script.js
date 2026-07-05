// script.js

// --- 1. Real-Time Clock ---
function updateTime() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// --- 2. Interactive Calendar ---
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set Month and Year in header
    document.getElementById('monthYear').textContent = new Date(year, month).toLocaleDateString('default', { month: 'long', year: 'numeric' });

    // Find first day of the month and total days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const daysContainer = document.getElementById('calDays');
    daysContainer.innerHTML = '';

    // Create empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty';
        daysContainer.appendChild(emptyDiv);
    }

    // Create the day cells
    const today = new Date();
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        
        // Highlight today's date
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.className = 'today';
        }
        daysContainer.appendChild(dayDiv);
    }
}

// Calendar Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar(); // Render on load

// --- 3. To-Do List & Popup Logic ---
function addTask() {
    const input = document.getElementById('taskInput');
    const taskString = input.value.trim();
    
    // Check if empty, trigger popup if true
    if (taskString === "") {
        document.getElementById('emptyTaskPopup').style.display = 'flex';
        return; 
    }

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = taskString;
    span.className = 'task-text';
    span.onclick = () => li.classList.toggle('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(delBtn);
    document.getElementById('taskList').appendChild(li);
    
    input.value = '';
}

// Close the popup
document.getElementById('closePopupBtn').addEventListener('click', () => {
    document.getElementById('emptyTaskPopup').style.display = 'none';
});

// Attach event listeners for adding tasks
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});