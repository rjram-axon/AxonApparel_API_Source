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
    public class DepartmentRepository : IDepartmentRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Department> GetDataListAll()
        {
            //return entities.Departments.OrderBy(c => c.Department1);

            List<Department> lstemployee = new List<Department>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterDepartmentLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Department employee = new Department();
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Department1 = rdr["Department"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Department GetDataById(int id)
        {
            //return entities.Departments.Where(c => c.Id == id).FirstOrDefault();

            Department employee = new Department();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Department where Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Id = Convert.ToInt32(rdr["Id"]);
                    employee.Department1 = rdr["Department"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Department obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Department.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Department-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Department obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.Department.Where(c => c.Id == obj.Id).FirstOrDefault();
                    if (s != null)
                    {
                        s.Department1 = obj.Department1;
                        s.IsActive = obj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Department-UpdateData");
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
                    var s = entities.Department.Where(c => c.Id == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.Department.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Department-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.Department> GetRepDepartmentCheckItemDetails(int departid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetDepartMasterCheck(departid)
                         select new Domain.Department
                         {
                             CountDepartmentId = YD1.ChkDepartId,
                             DepartmentName = YD1.Department,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Department> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
