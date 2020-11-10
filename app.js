let city = $("#searchTerm").val();
const apiKey = "&appid=fad38bd4800ba2115bb6a2ad756ed42b";

let date = new Date();

$("#searchTerm").keypress(function (event) {

 if (event.keyCode === 13) {
  event.preventDefault();
  $("#searchBtn").click();
 }
});

$("#searchBtn").on("click", function () {

 $('#forecastH5').addClass('show');

 city = $("#searchTerm").val();

 $("#searchTerm").val("");

 const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

 $.ajax({
  url: queryUrl,
  method: "GET"
 })
  .then(function (response) {

   console.log(response)

   console.log(response.name)
   console.log(response.weather[0].icon)

   let tempF = (response.main.temp - 273.15) * 1.80 + 32;
   console.log(Math.floor(tempF))

   console.log(response.main.humidity)

   console.log(response.wind.speed)

   getCurrentConditions(response);
   getCurrentForecast(response);
   makeList();

  })
});
