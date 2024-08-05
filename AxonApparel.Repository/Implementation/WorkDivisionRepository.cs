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
    public class WorkDivisionRepository : IWorkDivisionRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<WorkDivision> GetDataListAll()
        {
            //return entities.WorkDivisions.OrderBy(c => c.WorkDivision1);

            List<WorkDivision> lstemployee = new List<WorkDivision>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterWorkDivisionLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    WorkDivision employee = new WorkDivision();
                    employee.WorkDivisionId = Convert.ToInt32(rdr["WorkDivisionId"]);
                    employee.WorkDivision1 = rdr["WorkDivision"].ToString();
                    employee.Inchargeid = Convert.ToInt32(rdr["Inchargeid"]);
                    employee.Unitid = Convert.ToInt32(rdr["Unitid"]);
                    employee.DivisionType = rdr["DivisionType"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public WorkDivision GetDataById(int workdivisionid)
        {
            //return entities.WorkDivisions.Where(c => c.WorkDivisionId == workdivisionid).FirstOrDefault();
            WorkDivision employee = new WorkDivision();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from WorkDivision where WorkDivisionId= " + workdivisionid;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.WorkDivisionId = Convert.ToInt32(rdr["WorkDivisionId"]);
                    employee.WorkDivision1 = rdr["WorkDivision"].ToString();
                    employee.Inchargeid = rdr["Inchargeid"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Inchargeid"]);//Convert.ToInt32(rdr["Inchargeid"]);
                    employee.Unitid = rdr["Unitid"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["Unitid"]);//Convert.ToInt32(rdr["Unitid"]);
                    employee.DivisionType = rdr["DivisionType"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(WorkDivision obj)
        {

            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.WorkDivision.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "WorkDivision-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(WorkDivision workdivisionobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var WorkDivUpd = entities.WorkDivision.Where(c => c.WorkDivisionId == workdivisionobj.WorkDivisionId).FirstOrDefault();
                    if (WorkDivUpd != null)
                    {
                        WorkDivUpd.WorkDivisionId = workdivisionobj.WorkDivisionId;
                        WorkDivUpd.WorkDivision1 = workdivisionobj.WorkDivision1;
                        WorkDivUpd.IsActive = workdivisionobj.IsActive;
                        WorkDivUpd.DivisionType = workdivisionobj.DivisionType;
                        WorkDivUpd.Unitid = workdivisionobj.Unitid;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }

                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "WorkDivision-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int workdivisionid)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var workDivDel = entities.WorkDivision.Where(c => c.WorkDivisionId == workdivisionid).FirstOrDefault();
                    if (workDivDel != null)
                    {
                        entities.WorkDivision.Remove(workDivDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "WorkDivision-DeleteData");
                }

            }
            return reserved;
        }


        public IQueryable<WorkDivision> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
