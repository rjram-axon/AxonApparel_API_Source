using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Contract.Api;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class ApiStylGalleryController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        IApiStyleGalleryBusiness ApiStyle = new ApiStyleGalleryBusiness();
        // GET api/apistylgallery
        [HttpGet]
        public IQueryable<BuyOrdImg> Get()
        {
            return ApiStyle.GetStyleimagelist();
        }

        // GET api/apistylgallery/5
        [HttpGet]
        public string Get(int id)
        {
            return ApiStyle.GetStyledetails(id);
        }
        [HttpGet]
        [Route("api/getstyledetails")]
        public IHttpActionResult GetStyleDetails(int styleid)
        {
            if (styleid <= 0)
            {
                return BadRequest("Invalid Styleid parameter.");
            }

            string sqlQuery = "Proc_GetStyleDetails";  // Name of the stored procedure

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Styleid", styleid);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var styleDetails = new List<Apistyledetail>();

                            while (reader.Read())
                            {
                                var details = new Apistyledetail
                                {
                                    Buyer = reader.IsDBNull(reader.GetOrdinal("buyer")) ? null : reader.GetString(reader.GetOrdinal("buyer")),
                                    OrderNo = reader.IsDBNull(reader.GetOrdinal("order_no")) ? null : reader.GetString(reader.GetOrdinal("order_no")),
                                    RefNo = reader.IsDBNull(reader.GetOrdinal("Ref_No")) ? null : reader.GetString(reader.GetOrdinal("Ref_No")),
                                    Style = reader.IsDBNull(reader.GetOrdinal("style")) ? null : reader.GetString(reader.GetOrdinal("style")),
                                    Quantity = reader.IsDBNull(reader.GetOrdinal("Quantity")) ? 0M : Convert.ToDecimal(reader["Quantity"]),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                    OrderQty = reader.IsDBNull(reader.GetOrdinal("OrderQty")) ? 0M : Convert.ToDecimal(reader["OrderQty"]),
                                    ProductionQty = reader.IsDBNull(reader.GetOrdinal("Productionqty")) ? 0M : Convert.ToDecimal(reader["Productionqty"]),
                                    DespQty = reader.IsDBNull(reader.GetOrdinal("DespQty")) ? 0M : Convert.ToDecimal(reader["DespQty"]),
                                    Imgpath = reader.IsDBNull(reader.GetOrdinal("Imgpath")) ? string.Empty : reader.GetString(reader.GetOrdinal("Imgpath"))
                                };

                                styleDetails.Add(details);
                            }

                            return Ok(new { success = true, styleDetails });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No style details found for the specified Styleid." });
                        }
                    }
                }
            }
        }


        // POST api/apistylgallery
        public void Post([FromBody]string value)
        {
        }

        // PUT api/apistylgallery/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apistylgallery/5
        public void Delete(int id)
        {
        }
    }
}
