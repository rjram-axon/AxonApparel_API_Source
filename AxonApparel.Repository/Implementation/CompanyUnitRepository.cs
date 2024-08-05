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
    public class CompanyUnitRepository : ICompanyUnitRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<CompanyUnit> GetDataListAll()
        {
            //return entities.CompanyUnit.OrderBy(c => c.CompanyUnit1);

            List<CompanyUnit> lstemployee = new List<CompanyUnit>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterCompanyUnitLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    CompanyUnit employee = new CompanyUnit();
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.CompanyUnit1 = rdr["CompanyUnit"].ToString();
                    employee.CUnitLookup = rdr["CUnitLookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.IssueType = rdr["IssueType"].ToString();
                    employee.WastageCut = Convert.ToDecimal(rdr["WastageCut"]);
                    employee.WastageProc = Convert.ToDecimal(rdr["WastageProc"]);
                    employee.OrderOverHeads = Convert.ToDecimal(rdr["OrderOverHeads"]);
                    employee.QuoteOverHeads = Convert.ToDecimal(rdr["QuoteOverHeads"]);
                    employee.OfficeExpense = Convert.ToDecimal(rdr["OfficeExpense"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public CompanyUnit GetDataById(int id)
        {
            //return entities.CompanyUnit.Where(c => c.Id == id).FirstOrDefault();

            CompanyUnit employee = new CompanyUnit();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from CompanyUnit where Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.CompanyUnit1 = rdr["CompanyUnit"].ToString();
                    employee.CUnitLookup = rdr["CUnitLookup"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Zipcode = rdr["Zipcode"].ToString();
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.IssueType = rdr["IssueType"].ToString();
                    employee.WastageCut = Convert.ToDecimal(rdr["WastageCut"]);
                    employee.WastageProc = Convert.ToDecimal(rdr["WastageProc"]);
                    employee.OrderOverHeads = Convert.ToDecimal(rdr["OrderOverHeads"]);
                    employee.QuoteOverHeads = Convert.ToDecimal(rdr["QuoteOverHeads"]);
                    employee.OfficeExpense = Convert.ToDecimal(rdr["OfficeExpense"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(CompanyUnit obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.CompanyUnit.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CompanyUnit-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(CompanyUnit companyunitobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var compUpd = entities.CompanyUnit.Where(c => c.Id == companyunitobj.Id).FirstOrDefault();
                    if (compUpd != null)
                    {
                        compUpd.IsActive = companyunitobj.IsActive;
                        compUpd.CompanyUnit1 = companyunitobj.CompanyUnit1;
                        compUpd.CUnitLookup = companyunitobj.CUnitLookup;
                        compUpd.CompanyId = companyunitobj.CompanyId;
                        compUpd.Address1 = companyunitobj.Address1;
                        compUpd.Address2 = companyunitobj.Address2;
                        compUpd.Address3 = companyunitobj.Address3;
                        compUpd.CityId = companyunitobj.CityId;
                        compUpd.Zipcode = companyunitobj.Zipcode;
                        compUpd.IssueType = companyunitobj.IssueType;
                        compUpd.WastageCut = companyunitobj.WastageCut;
                        compUpd.WastageProc = companyunitobj.WastageProc;
                        compUpd.OfficeExpense = companyunitobj.OfficeExpense;
                        compUpd.OrderOverHeads = companyunitobj.OrderOverHeads;
                        compUpd.QuoteOverHeads = companyunitobj.QuoteOverHeads;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CompanyUnit-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int CompanyUnitid)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var compDel = entities.CompanyUnit.Where(c => c.Id == CompanyUnitid).FirstOrDefault();
                    if (compDel != null)
                    {
                        entities.CompanyUnit.Remove(compDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CompanyUnit-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.CompanyUnit> GetRepCompUnitCheckItemDetails(int CompanyUnitId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetCompUnitMasterCheck(CompanyUnitId)
                         select new Domain.CompanyUnit
                         {
                             CompanyUnitName = YD1.CompanyUnit,
                             CountCompUnitId = YD1.ChkCompUnitid,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<CompanyUnit> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
