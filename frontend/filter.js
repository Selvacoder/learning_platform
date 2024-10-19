// Array to hold all course data with images
const courses = [
    { title: "Web Development", description: "Learn the basics of web development with HTML, CSS, and JavaScript.", image: "images/web-development.jpg" },
    { title: "Data Science", description: "Master the skills needed for data analysis and visualization.", image: "images/data-science.jpg" },
    { title: "Machine Learning", description: "Explore the world of machine learning and artificial intelligence.", image: "images/machine-learning.jpg" },
    { title: "Graphic Design", description: "Unleash your creativity with graphic design techniques.", image: "images/graphic-design.jpg" },
    { title: "Python Programming", description: "Learn Python, one of the most versatile and powerful programming languages.", image: "images/python-programming.jpg" },
    { title: "Blockchain Development", description: "Understand blockchain technology and how to develop decentralized applications.", image: "images/blockchain-development.jpg" },
    { title: "Cybersecurity", description: "Learn how to secure systems, networks, and applications against cyber threats.", image: "images/cybersecurity.jpg" },
    { title: "Cloud Computing", description: "Explore cloud services like AWS, Google Cloud, and Microsoft Azure.", image: "images/cloud-computing.jpg" },
    { title: "Mobile App Development", description: "Learn how to create mobile applications for Android and iOS platforms.", image: "images/mobile-app-development.jpg" },
    { title: "UI/UX Design", description: "Design user-friendly interfaces and experiences for websites and apps.", image: "images/ui-ux-design.jpg" },
    { title: "Digital Marketing", description: "Learn the principles of digital marketing, SEO, and social media strategies.", image: "images/digital-marketing.jpg" },
    { title: "Game Development", description: "Learn the process of creating interactive video games from scratch.", image: "images/game-development.jpg" },
    { title: "Artificial Intelligence", description: "Delve into AI technologies such as neural networks and more.", image: "images/artificial-intelligence.jpg" },
    { title: "Financial Analysis", description: "Master financial data analysis using Excel, Python, and data visualization techniques.", image: "images/financial-analysis.jpg" },
    { title: "Ethical Hacking", description: "Learn how to identify vulnerabilities and secure systems ethically.", image: "images/ethical-hacking.jpg" },
    { title: "Deep Learning", description: "Explore the world of machine learning and deep learning.", image: "images/deep-learning.jpg" }
];

// Function to display the courses
function displayCourses(courseList) {
    const courseGrid = document.querySelector('.course-grid'); // Select the course-grid
    courseGrid.innerHTML = ""; // Clear existing content

    // If no courses, display a message
    if (courseList.length === 0) {
        courseGrid.innerHTML = "<p>No courses available matching your search.</p>";
        return;
    }

    courseList.forEach(course => {
        const courseCard = `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}" />
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <button class="enroll-btn">Enroll Now</button>
                </div>
            </div>
        `;
        courseGrid.innerHTML += courseCard; // Add the course card to the grid
    });

    // Reapply event listeners after the course grid is updated
    attachEnrollEventListeners(); // Call function to attach event listeners to new buttons
}

// Function to attach event listeners to "Enroll Now" buttons
function attachEnrollEventListeners() {
    document.querySelectorAll('.enroll-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const courseName = this.previousElementSibling.previousElementSibling.innerText; // Get course name
            const isLoggedIn = localStorage.getItem('loggedIn');

            if (!isLoggedIn) {
                alert('Please log in to enroll in a course.');
                window.location.href = 'login.html'; // Redirect to login page
                return;
            }

            // Show the enrollment modal
            document.getElementById('course-name').innerText = courseName;
            document.getElementById('enrollment-modal').style.display = 'block';
        });
    });
}

// Display all courses on page load
window.onload = () => {
    displayCourses(courses); // Show all courses initially
};

// Function to search and filter courses based on input
function searchCourses() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase(); // Get the search input
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery) || course.description.toLowerCase().includes(searchQuery) // Filter based on title or description
    );
    displayCourses(filteredCourses); // Update the display with the filtered courses
}
