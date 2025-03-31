async function updateVisitorCount() {
    try {
        // Get the stored count from localStorage
        let count = parseInt(localStorage.getItem('siteVisits') || '0');
        
        // Check if this is a new visit (using a date-based key)
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisitDate');
        
        if (lastVisit !== today) {
            // This is a new daily visit, increment the counter
            count++;
            localStorage.setItem('siteVisits', count.toString());
            localStorage.setItem('lastVisitDate', today);
            
            // If Google Analytics is available, send an event
            if (typeof gtag === 'function') {
                gtag('event', 'page_view', {
                    'event_category': 'engagement',
                    'event_label': 'daily_visit'
                });
            }
        }
        
        // Format and display the count
        const formattedCount = count.toString().padStart(6, '0');
        const counterElement = document.getElementById('visitorCount');
        if (counterElement) {
            counterElement.textContent = formattedCount;
        }
    } catch (error) {
        console.error('Error updating visitor count:', error);
        // Default to showing zeros if there's an error
        const counterElement = document.getElementById('visitorCount');
        if (counterElement) {
            counterElement.textContent = '000000';
        }
    }
}

// Update counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Run visitor counter update
    updateVisitorCount();

    // Update counter every 30 seconds
    setInterval(updateVisitorCount, 30000);
    
    // Set up audio player immediately
    setupAudioPlayer();
    
    // Set up sparkle effect
    setupSparkleEffect();
});

// Separated audio player setup for clarity
function setupAudioPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('toggleMusic');
    
    // Only try to play if the audio element exists
    if (audio) {
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
    }
}

// Separated sparkle effect setup for clarity
function setupSparkleEffect() {
    // Pixel shapes for sparkles
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
}

// Add this to update counter when user returns to the page
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateVisitorCount();
    }
});

async function submitGuestbook(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Show submission in progress message
    form.innerHTML = '<div style="color: #00ff00; text-align: center;">Sending your entry... Please wait!</div>';
    
    try {
        // Replace with your repo details
        const username = 'Howling-Yote';
        const repo = 'Howling-Yote.github.io';
        const branch = 'main'; // or master
        
        const endpoint = `https://api.staticman.net/v3/entry/github/${username}/${repo}/${branch}/guestbook`;
        
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Success message
            form.innerHTML = `
                <div style="color: #00ff00; text-align: center; border: 2px dashed #ff00ff; padding: 10px;">
                    <h3>✧･ﾟ: *✧･ﾟ:* THANKS! *:･ﾟ✧*:･ﾟ✧</h3>
                    <p>Your guestbook entry has been submitted!</p>
                    <p>It will appear after moderation.</p>
                    <button onclick="resetGuestbookForm()" style="background: #ff00ff; color: white; border: 2px solid #00ff00; margin-top: 10px; cursor: pointer;">
                        Submit Another Entry
                    </button>
                </div>
            `;
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        form.innerHTML = `
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
        <form onsubmit="submitGuestbook(event)">
            <input type="text" name="fields[name]" placeholder="Your Name" required>
            <input type="email" name="fields[email]" placeholder="Your Email" required>
            <input type="url" name="fields[homepage]" placeholder="Your Homepage URL">
            <textarea name="fields[message]" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Sign Guestbook!</button>
            <div class="retro-note">
                <marquee scrollamount="3" direction="left" behavior="alternate">
                    ✧･ﾟ: Entries will appear after approval :･ﾟ✧
                </marquee>
            </div>
        </form>
    `;
}

async function loadGuestbookEntries() {
    try {
        // Update with your repo details
        const username = 'Howling-Yote';
        const repo = 'Howling-Yote.github.io';
        
        // Try to load a processed JSON file if it exists
        try {
            const response = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/_data/guestbook.json`);
            
            if (response.ok) {
                const entries = await response.json();
                displayEntries(entries);
                return; // Exit if we successfully loaded JSON
            }
        } catch (e) {
            console.log("No JSON file found, trying to load individual entries...");
        }
        
        // If no JSON file, try to get a list of files in the _data/guestbook directory
        // Note: This requires a special API or pre-generated index, which GitHub Pages doesn't support directly
        
        // As a fallback, just display a message
        document.getElementById('guestbookEntries').innerHTML = 
            '<p style="color: #ffff00;">Guestbook entries will appear here after approval!</p>';
            
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML = 
            '<p style="color: #ff0000;">Error loading guestbook entries. Please refresh or try again later.</p>';
    }
}

function displayEntries(entries) {
    if (!entries || Object.keys(entries).length === 0) {
        document.getElementById('guestbookEntries').innerHTML = 
            '<p style="color: #ffff00;">No entries yet! Be the first to sign the guestbook!</p>';
        return;
    }
    
    const entriesHtml = Object.entries(entries).map(([id, entry]) => {
        // Create a Y2K era date display
        const date = new Date(entry.date * 1000);
        date.setFullYear(1999); // Force Y2K era date
        
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
