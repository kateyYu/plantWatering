using System;

namespace WebAPI.Models
{
    public class Plant
    {
        public int PlantId { get; set; }
        public string PlantName { get; set; }
        public DateTime? WaterDateTime { get; set; }
        public bool? IsWatering { get; set; }
    }
}
