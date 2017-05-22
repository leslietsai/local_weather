
function getLocation() {
  $.ajax(
    { url: "https://freegeoip.net/json/", 
      success: function(data) {
        var location;
        if (data.country_code === 'US') {
          location = data.city + ", " + data.region_name;
        }
        else{
          location = data.city + ", " + data.country_name;
        }
        $(".location").text(location);
        getWeather(data.latitude, data.longitude);
      }
   }); 
}

function getWeather(lat, lon) {
  var coordinates = lat + "," + lon;
  var API = 'ae6b8f4858e67a13e3622f67f8aed457/';
  $.ajax(
    { url:"https://crossorigin.me/" + "https://api.darksky.net/forecast/" + API + coordinates,
     success: function(data) {
       F = data.currently.temperature + " F";
       $(".temp").text(F);
       var skycons = new Skycons({"color": "white"});
       skycons.add("icon", data.currently.icon);
       skycons.play();
       var newTemp = convertC(data.currently.temperature);
       var C = newTemp.toFixed(2) + " C";
       $(".temp").click(function () {
         var text = $(".temp").text();
         if (text.endsWith("F")) {
           $(".temp").text(C);
         }
         else {
           $(".temp").text(F);
         }
       });
     }
    }
  )
}

function convertC(f) {
  return (f - 32) * 5/9;
}

$(document).ready(function() {
  getLocation();
});

