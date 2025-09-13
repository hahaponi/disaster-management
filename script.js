// script.js - behavior extracted from the single-file version

// DOM Elements
const rescueBtn = document.getElementById('rescueBtn');
const essentialsBtn = document.getElementById('essentialsBtn');
const droneBtn = document.getElementById('droneBtn');
const lightsBtn = document.getElementById('lightsBtn');
const messageBox = document.getElementById('messageBox');
const messageTitle = document.getElementById('messageTitle');
const messageBody = document.getElementById('messageBody');
const closeMsgBtn = document.getElementById('closeMsgBtn');
const safePlacesContainer = document.getElementById('safePlacesContainer');
const safePlacesList = document.getElementById('safePlacesList');

// Show a custom message box instead of alert()
function showMessage(title, body) {
    messageTitle.textContent = title;
    messageBody.textContent = body;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('flex');
}

// Function to find and display nearby safe places
function findSafePlaces() {
    // Simulated safe places data (in a real app, this would come from an API)
    const simulatedSafePlaces = [
        { name: "Community Hall (Evacuation Shelter)", distance: "0.5 km" },
        { name: "Local School (Designated Shelter)", distance: "1.2 km" },
        { name: "Public Library", distance: "2.1 km" },
    ];

    safePlacesList.innerHTML = '';
    simulatedSafePlaces.forEach(place => {
        const item = document.createElement('div');
        item.className = "bg-slate-800 p-4 rounded-xl flex items-center justify-between";
        item.innerHTML = `
            <div class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home text-blue-400 flex-shrink-0">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span class="text-slate-200 font-medium">${place.name}</span>
            </div>
            <span class="text-sm text-slate-400">${place.distance}</span>
        `;
        safePlacesList.appendChild(item);
    });
    safePlacesContainer.style.display = 'block';
}

// Geolocation function
function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                callback({
                    success: true,
                    latitude: latitude.toFixed(4),
                    longitude: longitude.toFixed(4)
                });
            },
            error => {
                callback({
                    success: false,
                    message: 'Location access denied. Using simulated location.'
                });
            }
        );
    } else {
        callback({
            success: false,
            message: 'Geolocation not supported. Using simulated location.'
        });
    }
}

// Event Listeners
rescueBtn.addEventListener('click', () => {
    getUserLocation(location => {
        const msg = `Missed call successfully simulated to 112.`;
        showMessage('Call Simulated', msg);
    });
});

essentialsBtn.addEventListener('click', () => {
    const msg = `Missed call successfully simulated to 1070.`;
    showMessage('Call Simulated', msg);
});

droneBtn.addEventListener('click', () => {
    showMessage(
        'Drone Deployed',
        'A drone has been deployed to the affected area. It is now monitoring the situation and ready to share images and deliver supplies.'
    );
});

lightsBtn.addEventListener('click', () => {
    showMessage(
        'Energy Kit Activated',
        'A command has been sent to activate the emergency energy kit in the affected region. It will provide emergency power for communication and medical aid.'
    );
});

closeMsgBtn.addEventListener('click', () => {
    messageBox.classList.remove('flex');
    messageBox.classList.add('hidden');
});

// Immediately find and display safe places on page load
window.onload = findSafePlaces;
