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
});

// Add this to update counter when user returns to the page
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateVisitorCount();
    }
});

async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => {
            // Create a new date object from the entry date
            let displayDate = new Date(entry.date);
            // Force the year to 1999
            displayDate.setFullYear(1999);

            return `
        <div class="guestbook-entry">
            <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
            <p>${entry.message}</p>
            <small>Posted on: ${displayDate.toLocaleDateString()}</small>
        </div>
    `;
        }).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

// Load entries when page loads
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);async function submitGuestbook(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        homepage: document.getElementById('guestHomepage').value,
        message: document.getElementById('guestMessage').value
    };

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Thanks for signing my guestbook!');
            loadGuestbookEntries();
            event.target.reset();
        } else {
            console.error('Server error:', data);
            alert(`Error signing guestbook: ${data.error}\n${data.details || ''}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing guestbook! Please try again later.');
    }
}

async function loadGuestbookEntries() {
    try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const entries = await response.json();

        const entriesHtml = entries.map(entry => `
            <div class="guestbook-entry">
                <p><strong>${entry.name}</strong> ${entry.homepage ? `<a href="${entry.homepage}">[Homepage]</a>` : ''}</p>
                <p>${entry.message}</p>
                <small>Posted on: ${new Date(entry.date).toLocaleDateString()}</small>
            </div>
        `).join('');

        document.getElementById('guestbookEntries').innerHTML = entriesHtml;
    } catch (error) {
        console.error('Error loading entries:', error);
        document.getElementById('guestbookEntries').innerHTML =
            '<p style="color: #ff0000;">Error loading guestbook entries. Please try again later.</p>';
    }
}

function showGuestbook() {
    document.getElementById('guestbook').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
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
    // Music player functionality
    document.addEventListener('DOMContentLoaded', function () {
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
        toggleButton.addEventListener('click', function () {
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
    });
    document.addEventListener('click', function () {
        const audio = document.getElementById('backgroundMusic');
        if (audio.paused) {
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
    });
});
