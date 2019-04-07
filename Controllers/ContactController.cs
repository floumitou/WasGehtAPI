using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WasGehtAPI.Models;


namespace WasGehtAPI.Controllers
{
    public class ContactController : ApiController
    {

        public City Get(string cityname)
        {

              
            City city = new City();

            city.name = cityname;

            WebClient client = new WebClient();

            string retVal = client.DownloadString("https://api.ipgeolocation.io/ipgeo?apiKey=780685db76b24fb1a1d2bed86f63d1e9");

            string[] substrings = retVal.Split(new char[] { ',' });
            foreach(string s in substrings)
            {
                if (s.Contains("city"))
                {
                    string temp = s.Remove(0,7);
                    temp = temp.Trim(new char[] { '"' });
                    city.ipLocation = temp;
                }
            }

            retVal = client.DownloadString("http://api.openweathermap.org/data/2.5/weather?q=" + city.name
                + ",de&appid=43c9f1a051a4e0d016dd61d921cb9af4&units=metric");

            substrings = retVal.Split(new char[] { ',' });
            foreach (string s in substrings)
            {
                if (s.Contains("temp"))
                {
                    string temp = s.Remove(0, 11).Replace('.',',').Trim(new char[] { '}' });
                    city.celsius = temp;
                }

                if (s.Contains("\"clouds\":{\"all\":"))
                {
                    string temp = s.Remove(0, 16).Trim(new char[] { '}' });
                    city.clouds = temp;
                }

                if (s.Contains("\"wind\":{\"speed\":"))
                {
                    string temp = s.Remove(0, 16).Trim(new char[] { '}' }).Replace('.', ',');
                    city.windSpeed = temp;
                }

                if (s.Contains("sunrise"))
                {
                    string time = s.Remove(0, 10);
                    TimeSpan ts = TimeSpan.FromSeconds(Convert.ToInt64(time));
                    string str = ts.ToString(@"hh\:mm");
                    city.sunrise = str;
                }

                if (s.Contains("sunset"))
                {
                    string time = s.Remove(0, 9).Trim(new char[] { '}' });
                    TimeSpan ts = TimeSpan.FromSeconds(Convert.ToInt64(time));
                    string str = ts.ToString(@"hh\:mm");
                    city.sunset = str;
                }
            }

            retVal = client.DownloadString("https://www.googleapis.com/youtube/v3/search?q="
                + city.name +
                "&order=relevance&part=snippet&type=video&maxResults=1&key=AIzaSyCpRdTB7jcMTO4UWE-AYMOoBehDQxcH8F8");

            substrings = retVal.Split(new char[] { ',' });
            foreach (string s in substrings)
            {
                if (s.Contains("videoId"))
                {
                    string temp = s.Remove(0, 16).Trim(new char[] { '"',' ','}','\n' });
                    city.videoID = temp;
                }
            }


            return city;

        }
        

    }
}
