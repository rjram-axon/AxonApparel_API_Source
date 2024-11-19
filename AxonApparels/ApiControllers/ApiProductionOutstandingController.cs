using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class ApiProductionOutstandingController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apiproductionoutstanding")]
        public async Task<IHttpActionResult> ProductionOutstanding()
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string sqlQuery = @"SELECT * from Vw_APIProductionOutstandingDetails";
                    using (var command = new SqlCommand(sqlQuery, connection))
                    {
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                var productions = new List<ApiProductionOutstabdingDetails>();

                                while (await reader.ReadAsync())
                                {
                                    try
                                    {
                                        Console.WriteLine("Reading CuttingOrderNo...");
                                        var cuttingOrderNo = reader.IsDBNull(reader.GetOrdinal("CuttingOrderNo")) ? null : reader.GetString(reader.GetOrdinal("CuttingOrderNo"));

                                        Console.WriteLine("Reading Styleid...");
                                        var styleid = reader.IsDBNull(reader.GetOrdinal("Styleid")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("Styleid"));

                                        Console.WriteLine("Reading Process...");
                                        var process = reader.GetString(reader.GetOrdinal("Process"));

                                        Console.WriteLine("Reading Order_No...");
                                        var orderNo = reader.GetString(reader.GetOrdinal("Order_No"));

                                        Console.WriteLine("Reading Style...");
                                        var style = reader.IsDBNull(reader.GetOrdinal("Style")) ? null : reader.GetString(reader.GetOrdinal("Style"));

                                        Console.WriteLine("Reading Supplier...");
                                        var supplier = reader.IsDBNull(reader.GetOrdinal("Supplier")) ? null : reader.GetString(reader.GetOrdinal("Supplier"));

                                        Console.WriteLine("Reading Colorname...");
                                        var colorname = reader.GetString(reader.GetOrdinal("Colorname"));

                                        Console.WriteLine("Reading DeliveryDate...");
                                        var deliveryDate = reader.GetDateTime(reader.GetOrdinal("DeliveryDate")).ToString("yyyy-MM-dd");

                                        Console.WriteLine("Reading Issuedqty...");
                                        var issuedqty = reader.GetDecimal(reader.GetOrdinal("Issuedqty"));

                                        Console.WriteLine("Reading OrderQty...");
                                        var orderQty = reader.GetDecimal(reader.GetOrdinal("OrderQty"));

                                        Console.WriteLine("Reading size...");
                                        var size = reader.GetString(reader.GetOrdinal("size"));

                                        Console.WriteLine("Reading Recptitem...");
                                        var recptitem = reader.GetString(reader.GetOrdinal("Recptitem"));

                                        Console.WriteLine("Reading Recptcolor...");
                                        var recptcolor = reader.GetString(reader.GetOrdinal("Recptcolor"));

                                        Console.WriteLine("Reading Recptsize...");
                                        var recptsize = reader.GetString(reader.GetOrdinal("Recptsize"));

                                        Console.WriteLine("Reading CuttingRecptNo...");
                                        var cuttingRecptNo = reader.IsDBNull(reader.GetOrdinal("CuttingRecptNo")) ? null : reader.GetString(reader.GetOrdinal("CuttingRecptNo"));

                                        Console.WriteLine("Reading DCNo...");
                                        var dcNo = reader.GetString(reader.GetOrdinal("DCNo"));

                                        Console.WriteLine("Reading RecptUom...");
                                        var recptUom = reader.GetString(reader.GetOrdinal("RecptUom"));

                                        Console.WriteLine("Reading IssueUom...");
                                        var issueUom = reader.GetString(reader.GetOrdinal("IssueUom"));

                                        Console.WriteLine("Reading RecptQty...");
                                        var recptQty = reader.IsDBNull(reader.GetOrdinal("RecptQty")) ? 0 : reader.GetDecimal(reader.GetOrdinal("RecptQty"));


                                        Console.WriteLine("Reading Recptwgt...");
                                        var recptwgt = reader.GetDecimal(reader.GetOrdinal("Recptwgt"));

                                        Console.WriteLine("Reading Grammage...");
                                        var grammage = reader.GetDecimal(reader.GetOrdinal("Grammage"));

                                        Console.WriteLine("Reading OrderIssueqty...");
                                        var orderIssueqty = reader.GetDecimal(reader.GetOrdinal("OrderIssueqty"));

                                        Console.WriteLine("Reading orderReturnqty...");
                                        var orderReturnqty = reader.GetDecimal(reader.GetOrdinal("orderReturnqty"));

                                        Console.WriteLine("Reading orderRecptqty...");
                                        var orderRecptqty = reader.GetDecimal(reader.GetOrdinal("orderRecptqty"));

                                        Console.WriteLine("Reading ordrecptwgt...");
                                        var ordrecptwgt = reader.GetDecimal(reader.GetOrdinal("ordrecptwgt"));

                                        Console.WriteLine("Reading OrderwiseOrdQty...");
                                        var orderwiseOrdQty = reader.GetDecimal(reader.GetOrdinal("OrderwiseOrdQty"));

                                        var production = new ApiProductionOutstabdingDetails
                                        {
                                            CuttingOrderNo = cuttingOrderNo,
                                            Styleid = styleid.HasValue ? styleid.Value : 0, // Use 0 if null
                                            Process = process,
                                            Order_No = orderNo,
                                            Style = style,
                                            Supplier = supplier,
                                            Colorname = colorname,
                                            DeliveryDate = deliveryDate,
                                            Issuedqty = issuedqty,
                                            OrderQty = orderQty,
                                            size = size,
                                            Recptitem = recptitem,
                                            Recptcolor = recptcolor,
                                            Recptsize = recptsize,
                                            CuttingRecptNo = cuttingRecptNo,
                                            DCNo = dcNo,
                                            RecptUom = recptUom,
                                            IssueUom = issueUom,
                                            RecptQty = recptQty,
                                            Recptwgt = recptwgt,
                                            Grammage = grammage,
                                            OrderIssueqty = orderIssueqty,
                                            orderReturnqty = orderReturnqty,
                                            orderRecptqty = orderRecptqty,
                                            ordrecptwgt = ordrecptwgt,
                                            OrderwiseOrdQty = orderwiseOrdQty
                                        };

                                        productions.Add(production);
                                    }
                                    catch (InvalidCastException ex)
                                    {
                                        // Log specific field causing the exception
                                        Console.WriteLine("Data type mismatch found: " + ex.Message);
                                        throw;
                                    }
                                }

                                return Ok(new { success = true, productions });
                            }
                            else
                            {
                                return Ok(new { success = false, message = "No Production Outstanding found." });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
