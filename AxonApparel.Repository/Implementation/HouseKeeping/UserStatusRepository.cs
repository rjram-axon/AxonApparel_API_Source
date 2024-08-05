using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
namespace AxonApparel.Repository
{
    public class UserStatusRepository : IUserStatusRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.UserName> GetListUserStatus(string password)
        {
            
                //IQueryable<Domain.UserName> query = (from un in entities.Username
                //                                     join ug in entities.UserGroup on un.Groupid equals ug.GroupId
                //                                     join emp in entities.Employee on un.EmployeeId equals emp.EmployeeId
                //                                     select new Domain.UserName
                //                                     {
                //                                         UserId = un.UserId,
                //                                         Username = un.Username1,
                //                                         Password = un.Password,
                //                                         LoginStatus = un.LoginStatus,
                //                                         GroupId = ug.GroupId,
                //                                         GroupName = ug.GroupName,
                //                                         EmployeeId = emp.EmployeeId,
                //                                         Employee = emp.Employee1
                //                                     }).AsQueryable();
                //return query;
            List<Domain.UserName> lstemployee = new List<Domain.UserName>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_UserStatusLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.UserName employee = new Domain.UserName();
                    employee.UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Username = rdr["Username"].ToString();
                    employee.Password = rdr["Password"].ToString();
                    employee.LoginStatus = rdr["LoginStatus"].ToString();
                    employee.GroupId = Convert.ToInt32(rdr["Groupid"]);
                    employee.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);
                    employee.Employee = rdr["Employee"].ToString();
                    employee.GroupName = rdr["GroupName"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
            
        }

        public bool UpdateUserStatus(List<Domain.UserName> UserStatusList)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var UserNameList = new List<Repository.Username>();

                    if (UserStatusList.Count > 0)
                    {
                        foreach (var Userdet in UserStatusList)
                        {
                            var Usernamedet = entities.Username.Where(b => b.UserId == Userdet.UserId).FirstOrDefault();
                            if (Usernamedet != null)
                            {
                                Usernamedet.Password = Help.Encrypt(Userdet.Password);
                                Usernamedet.Groupid = Userdet.GroupId;
                                Usernamedet.EmployeeId = Userdet.EmployeeId;
                                Usernamedet.LoginStatus = Userdet.LoginStatus;
                            }

                        }
                        entities.SaveChanges();
                    }
                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "UserStatus-UpdateData");
                    return false;
                    throw ex;
                }
            }
        }

    }
}
