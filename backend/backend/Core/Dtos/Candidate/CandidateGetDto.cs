﻿namespace backend.Core.Dtos.Candidate
{
    public class CandidateGetDto
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }


        public long JodId { get; set; }
        public string JobTitle { get; set; }
    }
}
