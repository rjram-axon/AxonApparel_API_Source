using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity.Validation;


namespace AxonApparel.Repository
{
    public class UserGroupRepository : IUserGroupRepository
    {
        MasterEntities entities = new MasterEntities();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public int AddDataGroup(UserGroup Grpobj)
        {
            var gr = entities.UserGroup.Add(Grpobj);
            entities.SaveChanges();
            return gr.GroupId;
        }

        public int AddDataUser(Username Urobj)
        {
            int UserId = 0;
            try
            {
                
                var chkUser = (from s in entities.Username where s.Username1 == Urobj.Username1 select s).FirstOrDefault();
                if (chkUser == null)
                {
                    var ur = entities.Username.Add(Urobj);
                    entities.SaveChanges();
                    return ur.UserId;
                }
                return UserId;
            }
            catch (Exception ex) {

                return UserId;
            }
        }

        public UserGroup GetGroupById(int Grpid)
        {
            //return entities.UserGroup.Where(c => c.GroupId == Grpid).FirstOrDefault();
            UserGroup employee = new UserGroup();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from UserGroup where GroupId= " + Grpid;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.GroupId = Convert.ToInt32(rdr["GroupId"]);
                    employee.GroupName = rdr["GroupName"].ToString();
                    employee.Description = rdr["Description"].ToString();                
                    employee.GroupType = rdr["GroupType"].ToString();
                }
            }
            return employee; 
        }

        public Username GetUserById(int Urid)
        {
            //return entities.Username.Where(c => c.UserId == Urid).FirstOrDefault();
            Username employee = new Username();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetUsernameDet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Userid", Urid);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                   // employee.UserId = Convert.ToInt32(rdr["StateId"]);
                    employee.Username1 = rdr["Username"].ToString();
                    employee.Groupid = Convert.ToInt32(rdr["Groupid"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Grouptype = rdr["Grouptype"].ToString();
                    employee.Password = rdr["Password"].ToString();
                    employee.ConPassword = rdr["ConPassword"].ToString();
                    employee.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Roleid = Convert.ToInt32(rdr["Roleid"]);
                    employee.Question = rdr["Question"].ToString();
                    employee.Answer = rdr["Answer"].ToString();
                    employee.ChangePass = rdr["ChangePass"].ToString();//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.VCode = rdr["VCode"].ToString();
                    employee.LoginPC = rdr["LoginPC"].ToString();
                    employee.LoginStatus = rdr["LoginStatus"].ToString();
                    employee.UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.UnitId = Convert.ToInt32(rdr["UnitId"]);
                    employee.Multiple = Convert.ToInt32(rdr["Multiple"]);
                }
            }
            return employee; 
        }

        public IEnumerable<UserGroup> GetGroupNameList()
        {
           // return entities.UserGroup.OrderBy(c => c.GroupName);
            List<UserGroup> lstemployee = new List<UserGroup>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterUserGroupLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    UserGroup employee = new UserGroup();
                    //employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    //employee.State1 = rdr["State"].ToString();
                    //employee.Lookup = rdr["Lookup"].ToString();
                    //employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);

                    employee.GroupId = Convert.ToInt32(rdr["GroupId"]);
                    employee.GroupName = rdr["GroupName"].ToString();
                    employee.Description = rdr["Description"].ToString();
                    employee.GroupType = rdr["GroupType"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Domain.UserName> GetUserList()
        {
            //return entities.Username.OrderBy(c => c.Username1);

            List<Domain.UserName> lstemployee = new List<Domain.UserName>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterUserNameLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.UserName employee = new Domain.UserName();
                    //employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    //employee.State1 = rdr["State"].ToString();
                    //employee.Lookup = rdr["Lookup"].ToString();
                    //employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);

                    employee.UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Username = rdr["Username"].ToString();
                    employee.GroupId = Convert.ToInt32(rdr["Groupid"]);//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.Grouptype = rdr["Grouptype"].ToString();
                    employee.GroupName = rdr["GroupName"].ToString();
                    employee.Password = rdr["Password"].ToString();
                    employee.ConPassword = rdr["ConPassword"].ToString();
                    employee.EmployeeId = Convert.ToInt32(rdr["EmployeeId"]);//st.IsActive ? "TRUE" : "FALSE",
                    employee.Employee = rdr["Employee"].ToString();
                    employee.Roleid = Convert.ToInt32(rdr["Roleid"]);
                    employee.Question = rdr["Question"].ToString();
                    employee.Answer = rdr["Answer"].ToString();
                    employee.ChangePass = rdr["ChangePass"].ToString();//st.IsActive ? "TRUE" : "FALSE",                    
                    employee.VCode = rdr["VCode"].ToString();
                    employee.LoginPC = rdr["LoginPC"].ToString();
                    employee.LoginStatus = rdr["LoginStatus"].ToString();
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public bool UpdateGroup(UserGroup GrpUpd)
        {
            var result = false;
            var GpUd = entities.UserGroup.Where(c => c.GroupId == GrpUpd.GroupId).FirstOrDefault();
            if (GpUd != null)
            {
                GpUd.GroupId = GrpUpd.GroupId;
                GpUd.GroupName = GrpUpd.GroupName;
                GpUd.Description = GrpUpd.Description;
                GpUd.GroupType = GrpUpd.GroupType;

            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateUser(Username UrpUpd)
        {
            try
            {
                var result = false;
                var UpUd = entities.Username.Where(c => c.UserId == UrpUpd.UserId).FirstOrDefault();
                if (UpUd != null)
                {
                    UpUd.UserId = UrpUpd.UserId;
                    UpUd.Username1 = UrpUpd.Username1;
                    UpUd.Groupid = UrpUpd.Groupid;
                    UpUd.Grouptype = UrpUpd.Grouptype;
                    UpUd.Password = UrpUpd.Password;
                    //UpUd.ConPassword = UrpUpd.ConPassword;
                    UpUd.VCode = UrpUpd.VCode;
                    UpUd.EmployeeId = UrpUpd.EmployeeId;
                    UpUd.Question = UrpUpd.Question;
                    UpUd.Answer = UrpUpd.Answer;
                    UpUd.ChangePass = UrpUpd.ChangePass;
                    UpUd.Roleid = UrpUpd.Roleid;
                    UpUd.UnitId = UrpUpd.UnitId;
                    UpUd.Multiple = UrpUpd.Multiple;
                }
                entities.SaveChanges();
                result = true;
                return result;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
        }

        public bool GroupDelete(int Grpid)
        {
            var result = false;
            var Grpdel = entities.UserGroup.Where(c => c.GroupId == Grpid).FirstOrDefault();
            if (Grpdel != null)
            {
                entities.UserGroup.Remove(Grpdel);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UserDelete(int Urid)
        {
            var result = false;
            var urdel = entities.Username.Where(c => c.UserId == Urid).FirstOrDefault();
            if (urdel != null)
            {
                entities.Username.Remove(urdel);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public IQueryable<Domain.UserGroup> GetGroupName(int GrpId)
        {
            var query = (from Gn in entities.Proc_Apparel_GetGroupName(GrpId)
                         select new Domain.UserGroup
                         {
                             GroupType = Gn.GroupType,
                         }).AsQueryable();
            return query;
        }    

        public IQueryable<UserGroup> GetDataList()
        {
            throw new NotImplementedException();
        }

        public UserGroup GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateData(UserGroup obj)
        {
            throw new NotImplementedException();
        }

        public bool DeleteData(int id)
        {
            throw new NotImplementedException();
        }


        public int AddData(UserGroup obj)
        {
            throw new NotImplementedException();
        }

    }
}
