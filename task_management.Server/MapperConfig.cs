using AutoMapper;
using task_management.Server.Dto.Tasks;

namespace task_management.Server
{
    public class MapperConfig
    {

        public static MapperConfiguration RegisterMap()
        {
            var mapperConfiguration = new MapperConfiguration(config => {
                config.CreateMap<Models.Task, TaskDto>().ReverseMap();
            });

            return mapperConfiguration;
        }

    }
}
