let timerInterval;
let secondsRemaining;
let selectedMinutes = 0; 
let selectedSeconds = 0; 

function navigateToSetTimer() {
  showView('set-timer');
}

// Ökar minuter
function increaseMinutes() {
  selectedMinutes += 1;
  updateMinuteDisplay();
}

// Minskar minuter (men aldrig under 0 minuter)
function decreaseMinutes() {
  if (selectedMinutes > 0) {
    selectedMinutes -= 1;
    updateMinuteDisplay();
  }
}

// Ökar sekunder
function increaseSeconds() {
  if (selectedSeconds < 59) {
    selectedSeconds += 1;
    updateSecondDisplay();
  }
}

// Minskar sekunder (men aldrig under 0 sekunder)
function decreaseSeconds() {
  if (selectedSeconds > 0) {
    selectedSeconds -= 1;
    updateSecondDisplay();
  }
}

// Uppdaterar visningen av minuter
function updateMinuteDisplay() {
  document.getElementById('minute-display').textContent = selectedMinutes;
}

// Uppdaterar visningen av sekunder
function updateSecondDisplay() {
  document.getElementById('second-display').textContent = selectedSeconds;
}

// Startar timern baserat på valt antal minuter och sekunder
function startTimer() {
  secondsRemaining = selectedMinutes * 60 + selectedSeconds;
  showDigital(); // Startar med digital timer som standard
  resetHands(); // Återställ visarna
  runTimer();
}

// Återställ visarnas position
function resetHands() {
  const minuteDegree = -90;
  const secondDegree = -90; 

  anime({
    targets: '#minute-hand',
    rotate: minuteDegree,
    duration: 0, // Ingen animation, direkt till position
  });

  anime({
    targets: '#second-hand',
    rotate: secondDegree,
    duration: 0, 
  });
}

// Timerfunktion som kör nedräkning
function runTimer() {
  timerInterval = setInterval(() => {
    secondsRemaining--;
    updateDisplays();
    if (secondsRemaining <= 0) {
      clearInterval(timerInterval);
      showAlarmView(); // Visa alarmvyn när tiden är slut
    }
  }, 1000);
}

// Uppdaterar både digital och analog display
function updateDisplays() {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // Digital visning
  document.getElementById('digital-display').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Analog visning med anime.js
  const minuteDegree = (minutes % 60) * 6 - 90; // 6 grader per minut, -90 för att justera till 12
  const secondDegree = (seconds % 60) * 6 - 90;
  
  anime({
    targets: '#minute-hand',
    rotate: minuteDegree,
    easing: 'easeInOutQuad',
    duration: 500,
  });
  
  anime({
    targets: '#second-hand',
    rotate: secondDegree,
    easing: 'easeInOutQuad',
    duration: 500,
  });
}

// Visa alarmvyn med pulserande bakgrund
function showAlarmView() {
    const alarmView = document.getElementById('alarm-view');
    const colorEffect = document.querySelector('.color-effect');

    showView('alarm-view'); // Visa alarmvyn

    // Aktivera färgeffekten
    colorEffect.classList.add('active');

    // Pulserande effekt
    anime({
        targets: colorEffect,
        backgroundColor: [
            { value: 'rgba(114, 0, 0, 0.1)', duration: 1000 }, 
            { value: 'rgba(114, 0, 0, 0.2)', duration: 1000 }, 
            { value: 'rgba(114, 0, 0, 0.1)', duration: 1000 }  
        ],
        easing: 'easeInOutSine',
        loop: true // Loopar animationen oändligt
    });
}


// Återställning av timern och visa set-timer vyn
function resetTimer() {
  clearInterval(timerInterval);
  selectedMinutes = 0; // Återställ standardvärde
  selectedSeconds = 0; 
  updateMinuteDisplay();
  updateSecondDisplay();

  // Ta bort anime-effekten
  const colorEffect = document.querySelector('.color-effect');
  anime.remove(colorEffect); // Stoppa animationen
  colorEffect.classList.remove('active'); // Ta bort klassen för färgeffekten

  showView('set-timer');
}

// Visar den analoga timern utan att återställa timern
function showAnalog() {
  showView('analog-timer');
}

// Visar den digitala timern utan att återställa timern
function showDigital() {
  showView('digital-timer');
}

// Växlar menyns synlighet
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

// Funktion för att visa vald vy
function showView(viewId) {
  document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
  document.getElementById(viewId).classList.remove('hidden');
}
