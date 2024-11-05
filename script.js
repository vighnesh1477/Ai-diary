// Display today's date
document.getElementById("date").textContent = new Date().toLocaleDateString();

// Login functionality placeholder
function loginWithGoogle() {
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("passwordPage").classList.add("active");
}

// Set and save a 4-digit password
function savePassword() {
    const password = document.getElementById("password").value;
    if (password.length === 4) {
        localStorage.setItem("diaryPassword", password);
        alert("Password set successfully!");
        document.getElementById("passwordPage").classList.remove("active");
        document.getElementById("diaryPage").classList.add("active");
    } else {
        alert("Please enter a 4-digit password.");
    }
}

// Save diary entry with time-stamping and consolidation for a single day
function saveDiaryEntry() {
    const entryContent = document.getElementById("diaryEntry").value;
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();  // Get only the date
    const time = currentDate.toLocaleTimeString();  // Get only the time

    if (entryContent) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries") || "{}");

        if (!entries[date]) {
            entries[date] = [];
        }

        entries[date].push({ time, content: entryContent });
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        
        alert("Diary entry saved!");
        document.getElementById("diaryEntry").value = "";  // Clear the textarea
    } else {
        alert("Please write something before saving.");
    }
}

// View previous diary entries, showing entries by day and time
function viewPreviousEntries() {
    document.getElementById("diaryPage").classList.remove("active");
    document.getElementById("previousEntriesPage").classList.add("active");

    const entriesContainer = document.getElementById("entriesContainer");
    entriesContainer.innerHTML = "";
    const entries = JSON.parse(localStorage.getItem("diaryEntries") || "{}");

    for (const date in entries) {
        const dayEntries = entries[date];

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("entry-date");
        dateDiv.textContent = `Entries for ${date}`;
        entriesContainer.appendChild(dateDiv);

        dayEntries.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("entry");

            const timeDiv = document.createElement("div");
            timeDiv.classList.add("entry-time");
            timeDiv.textContent = `Time: ${entry.time}`;

            const contentDiv = document.createElement("div");
            contentDiv.textContent = entry.content;

            entryDiv.appendChild(timeDiv);
            entryDiv.appendChild(contentDiv);
            entriesContainer.appendChild(entryDiv);
        });
    }
}

// Go back to Today's Diary
function backToDiary() {
    document.getElementById("previousEntriesPage").classList.remove("active");
    document.getElementById("diaryPage").classList.add("active");
}

// Voice Typing functionality
let recognition;
function startVoiceTyping() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice typing is not supported in this browser. Please use Google Chrome.");
        return;
    }
    
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById("diaryEntry").value += transcript;
        };

        recognition.onerror = function(event) {
            alert("Voice recognition error: " + event.error);
        };
    }

    recognition.start();
}
