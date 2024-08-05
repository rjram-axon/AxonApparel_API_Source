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
    public class CurrencyController : Controller
    {
        //
        // GET: /Currency/
        ICurrencyBusiness cuObj = new CurrencyBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();


        public ActionResult CurrencyIndex()
        {
            Currency cr = new Currency();
            List(cr);
            return View();
        }
        public ActionResult List(Currency ObjCur)
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
                var result = cuObj.GetCurrency();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuCurrency, "'{0}','{1}','{2}','{3}','{4}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.CurrencyAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Currency App in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.CurrencyId, App.CurrencyName, App.Abbreviation, App.Exchangerate, App.IsActive);
                        sb.AppendFormat(str1 , App.CurrencyId, App.CurrencyName, App.Abbreviation, App.Exchangerate, App.IsActive);
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
        public JsonResult Add(Currency Objcur)
        {
            var result = cuObj.CreateCurrency(Objcur);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Currency Objcur)
        {
            return Json(cuObj.UpdateCurrency(Objcur), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(cuObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(cuObj.DeleteCurrency(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCurrency()
        {
            return Json(cuObj.GetCurrency(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCurrencyRefDetails(int CurrencyId)
        {
            var getDetails = cuObj.GetCurrencyCheckItemDetails(CurrencyId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
