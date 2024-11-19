using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Configuration;

namespace AxonApparels.ApiControllers
{
    public class ApiLoginController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        IApiLoginBusiness Idata = new ApiLoginBusiness();
        [HttpGet]
        [Route("api/apilogin")]
        public IHttpActionResult Login()
        {
            // Read query string parameters Username and Password
            var queryParams = Request.GetQueryNameValuePairs().ToDictionary(q => q.Key.ToLower(), q => q.Value);
            var username = queryParams.ContainsKey("username") ? queryParams["username"] : null;
            var password = queryParams.ContainsKey("password") ? queryParams["password"] : null;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                // Handle missing parameters
                return BadRequest("Missing Username or Password parameter.");
            }

            string sqlQuery = "Proc_Apparel_APILogin"; // Stored Procedure name

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Username", username);
                    command.Parameters.AddWithValue("@Pass", Help.Encrypt(password)); // Encrypt the password

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var users = new List<UserName>();

                            while (reader.Read())
                            {
                                var user = new UserName
                                {
                                    UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    Roleid = reader.GetInt32(reader.GetOrdinal("Roleid")),
                                    Username = reader.GetString(reader.GetOrdinal("Username")),
                                    Password = reader.GetString(reader.GetOrdinal("pass")),
                                    Rolename = reader.GetString(reader.GetOrdinal("RoleName")),
                                    LoginStatus = reader.GetString(reader.GetOrdinal("LoginStatus")),
                                    LoginPC = reader.IsDBNull(reader.GetOrdinal("LoginPC")) ? null : reader.GetString(reader.GetOrdinal("LoginPC")),
                                    UnitId = reader.GetInt32(reader.GetOrdinal("UnitId")),
                                    MenuId = reader.GetInt32(reader.GetOrdinal("MenuId")),
                                    Allflag = reader.GetInt32(reader.GetOrdinal("AllFlg")),
                                    Addflag = reader.GetInt32(reader.GetOrdinal("AddFlg")),
                                    Editflag = reader.GetInt32(reader.GetOrdinal("EditFlg")),
                                    Deleteflag = reader.GetInt32(reader.GetOrdinal("DeleteFlg")),
                                    Printflag = reader.GetInt32(reader.GetOrdinal("PrintFlg"))
                                };

                                users.Add(user);
                            }

                            return Ok(new { success = true, users });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "Invalid Username or Password." });
                        }
                    }
                }
            }
        }
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apilogin/5
        public void Delete(int id)
        {
        }
    }
}
