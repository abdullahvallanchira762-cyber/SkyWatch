# SkyWatch
SkyWatch is a modern weather dashboard that provides real-time weather information and city-based forecasts using the OpenWeatherMap API. Built with vanilla JavaScript, it demonstrates asynchronous programming with Fetch API and async/await, localStorage persistence, debounced search, error handling, and responsive UI design.

The main objective of this project is to allow users to search for real-time weather information of any city using the OpenWeatherMap API.

The application includes several features such as:

• Weather search by city name
• Real-time weather data using Fetch API
• Async/Await for handling API requests
• Error handling using Try/Catch
• Debounced search to reduce unnecessary API calls
• Favorites system using localStorage
• Add and remove favorite cities
• Dark and Light theme toggle with theme persistence
• Responsive user interface

When a user enters a city name, the application sends an API request to OpenWeatherMap and displays information such as temperature, weather condition, humidity, feels-like temperature, and wind speed.

To improve performance, I implemented debouncing with a 500ms delay so that API calls are made only after the user stops typing.

I also used localStorage to save favorite cities and the selected theme, allowing data to persist even after refreshing the page.

Throughout the project, I used modern JavaScript concepts including Fetch API, Promises, Async/Await, DOM Manipulation, Event Listeners, Local Storage, Array Methods such as forEach and filter, and Error Handling using Try/Catch.

This project helped me understand how to work with APIs, manage asynchronous operations, and build interactive web applications using JavaScript.
