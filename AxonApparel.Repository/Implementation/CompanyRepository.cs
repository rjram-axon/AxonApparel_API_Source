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
    public class CompanyRepository : ICompanyRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public Company GetDataById(int id)
        {
            //return entities.Company.Where(c => c.CompanyId == id).FirstOrDefault();
            Company employee = new Company();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Company where CompanyId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Company1 = rdr["Company"].ToString();
                    employee.Company_Lookup = rdr["Company_Lookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = Convert.ToInt32(rdr["Zipcode"]);
                    employee.Mob_No = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.Fax = rdr["Fax"].ToString();
                    employee.E_mail = rdr["E_mail"].ToString();
                    employee.Telex = rdr["Telex"].ToString();
                    employee.RBI_CODE_No = Convert.ToInt32(rdr["RBI_CODE_No"]);
                    employee.IEcode = Convert.ToDecimal(rdr["IEcode"]);
                    employee.Aepc_No = Convert.ToInt32(rdr["Aepc_No"]);
                    employee.Aepc_Date = Convert.ToDateTime(rdr["Aepc_Date"]);
                    employee.Tngst_No = Convert.ToInt32(rdr["Tngst_No"]);
                    employee.Cst_No = Convert.ToInt32(rdr["Cst_No"]);
                    employee.Cst_Date = Convert.ToDateTime(rdr["Cst_Date"]);
                    employee.Prefix = rdr["Prefix"].ToString();
                    employee.LogoName = rdr["LogoName"].ToString();
                    employee.Tin_no = Convert.ToInt32(rdr["Tin_no"]);
                    employee.Tin_Date = Convert.ToDateTime(rdr["Tin_Date"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.EANNo = Convert.ToInt32(rdr["EANNo"]);
                    employee.IECNo = Convert.ToInt32(rdr["IECNo"]);
                    employee.RCMCNO = Convert.ToInt32(rdr["RCMCNO"]);
                    employee.C_Range = rdr["C_Range"].ToString();
                    employee.C_Division = rdr["C_Division"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.BaseCurrencyId = rdr["BaseCurrencyId"] == DBNull.Value ? 0 : Convert.ToInt32(rdr["BaseCurrencyId"]);//(Convert.ToInt32(rdr["BaseCurrencyId"]) == null ? 0 : Convert.ToInt32(rdr["BaseCurrencyId"]));
                    employee.GSTNo = rdr["GSTNo"].ToString();
                    employee.Imgpath = rdr["Imgpath"].ToString();
                    employee.RexNo = rdr["RexNo"].ToString();
                    employee.PANno = rdr["PANno"].ToString();
                }
            }
            return employee;
        }

        public IEnumerable<Domain.Company> GetDataAllList()
        {
            //return entities.Company.OrderBy(c => c.Company1);

            List<Domain.Company> lstemployee = new List<Domain.Company>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCompanyLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Company employee = new Domain.Company();

                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.CompanyName = rdr["Company"].ToString();
                    employee.Complookup = rdr["Company_Lookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.CountryId = Convert.ToInt32(rdr["CountryId"]);
                    employee.Zipcode = Convert.ToInt32(rdr["Zipcode"]);
                    employee.MobNo = Convert.ToDecimal(rdr["Mob_No"]);
                    employee.Fax = rdr["Fax"].ToString();
                    employee.Email = rdr["E_mail"].ToString();
                    employee.Telex = rdr["Telex"].ToString();
                    employee.Rbi_code_num = Convert.ToInt32(rdr["RBI_CODE_No"]);
                    employee.IE_code = Convert.ToDecimal(rdr["IEcode"]);
                    employee.AEPC_No = Convert.ToInt32(rdr["Aepc_No"]);
                    employee.AEPC_Date = Convert.ToDateTime(rdr["Aepc_Date"]);
                    employee.TNGST_No = Convert.ToInt32(rdr["Tngst_No"]);
                    employee.cstno = Convert.ToInt32(rdr["Cst_No"]);
                    employee.cstdate = Convert.ToDateTime(rdr["Cst_Date"]);
                    employee.Prefix = rdr["Prefix"].ToString();
                    employee.LogoName = rdr["LogoName"].ToString();
                    employee.TinNo = Convert.ToInt32(rdr["Tin_no"]);
                    employee.TinDate = Convert.ToDateTime(rdr["Tin_Date"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.EAN_No = Convert.ToInt32(rdr["EANNo"]);
                    employee.IEC_No = Convert.ToInt32(rdr["IECNo"]);
                    employee.RCMC_No = Convert.ToInt32(rdr["RCMCNO"]);
                    employee.Range = rdr["C_Range"].ToString();
                    employee.Division = rdr["C_Division"].ToString();
                    employee.ContactName = rdr["ContactName"].ToString();
                    employee.BCurrencyId = Convert.ToInt32(rdr["BaseCurrencyId"]);
                    employee.GSTNo = rdr["GSTNo"].ToString();
                    employee.CountryName = rdr["Country"].ToString();
                    employee.CityName = rdr["City"].ToString();
                    employee.RexNo = rdr["RexNo"].ToString();
                    employee.PANno = rdr["PANno"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;

        }

        public int AddData(Company obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Company.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Company-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Company obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Company.Where(c => c.CompanyId == obj.CompanyId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Company1 = obj.Company1;
                        cou.Company_Lookup = obj.Company_Lookup;
                        cou.Address1 = obj.Address1;
                        cou.Address2 = obj.Address2;
                        cou.Address3 = obj.Address3;
                        cou.CityId = obj.CityId;
                        cou.CountryId = obj.CountryId;
                        cou.Zipcode = obj.Zipcode;
                        cou.ContactName = obj.ContactName;
                        cou.Mob_No = obj.Mob_No;
                        cou.Cst_No = obj.Cst_No;
                        cou.Cst_Date = obj.Cst_Date;
                        cou.Tin_no = obj.Tin_no;
                        cou.Tin_Date = obj.Tin_Date;
                        cou.E_mail = obj.E_mail;
                        cou.Fax = obj.Fax;
                        cou.Telex = obj.Telex;
                        cou.RBI_CODE_No = obj.RBI_CODE_No;
                        cou.Prefix = obj.Prefix;
                        cou.LogoName = obj.LogoName;
                        cou.RCMCNO = obj.RCMCNO;
                        cou.EANNo = obj.EANNo;
                        cou.C_Range = obj.C_Range;
                        cou.C_Division = obj.C_Division;
                        cou.Aepc_No = obj.Aepc_No;
                        cou.Aepc_Date = obj.Aepc_Date;
                        cou.IECNo = obj.IECNo;
                        cou.IEcode = obj.IEcode;
                        cou.Tngst_No = obj.Tngst_No;
                        cou.GSTNo = obj.GSTNo;
                        cou.Imgpath = obj.Imgpath;
                        cou.RexNo = obj.RexNo;
                        cou.PANno = obj.PANno;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Company-UpdateData");
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
                    var cou = entities.Company.Where(c => c.CompanyId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Company.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Company-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Domain.Company> GetDataRepCountDetails(int Id)
        {
            IQueryable<Domain.Company> query = (from a in entities.Proc_Apparel_GetCityDetails(Id)
                                                select new Domain.Company
                                              {
                                                  CountryId = (int)a.countryid,
                                                  CountryName = a.country,

                                              }).AsQueryable();

            return query;
        }


        public IList<Domain.Company> GetRepCompCheckItemDetails(int CompanyId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetCompMasterCheck(CompanyId)
                         select new Domain.Company
                         {
                             CompanyName = YD1.Company,
                             CountCompId = YD1.ChkCompid,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Company> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
