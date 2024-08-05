using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AxonApparel.Contract.Api;
using Newtonsoft.Json.Linq;

namespace AxonApparels.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ApiProcessOrdApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;
        //
        // GET: /ApiProcessOrdApproval/
        [HttpGet]
        [Route("api/apiprocessordapproval")]
        public IHttpActionResult ProcessOrderApproval()
        {
            // Read query string parameter IsApproved


            var Approved = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "approved").Value;
            if (string.IsNullOrEmpty(Approved))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }
            string sqlQuery = @"SELECT * from Vw_processordapprovalmain where Approved = @approved";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@approved", Approved);


                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var processes = new List<ApiProcess>();

                            while (reader.Read())
                            {
                                var process = new ApiProcess
                                {
                                    processordid=reader.GetInt32(reader.GetOrdinal("processordid")),
                                   processorder = reader.IsDBNull(reader.GetOrdinal("processorder")) ? null : reader.GetString(reader.GetOrdinal("processorder")),
                                   ProcessOrdate = reader.GetDateTime(reader.GetOrdinal("ProcessOrdate")),
                                    CompanyName = reader.GetString(reader.GetOrdinal("CompanyName")),
                                    CompanyUnit = reader.GetString(reader.GetOrdinal("CompanyUnit")),
                                    Process = reader.IsDBNull(reader.GetOrdinal("Process")) ? null : reader.GetString(reader.GetOrdinal("Process")),
                                    Processor = reader.IsDBNull(reader.GetOrdinal("Processor")) ? null : reader.GetString(reader.GetOrdinal("Processor")),
                                    Approved = reader.GetString(reader.GetOrdinal("Approved")),

                                };

                                processes.Add(process);
                            }

                            return Ok(new { success = true,processes });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No purchases found for the specified IsApproved value." });
                        }
                    }
                }
            }
        }
        [HttpGet]
        [Route("api/appparelprocordereditoutitemdet")]
        public IHttpActionResult GetApparelProcOrdEditOutItemDet(int procid)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString; // Replace with your connection string
            List<ApparelProcOrdEditOutItemDet> result = new List<ApparelProcOrdEditOutItemDet>();

            string sqlQuery = "EXEC Proc_Apparel_ProcOrdEditOutItem @procid";

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@procid", procid);
                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var item = new ApparelProcOrdEditOutItemDet
                            {
                                processorder = reader.IsDBNull(reader.GetOrdinal("processorder")) ? null : reader.GetString(reader.GetOrdinal("processorder")),
                                ProdPrgNo = reader.GetString(reader.GetOrdinal("ProdPrgNo")),
                                Job_ord_no=reader.GetString(reader.GetOrdinal("Job_ord_no")),
                                item = reader.GetString(reader.GetOrdinal("item")),
                                color=reader.GetString(reader.GetOrdinal("color")),
                                size=reader.GetString(reader.GetOrdinal("size")),
                                prog_op_qty = reader.GetDecimal(reader.GetOrdinal("prog_op_qty")),
                                rate = reader.GetDecimal(reader.GetOrdinal("rate")),
                                AppRate = reader.GetDecimal(reader.GetOrdinal("AppRate")),
                                Approved = reader.GetString(reader.GetOrdinal("Approved")),

                            };

                            result.Add(item);
                        }
                    }
                }
            }

            return Ok(new { success = true, data = result });
        }
        [HttpPut]
        [Route("api/updateprocessapproval/{proOrdNo}")]
        public IHttpActionResult UpdateProcessApproval(string proOrdNo, [FromBody] JObject requestBody)
        {
            // Check if the requestBody or the "isApproved" key is null
            if (requestBody == null || requestBody["isApproved"] == null)
            {
                return BadRequest("Invalid request body or missing 'Approved' key.");
            }

            // Extract the "Approved" value from the request body
            var isApproved = requestBody["isApproved"].ToString();

            // Define the SQL query to update the Process_Ord_Mas table
            string sqlQuery = @"UPDATE Process_Ord_Mas 
                        SET Approved = @Approved
                        WHERE processorder = @ProOrdNo";

            // Establish a connection to the database
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Create a SQL command to execute the query
                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    // Add parameters to the SQL command
                    command.Parameters.AddWithValue("@Approved", isApproved);
                    command.Parameters.AddWithValue("@ProOrdNo", proOrdNo);

                    // Execute the query and get the number of rows affected
                    int rowsAffected = command.ExecuteNonQuery();

                    // Return an appropriate response based on the result
                    if (rowsAffected > 0)
                    {
                        return Ok(new { success = true, message = "Process approval updated successfully." });
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
        }


    }

}
