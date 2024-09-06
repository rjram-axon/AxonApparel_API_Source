using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Http;
using System.Web.Http.Cors;
using AxonApparel.Contract.Api;

namespace AxonApparels.ApiControllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ApiMISPathController : ApiController
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;

        [HttpGet]
        [Route("api/apimispath")]
        public IHttpActionResult Mispath()
        {
            string sqlQuery = @"SELECT * FROM MisPath";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var mispaths = new List<MisPath>();

                            while (reader.Read())
                            {
                                var mispath = new MisPath
                                {
                                    // Adjust data types accordingly
                                    ValidateProcessOrderApproval = reader.GetBoolean(reader.GetOrdinal("ValidateProcessOrderApproval")),
                                    ValidatePOApproval = reader.IsDBNull(reader.GetOrdinal("ValidatePOApproval")) ? null : reader.GetString(reader.GetOrdinal("ValidatePOApproval")),
                                    ValidatePOGerApproval = reader.IsDBNull(reader.GetOrdinal("ValidatePOGerApproval")) ? null : reader.GetString(reader.GetOrdinal("ValidatePOGerApproval")),
                                    chkValidateQuoteDetailsForPO = reader.GetBoolean(reader.GetOrdinal("chkValidateQuoteDetailsForPO")),
                                    chkValidateQuoteDetailsForProcessOrder = reader.GetBoolean(reader.GetOrdinal("chkValidateQuoteDetailsForProcessOrder")),
                                };

                                mispaths.Add(mispath);
                            }

                            return Ok(new { success = true, mispaths });
                        }
                        else
                        {
                            return Ok(new { success = false, message = "No specified MISPath details Found." });
                        }
                    }
                }
            }
        }
    }
}
