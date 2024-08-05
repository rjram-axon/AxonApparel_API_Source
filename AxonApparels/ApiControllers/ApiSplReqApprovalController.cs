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

    public class ApiSplReqApprovalController : ApiController
    {

        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apisplreqapproval")]
        public IHttpActionResult PurchaseApproval()
        {
            // Read query string parameter IsApproved
            var isApproved = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "isapproved").Value;
            if (string.IsNullOrEmpty(isApproved))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }

            string sqlQuery = @"SELECT * from vw_Special_req
                                WHERE IsApproved = @IsApproved";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@IsApproved", isApproved);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var splreqs = new List<ApiSplReqdetails>();

                            while (reader.Read())
                            {
                                var splreq = new ApiSplReqdetails
                                {
                                    Req_id = reader.GetInt32(reader.GetOrdinal("Spl_Reqid")),
                                    Spl_Req_no = reader.GetString(reader.GetOrdinal("Spl_Req_no")),
                                    Ref_No = reader.GetString(reader.GetOrdinal("refno")),
                                    OrderNo = reader.IsDBNull(reader.GetOrdinal("order_no")) ? null : reader.GetString(reader.GetOrdinal("order_no")),
                                    Job_ord_no = reader.GetString(reader.GetOrdinal("Job_Ord_No")),
                                    OrderDate = reader.GetDateTime(reader.GetOrdinal("Ref_Date")).ToString("dd-MM-yyyy"),
                                    IsApproved = reader.GetString(reader.GetOrdinal("IsApproved")),

                                };

                                splreqs.Add(splreq);
                            }

                            return Ok(new { success = true, splreqs });
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
        [Route("api/apisplreqappItemedit")]
        public async Task<IHttpActionResult> ProcessApprovallast([FromUri] int reqid)
        {

            var splreqedit = new List<ApiSplReqeditdetails>();

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("Proc_Splreqappeditgrid", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@reqid", reqid);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var splreqeditedititem = new ApiSplReqeditdetails
                                {
                                    Reqid = reader.GetInt32(reader.GetOrdinal("Spl_Reqid")),
                                    Reqdetid = reader.GetInt32(reader.GetOrdinal("Spl_Req_Detid")),
                                    Job_ord_no = reader.GetString(reader.GetOrdinal("Job_Ord_No")),
                                    Item = reader.GetString(reader.GetOrdinal("Item")),
                                    Color = reader.GetString(reader.GetOrdinal("Color")),
                                    Size = reader.GetString(reader.GetOrdinal("Size")),
                                    Unit = reader.GetString(reader.GetOrdinal("uom")),
                                    Quantity = reader.GetDecimal(reader.GetOrdinal("Quantity")),
                                    Mode = reader.GetString(reader.GetOrdinal("Conv_mode")),
                                    PurUnit = reader.GetString(reader.GetOrdinal("puruom")),
                                    AppQuantity = reader.GetDecimal(reader.GetOrdinal("appqty")),
                                    AppRate = reader.GetDecimal(reader.GetOrdinal("App_rate")),
                                    IsApproved = reader.GetString(reader.GetOrdinal("IsApproved")),

                                };

                                splreqedit.Add(splreqeditedititem);
                            }
                        }
                    }
                }
            }

            return Ok(new
            {
                success = splreqedit.Any(),
                message = splreqedit.Any() ? null : "No purchases found for the specified parameters.",
                splreqedit
            });
        }
        [HttpPut]
        [Route("api/updatesplreqapproval/{jobordno}")]
        public IHttpActionResult UpdateProcessprgApproval(string JobOrdNo, [FromBody] JObject requestBody)
        {
            var IsApproved = requestBody["IsApproved"].ToString();

            string sqlQuery = @"UPDATE Job_Ord_Mas 
                        SET IsApproved = @IsApproved
                        WHERE Job_Ord_No = @Job_Ord_No";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@IsApproved", IsApproved);
                    command.Parameters.AddWithValue("@Job_Ord_No", JobOrdNo);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { success = true, message = "Special Requition updated successfully." });
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
