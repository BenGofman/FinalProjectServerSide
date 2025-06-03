using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClassLibrary.Models;


using WebApplication.Services;
namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class eventController : ControllerBase
    {
        private readonly EventServices _eventServices;

        public eventController(EventServices eventServices)
        {
            _eventServices = eventServices;
        }



    }
}
