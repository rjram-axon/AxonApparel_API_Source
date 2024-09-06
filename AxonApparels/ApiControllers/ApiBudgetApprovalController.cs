using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;

using AxonApparel.Contract.Api;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;


namespace AxonApparels.ApiControllers
{
    public class ApiBudgetApprovalController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        IApiBudgetApprovalBusiness Budget = new ApiBudgetApprovalBusiness();

        // GET api/apibudgetapproval
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/apibudgetapproval/5
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet]
        public IQueryable<BudgetApproval> Get( string type, string ordtype, string fromdate, string todate)
        {
            return Budget.LoadMaingrid( type, ordtype, fromdate, todate);
        }

        // GET api/apibudgetapproval
        [HttpGet]
        public virtual Budgetdetails Get(string orderno, int styleid)
        {
               return Budget.GetAlldetials(orderno, styleid); 
        }
        
        // POST api/apibudgetapproval
        [HttpPost]
        public bool Post([FromBody] BudgetApproveMaster budget)
        {
            return Budget.UpdateBudgetDetails(budget);
        }

        ////PUT api/apibudgetapproval/5
        //[HttpPut]
        //public bool Put([FromBody] BudgetApprovedetails budget)
        //{
        //    return Budget.updateitembudgetdetails(budget);
        //}
        // PUT api/budgetapproval/update
        [HttpPut]
        [Route("api/updatebudgetapproval")]
        public IHttpActionResult UpdateBudget([FromBody] List<BudgetApprovedetails> budgetDetails)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    foreach (var budget in budgetDetails)
                    {
                        if (budget.AppRate > 0)
                        {
                            string sqlQuery = @"UPDATE Cost_Defn_BOM 
                                        SET AppRate = @AppRate, AppQty = @AppQty 
                                        WHERE Cost_Defn_BOMid = @Cost_Defn_BOMid";

                            using (var command = new SqlCommand(sqlQuery, connection))
                            {
                                command.Parameters.AddWithValue("@AppRate", budget.AppRate);
                                command.Parameters.AddWithValue("@AppQty", budget.AppQty);
                                command.Parameters.AddWithValue("@Cost_Defn_BOMid", budget.cost_defn_bomid);

                                int rowsAffected = command.ExecuteNonQuery();

                                if (rowsAffected == 0)
                                {
                                    // Collect a message or flag for the failed update
                                    // but don't exit the loop or return response yet
                                    // You can accumulate errors or just note the failure for summary
                                    Console.WriteLine($"No record found for Cost_Defn_BOMid = {budget.cost_defn_bomid}");
                                }
                            }
                        }
                        else
                        {
                            // Collect a message or flag for invalid AppRate
                            // but don't exit the loop or return response yet
                            Console.WriteLine($"Invalid AppRate for Cost_Defn_BOMid = {budget.cost_defn_bomid}");
                        }
                    }
                }

                // After processing all items, return a consolidated success message
                return Ok(new { success = true, message = "All budget details processed." });
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.WriteLine($"Exception: {ex.Message}");
                // Return a generic error message
                return NotFound();
            }
        }

        [HttpPut]
        [Route("api/revertbudgetapproval")]
        public IHttpActionResult RevertupdateBudget([FromBody] List<BudgetApprovedetails> budgetDetails)
        {
            if (budgetDetails == null)
            {
                return BadRequest("Request body cannot be null");
            }

            foreach (var detail in budgetDetails)
            {
                // Log or inspect the values
                Console.WriteLine($"cost_defn_bomid: {detail.cost_defn_bomid}, AppRate: {detail.AppRate}, AppQty: {detail.AppQty}");
            }
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    foreach (var budget in budgetDetails)
                    {
                        
                            string sqlQuery = @"UPDATE Cost_Defn_BOM 
                                        SET AppRate = 0.0 , AppQty = @AppQty 
                                        WHERE Cost_Defn_BOMid = @Cost_Defn_BOMid";

                            using (var command = new SqlCommand(sqlQuery, connection))
                            {
                                //command.Parameters.AddWithValue("@AppRate", budget.AppRate);
                                command.Parameters.AddWithValue("@AppQty", budget.AppQty);
                                command.Parameters.AddWithValue("@Cost_Defn_BOMid", budget.cost_defn_bomid);

                                int rowsAffected = command.ExecuteNonQuery();

                                if (rowsAffected == 0)
                                {
                                    // Collect a message or flag for the failed update
                                    Console.WriteLine($"No record found for Cost_Defn_BOMid = {budget.cost_defn_bomid}");
                                }
                            }
                        //}
                        //else
                        //{
                        //    // Collect a message or flag for invalid AppRate
                        //    Console.WriteLine($"Invalid AppRate for Cost_Defn_BOMid = {budget.cost_defn_bomid}");
                        //}
                    }
                }

                // After processing all items, return a consolidated success message
                return Ok(new { success = true, message = "All budget details processed." });
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging
                Console.WriteLine($"Exception: {ex.Message}");
                // Return a generic error message
                return NotFound();
            }
        }




        [HttpDelete]
        // DELETE api/apibudgetapproval/5
        public bool Delete([FromBody] BudgetApprovedetails budget)
        {
            return Budget.Revertitembudgetdetails(budget);
        }
    }
}
