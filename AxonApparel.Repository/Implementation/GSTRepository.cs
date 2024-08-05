using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;
using System.Collections;
using System.Data.SqlClient;
using System.Data.Entity;
using System.Transactions;

using System.Configuration;
using System.Data;
namespace AxonApparel.Repository
{
    public class GSTRepository : IGSTRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Acc_Gsttaxmaster> GetDataListAll()
        {
           // return entities.Acc_Gsttaxmaster.OrderBy(c => c.id);

            List<Acc_Gsttaxmaster> lstemployee = new List<Acc_Gsttaxmaster>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAcc_GsttaxmasterLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Acc_Gsttaxmaster employee = new Acc_Gsttaxmaster();
                    employee.GSTtaxcode = rdr["GSTtaxcode"].ToString();
                    employee.GSTtaxdesc = rdr["GSTtaxdesc"].ToString();
                    employee.CGSTper = Convert.ToInt32(rdr["CGSTper"]);
                    employee.SGSTper = Convert.ToInt32(rdr["SGSTper"]);
                    employee.Addtaxper = Convert.ToInt32(rdr["Addtaxper"]);
                    employee.Ttype = rdr["Ttype"].ToString();
                    employee.rstatus = rdr["rstatus"].ToString();
                    employee.sortorder = Convert.ToDecimal(rdr["sortorder"]);
                    employee.enteredby = rdr["enteredby"].ToString();
                    employee.enteredDate = Convert.ToDateTime(rdr["enteredDate"]);
                    employee.modifiedby = rdr["modifiedby"].ToString();
                    employee.modifiedDate = Convert.ToDateTime(rdr["modifiedDate"]);
                    employee.Type = rdr["Type"].ToString();
                    employee.id = Convert.ToInt32(rdr["id"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Acc_Gsttaxmaster GetDataById(int id)
        {
            //return entities.Acc_Gsttaxmaster.Where(c => c.id == id).FirstOrDefault();
            Acc_Gsttaxmaster employee = new Acc_Gsttaxmaster();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Acc_Gsttaxmaster where id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.GSTtaxcode = rdr["GSTtaxcode"].ToString();
                    employee.GSTtaxdesc = rdr["GSTtaxdesc"].ToString();
                    employee.CGSTper = Convert.ToInt32(rdr["CGSTper"]);
                    employee.SGSTper = Convert.ToInt32(rdr["SGSTper"]);
                    employee.Addtaxper = Convert.ToInt32(rdr["Addtaxper"]);
                    employee.Ttype = rdr["Ttype"].ToString();
                    employee.rstatus = rdr["rstatus"].ToString();
                    employee.sortorder = Convert.ToDecimal(rdr["sortorder"]);
                    employee.enteredby = rdr["enteredby"].ToString();
                    employee.enteredDate = Convert.ToDateTime(rdr["enteredDate"]);
                    employee.modifiedby = rdr["modifiedby"].ToString();
                    employee.modifiedDate = Convert.ToDateTime(rdr["modifiedDate"]);
                    employee.Type = rdr["Type"].ToString();
                    employee.id = Convert.ToInt32(rdr["id"]);
                }
            }
            return employee;
        }

        public int AddData(Acc_Gsttaxmaster objadd)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Acc_Gsttaxmaster.Add(objadd);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GST-AddData");
                }

            }
            return reserved;
        }


        public bool UpdateData(Acc_Gsttaxmaster objadl)
        {
            bool reserved = false;
            //DateTime dt = (DateTime)objadl.modifiedDate;
            //string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Acc_Gsttaxmaster = entities.Acc_Gsttaxmaster.Where(c => c.id == objadl.id).FirstOrDefault();
                    if (Acc_Gsttaxmaster != null)
                    {
                        Acc_Gsttaxmaster.GSTtaxcode = objadl.GSTtaxcode;
                        Acc_Gsttaxmaster.GSTtaxdesc = objadl.GSTtaxdesc;
                        Acc_Gsttaxmaster.CGSTper = objadl.CGSTper;
                        Acc_Gsttaxmaster.SGSTper = objadl.SGSTper;
                        Acc_Gsttaxmaster.IGSTper = objadl.IGSTper;
                        Acc_Gsttaxmaster.Addtaxper = objadl.Addtaxper;
                        Acc_Gsttaxmaster.Ttype = "";
                        Acc_Gsttaxmaster.rstatus = objadl.rstatus;
                        Acc_Gsttaxmaster.sortorder = objadl.sortorder;
                        Acc_Gsttaxmaster.enteredby = "";
                        Acc_Gsttaxmaster.enteredDate = objadl.enteredDate;
                        Acc_Gsttaxmaster.modifiedby = objadl.modifiedby;
                        Acc_Gsttaxmaster.modifiedDate = objadl.modifiedDate;
                        Acc_Gsttaxmaster.Type = objadl.Type;




                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GST-UpdateData");
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
                    var addl = entities.Acc_Gsttaxmaster.Where(c => c.id == id).FirstOrDefault();
                    if (addl != null)
                    {
                        entities.Acc_Gsttaxmaster.Remove(addl);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GST-DeleteData");
                }

            }
            return reserved;
        }



        public IList<Domain.GSTModel> GetRepAccountCheckItemDetails(int id)
        {
            var query = (from YD1 in entities.Acc_Gsttaxmaster.Where(c => c.id == id)
                         select new Domain.GSTModel
                         {
                             id = YD1.id

                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Acc_Gsttaxmaster> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}

