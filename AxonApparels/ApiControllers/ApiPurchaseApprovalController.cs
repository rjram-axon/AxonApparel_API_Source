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
    public class ApiPurchaseApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apipurchaseapproval")]
        public IHttpActionResult PurchaseApproval()
        {
            // Read query string parameter IsApproved
            var isApproved = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "isapproved").Value;
            if (string.IsNullOrEmpty(isApproved))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }

            string sqlQuery = @"SELECT * from Vw_DispPurchaseApproval
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
                            var purchases = new List<PurchaseOrder>();

                            while (reader.Read())
                            {
                                var purchase = new PurchaseOrder
                                {
                                    OrderNo = reader.IsDBNull(reader.GetOrdinal("order_no")) ? null : reader.GetString(reader.GetOrdinal("order_no")),
                                    PurOrdId = reader.GetInt32(reader.GetOrdinal("pur_ord_id")),
                                    PO_Number = reader.GetString(reader.GetOrdinal("po_number")),
                                    Item = reader.GetString(reader.GetOrdinal("item")),
                                    Style = reader.IsDBNull(reader.GetOrdinal("style")) ? null : reader.GetString(reader.GetOrdinal("style")),
                                    Colour = reader.IsDBNull(reader.GetOrdinal("color")) ? null : reader.GetString(reader.GetOrdinal("color")),
                                    Reference = reader.GetString(reader.GetOrdinal("Reference")),
                                    OrderDate = reader.GetDateTime(reader.GetOrdinal("order_date")).ToString("yyyy-MM-dd"),
                                    Quantity = reader.GetDecimal(reader.GetOrdinal("quantity")),
                                    Rate = reader.GetDecimal(reader.GetOrdinal("rate")),
                                    TotalAmount = reader.GetDecimal(reader.GetOrdinal("total_amount")),
                                    Supplier = reader.GetString(reader.GetOrdinal("Supplier")),
                                    IsApproved = reader.GetString(reader.GetOrdinal("isapproved"))
                                };

                                purchases.Add(purchase);
                            }

                            return Ok(new { success = true, purchases });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No purchases found for the specified IsApproved value." });
                        }
                    }
                }
            }
        }
        [HttpPut]
        [Route("api/updatepurchaseapproval/{purOrdNo}")]
        public IHttpActionResult UpdatePurchaseApproval(string purOrdNo, [FromBody] JObject requestBody)
        {
            var isApproved = requestBody["isApproved"].ToString();

            string sqlQuery = @"UPDATE Pur_Ord_Mas 
                        SET IsApproved = @IsApproved
                        WHERE pur_ord_no = @PurOrdNo";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@IsApproved", isApproved);
                    command.Parameters.AddWithValue("@PurOrdNo", purOrdNo);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { success = true, message = "Purchase approval updated successfully." });
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
