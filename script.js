function loadEvents() {
  const events = JSON.parse(localStorage.getItem('eventsList')) || [];
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  const eventListElement = document.getElementById('eventList');
  // to clear the list before displaying updated events
  eventListElement.innerHTML = '';

  events.forEach((event, index) => {
    const targetDate = new Date(event.date);
    const daysLeftMessage = getDaysLeftMessage(targetDate);
    const eventItem = document.createElement('div');

    eventItem.innerHTML = `
            <div style="font-size: larger; background-color: whitesmoke">${
              event.name
            }<br>
            <span style="font-size: smaller;"><sub>${daysLeftMessage} ${targetDate.toDateString()}</sub></span><br>
            <button onclick="deleteEvent(${index})" style="margin-left: 10px; font-size: smaller;">Delete</button></div>
        `;

    eventListElement.appendChild(eventItem);
  });
}

function getDaysLeftMessage(targetDate) {
  const currentDate = new Date();
  const differenceInTime = targetDate - currentDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays < 0) {
    return '<big><b>The date has already passed!</b></big> ';
  } else if (differenceInDays === 0) {
    return "<big><b>It's today!</b></big> ";
  } else {
    return `<big><b>${differenceInDays} day(s)</b></big> left until`;
  }
}

function addEvent() {
  const eventNameInput = document.getElementById('eventName').value.trim();
  const eventDateInput = document.getElementById('eventDate').value;
  if (eventNameInput && eventDateInput) {
    const events = JSON.parse(localStorage.getItem('eventsList')) || [];
    events.push({ name: eventNameInput, date: eventDateInput });
    localStorage.setItem('eventsList', JSON.stringify(events));
    loadEvents();
  } else {
    alert('Please enter both an event name and a date.');
  }
}

function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem('eventsList')) || [];
  events.splice(index, 1);
  localStorage.setItem('eventsList', JSON.stringify(events));
  loadEvents();
}

window.onload = loadEvents;
