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
    public class OverHeadsController : Controller
    {
        //
        // GET: /OverHeads/
        IOverHeadsBusiness obj = new OverHeadsBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult OverHeadsIndex()
        {
            OverHeads oh = new OverHeads();
            List(oh);
            return View();
        }
        [HttpPost]
        public JsonResult Add(OverHeads obacc)
        {
            var result = obj.CreateOverHeads(obacc);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(obj.GetOverHeadsId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OverHeads obAcc)
        {
            return Json(obj.UpdateOverHeads(obAcc), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(obj.DeleteOverHeads(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetoverHeads()
        {
            return Json(obj.GetOverHeads(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(OverHeads obAcc)
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
                var result = obj.GetOverHeads();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);

                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuOverHeads, "'{0}','{1}','{2}','{3}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.OverHeadsAddFlg = StrArr[0];
                    str1 = StrArr[1];
                    foreach (OverHeads list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.commercialid, list.commercial, list.costtype, list.isactive);
                        sb.AppendFormat(str1 , list.commercialid, list.commercial, list.costtype, list.isactive);
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
