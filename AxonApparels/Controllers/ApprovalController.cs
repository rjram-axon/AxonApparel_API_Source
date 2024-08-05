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
    public class ApprovalController : Controller
    {
        //
        // GET: /Approval/

        IApprovalBusiness AppObj = new ApprovalBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ApprovalIndex()
        {
            Approval ap = new Approval();
            List(ap);
            return View();
        }
        public ActionResult List(Approval ObjApp)
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
                var result = AppObj.GetApproval();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string Str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    Str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuApproval, "'{0}','{1}','{2}','{3}'", SUser);

                    string[] StrArr = Str1.Split('$');
                    ViewBag.ApprovalAddFlg = StrArr[0];
                    Str1 = StrArr[1];

                    foreach (Approval App in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.ApprovalId, App.ApprovalName, App.ApprovalDays, App.IsActive);
                        sb.AppendFormat(Str1, App.ApprovalId, App.ApprovalName, App.ApprovalDays, App.IsActive);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);

            }
        }
        [HttpPost]
        public JsonResult Add(Approval ObjApp)
        {
            var result = AppObj.CreateApproval(ObjApp);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Approval ObjApp)
        {
            return Json(AppObj.UpdateApproval(ObjApp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(AppObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(AppObj.DeleteApproval(ID), JsonRequestBehavior.AllowGet);
        }

    }
}
