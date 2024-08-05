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
    public class EmployeeRepository : IEmployeeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Employee> GetDataListAll()
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<Domain.Employee> lstemployee = new List<Domain.Employee>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterEmployeeLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Employee employee = new Domain.Employee();
                    employee.EmpId = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.EmpName = rdr["Employee"].ToString();
                    employee.EmpNo = rdr["EmpNo"].ToString();
                    employee.CompanyUnit = Convert.ToInt32(rdr["CompanyUnit"]);
                    employee.CompanyUnitName = rdr["CompanyUnit"].ToString();
                    employee.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    employee.DepartmentName = rdr["Department"].ToString();
                    employee.DesignationName = rdr["Designation"].ToString();
                    employee.CityName = rdr["City"].ToString();
                    employee.DesignationId = Convert.ToInt32(rdr["DesignationId"]);
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Email = rdr["Email"].ToString();
                    employee.PhoneNo = rdr["PhoneNo"].ToString();
                    employee.PieceRate = rdr["PieceRate"].ToString();
                    employee.ProdEmployee = rdr["ProdEmployee"].ToString();
                    //employee.re = Convert.ToBoolean(rdr["AddlessId"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IEnumerable<Domain.Employee> GetManager()
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<Domain.Employee> lstemployee = new List<Domain.Employee>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetManager", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Employee employee = new Domain.Employee();
                    employee.EmpId = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.EmpName = rdr["Employee"].ToString();
                  
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IEnumerable<Domain.Employee> GetMerch()
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<Domain.Employee> lstemployee = new List<Domain.Employee>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMerch", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Employee employee = new Domain.Employee();
                    employee.EmpId = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.EmpName = rdr["Employee"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Employee GetDataById(int id)
        {
            //return entities.Employee.Where(c => c.EmployeeId == id).FirstOrDefault();

            Employee employee = new Employee();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterEmployeeMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@empid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.Employee1 = rdr["Employee"].ToString();
                    employee.EmpNo = rdr["EmpNo"].ToString();
                    employee.CompanyUnit = Convert.ToInt32(rdr["CompanyUnit"]);
                    employee.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);
                    employee.DesignationId = Convert.ToInt32(rdr["DesignationId"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.Address1 = rdr["Address1"].ToString();
                    employee.Address2 = rdr["Address2"].ToString();
                    employee.Address3 = rdr["Address3"].ToString();
                    employee.CityId = Convert.ToInt32(rdr["CityId"]);
                    employee.Email = rdr["Email"].ToString();
                    employee.PhoneNo = rdr["PhoneNo"].ToString();
                    employee.PieceRate = Convert.ToBoolean(rdr["PieceRate"]);
                    employee.ProdEmployee = Convert.ToBoolean(rdr["ProdEmployee"]);
                    employee.Relieved = Convert.ToBoolean(rdr["Relieved"]);
                    employee.Imgpath = rdr["Imgpath"].ToString();
                }
            }
            return employee;
        }

        public int AddData(Employee obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Employee.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Employee-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Employee employeeobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Employee.Where(c => c.EmployeeId == employeeobj.EmployeeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = employeeobj.IsActive;
                        cou.Employee1 = employeeobj.Employee1;
                        cou.EmpNo = employeeobj.EmpNo;
                        cou.CompanyUnit = employeeobj.CompanyUnit;
                        cou.DepartmentId = employeeobj.DepartmentId;
                        cou.DesignationId = employeeobj.DesignationId;
                        cou.Address1 = employeeobj.Address1;
                        cou.Address2 = employeeobj.Address2;
                        cou.Address3 = employeeobj.Address3;
                        cou.CityId = employeeobj.CityId;
                        cou.Email = employeeobj.Email;
                        cou.PhoneNo = employeeobj.PhoneNo;
                        cou.PieceRate = employeeobj.PieceRate;
                        cou.IsActive = employeeobj.IsActive;
                        cou.ProdEmployee = employeeobj.ProdEmployee;
                        cou.Imgpath = employeeobj.Imgpath;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Employee-UpdateData");
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
                    var cou = entities.Employee.Where(c => c.EmployeeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Employee.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Employee-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.Employee> GetRepEmployeeCheckItemDetails(int empid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetEmployeeMasterCheck(empid)
                         select new Domain.Employee
                         {
                             CountEmpId = YD1.ChkEmployeeId,
                             EmpName = YD1.ChkEmployee,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Employee> GetDataList()
        {
            throw new NotImplementedException();
        }


        
    }
}
