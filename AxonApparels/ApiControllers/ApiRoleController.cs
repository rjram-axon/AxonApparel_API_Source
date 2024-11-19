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

    public class ApiRoleController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apirole")]
        public IHttpActionResult PurchaseApproval()
        {
            // Read query string parameter IsApproved
            var roleid = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key.ToLower() == "roleid").Value;
            if (string.IsNullOrEmpty(roleid))
            {
                // Handle missing query parameter
                return BadRequest("Missing IsApproved parameter.");
            }

            string sqlQuery = @"SELECT * from Vw_ApiRole
                                WHERE Roleid = @Roleid ";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@Roleid", roleid);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var roles = new List<ApiRole>();

                            while (reader.Read())
                            {
                                var role = new ApiRole
                                {
                                    Roleid = reader.GetInt32(reader.GetOrdinal("Roleid")),
                                    Menuid = reader.GetInt32(reader.GetOrdinal("MenuId")),
                                    MenuName = reader.GetString(reader.GetOrdinal("MenuName")),
                                    Addflag = reader.GetInt32(reader.GetOrdinal("AddFlg")),
                                };

                                roles.Add(role);
                            }

                            return Ok(new { success = true, roles });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No Permission found for the specified User." });
                        }
                    }
                }
            }
        }
    }
}