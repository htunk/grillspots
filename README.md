# Otaniemi Grillspots
Finding a spot to grill, hangout or even work remotely has never been this easy!<br>
Spots are visualised on a map with additional information available to help choose.<br>
Weather information helps you decide wether you want to hang out in the sun or prefer a spot with shade.<br><br>
Live at [https://grilli.app](https://grilli.app) .
<p float="left" align="center">
  <img src="/public/phonemap.PNG?raw=true" width="400" />
  <img src="/public/phoneterrance.PNG?raw=true" width="400" /> 
</p>

## Tech
App is developed using [React with Mapbox GL JS](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/). React was chosen over plain JS in order to easily import bottomsheet overlay as there wasn't really good options using pure JS. Whole project was made as a curiosity to test Mapbox in webdev.

Global weather information in Otaniemi (temperature, clouds, rain) is retrieved from [FMI API](https://en.ilmatieteenlaitos.fi/open-data). Local data about sunlight and shade is calculated using [SunCalc](https://www.npmjs.com/package/suncalc) library with manually gathered environment obstacle data (obstacle heights in altitude degrees) mapped on azimuth degrees.

## Dev
The Mapbox style and API-key are from Mapbox dev example, you may want to change them if you are sending significant amounts or requests.

Run app in development mode:
```
npm i
npm start
```
If the site is not automatically opened, head to
`http://localhost:3000`.
