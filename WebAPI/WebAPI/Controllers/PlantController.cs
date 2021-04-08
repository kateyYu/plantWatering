using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly IConfiguration _configuration;
    
        public PlantController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //list all plants
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    SELECT PlantId, PlantName, WaterDateTime, IsWatering FROM dbo.Plant
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PlantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        //create record
        [HttpPost]
        public JsonResult Post(Plant plant)
        {
            string query = @"
                    insert into dbo.plant 
                    (PlantName, WaterDateTime, IsWatering)
                    values 
                    (
                    '" + plant.PlantName + @"' ,
                    '" + plant.WaterDateTime + @"' ,
                    '" + plant.IsWatering + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PlantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        //change plant watering status
        [HttpPut]
        public JsonResult Put(Plant plant)
        {
            string isWatering = plant.IsWatering.ToString().ToUpper();
            int isWateringVal = (string.Equals(isWatering ,"TRUE")) ? 1 : 0;
               string query = @"
                    update dbo.Plant set 
                    WaterDateTime = '" + plant.WaterDateTime + @"',
                    IsWatering = '" + isWateringVal + @"'
                    where PlantId = " + plant.PlantId + @" 
                    ";
             DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PlantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        //delete plant
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Plant
                    where PlantId = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PlantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
