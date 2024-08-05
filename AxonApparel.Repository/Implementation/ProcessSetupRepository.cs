
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
    public class ProcessSetupRepository : IProcessSetupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<Domain.ProcessSetup> GetDataListAll()
        {
            //return entities.ProcessSetup.OrderBy(c => c.ProcessSetupid);
            List<Domain.ProcessSetup> lstemployee = new List<Domain.ProcessSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterProcessSetupLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.ProcessSetup employee = new Domain.ProcessSetup();
                    employee.Processid = Convert.ToInt32(rdr["Processid"]);
                    employee.ProcessSetupid = Convert.ToInt32(rdr["ProcessSetupid"]);
                    employee.CuttingorSewing = rdr["CuttingorSewing"].ToString();
                    employee.ProcessName = rdr["Process"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public ProcessSetup GetDataById(int id)
        {
            //return entities.ProcessSetup.Where(c => c.ProcessSetupid == id).FirstOrDefault();

            ProcessSetup employee = new ProcessSetup();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from ProcessSetup where ProcessSetupid= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Processid = Convert.ToInt32(rdr["Processid"]);
                    employee.ProcessSetupid = Convert.ToInt32(rdr["ProcessSetupid"]);
                    employee.CuttingorSewing = rdr["CuttingorSewing"].ToString(); 
                }
            }
            return employee;
        }

        public int AddData(ProcessSetup objPst)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.ProcessSetup.Add(objPst);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessSetup-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(ProcessSetup objPst)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var App = entities.ProcessSetup.Where(c => c.ProcessSetupid == objPst.ProcessSetupid).FirstOrDefault();
                    if (App != null)
                    {

                        App.CuttingorSewing = objPst.CuttingorSewing;
                        //App.Process = objPst.Process;
                        App.Processid = objPst.Processid;
                        App.ProcessSetupid = objPst.ProcessSetupid;


                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessSetup-UpdateData");
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
                    var ProcSp = entities.ProcessSetup.Where(c => c.ProcessSetupid == id).FirstOrDefault();
                    if (ProcSp != null)
                    {
                        entities.ProcessSetup.Remove(ProcSp);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessSetup-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<ProcessSetup> GetDataList()
        {
            throw new NotImplementedException();
        }



        public ProcessSetup GetbyprocessID(int? ProcessId)
        {
            //return entities.ProcessSetup.Where(c => c.ProcessSetupid == id).FirstOrDefault();

            ProcessSetup employee = new ProcessSetup();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from ProcessSetup where Processid= " + ProcessId;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Processid = Convert.ToInt32(rdr["Processid"]);
                    employee.ProcessSetupid = Convert.ToInt32(rdr["ProcessSetupid"]);
                    employee.CuttingorSewing = rdr["CuttingorSewing"].ToString();
                }
            }
            return employee;
        }

       
    }
}
