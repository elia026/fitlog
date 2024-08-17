// Functie om profielgegevens op te slaan in localStorage
function saveProfile() {
    const profile = {
        username: document.getElementById('username').value,
        birthdate: document.getElementById('birthdate').value,
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        goalWeight: document.getElementById('goalWeight').value,
    };

    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profiel opgeslagen!');
}

// Functie om profielgegevens te laden bij het opstarten van de pagina
function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        document.getElementById('username').value = profile.username;
        document.getElementById('birthdate').value = profile.birthdate;
        document.getElementById('age').value = profile.age;
        document.getElementById('weight').value = profile.weight;
        document.getElementById('height').value = profile.height;
        document.getElementById('goalWeight').value = profile.goalWeight;
    }
}

// Functie om gewicht toe te voegen en op te slaan in localStorage
function addWeight() {
    const newWeight = parseFloat(document.getElementById('newWeight').value);
    const date = new Date().toISOString().slice(0, 10);

    let weightData = JSON.parse(localStorage.getItem('weightData')) || [];
    const existingEntry = weightData.find(entry => entry.date === date);

    if (existingEntry) {
        existingEntry.weight = newWeight;
    } else {
        weightData.push({ date, weight: newWeight });
    }

    localStorage.setItem('weightData', JSON.stringify(weightData));
    displayWeightLog();
    alert('Gewicht toegevoegd!');
}

// Functie om de datum om te zetten naar DD-MM-YYYY formaat
function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
}

// Functie om een gewicht te verwijderen uit het logboek
function deleteWeight(date) {
    let weightData = JSON.parse(localStorage.getItem('weightData')) || [];
    weightData = weightData.filter(entry => entry.date !== date);

    localStorage.setItem('weightData', JSON.stringify(weightData));
    displayWeightLog();
}

// Gewichtslogboek weergeven
function displayWeightLog() {
    const weightData = JSON.parse(localStorage.getItem('weightData')) || [];
    const weightLog = document.getElementById('weightLog');
    weightLog.innerHTML = '';

    weightData.forEach(entry => {
        const formattedDate = formatDate(entry.date);
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${formattedDate}:</strong> 
            <input type="number" value="${entry.weight}" onchange="updateWeight('${entry.date}', this.value)" /> kg
            <button onclick="deleteWeight('${entry.date}')">Verwijderen</button>
        `;
        weightLog.appendChild(div);
    });
}

// Functie om gewicht bij te werken voor een specifieke datum
function updateWeight(date, newWeight) {
    let weightData = JSON.parse(localStorage.getItem('weightData')) || [];
    const entryIndex = weightData.findIndex(entry => entry.date === date);

    if (entryIndex !== -1) {
        weightData[entryIndex].weight = parseFloat(newWeight);
        localStorage.setItem('weightData', JSON.stringify(weightData));
        alert('Gewicht bijgewerkt!');
    }
}

// Functie om Airborne WOD resultaten toe te voegen en op te slaan in localStorage
function addAirborneWod() {
    const airborneDate = document.getElementById('airborneDate').value;
    const roundsCompleted = parseFloat(document.getElementById('roundsCompleted').value);

    let airborneData = JSON.parse(localStorage.getItem('airborneData')) || [];
    airborneData.push({ airborneDate, roundsCompleted });

    localStorage.setItem('airborneData', JSON.stringify(airborneData));
    displayAirborneLog();
    alert('Airborne Benchmark WOD resultaat toegevoegd!');
}

// Airborne WOD logboek weergeven
function displayAirborneLog() {
    const airborneData = JSON.parse(localStorage.getItem('airborneData')) || [];
    const airborneLog = document.getElementById('airborneLog');
    airborneLog.innerHTML = '';

    airborneData.forEach(entry => {
        const formattedDate = formatDate(entry.airborneDate);
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${formattedDate}:</strong> 
            Voltooide Ronden: ${entry.roundsCompleted.toFixed(1)}
        `;
        airborneLog.appendChild(div);
    });
}

// Functie om Coopertest resultaten toe te voegen en op te slaan in localStorage
function addCooperTest() {
    const cooperDate = document.getElementById('cooperDate').value;
    const distance = parseInt(document.getElementById('distance').value, 10);

    let cooperData = JSON.parse(localStorage.getItem('cooperData')) || [];

    cooperData.push({ cooperDate, distance });

    localStorage.setItem('cooperData', JSON.stringify(cooperData));
    displayCooperLog();
    alert('Coopertest resultaat toegevoegd!');
}

// Coopertest logboek weergeven
function displayCooperLog() {
    const cooperData = JSON.parse(localStorage.getItem('cooperData')) || [];
    const cooperLog = document.getElementById('cooperLog');
    cooperLog.innerHTML = '';

    cooperData.forEach(entry => {
        const formattedDate = formatDate(entry.cooperDate);
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${formattedDate}:</strong> 
            Afstand: ${entry.distance} meters
        `;
        cooperLog.appendChild(div);
    });
}

// Bij het laden van de pagina
window.onload = function() {
    loadProfile();
    displayWeightLog();
    displayAirborneLog();
    displayCooperLog();
};



