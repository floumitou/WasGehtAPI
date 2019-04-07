var ipLocation;
this.website = 'https://api.ipgeolocation.io/ipgeo?apiKey=780685db76b24fb1a1d2bed86f63d1e9';
$.getJSON(this.website, function (data) {
    ipLocation = "'" + data.city + "'";
    console.log("amanfang: " + data.city)
});

var color = "black";

var elem = document.getElementById("bodyID");
elem.style.backgroundColor = color;

var gesehen = true;
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!',
        seen: false
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
        },

        hidePicture: function () {
            gesehen = !gesehen;
            app5.seen = gesehen;
        }
    }
});


var app6 = new Vue({
    el: '#app-6',
    data: {
        celsius: '',
        windSpeed: '',
        clouds: '',
        sunrise: '',
        sunset: '',
        website: '',
        city: '',
        newsOne: '',
        newsTwo: '',
        newsThree: '',
        lon: 39.0,
        lat: 39.0,
        location: '',
        distance: '',
        videoFrame: '',
        newsPictureOne: '',
        newsPictureTwo: '',
        newsPictureThree: '',
        seen: false

    },
    methods: {

        getAll: function () {
            app6.seen=true;
            document.getElementById("bodyID").style.backgroundColor = "lightgrey";
            app6.getWeather()
            app6.getNews()
            app6.getVideo()
            console.log("videowichtig")


        },


        getVideo: function () {
            console.log("früheresHallo!")
            this.website = 'https://www.googleapis.com/youtube/v3/search?q=' + this.city + '&order=relevance&part=snippet&type=video&maxResults=5&key=AIzaSyCpRdTB7jcMTO4UWE-AYMOoBehDQxcH8F8';
            $.getJSON(this.website, function (data) {
                console.log("hallo!");
                app6.videoFrame = '<iframe width="99%" height="250px" src="http://www.youtube.com/embed/' + data.items[0].id.videoId + '"></iframe>'
            });
        },

        getWeather: function () {


            app6.location = ipLocation;


            this.website = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + ',de&appid=43c9f1a051a4e0d016dd61d921cb9af4&units=metric';
            $.getJSON(this.website, function (data) {
                app6.celsius = data.main.temp + "°C";  //TODO coordis anzeigen und mehr Wettersachen
                app6.windSpeed = data.wind.speed + " km/h";
                app6.clouds=data.clouds.all + " Stück";
                app6.sunrise= new Date(1000*data.sys.sunrise).getHours()+":"+new Date(1000*data.sys.sunrise).getMinutes() + " Uhr";
                app6.sunset=new Date(1000*data.sys.sunset).getHours()+":"+new Date(1000*data.sys.sunset).getMinutes() + " Uhr";
                L.mapquest.key = '5wXTrldth3ZZnNV5BWGcKFnLipXbc7g2';


                var map = L.mapquest.map('map', {
                    center: [0, 0],
                    layers: L.mapquest.tileLayer('map'),
                    zoom: 2
                });

                console.log("muss sein" + app6.location);

                var directions = L.mapquest.directions();
                console.log(app6.location);
                directions.route({
                    start: app6.location,
                    end: app6.city
                });
            });

            console.log("vorDistanz: " + app6.location + "," + app6.city);
            this.website = 'https://www.mapquestapi.com/directions/v2/route?key=5wXTrldth3ZZnNV5BWGcKFnLipXbc7g2&from=' + app6.location + '&to=' + app6.city + '&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false';
            $.getJSON(this.website, function (data) {

                app6.distance = (data.route.distance * 1.609).toFixed(2) + "km von dir entfernt.";
            });


        },


        getNews: function () {
            this.website = 'https://newsapi.org/v2/everything?q=' + this.city + '&apiKey=f7f0c7ac8452450da01c59d8198eb076';
            $.getJSON(this.website, function (data) {
                app6.newsOne = data.articles[0].title;
                app6.newsTwo = data.articles[1].title;
                app6.newsThree = data.articles[2].title;
                app6.newsPictureOne = '<a href="' + data.articles[0].url + '"><img src="' + data.articles[0].urlToImage + '"></img></a> '
                app6.newsPictureTwo = '<a href="' + data.articles[1].url + '"><img src="' + data.articles[1].urlToImage + '"></img></a> '
                app6.newsPictureThree = '<a href="' + data.articles[2].url + '"><img src="' + data.articles[2].urlToImage + '"></img></a> '

            });
        }


    }


});


//https://api.adviceslip.com/advice