namespace WebApplication.Services;
using ClassLibrary.Repository;

public class EventServices
{
    private readonly EventsRepository _eventsRepository;

    public EventServices(EventsRepository eventsRepository)
    {
        _eventsRepository = eventsRepository;
    }


}
