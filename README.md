# Weather App

## Project Overview

The Weather App is a React-based web application that allows users to view current weather conditions and a 5-day weather forecast for any city around the world. The app provides the following features:

- **Search for Cities**: Enter the name of a city to get the current weather and forecast.
- **Geolocation**: Use your current location to fetch the weather automatically.
- **Weather Details**: Displays detailed weather information including temperature, description, wind speed, humidity, and more.
- **Forecast**: Shows a 5-day forecast with temperature and weather conditions for each day.
- **City Suggestions**: Offers autocomplete suggestions for cities based on user input.

## Instructions to Set Up and Run the Project Locally

1. **Clone the Repository**
   
   ```bash
   git clone https://github.com/utsav306/weather-app.git
   cd weather-app
2. **Install Dependencies**
      ```bash
     npm install

3. **Set Up Environment Variables**
       In WeatherCard.js replace your API KEY. In order to protect api key from leaking we can use .env files.
4. **Run the Development Server**
      ```bash
      npm start
## ScreenShots

### Desktop View
![Desktop View](screenshots/desktop-view.png)

### Tablet View
![Tablet View](screenshots/tablet-view.png)

### Mobile View
![Mobile View](screenshots/mobile-view.png)
## Brief Description of Approach
1.** Project Structure and Setup**

The Weather App is built using React, a popular JavaScript library for building user interfaces, and Axios for making HTTP requests. The application is organized into components and utilizes React hooks to manage state and lifecycle methods.
2. **State Management**

The app uses React's useState and useEffect hooks for managing state and side effects:

    State Variables:
        city: Stores the city name input by the user.
        suggestions: Holds the list of autocomplete suggestions based on user input.
        weather: Contains current weather data for the selected city.
        forecast: Holds the 5-day weather forecast data.
        loading: Indicates whether data is being fetched.
        error: Stores error messages for display.

3. **API Integration**

The app interacts with the OpenWeatherMap API to fetch weather and forecast data:

    Fetching Coordinates: The fetchCoordinates function retrieves the latitude and longitude for a given city using the city name.

    Fetching Weather Data: The fetchWeather function uses the coordinates to fetch current weather and forecast data. It updates the weather and forecast states accordingly      and handles errors.

    Fetching Weather by Geolocation: The fetchWeatherByGeolocation function retrieves the user's current location and fetches weather data based on these coordinates.

4.**User Input Handling**

    Autocomplete Suggestions: The handleInputChange function fetches city suggestions from the OpenWeatherMap Geo API as the user types. Suggestions are displayed in a dropdown and can be selected to update the city input.

    Handling Suggestions: The handleSuggestionClick function updates the city state with the selected suggestion and fetches weather data for the chosen city.

5.**Conditional Rendering**

    Loading and Error States: Conditional rendering is used to show a loading spinner when data is being fetched and display error messages if any issues occur.

    Weather Information and Forecast: Weather details and forecasts are displayed conditionally when the data is available. The renderWeatherInfo and renderForecast functions handle this.

6.**Styling and Responsiveness**

    CSS Styling: The app uses a CSS file (WeatherCard.css) for styling. The CSS includes rules for responsive design to ensure the app looks good on various screen sizes,       including desktops, tablets, and mobile devices.

7.**User Experience Enhancements**

    Recent Searches: The list of recent searches is maintained and displayed, allowing users to quickly access previously searched cities.

    Geolocation: Users can use their current location to fetch weather data, providing a more personalized experience.
