using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class TermsController : Controller
    {
        //
        // GET: /Terms/

        ITermsBusiness trmobj = new TermsBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TermsIndex()
        {
            Terms cnt = new Terms();
            List(cnt);
            return View();
        }

        [HttpPost]
        public JsonResult Add(Terms Spm)
        {
            var result = trmobj.CreateTrm(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(trmobj.GetTrmId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Terms Spm)
        {
            return Json(trmobj.UpdateTrm(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(trmobj.DeleteTrm(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTerms()
        {
            return Json(trmobj.GetTrm(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Terms Spm)
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
                var result = trmobj.GetTrm();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuCountry, "'{0}','{1}','{2}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.CountryAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Terms Trmmode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Countrymode.CountryId, Countrymode.CountryName, Countrymode.Lookup, Countrymode.IsActive);
                        sb.AppendFormat(str1, Trmmode.TermsId, Trmmode.TermsName, Trmmode.IsActive);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(result, JsonRequestBehavior.AllowGet);
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
