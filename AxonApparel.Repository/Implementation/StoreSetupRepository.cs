using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public class StoreSetupRepository : IStoreSetupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<EmpStoreSetup> GetMainList(int Employeeid, int Storeid)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMainStoreSetup", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Employeeid", SqlDbType.Int).Value = Employeeid;
                cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Storeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();
                    employee.Employeeid = Convert.ToInt32(rdr["Employeeid"]);
                    employee.Employee = rdr["Employee"].ToString();
                    employee.Designation = rdr["Designation"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<EmpStoreSetup> GetEmployeeDDl()
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreSetupEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add("@Employeeid", SqlDbType.Int).Value = Employeeid;
                //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Storeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();
                    employee.Employeeid = Convert.ToInt32(rdr["Employeeid"]);
                    employee.Employee = rdr["Employee"].ToString();
                    employee.Designation = rdr["Designation"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<EmpStoreSetup> GetStoreDDL()
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreSetupStoreddl", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add("@Employeeid", SqlDbType.Int).Value = Employeeid;
                //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Storeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();
                    employee.Storeid = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["Store"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<EmpStoreSetup> GetAddSetup()
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreSetupAdd", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add("@Employeeid", SqlDbType.Int).Value ;
                //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Storeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();
                    employee.Employeeid = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.Employee = rdr["Employee"].ToString();
                    employee.Storeid = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["StoreName"].ToString();
                    employee.Issue = Convert.ToInt32(rdr["Issue"]);
                    employee.Receipt = Convert.ToInt32(rdr["Receipt"]);
                    employee.Setupid = 0;
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<EmpStoreSetup> GetEditSetup(int id)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_StoreSetupEdit", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@EmployeeId", SqlDbType.Int).Value = id;
                //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = Storeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();
                    employee.Employeeid = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.Employee = rdr["Employee"].ToString();
                    employee.Storeid = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["StoreName"].ToString();
                    employee.Issue = Convert.ToInt32(rdr["Issue"]);
                    employee.Receipt = Convert.ToInt32(rdr["Receipt"]);
                    employee.Setupid = Convert.ToInt32(rdr["Setupid"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<EmpStoreSetup> GetStoreRights(int Userid, string Storetype, int Companyid)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<EmpStoreSetup> lstemployee = new List<EmpStoreSetup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStoreUnitfromEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Userid", SqlDbType.Int).Value = Userid;
                cmd.Parameters.Add("@StoreType", SqlDbType.Char, 1).Value = Storetype;
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Companyid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    EmpStoreSetup employee = new EmpStoreSetup();

                    employee.Storeid = Convert.ToInt32(rdr["StoreUnitID"]);
                    employee.StoreName = rdr["StoreName"].ToString();
                 
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public bool CreateSetup(IList<Emp_Store_Setup> SectionAdd)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var trims in SectionAdd)
                    {
                        if (trims.Setupid == 0)
                        {
                            if (trims.Issue == 1 || trims.Receipt == 1)
                            {

                                entities.Emp_Store_Setup.Add(trims);
                            }
                        }
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        public bool UpdateSetup(IList<Emp_Store_Setup> SectionAdd)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var trims in SectionAdd)
                    {
                        var trim = entities.Emp_Store_Setup.Where(c => c.Setupid == trims.Setupid);
                            foreach (var t in trim)
                            {
                                entities.Emp_Store_Setup.Remove(t);
                            }
                       
                    }
                    entities.SaveChanges();

                    foreach (var trims in SectionAdd)
                    {

                        if (trims.Issue == 1 || trims.Receipt == 1)
                        {

                            entities.Emp_Store_Setup.Add(trims);
                        }

                    }
                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        public bool DeleteSetup(IList<Emp_Store_Setup> SectionAdd)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var trims in SectionAdd)
                    {
                        var trim = entities.Emp_Store_Setup.Where(c => c.Setupid == trims.Setupid);
                        foreach (var t in trim)
                        {
                            entities.Emp_Store_Setup.Remove(t);
                        }

                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
