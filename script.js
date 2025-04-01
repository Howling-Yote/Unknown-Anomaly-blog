// Firebase configuration - REPLACE WITH YOUR OWN CONFIG VALUES
const firebaseConfig = {
  apiKey: "AIzaSyDvWytGWtgWvCiXIlIC4KiffGyb3PMFVKM",
  authDomain: "unknown-anomaly.firebaseapp.com",
  projectId: "unknown-anomaly",
  storageBucket: "unknown-anomaly.appspot.com",
  messagingSenderId: "148200392157",
  appId: "1:148200392157:web:7b8bd885e562f5560aa234"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function updateVisitorCount() {
    try {
        const response = await fetch('/api/visitor-count');
        if (!response.ok) {
            throw new Error('Failed to fetch visitor count');
        }

        const data = await response.json();
        const count = data.totalCount || 0;
        const formattedCount = count.toString().padStart(6, '0');

        const counterElement = document.getElementById('visitorCount');
        if (counterElement) {
            counterElement.textContent = formattedCount;
        }
    } catch (error) {
        console.error('Error updating visitor count:', error);
        document.getElementById('visitorCount').textContent = '000000';
    }
}

// Update counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCount();

    // Update counter every 30 seconds
    setInterval(updateVisitorCount, 30000);
    
    // Removed ■ and using only star-like shapes
    const pixelShapes = [
        '★',
        '✦',
        '⋆',
        '*'
    ];

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.2) {
            createPixelSparkle(e.clientX, e.clientY);
        }
    });

    function createPixelSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;

        sparkle.textContent = pixelShapes[Math.floor(Math.random() * pixelShapes.length)];

        document.body.appendChild(sparkle);

        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }
    
    // Music player functionality - fixed to work properly
    const audio = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('toggleMusic');

    // Try to play music automatically
    const playPromise = audio.play();

    // Modern browsers require user interaction before playing audio
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Auto-play was prevented
            console.log("Auto-play was prevented. Please click the play button.");
            toggleButton.textContent = "▶ PLAY";
        });
    }

    // Toggle music play/pause
    toggleButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent document click handler from firing
        
        if (audio.paused) {
            audio.play();
            toggleButton.textContent = "▐▐ PAUSE";
        } else {
            audio.pause();
            toggleButton.textContent = "▶ PLAY";
        }
    });

    // Old-school alert to notify user about music
    setTimeout(function () {
        if (audio.paused) {
            alert("⚠️ Click PLAY! ⚠️");
        }
    }, 3000);
    
    // Modified to only auto-play on first click, not every click
    let firstClick = true;
    document.addEventListener('click', function () {
        if (audio.paused && firstClick) {
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            firstClick = false;
            toggleButton.textContent = "▐▐ PAUSE";
        }
    });
});

// Add this to update counter when user returns to the page
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateVisitorCount();
    }
});

async function submitGuestbook(event) {
    event.preventDefault();
    
    const form = event.target;
    const formContainer = document.querySelector('.guestbook-form');
    
    // Show submission in progress message
    formContainer.innerHTML = '<div style="color: #00ff00; text-align: center;">Sending your entry... Please wait!</div>';
    
    try {
        // Get form data
        const name = document.getElementById('guestName').value;
        const email = document.getElementById('guestEmail').value;
        const homepage = document.getElementById('guestHomepage').value;
        const message = document.getElementById('guestMessage').value;
        
        // Create timestamp (forced to 1999 for Y2K aesthetic)
        const now = new Date();
        const y2kDate = new Date(1999, now.getMonth(), now.getDate());
        
        // Add to Firebase
        await db.collection('guestbook').add({
            name: name,
            email: email,
            homepage: homepage,
            message: message,
            timestamp: firebase.firestore.Timestamp.fromDate(y2kDate),
            approved: false, // Entries start as unapproved
            created: firebase.firestore.FieldValue.serverTimestamp() // Actual timestamp for sorting
        });
        
        // Success message
        formContainer.innerHTML = `
            <div style="color: #00ff00; text-align: center; border: 2px dashed #ff00ff; padding: 10px;">
                <h3>✧･ﾟ: *✧･ﾟ:* THANKS! *:･ﾟ✧*:･ﾟ✧</h3>
                <p>Your guestbook entry has been submitted!</p>
                <p>It will appear after moderation.</p>
                <button onclick="resetGuestbookForm()" style="background: #ff00ff; color: white; border: 2px solid #00ff00; margin-top: 10px; cursor: pointer;">
                    Submit Another Entry
                </button>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        formContainer.innerHTML = `
            <div style="color: #ff0000; text-align: center; border: 2px dashed #ff00ff; padding: 10px;">
                <h3>Uh oh! Something went wrong!</h3>
                <p>Please try again later.</p>
                <button onclick="resetGuestbookForm()" style="background: #ff00ff; color: white; border: 2px solid #00ff00; margin-top: 10px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}

function resetGuestbookForm() {
    document.querySelector('.guestbook-form').innerHTML = `
        <form id="guestbookForm" onsubmit="submitGuestbook(event)">
            <input type="text" name="name" id="guestName" placeholder="Your Name" required>
            <input type="email" name="email" id="guestEmail" placeholder="Your Email" required>
            <input type="url" name="homepage" id="guestHomepage" placeholder="Your Homepage URL">
            <textarea name="message" id="guestMessage" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Sign Guestbook!</button>
            <div class="retro-note" style="margin-top: 10px; border: 1px dashed #00ff00; padding: 5px; color: #ffff00;">
                <marquee scrollamount="3" direction="left" behavior="alternate">
                    ✧･ﾟ: Entries will appear after approval :･ﾟ✧
                </marquee>
            </div>
        </form>
    `;
}

async function loadGuestbookEntries() {
    try {
        const entriesContainer = document.getElementById('guestbookEntries');
        entriesContainer.innerHTML = '<p style="color: #ffff00;">Loading entries...</p>';
        
        // Query Firebase for approved entries only, ordered by created timestamp (descending)
        const snapshot = await db.collection('guestbook')
            .where('approved', '==', true)
            .orderBy('created', 'desc')
            .limit(10) // Limit to most recent 10 entries
            .get();
        
        if (snapshot.empty) {
            entriesContainer.innerHTML = 
                '<p style="color: #ffff00;">No entries yet! Be the first to sign the guestbook!</p>';
            return;
        }
        
        // Process entries
        const entries = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            entries.push({
                id: doc.id,
                name: data.name,
                email: data.email,
                homepage: data.homepage,
                message: data.message,
                timestamp: data.timestamp
            });
        });
        
        displayEntries(entries);
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML = 
            '<p style="color: #ff0000;">Error loading guestbook entries. Please refresh or try again later.</p>';
    }
}

function displayEntries(entries) {
    if (!entries || entries.length === 0) {
        document.getElementById('guestbookEntries').innerHTML = 
            '<p style="color: #ffff00;">No entries yet! Be the first to sign the guestbook!</p>';
        return;
    }
    
    const entriesHtml = entries.map(entry => {
        // Create timestamp for display
        const date = entry.timestamp?.toDate() || new Date();
        
        return `
        <div class="guestbook-entry">
            <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}" target="_blank">[Homepage]</a>` : ''}</p>
            <p>${entry.message}</p>
            <small>Posted on: ${date.toLocaleDateString()}</small>
        </div>
        `;
    }).join('');
    
    document.getElementById('guestbookEntries').innerHTML = entriesHtml;
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);