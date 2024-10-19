var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
    // Sample user data
    $scope.user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        joinDate: 'January 15, 2022',
        bio: 'A passionate learner and web developer.'
    };

    // Sample data for items
    $scope.items = [
        {title: 'Introduction to JavaScript', body: 'Learn the basics of JavaScript, a powerful programming language.', buttonText: 'Learn More'},
        {title: 'Understanding CSS', body: 'Explore the world of CSS and how to style your web pages.', buttonText: 'Learn More'},
        {title: 'HTML Basics', body: 'Get started with HTML, the markup language for web development.', buttonText: 'Learn More'},
    ];

    // Current page state
    $scope.currentPage = 'home';

    // Function to switch between pages
    $scope.showPage = function(page) {
        $scope.currentPage = page; // Change the current page
    };

    // Login function
    $scope.login = function() {
        alert('Logging in with email: ' + $scope.email);
    };

    // Signup function
    $scope.signup = function() {
        alert('Signing up with email: ' + $scope.newEmail);
    };

    // Logout function
    $scope.logout = function() {
        alert('Logged out successfully!');
        $scope.currentPage = 'home'; // Redirect to home after logout
    };
});
