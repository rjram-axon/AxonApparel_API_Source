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
using AxonApparel.Business;

namespace AxonApparels.Controllers.UserStatus
{
    public class UserStatusController : Controller
    {
        IUserStatusBusiness UserStatusbus = new UserStatusBusiness();
        //
        // GET: /UserStatus/

        public ActionResult UserStatusIndex()
        {
            return View();
        }
        public ActionResult ListUserStatus(string Password)
        {
            var DPassword = "";

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = UserStatusbus.GetListUserStatus(Password).Value.ToList();
                if (result == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                foreach (UserName App in result)
                {
                    if (Password == "U")
                    {
                        DPassword = Help.Decrypt(App.Password);
                        App.Password=DPassword;

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.UserId, App.Username, App.Password, App.LoginStatus, App.GroupId, App.GroupName, App.EmployeeId, App.Employee);

                    }
                    else { 
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\" \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.UserId, App.Username, App.Password, App.LoginStatus, App.GroupId, App.GroupName, App.EmployeeId, App.Employee);

                    }
                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                var obj = new { tableValue = tableValue, Data = result };
                return Json(new { data = obj }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult UpdateUserStatus(UserName mainlistobj)
        {
            return Json(UserStatusbus.UpdateUserStatus(mainlistobj), JsonRequestBehavior.AllowGet);
        }
    }
}
