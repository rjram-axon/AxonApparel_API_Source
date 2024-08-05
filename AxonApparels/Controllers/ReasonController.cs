using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class ReasonController : Controller
    {
        //
        // GET: /Reason/
        IReasonBusiness objRea = new ReasonBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ReasonIndex()
        {
            Season rn = new Season();
            List(rn);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Reason obRea)
        {
            var result = objRea.CreateReason(obRea);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(objRea.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Reason obRea)
        {
            return Json(objRea.UpdateReason(obRea), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(objRea.DeleteReason(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetReason()
        {
            return Json(objRea.GetReason(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Season obSea)
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
                var result = objRea.GetReason();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string Str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    Str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuReason, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = Str1.Split('$');
                    ViewBag.ReasonAddFlg = StrArr[0];
                    Str1 = StrArr[1];

                    foreach (Reason Rean in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Rean.ReasonId, Rean.ReasonName, Rean.IsActive);
                        sb.AppendFormat(Str1, Rean.ReasonId, Rean.ReasonName, Rean.IsActive);
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

    }
}
