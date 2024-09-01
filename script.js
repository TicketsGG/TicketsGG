// JavaScript to handle Discord OAuth2 login and API requests
document.getElementById('login-btn').addEventListener('click', () => {
    // Redirect to your backend for Discord OAuth2 login
    window.location.href = 'https://243f-71-162-170-196.ngrok-free.app/auth/discord'; // Updated with ngrok URL
});

// After user login, show settings form and fetch channels
function showSettingsForm() {
    document.getElementById('settings').style.display = 'block';
    fetchChannels();
}

// Fetch the list of channels from the server
function fetchChannels() {
    fetch('https://243f-71-162-170-196.ngrok-free.app/channels', { // Updated with ngrok URL
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const channelSelect = document.getElementById('channel-select');
        channelSelect.innerHTML = ''; // Clear existing options

        // Populate dropdown with fetched channels
        data.channels.forEach(channel => {
            const option = document.createElement('option');
            option.value = channel.id;
            option.text = channel.name;
            channelSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching channels:', error));
}

// Save the customized settings to the server
document.getElementById('save-btn').addEventListener('click', async () => {
    const channelId = document.getElementById('channel-select').value;
    const messageContent = document.getElementById('message-content').value;

    const response = await fetch('https://243f-71-162-170-196.ngrok-free.app/save-settings', { // Updated with ngrok URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            channelId,
            messageContent
        })
    });

    if (response.ok) {
        alert('Settings saved successfully!');
    } else {
        alert('Failed to save settings.');
    }
});
