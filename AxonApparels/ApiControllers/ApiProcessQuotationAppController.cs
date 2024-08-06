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

    public class ProcessQuotationApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apiprocessquoteapprovalmain")]
        public async Task<IHttpActionResult> ProcessApprovalmain([FromUri] string approved)
        {

            var processquotemain = new List<ApiProcessQuotationApp>();

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("Proc_Apparel_ProcessQuoteMainAPI", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ApprovedStatus", approved);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var processquoteappmain = new ApiProcessQuotationApp
                                {
                                    Quoteid = reader.GetInt32(reader.GetOrdinal("Quoteid")),
                                    QuoteNo = reader.GetString(reader.GetOrdinal("QuoteNo")),
                                    Quotedate = reader.GetDateTime(reader.GetOrdinal("Process_QuoteDate")).ToString("yyyy-MM-dd"),
                                    Supplier = reader.GetString(reader.GetOrdinal("Supplier")),
                                    BuyOrdgeneral = reader.GetString(reader.GetOrdinal("BuyOrdGeneral")),
                                    ApprovedStatus = reader.GetString(reader.GetOrdinal("ApprovedStatus"))

                                };

                                processquotemain.Add(processquoteappmain);
                            }
                        }
                    }
                }
            }

            return Ok(new
            {
                success = processquotemain.Any(),
                message = processquotemain.Any() ? null : "No purchases found for the specified parameters.",
                processquotemain
            });
        }
        [HttpGet]
        [Route("api/apiprocessquoteapprovaledit")]
        public async Task<IHttpActionResult> ProcessApprovaledit([FromUri] int quoteid)
        {

            var processquoteedit = new List<ApiProcessQuotationedit>();

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("Proc_Apparel_ProcessQuoteAPIEdit", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Quoteid", quoteid);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var processquoteappedit = new ApiProcessQuotationedit
                                {
                                    Quoteid = reader.GetInt32(reader.GetOrdinal("Quoteid")),
                                    BuyordNo = reader.IsDBNull(reader.GetOrdinal("Order_No")) ? null : reader.GetString(reader.GetOrdinal("Order_No")),
                                    Item = reader.GetString(reader.GetOrdinal("Item")),
                                    Color = reader.GetString(reader.GetOrdinal("Color")),
                                    size = reader.GetString(reader.GetOrdinal("size")),
                                    Uom = reader.GetString(reader.GetOrdinal("uom")),
                                    rate = reader.GetDecimal(reader.GetOrdinal("Rate")),
                                    AppRate = reader.GetDecimal(reader.GetOrdinal("Apprate")),
                                    MinQty = reader.GetDecimal(reader.GetOrdinal("MinQty")),
                                    ApprovedStatus = reader.GetString(reader.GetOrdinal("ApprovedStatus")),
                                    Image = reader.IsDBNull(reader.GetOrdinal("Imgpath")) ? null : reader.GetString(reader.GetOrdinal("Imgpath")),


                                };

                                processquoteedit.Add(processquoteappedit);
                            }
                        }
                    }
                }
            }

            return Ok(new
            {
                success = processquoteedit.Any(),
                message = processquoteedit.Any() ? null : "No purchases found for the specified parameters.",
                processquoteedit
            });
        }
    }
}
