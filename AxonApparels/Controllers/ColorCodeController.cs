using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class ColorCodeController : Controller
    {
        //
        // GET: /ColorCode/
        IColorCodeBusiness ccobj = new ColorCodeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ColorCodeIndex()
        {
            ColorCode cc = new ColorCode();
            List(cc);
            return View();
        }
        [HttpPost]
        public JsonResult Add(ColorCode str)
        {
            var result = ccobj.CreateColorCode(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ColorCode str)
        {
            return Json(ccobj.UpdateColorCode(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(ccobj.GetId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(ccobj.DeleteColorCode(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetColorcode()
        {
            return Json(ccobj.GetColorCode(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(ColorCode br)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString(); var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                var result = ccobj.GetColorCode();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str = GenRights.GenerateRights(Roleid, MenuNumber.MenuColorCode, "'{0}','{1}','{2}'",SUser);
                    
                    string[] StrArr = str.Split('$');
                    ViewBag.ColorCodeAddFlg = StrArr[0];
                    str = StrArr[1];

                    foreach (ColorCode list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.ColorCodeId, list.ColorCodenam, list.IsActive);
                        sb.AppendFormat(str, list.ColorCodeId, list.ColorCodenam, list.IsActive);
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
