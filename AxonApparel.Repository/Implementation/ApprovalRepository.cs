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
    public class ApprovalRepository : IApprovalRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Approval> GetDataListAll()
        {
            //return entities.Approvals.OrderBy(c => c.ApprovalTitle);

            List<Approval> lstemployee = new List<Approval>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterApprovalLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Approval employee = new Approval();
                    employee.ApprovalId = Convert.ToInt32(rdr["ApprovalId"]);
                    employee.ApprovalTitle = rdr["ApprovalTitle"].ToString();
                    employee.ApprovalDays = Convert.ToInt16(rdr["ApprovalDays"]);
                    employee.Description = rdr["Description"].ToString();
                    employee.ColorNo = rdr["ColorNo"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);                 
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Approval GetDataById(int ApprovalId)
        {
            //return entities.Approvals.Where(c => c.ApprovalId == ApprovalId).FirstOrDefault();

            Approval employee = new Approval();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Approval where ApprovalId= " + ApprovalId;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.ApprovalId = Convert.ToInt32(rdr["ApprovalId"]);
                    employee.ApprovalTitle = rdr["ApprovalTitle"].ToString();
                    employee.ApprovalDays = Convert.ToInt16(rdr["ApprovalDays"]);
                    employee.Description = rdr["Description"].ToString();
                    employee.ColorNo = rdr["ColorNo"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);  
                }
            }
            return employee;
        }

        public int AddData(Approval objApp)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Approval.Add(objApp);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Approval-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Approval objApp)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var App = entities.Approval.Where(c => c.ApprovalId == objApp.ApprovalId).FirstOrDefault();
                    if (App != null)
                    {
                        App.IsActive = objApp.IsActive;
                        App.ApprovalTitle = objApp.ApprovalTitle;
                        App.ColorNo = objApp.ColorNo;
                        App.ApprovalDays = objApp.ApprovalDays;
                        App.Description = objApp.Description;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Approval-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int ApprovalId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Approval.Where(c => c.ApprovalId == ApprovalId).FirstOrDefault();
                    if (App != null)
                    {
                        entities.Approval.Remove(App);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Approval-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Approval> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
