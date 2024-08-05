using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;


namespace AxonApparels.Controllers
{
    public class UserGroupController : Controller
    {
        //
        // GET: /UserGroup/

        IUserGroupBusiness ugbus = new UserGroupBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult UserGroupIndex()
        {
            UserGroup ug = new UserGroup();
            GroupList(ug);
            return View();
        }

        public JsonResult AddGroup(UserGroup Objgroup)
        {
            var result = ugbus.CreateGroup(Objgroup);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddUser(UserName ObjUser)
        {
            var result = ugbus.CreateUser(ObjUser);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGroupNames()
        {
            return Json(ugbus.GetGroupName(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GroupList(UserGroup Grp)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                var result = ugbus.GetGroupName();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuUserGroup, "'{0}','{1}','{2}','{3}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.UserGroupAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (UserGroup Groupmode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return GetGroupId({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return DeleteGroup({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Groupmode.GroupId, Groupmode.GroupName, Groupmode.Description, Groupmode.GroupType);
                        sb.AppendFormat(str1, Groupmode.GroupId, Groupmode.GroupName, Groupmode.Description, Groupmode.GroupType);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UserList(UserName Usr)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = ugbus.GetUser();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (UserName Usermode in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return GetUserId({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return DeleteUser({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", Usermode.UserId, Usermode.Username, Usermode.GroupName, Usermode.Employee, Usermode.Grouptype);
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetGroupId(int ID)
        {
            return Json(ugbus.GetGroupId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserId(int ID)
        {
            return Json(ugbus.GetUserId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateGrp(UserGroup Upgrp)
        {
            return Json(ugbus.UpdateGroup(Upgrp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateUrp(UserName Upurp)
        {
            return Json(ugbus.UpdateUser(Upurp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteGrp(int ID)
        {
            return Json(ugbus.GroupDelete(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUsr(int ID)
        {
            return Json(ugbus.UserDelete(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGName(int ID)
        {
            return Json(ugbus.GetGrpNme(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ShowPasswordDcrypt(string Pass)
        {
            var result = Help.Decrypt(Pass);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ShowPasswordEcrypt(string Pass)
        {
            var result = Help.Encrypt(Pass);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
