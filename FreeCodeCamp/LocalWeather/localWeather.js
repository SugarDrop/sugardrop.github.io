(function() {
    $(document).ready(function() {
        var infoContainerColorMap = {
            "Thunderstorm": "#c23823",
            "Drizzle": "#1a6bad",
            "Rain": "#859fa6",
            "Snow": "#7a917f",
            "Atmosphere": "#979e7d",
            "Clear": "#6de0e8",
            "Clouds": "#91bdcf",
            "Extreme": "#4b8196",
            "Default": "#666257"
        };

        var backgroundMap = {
            "Thunderstorm": "http://1.bp.blogspot.com/-UPl8dLUVH8M/TirdnT5BKvI/AAAAAAAARWs/ckRqJGa4HeE/s1600/stunning+lightning+photos+HD+wallpapers+%25284%2529.jpg",
            "Drizzle": "http://dekhbhaidekh.in/wp-content/uploads/2015/07/rain-drop-wallpaper-window-hd-desktop-wallpapers-l-a-ibackgroundz-1.jpg",
            "Rain": "https://1creativecookie.files.wordpress.com/2015/10/rain-falling-from-the-sky-hd-dubwallpaper.jpg",
            "Snow": "http://4hdwallpapers.com/wp-content/uploads/2013/04/Snow-Park-Bench.jpg",
            "Atmosphere": "http://blog.hdwallsource.com/wp-content/uploads/2016/01/fog-wallpaper-36612-37447-hd-wallpapers.jpg",
            "Clear": "http://74211.com/wallpaper/picture_big/Blue-and-Cloudy-Sky-Yet-Sunlight-is-Breaking-in-You-Can-Expect-Fine-Weather-Soon-Enough-HD-Natural-Scenery-Wallpaper.jpg",
            "Clouds": "http://freetopwallpaper.com/wp-content/gallery/cloud/cloud-wallpaper-hd-background-17.jpg",
            "Extreme": "http://mediad.publicbroadcasting.net/p/nhpr/files/201209/EarthTalkExtremeWeather.JPG",
            "Default": "http://www.blirk.net/wallpapers/1920x1080/weather-wallpaper-1.jpg"
        };

        var kelvinToCelcius = function(k) {
            return (k - 273.15).toFixed(1);
        };

        var kelvinToFahrenheit = function(k) {
            return (9 * (k - 273) / 5 + 32).toFixed(1);
        }

        var $temperature = $('#temperature');
        var temperatureCache;
        var updateRenderedWeatherInfo = function(data) {
            $('#locationName').text(data.name);
            if (data.weather.length > 0) {
                var weatherMain = data.weather[0].main;

                var colorKey = (infoContainerColorMap[weatherMain] != undefined) ? weatherMain : "Default";
                $('#infoContainer').css("background-color", infoContainerColorMap[colorKey]);

                var bgKey = (backgroundMap[weatherMain] != undefined) ? weatherMain : "Default";
                $('body').css("background", "url(" + backgroundMap[bgKey] + ") no-repeat center center fixed");

                var iconPath = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                $('#weatherIcon').attr("src", iconPath);

                $('#weatherMain').text(weatherMain);
                $('#weatherDescription').text(data.weather[0].description);
            }
            temperatureCache = data.main.temp;
            $temperature.text(kelvinToCelcius(data.main.temp) + '\xB0');
        };

        var $measure = $('#measure');
        var switchMeasure = function() {
            if ($measure.text() == "C") {
                $measure.text("F");
                $temperature.text(kelvinToFahrenheit(temperatureCache) + '\xB0');
            }
            else if ($measure.text() == "F") {
                $measure.text("C");
                $temperature.text(kelvinToCelcius(temperatureCache) + '\xB0');
            } 
        };
        $measure.on("click", switchMeasure);

        var fetchWeatherData = function() {
            navigator.geolocation.getCurrentPosition(function(position){
                var reqUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + 
                             "&lon=" + position.coords.longitude + "&appid=eaa02b74bef7e1112f7ba1f04aa802f3";
                $.ajax({
                    //url: "http://api.openweathermap.org/data/2.5/weather?q=Kawai&appid=eaa02b74bef7e1112f7ba1f04aa802f3",
                    url: reqUrl,
                    success: function(response) {
                        updateRenderedWeatherInfo(response);
                    }
                });
            });
        };

        fetchWeatherData();
    });
})();