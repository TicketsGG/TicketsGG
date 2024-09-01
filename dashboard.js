document.addEventListener('DOMContentLoaded', () => {
    const serverId = 'your_server_id'; // Get this dynamically as needed

    fetch(`http://localhost:3000/config/${serverId}`)
        .then(response => response.json())
        .then(config => {
            document.getElementById('creationChannel').value = config.creationChannel || '';
            document.getElementById('creationMessage').value = config.creationMessage || '';
            document.getElementById('creationMessageEmbed').checked = config.creationMessageEmbed || false;
            document.getElementById('ticketCategory').value = config.ticketCategory || '';
            document.getElementById('ticketStaffRole').value = config.ticketStaffRole || '';
            document.getElementById('initialTicketMessage').value = config.initialTicketMessage || '';
            document.getElementById('maxTicketsPerUser').value = config.maxTicketsPerUser || '';
        });

    document.getElementById('saveButton').addEventListener('click', () => {
        const config = {
            creationChannel: document.getElementById('creationChannel').value,
            creationMessage: document.getElementById('creationMessage').value,
            creationMessageEmbed: document.getElementById('creationMessageEmbed').checked,
            ticketCategory: document.getElementById('ticketCategory').value,
            ticketStaffRole: document.getElementById('ticketStaffRole').value,
            initialTicketMessage: document.getElementById('initialTicketMessage').value,
            maxTicketsPerUser: parseInt(document.getElementById('maxTicketsPerUser').value)
        };

        fetch(`http://localhost:3000/config/${serverId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        })
        .then(response => response.json())
        .then(data => {
            alert('Configuration saved!');
        });
        document.getElementById('resendTicketMessage').addEventListener('click', async () => {
            const response = await fetch('/resend-ticket-message', { method: 'POST' });
            const result = await response.json();
            if (result.success) {
                alert('Ticket creation message has been resent.');
            } else {
                alert('Failed to resend ticket creation message.');
            }
        });
        
    });
});
