using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using AxonApparel.Contract.Api;
using Newtonsoft.Json.Linq;

namespace AxonApparels.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ApiProcessPrgApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apiprocessprgapproval")]
        public IHttpActionResult ProcessApproval()
        {
            // Read query string parameter IsApproved
            var Approved = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "approved").Value;
            if (string.IsNullOrEmpty(Approved))
            {
                // Handle missing query parameter
                return BadRequest("Missing Approved parameter.");
            }

            string sqlQuery = @"select * from Vw_apiProcessprgapprovalmain where Approved = @Approved";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@Approved", Approved);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var processprglist = new List<ApiProcessPrgAppdetails>();

                            while (reader.Read())
                            {
                                var processprg = new ApiProcessPrgAppdetails
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("id")),
                                    Orderno = reader.IsDBNull(reader.GetOrdinal("order_no")) ? null : reader.GetString(reader.GetOrdinal("order_no")),
                                    Refno = reader.GetString(reader.GetOrdinal("ref_no")),
                                    Style = reader.IsDBNull(reader.GetOrdinal("Style")) ? null : reader.GetString(reader.GetOrdinal("Style")),
                                    Quantity = reader.GetDecimal(reader.GetOrdinal("Quantity")),
                                    Approved = reader.GetString(reader.GetOrdinal("Approved"))
                                };

                                processprglist.Add(processprg);
                            }

                            return Ok(new { success = true, processprglist });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No purchases found for the specified Approved value." });
                        }
                    }
                }
            }
        }
        [HttpGet]
        [Route("api/apiprocessprgappItem")]
        public async Task<IHttpActionResult> ProcessApprovalOverlay([FromUri] int id, [FromUri] string approved)
        {
            if (string.IsNullOrEmpty(approved))
            {
                return BadRequest("Missing Approved parameter.");
            }

            var processprglist = new List<ApiProcessPrgAppOverlaydetails>();

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("Proc_Apparel_ProcessprgAppOverlayDetails", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@Approved", approved);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var processprgoverlay = new ApiProcessPrgAppOverlaydetails
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("id")),
                                    Orderno = reader.IsDBNull(reader.GetOrdinal("Order_no")) ? null : reader.GetString(reader.GetOrdinal("Order_no")),
                                    Refno = reader.GetString(reader.GetOrdinal("ref_no")),
                                    Style = reader.IsDBNull(reader.GetOrdinal("Style")) ? null : reader.GetString(reader.GetOrdinal("Style")),
                                    Quantity = reader.GetDecimal(reader.GetOrdinal("Quantity")),
                                    ProdPrgid = reader.GetInt32(reader.GetOrdinal("prodPrgId")),
                                    ProdPrgNo = reader.IsDBNull(reader.GetOrdinal("ProdPrgNo")) ? null : reader.GetString(reader.GetOrdinal("ProdPrgNo")),
                                    Process = reader.GetString(reader.GetOrdinal("Process")),
                                    ProgramDate = reader.GetDateTime(reader.GetOrdinal("progdate")).ToString("yyyy-MM-dd"),
                                    Approved = reader.GetString(reader.GetOrdinal("Approved"))
                                };

                                processprglist.Add(processprgoverlay);
                            }
                        }
                    }
                }
            }

            return Ok(new
            {
                success = processprglist.Any(),
                message = processprglist.Any() ? null : "No purchases found for the specified parameters.",
                processprglist
            });
        }
        [HttpGet]
        [Route("api/apiprocessprgappItemedit")]
        public async Task<IHttpActionResult> ProcessApprovallast([FromUri] int id)
        {
            
            var processprgedit = new List<ProcessPrgAppEdit>();

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("Proc_Apparel_ProdProgrammingEditList", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var processprgedititem = new ProcessPrgAppEdit
                                {
                                    ProdPrgNo = reader.IsDBNull(reader.GetOrdinal("ProdPrgNo")) ? null : reader.GetString(reader.GetOrdinal("ProdPrgNo")),
                                    Item = reader.IsDBNull(reader.GetOrdinal("item")) ? null : reader.GetString(reader.GetOrdinal("item")),
                                    Color = reader.GetString(reader.GetOrdinal("color")),
                                    Size = reader.GetString(reader.GetOrdinal("size")),
                                    Unit = reader.GetString(reader.GetOrdinal("UOM")),
                                    ProgramQuantity = reader.GetDecimal(reader.GetOrdinal("Prog_Op_Qty")),
                                    InOrOut = reader.GetString(reader.GetOrdinal("InorOut")),
                                    Approved = reader.GetString(reader.GetOrdinal("Approved"))
                                };

                                processprgedit.Add(processprgedititem);
                            }
                        }
                    }
                }
            }

            return Ok(new
            {
                success = processprgedit.Any(),
                message = processprgedit.Any() ? null : "No purchases found for the specified parameters.",
                processprgedit
            });
        }
        [HttpPut]
        [Route("api/updateprocessprgapproval/{prodPrgNo}")]
        public IHttpActionResult UpdateProcessprgApproval(string prodPrgNo, [FromBody] JObject requestBody)
        {
            var Approved = requestBody["Approved"].ToString();

            string sqlQuery = @"UPDATE Prod_Prg_Mas 
                        SET Approved = @Approved
                        WHERE ProdPrgNo = @ProdPrgNo";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@Approved", Approved);
                    command.Parameters.AddWithValue("@ProdPrgNo", prodPrgNo);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { success = true, message = "Process Program approval updated successfully." });
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
