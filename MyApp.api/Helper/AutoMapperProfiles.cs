using System.Linq;
using AutoMapper;
using MyApp.api.Dtos;
using MyApp.api.Models;

namespace MyApp.api.Helper
{
    public class AutoMapperProfiles : Profile
    {
       public AutoMapperProfiles()
       {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
               opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
             .ForMember(dest => dest.Age, opt =>
               opt.MapFrom(src => src.DateOfBirth.CalcualteAge()));

            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
               opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
             .ForMember(dest => dest.Age, opt =>
               opt.MapFrom(src => src.DateOfBirth.CalcualteAge()));

            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
       }
    }
}