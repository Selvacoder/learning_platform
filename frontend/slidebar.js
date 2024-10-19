async function loadHTML(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error loading ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log("Sidebar loaded successfully"); // Debugging line
    } catch (error) {
        console.error(error);
    }
}

function toggleProfile() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        console.log("Sidebar toggled"); // Debugging line
    } else {
        console.error("Sidebar not found");
    }
}

const isLoggedIn = localStorage.getItem('loggedIn');
const navbarLinks = document.getElementById('navbar-links');
console.log(isLoggedIn); // Debugging line to check login status

if (isLoggedIn) {
    navbarLinks.innerHTML = `
        <a href="#" id="logout-link">Logout</a>
    `;
} else {
    navbarLinks.innerHTML = `
        <a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>
    `;
}

document.getElementById('logout-link')?.addEventListener('click', function() {
    localStorage.removeItem('loggedIn'); // Remove login status
    window.location.reload(); // Reload page
});
