using AxonApparel.Domain;
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
    public class HsnRepository : IHsnRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.HSNCode> GetRepHsncodeCheckItemDetails(int HSNid)
        {
            //var query = (from YD1 in entities.Acc_HSNMaster.Where(c => c.HSNid == HSNid)
            //             select new HSNCode
            //             {
            //                HSNid=YD1.HSNid,
            //                HSNcode=YD1.HSNcode


            //             }).AsQueryable();

            //return query.ToList();

            List<Domain.HSNCode> lstemployee = new List<Domain.HSNCode>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAcc_HSNMasterMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@HsnId", HSNid);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.HSNCode employee = new Domain.HSNCode();
                    employee.HSNid = Convert.ToInt32(rdr["HSNid"]);
                    employee.HSNcode = rdr["HSNcode"].ToString();           
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Acc_HSNMaster> GetDataListAll()
        {
            //return entities.Acc_HSNMaster.OrderBy(c => c.HSNcode);
            List<Acc_HSNMaster> lstemployee = new List<Acc_HSNMaster>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAcc_HSNMasterLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Acc_HSNMaster employee = new Acc_HSNMaster();                                 
                    employee.HSNid = Convert.ToInt32(rdr["HSNid"]);
                    employee.HSNcode = rdr["HSNcode"].ToString();
                    employee.HSNdesc = rdr["HSNdesc"].ToString();
                    employee.Ttype = rdr["Ttype"].ToString();
                    employee.sortorder =  Convert.ToInt32(rdr["sortorder"]);
                    employee.GSTtaxcode =  rdr["GSTtaxcode"].ToString();
                    employee.IGSTtaxcode =  rdr["IGSTtaxcode"].ToString();
                    employee.enteredby = rdr["enteredby"].ToString();
                    employee.modifiedby = rdr["modifiedby"].ToString();
                    employee.modifiedDate = Convert.ToDateTime(rdr["modifiedDate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        //public IQueryable<Acc_Gsttaxmaster> LoadGstDetail()
        //{
        //    return entities.Acc_Gsttaxmaster.OrderBy(c => c.GSTtaxcode);
        //}
        public IEnumerable<Domain.GSTModel> LoadGstDetail()
        {
            //var query = (from YD1 in entities.Acc_Gsttaxmaster.Where (c => c.IGSTper == 0)
                         
            //             select new GSTModel
            //             {
            //                 GSTtaxcode = YD1.GSTtaxcode,
            //                 id = YD1.id,
            //             }).AsQueryable();

            //return query;

            List<Domain.GSTModel> lstemployee = new List<Domain.GSTModel>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAcc_GstModalmasterLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.GSTModel employee = new Domain.GSTModel();
                    employee.GSTtaxcode = rdr["GSTtaxcode"].ToString();
                    employee.id = Convert.ToInt32(rdr["id"]);
               
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.GSTModel> LoadIGstDetail()
        {
            List<Domain.GSTModel> lstemployee = new List<Domain.GSTModel>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAcc_GstModalmasterISTLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.GSTModel employee = new Domain.GSTModel();
                    employee.GSTtaxcode = rdr["GSTtaxcode"].ToString();
                    employee.id = Convert.ToInt32(rdr["id"]);

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public Acc_HSNMaster GetDataById(int id)
        {
           // return entities.Acc_HSNMaster.Where(c => c.HSNid == id).FirstOrDefault();
            Acc_HSNMaster employee = new Acc_HSNMaster();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Acc_HSNMaster where HSNid= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.HSNid = Convert.ToInt32(rdr["HSNid"]);
                    employee.HSNcode = rdr["HSNcode"].ToString();
                    employee.HSNdesc = rdr["HSNdesc"].ToString();
                    employee.Ttype = rdr["Ttype"].ToString();
                    employee.sortorder = Convert.ToInt32(rdr["sortorder"]);
                    employee.GSTtaxcode = rdr["GSTtaxcode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTtaxcode"].ToString();
                    employee.enteredby = rdr["enteredby"].ToString();
                    employee.modifiedby = rdr["modifiedby"].ToString();
                    employee.modifiedDate = Convert.ToDateTime(rdr["modifiedDate"]);
                }
            }
            return employee; 
        }

        public int AddData(Acc_HSNMaster obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Acc_HSNMaster.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Hsn-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Acc_HSNMaster obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var addless = entities.Acc_HSNMaster.Where(c => c.HSNid == obj.HSNid).FirstOrDefault();
                    if (addless != null)
                    { 
                    addless.HSNcode = obj.HSNcode;
                    addless.HSNdesc = obj.HSNdesc;
                   addless.Ttype = obj.Ttype;
                    addless.sortorder = obj.sortorder;
                    addless.GSTtaxcode = obj.GSTtaxcode;
                    addless.IGSTtaxcode = obj.IGSTtaxcode;
                    addless.enteredby = obj.enteredby;
                    addless.modifiedby = obj.modifiedby;
                    addless.modifiedDate = obj.modifiedDate;
                       
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Hsn-UpdateData");
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
                    var addl = entities.Acc_HSNMaster.Where(c => c.HSNid == id).FirstOrDefault();
                    if (addl != null)
                    {
                        entities.Acc_HSNMaster.Remove(addl);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Hsn-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Acc_HSNMaster> GetDataList()
        {
            throw new NotImplementedException();
        }

        
    }
}
