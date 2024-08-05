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
    public class SupplierRepository : ISupplierRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Supplier> GetDataListAll()
        {
            //return entities.Supplier.OrderBy(c => c.Supplier1);

            List<Domain.Supplier> lstemployee = new List<Domain.Supplier>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSupplierLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Supplier employee = new Domain.Supplier();
                    employee.SupplierId = Convert.ToInt32(rdr["SupplierId"]);
                    employee.SupplierName= rdr["Supplier"].ToString();
                    employee.Supplookup = rdr["LookUp"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CityName = rdr["City"].ToString();
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.MobNo = rdr["Mob_No"].ToString();
                    employee.Email = rdr["E_Mail"].ToString();
                    employee.Fax = rdr["Fax"].ToString();
                    employee.cstno = Convert.ToInt32(rdr["CST_No"]);
                    employee.cstdate = Convert.ToDateTime(rdr["CST_Date"]);
                    employee.TinNo = rdr["TIN_No"].ToString();
                    employee.TinDate = Convert.ToDateTime(rdr["TIN_Date"]);            
                    employee.GSTNO = rdr["GSTNO"].ToString();          
                    employee.GstApplicable = rdr["GstApplicable"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Supplier GetDataById(int id)
        {
            //return entities.Supplier.Where(c => c.SupplierId == id).FirstOrDefault();
            Supplier employee = new Supplier();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                //string sqlQuery = "select * from Supplier where SupplierId= " + id;
                //SqlCommand cmd = new SqlCommand(sqlQuery, con);
                //con.Open();
                //SqlDataReader rdr = cmd.ExecuteReader();
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSupplierMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@suppid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.SupplierId = Convert.ToInt32(rdr["SupplierId"]);
                    employee.Supplier1 = rdr["Supplier"].ToString();
                    employee.LookUp = rdr["LookUp"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);                    
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.Contact_Name = rdr["ContactName"].ToString();
                    employee.Mob_No = rdr["Mob_No"].ToString();
                    employee.E_Mail = rdr["E_Mail"].ToString();
                    employee.Fax = rdr["Fax"].ToString();
                    employee.CST_No = Convert.ToInt32(rdr["CST_No"]);
                    employee.CST_Date = Convert.ToDateTime(rdr["CST_Date"]);
                    employee.TIN_No = rdr["TIN_No"].ToString();
                    employee.TIN_Date = Convert.ToDateTime(rdr["TIN_Date"]);
                    employee.GSTNO = rdr["GSTNO"].ToString();
                    employee.GstApplicable = rdr["GstApplicable"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.AuditSupplierid = Convert.ToInt32(rdr["AuditSupplierid"]);
                    employee.ProcessAll = Convert.ToBoolean(rdr["ProcessAll"]);
                    employee.PurchaseAll = Convert.ToBoolean(rdr["PurchaseAll"]);
                    employee.ProcessYarn = Convert.ToBoolean(rdr["ProcessYarn"]);
                    employee.ProcessTrims = Convert.ToBoolean(rdr["ProcessTrims"]);
                    employee.ProcessSet = rdr["ProcessSet"].ToString();
                }
            }
            return employee;
        }

        public int AddData(Supplier obj)
        {

            int reserved = 0;
            int supplierid=0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (obj.AuditSupplierid == 0) {
                        obj.AuditSupplierid = null;
                    }

                    var result = entities.Supplier.Add(obj);

                    entities.SaveChanges();

                    supplierid=obj.SupplierId;
                    if (obj.ProcessSet != null)
                    {
                        string prc = obj.ProcessSet;
                        string[] process = prc.Split(',');
                        foreach (var proc in process)
                        {
                            if (proc != "")
                            {
                                SupplierProcessSetup prcstp = new SupplierProcessSetup()
                                {
                                    Supplierid = supplierid,
                                    Processid = Convert.ToInt32(proc)
                                };
                                var result2 = entities.SupplierProcessSetup.Add(prcstp);

                                entities.SaveChanges();
                            }
                        }
                    }

                        

                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Supplier-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Supplier obj)
        {
            bool reserved = false;
            int supplierid = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var prcst = entities.SupplierProcessSetup.Where(c => c.Supplierid == obj.SupplierId).ToList();
                    foreach (var ps in prcst) {
                        if (ps != null)
                        {
                            entities.SupplierProcessSetup.Remove(ps);
                        }
                        entities.SaveChanges();
                    
                    }

                    if (obj.AuditSupplierid == 0)
                    {
                        obj.AuditSupplierid = null;
                    }

                    var cou = entities.Supplier.Where(c => c.SupplierId == obj.SupplierId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Supplier1 = obj.Supplier1;
                        cou.LookUp = obj.LookUp;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.Zipcode = obj.Zipcode;
                        cou.Contact_Name = obj.Contact_Name;
                        cou.Mob_No = obj.Mob_No;
                        cou.CST_No = obj.CST_No;
                        cou.CST_Date = obj.CST_Date;
                        cou.TIN_No = obj.TIN_No;
                        cou.TIN_Date = obj.TIN_Date;
                        cou.E_Mail = obj.E_Mail;
                        cou.Fax = obj.Fax;
                        cou.GSTNO = obj.GSTNO;
                        cou.GstApplicable = obj.GstApplicable;
                        cou.AuditSupplierid = obj.AuditSupplierid;
                        cou.ProcessAll = obj.ProcessAll;
                        cou.PurchaseAll = obj.PurchaseAll;
                        cou.ProcessYarn = obj.ProcessYarn;
                        cou.ProcessTrims = obj.ProcessTrims;
                        cou.ProcessSet = obj.ProcessSet;
                    }

                    entities.SaveChanges();
                    supplierid = obj.SupplierId;

                    if (obj.ProcessSet != null)
                    {

                        string prc = obj.ProcessSet;
                        string[] process = prc.Split(',');
                        foreach (var proc in process)
                        {
                            if (proc != "")
                            {
                                SupplierProcessSetup prcstp = new SupplierProcessSetup()
                                {
                                    Supplierid = supplierid,
                                    Processid = Convert.ToInt32(proc)
                                };
                                var result2 = entities.SupplierProcessSetup.Add(prcstp);

                                entities.SaveChanges();
                            }
                        }
                    }


                
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }

                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Supplier-UpdateData");
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
                    var prcst = entities.SupplierProcessSetup.Where(c => c.Supplierid == id).ToList();
                    foreach (var ps in prcst)
                    {
                        if (ps != null)
                        {
                            entities.SupplierProcessSetup.Remove(ps);
                        }
                        entities.SaveChanges();

                    }

                    var cou = entities.Supplier.Where(c => c.SupplierId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Supplier.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Supplier-DeleteData");
                }

            }
            return reserved;

        }

        public IList<Domain.Supplier> GetRepSuppCheckItemDetails(int supplierid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetSupplierMasterCheck(supplierid)
                         select new Domain.Supplier
                         {
                             CountSupplierId = YD1.ChkSuppId,
                             SupplierName = YD1.Supplier,

                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Supplier> GetDataList()
        {
            throw new NotImplementedException();
        }


        public IEnumerable<Domain.Supplier> GetSupplierSetup(int Processid, string Type)
        {
           
            List<Domain.Supplier> lstemployee = new List<Domain.Supplier>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetSupplierDetailSetup", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Processid", Processid);
                cmd.Parameters.AddWithValue("@Setup", Type);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Supplier employee = new Domain.Supplier();
                    employee.SupplierId = Convert.ToInt32(rdr["SupplierId"]);
                    employee.SupplierName = rdr["Supplier"].ToString();
                   
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }



    }
}
