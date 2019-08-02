using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web.AppDbContext;
using web.Models;

namespace web.Controllers
{
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly MainDbContext _context;

        public StudentsController(MainDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return _context.Students;
        }

        [HttpGet("findByLastName/{value}")]
        public IEnumerable<Student> FindByLastName(string value)
        {
            return _context.Students.Where( (item) => item.LastName.Contains(value));
        }

        [HttpGet("existsGuid/{value}")]
        public Student ExistsGuid(string value)
        {
            return _context.Students.FirstOrDefault((item) => item.Guid == value);
        }
        
        // GET api/Students/5
        [HttpGet("{id}")]
        public Student Get(int id)
        {
            return _context.Students.FirstOrDefault((item) => item.Id == id);
        }

        // POST api/Students
        [HttpPost]
        public int Post([FromBody] Student value)
        {
            _context.Students.Add(value);
            _context.SaveChanges();
            return (int)HttpStatusCode.OK;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public int Put([FromBody] Student value)
        {
            Student student = _context.Students.FirstOrDefault((item) => item.Id == value.Id);
            if (student != null)
            {
                student.FirstName = value.FirstName;
                student.LastName = value.LastName;
                student.Patronymic = value.Patronymic;
                student.GenderId = value.GenderId;
                student.Guid = value.Guid;

                _context.SaveChanges();
                return (int)HttpStatusCode.OK;
            }
            else
                return (int)HttpStatusCode.NotFound;
        }

        // DELETE api/Students/5
        [HttpDelete("{id}")]
        public void DeleteStudent(int id)
        {
            Student student = _context.Students.FirstOrDefault((item) => item.Id == id);
            if (student != null)
            {
                _context.Students.Remove(student);
                _context.SaveChanges();
            }
        }
    }
}
