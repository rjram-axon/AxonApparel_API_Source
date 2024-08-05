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
    public class PayTermsRepository : IPayTermsRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Payment_Terms> GetDataListAll()
        {
            //return entities.Payment_Terms.OrderBy(c => c.Pay_Termid);

            List<Payment_Terms> lstemployee = new List<Payment_Terms>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterPayment_TermsLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Payment_Terms employee = new Payment_Terms();
                    employee.Pay_Termid = Convert.ToInt32(rdr["Pay_Termid"]);
                    employee.Pay_Term = rdr["Pay_Term"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Payment_Terms GetDataById(int id)
        {
            //return entities.Payment_Terms.Where(c => c.Pay_Termid == id).FirstOrDefault();

            Payment_Terms employee = new Payment_Terms();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Payment_Terms where Pay_Termid= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Pay_Termid = Convert.ToInt32(rdr["Pay_Termid"]);
                    employee.Pay_Term = rdr["Pay_Term"].ToString();                
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public IEnumerable<TermMas> GetTermCondition()
        {
            //return entities.TermMas.OrderBy(c => c.TermId);
            List<TermMas> lstemployee = new List<TermMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterPayment_TermsLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    TermMas employee = new TermMas();
                    employee.TermId = Convert.ToInt32(rdr["Pay_Termid"]);
                    employee.TermName = rdr["Pay_Term"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public int AddData(Payment_Terms objPT)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Payment_Terms.Add(objPT);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PayTerms-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Payment_Terms objPayTer)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Payment_Terms.Where(c => c.Pay_Termid == objPayTer.Pay_Termid).FirstOrDefault();
                    if (App != null)
                    {
                        App.IsActive = objPayTer.IsActive;
                        App.Pay_Term = objPayTer.Pay_Term;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PayTerms-UpdateData");
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
                    var App = entities.Payment_Terms.Where(c => c.Pay_Termid == id).FirstOrDefault();
                    if (App != null)
                    {
                        entities.Payment_Terms.Remove(App);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PayTerms-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.PaymentTerms> GetRepPayTermCheckItemDetails(int Paytermid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPaymentTermsMasterCheck(Paytermid)
                         select new Domain.PaymentTerms
                         {
                             CountPaymentTermsId = YD1.ChkPayTermId,
                             PaymentTermsName = YD1.Pay_Term,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Payment_Terms> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
