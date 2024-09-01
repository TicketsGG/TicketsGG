document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = 'https://1265-71-162-170-196.ngrok-free.app/auth/discord'; // Use ngrok URL
});

function fetchChannels() {
    fetch('https://1265-71-162-170-196.ngrok-free.app/channels', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const channelSelect = document.getElementById('channel-select');
        channelSelect.innerHTML = ''; // Clear existing options

        data.channels.forEach(channel => {
            const option = document.createElement('option');
            option.value = channel.id;
            option.text = channel.name;
            channelSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching channels:', error));
}
