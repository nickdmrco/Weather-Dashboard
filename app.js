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

function makeList() {
 let listItem = $("<li>").addClass("list-group-item").text(city);
 $(".list").append(listItem);
}

function getCurrentConditions(response) {

 let tempF = (response.main.temp - 273.15) * 1.80 + 32;
 tempF = Math.floor(tempF);

 $('#currentCity').empty();

 const card = $("<div>").addClass("card");
 const cardBody = $("<div>").addClass("card-body");
 const city = $("<h4>").addClass("card-title").text(response.name);
 const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
 const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
 const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
 const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
 const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

 city.append(cityDate, image)
 cardBody.append(city, temperature, humidity, wind);
 card.append(cardBody);
 $("#currentCity").append(card)

}
