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
    public class DesignationRepository : IDesignationRepository
    {

        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Designation> GetDataListAll()
        {
            //return entities.Designations.OrderBy(e => e.Designation1);

            List<Domain.Designation> lstemployee = new List<Domain.Designation>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterDesignationLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Designation employee = new Domain.Designation();
                    employee.Id = Convert.ToInt32(rdr["DesigId"]);
                    employee.DesignationName = rdr["Designation"].ToString();
                    employee.IsActive = (rdr["IsActive"]).ToString();
                    employee.Department = (rdr["Department"]).ToString();

                    employee.Departmentid = Convert.ToInt32(rdr["DepartmentId"]);
                    employee.Employee = (rdr["Employee"]).ToString();
                    employee.Employeeid = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.Address = (rdr["Address1"]).ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Designation GetDataById(int id)
        {
            //return entities.Designations.Where(c => c.Id == id).FirstOrDefault();

            Designation employee = new Designation();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Designation where Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Designation1 = rdr["Designation"].ToString();              
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Designation obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Designation.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Designation-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Designation Designationobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Designation.Where(c => c.Id == Designationobj.Id).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = Designationobj.IsActive;
                        cou.Designation1 = Designationobj.Designation1;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Designation-UpdateData");
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
                    var cou = entities.Designation.Where(c => c.Id == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Designation.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Designation-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.Designation> GetRepDesignationCheckItemDetails(int desginid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetDesgMasterCheck(desginid)
                         select new Domain.Designation
                         {
                             CountDesgiId = YD1.ChkDesgId,
                             DesignationName = YD1.Designation,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Designation> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
