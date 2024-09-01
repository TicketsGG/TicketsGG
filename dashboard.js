fetch('http://localhost:3000/dashboard', {
    credentials: 'include'
})
.then(response => response.json())
.then(data => {
    if (data.user) {
        document.getElementById('dashboard').innerHTML = `
            <h2>Hello, ${data.user.username}!</h2>
            <p>Customize your bot settings here</p>
            <!-- Form to update settings -->
        `;
    } else {
        document.getElementById('dashboard').innerHTML = '<p>Please log in first.</p>';
    }
});
