using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;
using System.Configuration;
using System.Web;
using System.Net;


using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Net;

namespace AxonApparel.Repository
{
    public class LoginRepository : ILoginRepository
    {

        string OrdNo = "";

        HouseKeepingEntities entities = new HouseKeepingEntities();
        string connStr = ConfigurationManager.ConnectionStrings["AxonConnectionString"].ConnectionString;
        bool Valid = false;
        bool update = false;

        public bool IsValid(string Username, string Password)
        {

            var user = (from Lg in entities.Proc_Apparel_Login(Username)
                        select new Domain.UserName
                        {
                            UserId = Lg.UserId,
                            Username = Lg.Username,
                            VCode = Lg.VCode,
                            Password = Lg.Password,
                        }).FirstOrDefault();
            if (user != null)
            {
                var encodingPasswordString = Help.Encrypt(Password);
                var query = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ChkUser {0}, {1}", Username, encodingPasswordString).FirstOrDefault();

                if (query != null)
                {
                    Valid = true;
                }
              
            }
            return Valid;
        }

        public IQueryable<UserName> GetDataList()
        {
            throw new NotImplementedException();
        }

        public UserName GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public int AddData(UserName obj)
        {
            throw new NotImplementedException();
        }

        public bool UpdateData(UserName obj)
        {
            throw new NotImplementedException();
        }

        public bool DeleteData(int id)
        {
            throw new NotImplementedException();
        }

        public Domain.UserName GetUser(string Username, string Password)
        {
            //IQueryable<Domain.UserName> query = (from T in entities.Username
            //                                     select new Domain.UserName
            //                                     {
            //                                         UserId = T.UserId,
            //                                         Username = T.Username1,
            //                                         Password=T.Password
            //                                     }).AsQueryable();


            ////var usercheck = entities.Username.Where(o => (o.Username1 == Username)).FirstOrDefault();
            ////var DecryptPasswordString = Help.Decrypt(usercheck.Password);
            //////var Encryptpasswrd = Help.Encrypt(Password);
            //string decript = Help.Decrypt("9JeHY7R63n6y4f+/M5agjw==");
            string pass = Help.Encrypt(Password);
            //var user = entities.Username.Where(o => (o.Username1 == Username && o.Password== pass)).FirstOrDefault();
            //var user = entities.Username.Where(o => (o.Username1 == Username )).FirstOrDefault();

            var user = (from Lg in entities.Proc_Apparel_LoginUserPass(Username, pass)
                        select new Domain.UserName
                        {
                            UserId = Lg.UserId,
                            Username = Lg.Username1,
                            Roleid = Lg.Roleid,
                            Rolename = Lg.RoleName,
                            EmployeeId = Lg.EmployeeId,
                            LoginStatus = Lg.LoginStatus,
                            LoginPC = Lg.LoginPC,
                            UnitId=Lg.UnitId,
                            Multiple=Lg.Multiple
                        }).FirstOrDefault();
            //if (user != null)
            //{
            //    //var encodingPasswordString = Help.Encrypt(Password);
            //    //var query = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ChkUser {0}, {1}", Username, encodingPasswordString).FirstOrDefault();
            //    //if (query != null)
            //    //{
            //    //    Valid = true;
            //    //}
            //    return user == null ? null : new Domain.UserName { UserId = Convert.ToInt32((user.UserId == null ? 0 : user.UserId)), EmployeeId = Convert.ToInt32((user.EmployeeId == null ? 0 : user.EmployeeId)), Username = user.Username, Roleid = (int)(user.Roleid == null ? 0 : user.Roleid) };

            //}

                //DateTime upto=Convert.ToDateTime("10/12/2022");

                //DateTime current = this.entities.Database.SqlQuery<DateTime>("exec Proc_Apparel_GetServerDate").FirstOrDefault();
                //if (upto < current)
                //{
                //    user = null;
                //}


            return user == null ? null : new Domain.UserName { UserId = Convert.ToInt32((user.UserId == null ? 0 : user.UserId)), EmployeeId = Convert.ToInt32((user.EmployeeId == null ? 0 : user.EmployeeId)), Username = user.Username, Roleid = (int)(user.Roleid == null ? 0 : user.Roleid), LoginStatus = (user.LoginStatus == null ? "N" : user.LoginStatus), LoginPC = (user.LoginPC == null ? "" : user.LoginPC), UnitId = Convert.ToInt32((user.UnitId == null ? 0 : user.UnitId)), Multiple = Convert.ToInt32((user.Multiple == null ? 0 : user.Multiple)) };
        }
        public bool UpdateloginUnit(string Username, string Password, int UnitId)
        {
            string pass = Help.Encrypt(Password);
            var result = entities.Proc_Apparel_LoginUnitUpdate(Username, pass, UnitId);
            entities.SaveChanges();

            return true;
        }
        public bool UpdateLoginStatus(string Username, string Password, string loginstatus, string MachineName)
        {
            string pass = Help.Encrypt(Password);


            try
            {
                var resultC = entities.Proc_Apparel_LoginUserPassUpdate(Username, pass, loginstatus, MachineName);
                entities.SaveChanges();

                //The Transaction will be completed
                update = true;

                //return id.StyleRowid;
            }
            catch (Exception ex)
            {
            }
            return update;
        }

        //public bool CheckLicenceUser()
        //{
        //    int licenceusermispath = 0;
        //    int userid = 0;
        //    bool licenceuservalid = false;

        //    //try
        //    //{
        //    //    int loginuser = entities.Username.Where(o => o.LoginStatus == "Y").Count();
        //    //    var licenceuser = entities.MisPath;
        //    //    foreach (var lic in licenceuser) {
        //    //        licenceusermispath = Convert.ToInt16(Help.Decrypt(lic.Licenceusers));             
        //    //    }
        //    //    if (licenceusermispath > loginuser)
        //    //    {
        //    //        licenceuservalid = true;
        //    //    }
        //    //    else {
        //    //        licenceuservalid = false;

        //    //    }
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //}


        //    try
        //    {
        //        var user = (from Lg in entities.Proc_Apparel_LoginStatus()
        //                    select new Domain.UserName
        //                    {
        //                        UserId = Lg.UserId,
        //                        LoginStatus = Lg.LoginStatus,

        //                    }).FirstOrDefault();

        //        if (user != null)
        //        {
        //            userid = user.UserId;
        //        }




        //        var licenceuser = (from Lg in entities.Proc_Apparel_GetMisPathDetails()
        //                           select new Domain.MisSetting
        //                           {
        //                               MisId = Lg.MispathId,
        //                               Licenceusers = Lg.Licenceusers,
        //                           }).FirstOrDefault();


        //        if (licenceuser != null)
        //        {
        //            licenceusermispath = Convert.ToInt16(Help.Decrypt(licenceuser.Licenceusers));
        //        }
        //        if (licenceusermispath > userid)
        //        {
        //            licenceuservalid = true;
        //        }
        //        else
        //        {
        //            licenceuservalid = false;

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //    }

        //    return licenceuservalid;
        //}



        public bool CheckLicenceUser()
        {
            int licenceusermispath = 0;
            int userid = 0;
            bool licenceuservalid = false;
            //return entities.Currencies.OrderBy(c => c.Currency1);
            //List<UserName> lstemployee = new List<UserName>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_LoginStatusall", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    userid = Convert.ToInt32(rdr["LoginStatus"]);

                }
                con.Close();
            }

            var licenceuser = (from Lg in entities.Proc_Apparel_GetMisPathDetails()
                               select new Domain.MisSetting
                               {
                                   MisId = Lg.MispathId,
                                   Licenceusers = Lg.Licenceusers,
                               }).FirstOrDefault();


            if (licenceuser != null)
            {
                licenceusermispath = Convert.ToInt16(Help.Decrypt(licenceuser.Licenceusers));
            }
            if (licenceusermispath > userid)
            {
                licenceuservalid = true;
            }
            else
            {
                licenceuservalid = false;

            }
            return licenceuservalid;



        }




        public IQueryable<Domain.MenuList> GetMenuNumber()
        {
            IQueryable<Domain.MenuList> query = (from T in entities.Proc_Apparel_LoginMenuList()
                                                 select new Domain.MenuList
                                                       {
                                                           MenuId = T.MenuId,
                                                           MenuName = T.MenuName,
                                                           ParentId = (int)T.ParentId,
                                                           Remarks = T.Remarks,
                                                           Url = T.Url,
                                                       }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.ExchangeRates> GetRepExRates(int compid)
        {


            IQueryable<ExchangeRates> query = (from a in entities.Proc_GetPendingExchangeRate(compid)
                                               select new ExchangeRates
                                           {

                                               Code = a.StyleCurrencyCode,
                                               //CheckJob = (int)a.CheckJob,


                                           }).AsQueryable();

            return query;
        }
    }
}
