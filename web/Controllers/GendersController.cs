using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.AppDbContext;
using web.Models;

namespace web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private readonly MainDbContext _context;

        public GendersController(MainDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Gender> Get()
        {
            return _context.Genders;
        }

    }
}