using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class AgentRepository : IAgentRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<Domain.Agent> GetDataListAll()
        {
            //return entities.Agents.OrderBy(c => c.Agent1);
            List<Domain.Agent> lstemployee = new List<Domain.Agent>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAgentLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Agent employee = new Domain.Agent();
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.AgentName = rdr["Agent"].ToString();
                    employee.Type = rdr["Type"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.CityName = rdr["City"].ToString();
                    employee.CountryName = rdr["country"].ToString();
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.MobNo = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.Agent> SGetDataList()
        {
            //return entities.Agents.Where(c => c.Type == "S").OrderBy(c => c.Agent1);

            List<Domain.Agent> lstemployee = new List<Domain.Agent>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSAgentLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Agent employee = new Domain.Agent();
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.AgentName = rdr["Agent"].ToString();
                    employee.Type = rdr["Type"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.CityName = rdr["City"].ToString();
                    employee.CountryName = rdr["country"].ToString();
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.MobNo = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public Agent GetDataById(int id)
        {
            //return entities.Agents.Where(c => c.AgentId == id).FirstOrDefault();
            Agent employee = new Agent();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Agent where AgentId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent1 = rdr["Agent"].ToString();
                    employee.Type = rdr["Type"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.Contact_Name = "";
                    employee.Mob_No = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Agent obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Agent.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Agent-AddData");
                }

            }
            return reserved;

        }

        public bool UpdateData(Agent obj)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var cou = entities.Agent.Where(c => c.AgentId == obj.AgentId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.AgentId = obj.AgentId;
                        cou.Agent1 = obj.Agent1;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.Zipcode = obj.Zipcode;
                        cou.Phone = obj.Phone;
                        cou.Mob_No = obj.Mob_No;
                        cou.Type = obj.Type;
                        cou.Contact_Name = obj.Contact_Name;
                        cou.CountryId = obj.CountryId;
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Agent-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int id)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Agent.Where(c => c.AgentId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Agent.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Agent-DeleteData");
                }

            }
            return reserved;
        }


        public IEnumerable<Domain.Agent> BGetDataList()
        {
            //return entities.Agents.Where(c => c.Type == "B").OrderBy(c => c.Agent1);
            List<Domain.Agent> lstemployee = new List<Domain.Agent>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterBAgentLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Agent employee = new Domain.Agent();
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.AgentName = rdr["Agent"].ToString();
                    employee.Type = rdr["Type"].ToString();
                    employee.Phone = rdr["Phone"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.CityName = rdr["City"].ToString();
                    employee.CountryName = rdr["country"].ToString();
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.MobNo = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IList<Domain.Agent> GetRepAgentCheckItemDetails(int AgentId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetAgentMasterCheck(AgentId)
                         select new Domain.Agent
                         {
                             CountAgentId = YD1.ChkAgentid,
                             AgentName = YD1.Agent,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Agent> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
