namespace WebApplication1.Services;
using ClassLibrary.Repository;
using ClassLibrary.Models;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using WebApplication1.DTO;

public class EventServices
{
    private readonly EventsRepository _eventsRepository;

    public EventServices(EventsRepository eventsRepository)
    {
        _eventsRepository = eventsRepository;
    }

    public void AddnewEvent(Event newEvent)
    {
        _eventsRepository.CreateEvent(newEvent);
    }
    public List<User> EventUsers(int eventId)
    {
       return(_eventsRepository.EventUsers(eventId));
    }

    public void CreateEventUser(int id, User newEventUser) 
    { 
        _eventsRepository.CreateEventUser(id, newEventUser);
    }

    public Event GetEvent(int id) 
    {
        Event mevent = _eventsRepository.GetEvent(id);
        return(mevent);
    }

    public void UpdateEvent(int id, Event eventToupdate) 
    {
        _eventsRepository.UpdateEvent(id, eventToupdate);
    }

    public void DeleteEvent(int id)
    {
        _eventsRepository.DeleteEvent(id);
    }

    public List<Event> GetSchedule(DateTime startDate, DateTime endDate)
    {
        return _eventsRepository.GetSchedule(startDate, endDate);
    }

    public WeatherDTO GetEventWeather(int id)
    {
        Event myEvent = _eventsRepository.GetEvent(id);
        string city = myEvent.Location;
        string url = $"http://api.weatherstack.com/current?access_key=257d978a8cc2628da8a804ccfc86a395&query={city}";
        string json = (new WebClient()).DownloadString(url);
        using JsonDocument doc = JsonDocument.Parse(json);
        var current = doc.RootElement.GetProperty("current");
        var result = new WeatherDTO
        {
            Temperature = current.GetProperty("temperature").GetInt32(),
            WeatherDescription = current.GetProperty("weather_descriptions")[0].GetString(),
            WindSpeed = current.GetProperty("wind_speed").GetInt32()
        };
        return result;
    }

    
 
}
