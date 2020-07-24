using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyApp.api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
namespace MyApp.api.Controllers
{
    [Authorize] 
    [ApiController]
    [Route("[controller]")]
        public class ValueController : ControllerBase
    {
        private readonly DataContext _context;
        public ValueController(DataContext context)
        {
            _context = context;
        }

                    //GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Getvalues()
        {
            var values =await _context.Values.ToListAsync();

            return Ok(values);
        }
        [AllowAnonymous]
            // api/values/2
        [HttpGet("{id}")]
        public async Task<IActionResult> Getvalue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

            return Ok (value);
        }

       
    }
}
