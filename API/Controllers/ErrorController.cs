using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]

    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        private readonly StoreContext _context;

        public ErrorController(StoreContext context)
        {
           _context = context;
        }

        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }

        [HttpGet("notfound")]

        public IActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);

            if (thing == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]
        
        public IActionResult GetServerError() 
        {
            var thing = _context.Products.Find(42);

            var thingToReturn = thing.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]

        public IActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]

        public IActionResult GetBadRequest(int id)
        {
            return Ok();
        }
    }
}
