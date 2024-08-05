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
    public class UnitConversionController : Controller
    {
        //
        // GET: /UnitConversion/
        IUnitConversionBusiness ucobj = new UnitConversionBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult UnitConversionIndex()
        {
            UnitConversion uc = new UnitConversion();
            List(uc);
            return View();
        }
        [HttpPost]
        public JsonResult Add(UnitConversion str)
        {
            var result = ucobj.CreateUC(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(UnitConversion str)
        {
            return Json(ucobj.UpdateUC(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(ucobj.GetId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(ucobj.DeleteUC(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUCs()
        {
            return Json(ucobj.GetUC(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(UnitConversion br)
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
                var result = ucobj.GetUC();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuUnitConversion, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.UnitConversionAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (UnitConversion list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.Id, list.Conversion, list.IsActive);
                        sb.AppendFormat(str1, list.Id, list.FuomTuom, list.IsActive, list.Conversion);
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

