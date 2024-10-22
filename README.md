# Weather App
This is a Weather App built using React. It allows users to search for current weather conditions by city, view detailed weather data, and see temperature, wind speed, humidity, and a hourly forecast.

### Features
• **Search by City**: Users can input a city name to retrieve up-to-date weather information for that location.  
• **Toggle Button**: Ability to toggle between Celsius and Fahrenheit.  
• **Current Weather Details**: Displays current temperature, humidity, wind speed, and weather description (e.g., sunny, cloudy).  
• **Hourly Forecast**: Shows the weather forecast for the next 5 hours.  
• **Error Handling**: Displays an error message if the city is not found or there’s an issue retrieving weather data.  
• **Responsive Design**: Adjusts layout and styling for various screen sizes, making the app mobile-friendly.  
• **Automatic Dark/Light Mode**: Implemented an automatic dark/light mode in which the code is told to turn into nighttime after 7pm and daytime is displayed after 7am

### How it Works

1. **City Search**
   - Users can input the name of a city in the search bar, and the app will fetch weather data for that location. If the city is found, current weather details will be displayed, as well as a hourly day forecast.

2. **Current Weather Details**
   - Once a city is selected, the following details are shown:
     - **Temperature**: The current temperature in both Celsius and Fahrenheit.
     - **Weather Icon**: The current weather's following icon
     - **Weather Description**: A short description of the weather (e.g., "Clear skies").
     - **Wind Speed**: Wind speed, displayed in mph.
     - **Humidity**: The percentage of humidity in the air.

3. **Hourly Forecast**
   - A hourly forecast is provided, showing:
     - **Hour and Temp**: Hour and temperatures.
     - **Weather Icons**: Icons that represent the predicted weather conditions for the day.

### Error Handling
If an invalid city name is entered or the weather data cannot be retrieved for any reason, an error message is displayed, prompting the user to try again.

### State Management
- `weatherData`: Stores the weather details fetched from the API for the current city.  
- `error`: Manages error messages when there’s an issue retrieving data.  
- `loading`: Tracks whether the weather data is currently being fetched from the API.  

## How to Run the App
### Prerequisites
Ensure that you have Node.js and npm installed on your machine.

### Installation
Clone the repository:

git clone https://github.com/your-username/weather-app.git
cd weather-app

Install the dependencies:
npm install

Start the application:
npm start

The app will now be running locally on [http://localhost:3000](http://localhost:3000).

## Future Enhancements
• Option to save favorite cities for quick access to their weather data.  
• Displaying weather maps and radar data.  

## Link to Project
[weatherapp-dc.netlify.app](https://weatherapp-dc.netlify.app)
