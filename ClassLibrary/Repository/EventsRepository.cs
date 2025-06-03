using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ClassLibrary.Repository
{
    public class EventsRepository
    {
        EventsContext db = new EventsContext();

        public void CreateEvent(Event newEvent)
        {
            db.Events.Add(newEvent);
            db.SaveChanges();
        }

        public List<User> EventUsers(int eventId)
        {
            Event myEvent = db.Events.Include(e => e.EventUsers).ThenInclude(eu => eu.UserRefNavigation).FirstOrDefault(e => e.Id == eventId);
            return myEvent.EventUsers.Select(u => new User { Id = u.UserRefNavigation.Id, Name = u.UserRefNavigation.Name, DateOfBirth = u.UserRefNavigation.DateOfBirth }).ToList();
        }

        public void CreateEventUser(int id,User newEventUser)
        {
            Event myEvent = db.Events.FirstOrDefault(x => x.Id == id);
            User myUser = db.Users.FirstOrDefault(x => x.Name == newEventUser.Name);
            db.Users.Add(newEventUser);
            db.SaveChanges();

            EventUser eventUser = new EventUser();
            eventUser.UserRef = newEventUser.Id;
            eventUser.EventRef = myEvent.Id;
            eventUser.Creation = DateTime.Now;
            db.EventUsers.Add(eventUser);  
            db.SaveChanges();
        }

        public Event GetEvent(int id)
        {
            Event myEvent = db.Events.FirstOrDefault(e => e.Id == id);

            return myEvent;
        }
        public void UpdateEvent(int id, Event eventToupdate)
        {
            Event myEvent = db.Events.FirstOrDefault(e => e.Id == id);
            myEvent.Name = eventToupdate.Name;
            myEvent.StartDate = eventToupdate.StartDate;
            myEvent.EndDate = eventToupdate.EndDate;
            myEvent.MaxRegistrations = eventToupdate.MaxRegistrations;
            myEvent.Location = eventToupdate.Location;
            db.SaveChanges();


        }

        public void DeleteEvent(int id)
        {
            Event todelete = db.Events.FirstOrDefault(x => x.Id == id);
            if (todelete == null) return;
            var eventUsersToDelete = db.EventUsers.Where(eu => eu.EventRef == id).ToList();
            db.EventUsers.RemoveRange(eventUsersToDelete);
            db.Events.Remove(todelete);
            db.SaveChanges();
        }

        public List<Event> GetSchedule(DateTime startDate, DateTime endDate)
        {
            var events = db.Events.Where(e => e.StartDate >= startDate && e.EndDate <= endDate).ToList();
            return events;
        }

    }
}
