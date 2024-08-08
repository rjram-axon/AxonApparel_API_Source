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

    public class PurchaseQuotationApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apipurchasequoteapproval")]
        public IHttpActionResult PurchaseQuotationApproval()
        {
            // Read query string parameter IsApproved
            var isApproved = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "isapproved").Value;
            if (string.IsNullOrEmpty(isApproved))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }

            string sqlQuery = @"SELECT * from Vw_PurchaseQuotationApp
                                WHERE ApprovedStatus = @IsApproved";

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
                            var purchasequotes = new List<ApiPurchaseQuotationApp>();

                            while (reader.Read())
                            {
                                var purchasequote = new ApiPurchaseQuotationApp
                                {
                                    Quoteid = reader.GetInt32(reader.GetOrdinal("Quoteid")),
                                    QuoteNo = reader.GetString(reader.GetOrdinal("QuoteNo")),
                                    EntryNo = reader.GetString(reader.GetOrdinal("EntryNo")),
                                    EntryDate = reader.GetDateTime(reader.GetOrdinal("Entrydate")).ToString("yyyy-MM-dd"),
                                    Quotedate = reader.GetDateTime(reader.GetOrdinal("QuoteDate")).ToString("yyyy-MM-dd"),
                                    Supplier = reader.GetString(reader.GetOrdinal("Supplier")),
                                    BuyOrdgeneral = reader.GetString(reader.GetOrdinal("BuyOrdGeneral")),
                                    ApprovedStatus = reader.GetString(reader.GetOrdinal("ApprovedStatus"))
                                };

                                purchasequotes.Add(purchasequote);
                            }

                            return Ok(new { success = true, purchasequotes });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No purchase Quotation found for the specified Approved value." });
                        }
                    }
                }
            }
        }
        [HttpGet]
        [Route("api/apipurchasequoteedit")]
        public IHttpActionResult PurchaseQuotationedit()
        {
            // Read query string parameter IsApproved
            var Quoteid = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "quoteid").Value;
            if (string.IsNullOrEmpty(Quoteid))
            {
                // Handle missing query parameter
                return BadRequest("Missing Quoteid parameter.");
            }

            string sqlQuery = @"SELECT * from Vw_PurchaseQuotationApprovepage
                                WHERE Quoteid = @Quoteid";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@Quoteid", Quoteid);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var purchasequotes = new List<ApiPurchaseQuotationedit>();

                            while (reader.Read())
                            {
                                var purchasequote = new ApiPurchaseQuotationedit
                                {
                                    Quoteid = reader.GetInt32(reader.GetOrdinal("Quoteid")),
                                    Process_Quote_detid = reader.GetInt32(reader.GetOrdinal("QuoteDetid")),
                                    BuyordNo = reader.IsDBNull(reader.GetOrdinal("Buy_ord_no")) ? null : reader.GetString(reader.GetOrdinal("Buy_ord_no")),
                                    Item = reader.GetString(reader.GetOrdinal("Item")),
                                    Color = reader.GetString(reader.GetOrdinal("Color")),
                                    Size = reader.GetString(reader.GetOrdinal("size")),
                                    UOM = reader.GetString(reader.GetOrdinal("uom")),
                                    Rate = reader.GetDecimal(reader.GetOrdinal("Rate")),
                                    Apprate = reader.GetDecimal(reader.GetOrdinal("Apprate")),
                                    MinQty = reader.GetDecimal(reader.GetOrdinal("MinQty")),
                                    MaxQty =reader.GetDecimal(reader.GetOrdinal("MaxQty")),
                                    ApprovedStatus = reader.GetString(reader.GetOrdinal("ApprovedStatus")),
                                    Image = reader.IsDBNull(reader.GetOrdinal("Imgpath")) ? null : reader.GetString(reader.GetOrdinal("Imgpath")),


                                };

                                purchasequotes.Add(purchasequote);
                            }

                            return Ok(new { success = true, purchasequotes });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No purchase Quotation found for the specified Approved value." });
                        }
                    }
                }
            }
        }
        [HttpPut]
        [Route("api/updatepurchasequoteapproval/{Quoteid}")]
        public IHttpActionResult UpdatePurchasequoteApproval(int Quoteid, [FromBody] JObject requestBody)
        {
            var quoteDetid = (int)requestBody["QuoteDetid"];
            var newApprate = (decimal)requestBody["NewApprate"];
            var isApproved = requestBody["isApproved"].ToString();

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand("UpdatePurchasequote", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@QuoteDetid", quoteDetid);
                    command.Parameters.AddWithValue("@Quoteid", Quoteid);
                    command.Parameters.AddWithValue("@NewApprate", newApprate);
                    command.Parameters.AddWithValue("@NewApprovedStatus", isApproved);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { success = true, message = "PurchaseQuote approval updated successfully." });
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
