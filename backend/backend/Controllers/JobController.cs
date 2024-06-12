using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public JobController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto) {
            var newJob = _mapper.Map<Job>(dto);
            await _context.AddAsync(newJob);
            await _context.SaveChangesAsync();

            return Ok("Job Created successfully");
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs(){
            var jobs = await _context.Jobs.Include(a=>a.Company).OrderByDescending(q => q.CreatedAt).ToListAsync();
             var convertedJobs=_mapper.Map<IEnumerable<JobGetDto>>(jobs);
            return Ok(convertedJobs);
         }
    }
}
