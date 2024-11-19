using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Contract.Api;
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

    public class ApiPurchaseOutstandingController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;
        [HttpGet]
        [Route("api/apipurchaseoutstandingdetails")]
        public IHttpActionResult PurchaseOutstandingDetails()
        {
            // Read query string parameter supplierid
            var supplieridStr = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "supplierid").Value;

            if (string.IsNullOrEmpty(supplieridStr) || !int.TryParse(supplieridStr, out int supplierid))
            {
                // Handle missing or invalid query parameter
                return BadRequest("Invalid or missing supplierid parameter.");
            }

            // Use the stored procedure in the query
            string storedProcedure = "Proc_Apparel_ApiSupplierOutstandingPurchasedetails";

            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

                    using (var command = new SqlCommand(storedProcedure, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@supplierid", supplierid);

                        using (var reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                var purchases = new List<PurchaseOuststanding>();

                                while (reader.Read())
                                {
                                    var purchase = new PurchaseOuststanding
                                    {
                                        PurOrdId = reader.GetInt32(reader.GetOrdinal("pur_ord_id")),
                                        PO_Number = reader.GetString(reader.GetOrdinal("pur_ord_no")),
                                        Item = reader.GetString(reader.GetOrdinal("Item")),
                                        Receivedquantity = reader.GetDecimal(reader.GetOrdinal("ReceivedQty")),
                                        Balancequantity = reader.GetDecimal(reader.GetOrdinal("balanceqty")),
                                        Supplier = reader.GetString(reader.GetOrdinal("supplier")),
                                    };

                                    purchases.Add(purchase);
                                }

                                return Ok(new { success = true, purchases });
                            }
                            else
                            {
                                return Ok(new { success = false, message = "No purchases found for the specified supplierid." });
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
        [HttpGet]
        [Route("api/apipurchaseoutorderdetails")]
        public IHttpActionResult PurchaseOutorderDetails()
        {
            // Read query string parameter IsApproved
            var PO_Number = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "ponumber").Value;
            if (string.IsNullOrEmpty(PO_Number))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }

            string sqlQuery = @"SELECT * from Vw_DispPurchaseApproval
                                WHERE PO_Number = @PONumber";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@PONumber", PO_Number);

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
        IApiPurchaseoutstandingBusiness IApipur = new ApiPurchaseoutstandingBusiness();
        // GET api/apipurchaseoutstanding
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        // GET api/apipurchaseoutstanding/5
        public List<string> Get(int id)
        {
            return IApipur.GetPurchaseoutstandingbasedupllier(id);
        }

        [HttpGet]
        public List<string> Get()
        {
            return IApipur.GetPurchaseoutstangindetails();
        }

        // POST api/apipurchaseoutstanding
        public void Post([FromBody]string value)
        {

        }

        // PUT api/apipurchaseoutstanding/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apipurchaseoutstanding/5
        public void Delete(int id)
        {
        }

    }
}
