﻿using AutoMapper;
using backend.Core.Dtos.Candidate;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile:Profile
    {
        public AutoMapperConfigProfile()
        {
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();

            CreateMap<JobCreateDto, Job>();
            CreateMap<Job, JobGetDto>()
                .ForMember(dest=>dest.CompanyName,opt=>opt.MapFrom(src=>src.Company.Name));
            
            CreateMap<CandidateCreateDto, Candidate>();
            CreateMap<Candidate, CandidateGetDto>()
                .ForMember(dest => dest.JobTitle, opt=>opt.MapFrom(src=>src.Job.Title));
        }
    }
}
