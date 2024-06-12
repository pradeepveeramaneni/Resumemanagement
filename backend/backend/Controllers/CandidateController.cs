using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> Get()
        {
            var candidates=await _context.Candidates.Include("Job").OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedcandidates=_mapper.Map<IEnumerable<CandidateGetDto>>(candidates);
            return Ok(convertedcandidates);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromForm] CandidateCreateDto dto,IFormFile pdfFile)
        {


           if(pdfFile.Length > 5 * 1024 * 1024 || pdfFile.ContentType != "application/pdf")
            {
                return BadRequest("not a valid file");
                    }
           var resumeUrl=Guid.NewGuid().ToString()+"pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);
            using (var stream = new FileStream(filePath,FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }
          var newcandidate = _mapper.Map<Candidate>(dto);
            newcandidate.ResumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newcandidate);
            await _context.SaveChangesAsync();
            
            return Ok("candidate creatted successfully");
        }

        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);
            if(!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found");
            }
            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }

    }
}
