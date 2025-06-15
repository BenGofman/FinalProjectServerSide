using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;
using ClassLibrary.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Caching.Memory;
using WebApplication1.DTO;
using Microsoft.AspNetCore.Cors;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventServices _eventsServices;
        private readonly IMemoryCache _memoryCache;

        public EventsController(EventServices eventsServices, IMemoryCache memoryCache)
        {
            _eventsServices = eventsServices;
            _memoryCache = memoryCache;
        }
        [EnableCors()]

        [HttpPost]
        [Route("event")]
        public ActionResult CreateNewEvent([FromBody] Event newEvent)
        {
            try
            {
                _eventsServices.AddnewEvent(newEvent);
                return Ok("New event Created");

            }
            catch (Exception ex)
            {
                return BadRequest("Event Cannot Be Created");
            }

        }

        [HttpGet]
        [Route("{id}/registrations")]
        public ActionResult<List<User>> GetEventUsers(int id)
        {
            try
            {
                List<User> ReturnUsers = _eventsServices.EventUsers(id);
                return Ok(ReturnUsers);
            }
            catch (Exception ex)
            {
                return NotFound("No Users Found");
            }
        }
        [HttpPost]
        [Route("{id}/registrations")]
        public ActionResult CreateNewEventUser(int id, [FromBody] User newEventUser)
        {
            try
            {
                _eventsServices.CreateEventUser(id, newEventUser);
                return Ok("New Event User Created");
            }
            catch (Exception ex)
            {
                return NotFound("Cannot Create");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Event> GetEvent(int id)
        {
            try
            {
                Event myevent = _eventsServices.GetEvent(id);
                if (myevent == null)
                {
                    return NotFound("Event Not Found");
                }
                return Ok(myevent);
            }
            catch (Exception ex)
            {
                return BadRequest("Event not found");
            }
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult UpdateEvent(int id, [FromBody] Event eventToupdate)
        {
            try
            {
                Event eventToCheck = _eventsServices.GetEvent(id);
                if (eventToCheck == null) return BadRequest("Event Not Found");
                _eventsServices.UpdateEvent(id, eventToupdate);
                return Ok("Event Updated!");
            }
            catch (Exception ex)
            {
                return BadRequest("Cannot Update Event");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteEvent(int id)
        {
            _eventsServices.DeleteEvent(id);
            return Ok("Event Deleted");
        }

        [HttpGet]
        [Route("schedule")]
        public ActionResult<List<Event>> GetSchedule(DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
            {
                return BadRequest("Start time must be earlier than end time.");
            }
            List<Event> events = _eventsServices.GetSchedule(startDate, endDate);
            return Ok(events);
        }

        [HttpGet]
        [Route("{id}/weather")]
        public ActionResult GetEventWeather(int id)
        {
            if (_eventsServices.GetEvent(id) == null) return BadRequest("Event not Found");
            WeatherDTO cacheData = _memoryCache.Get<WeatherDTO>("weather-cache");
            if (cacheData != null)
            {
                return Ok(cacheData);
            }
            var weather = _eventsServices.GetEventWeather(id);
            var expirationTime = DateTimeOffset.Now.AddSeconds(3);
            _memoryCache.Set("weather-cache", weather, expirationTime);

            return Ok(weather);
        }
    }


}
