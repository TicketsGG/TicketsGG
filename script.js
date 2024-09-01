document.addEventListener('DOMContentLoaded', function() {
    const serverSelect = document.getElementById('server-select');
    const ticketCreationChannel = document.getElementById('ticketCreationChannel');
    const ticketCategory = document.getElementById('ticketCategory');
    const ticketStaffRole = document.getElementById('ticketStaffRole');
    
    // Load server options
    fetch('/get-servers') // This endpoint should return the server options
        .then(response => response.json())
        .then(data => {
            data.servers.forEach(server => {
                const option = document.createElement('option');
                option.value = server.id;
                option.textContent = server.name;
                serverSelect.appendChild(option);
            });
        });

    // Load channel, category, and role options when a server is selected
    serverSelect.addEventListener('change', function() {
        const guildId = serverSelect.value;

        // Fetch and update channels
        fetch(`/get-channels?guildId=${guildId}`)
            .then(response => response.json())
            .then(data => {
                ticketCreationChannel.innerHTML = '';
                data.channels.forEach(channel => {
                    const option = document.createElement('option');
                    option.value = channel.id;
                    option.textContent = channel.name;
                    ticketCreationChannel.appendChild(option);
                });
            });

        // Fetch and update categories
        fetch(`/get-categories?guildId=${guildId}`)
            .then(response => response.json())
            .then(data => {
                ticketCategory.innerHTML = '';
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    ticketCategory.appendChild(option);
                });
            });

        // Fetch and update roles
        fetch(`/get-roles?guildId=${guildId}`)
            .then(response => response.json())
            .then(data => {
                ticketStaffRole.innerHTML = '';
                data.roles.forEach(role => {
                    const option = document.createElement('option');
                    option.value = role.id;
                    option.textContent = role.name;
                    ticketStaffRole.appendChild(option);
                });
            });
    });

    // Handle resend ticket message
    document.getElementById('resend-message').addEventListener('click', function() {
        const guildId = serverSelect.value;
        fetch('/resend-ticket-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ guildId })
        })
        .then(response => response.text())
        .then(message => alert(message));
    });
});
