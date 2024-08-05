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
    public class PaymentTermsController : Controller
    {
        //
        // GET: /PaymentTerms/
        IPaymentTermsBusiness objpm = new PaymentTermBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult PaymentTermsIndex()
        {
            PaymentTerms pt = new PaymentTerms();
            List(pt);
            return View();
        }
        [HttpPost]
        public JsonResult Add(PaymentTerms obPay)
        {
            var result = objpm.CreatePaymentTerms(obPay);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(objpm.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PaymentTerms obPay)
        {
            return Json(objpm.UpdatePaymentTerms(obPay), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(objpm.DeletePaymentTerms(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(PaymentTerms obPay)
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
                var result = objpm.GetPaymentTerms();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1;
                var Roleid = Convert.ToInt16(Session["Roleid"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuPaymentTerms, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.PaymentTermsAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (PaymentTerms PayTerm in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", PayTerm.PaymentTermsId, PayTerm.PaymentTermsName, PayTerm.IsActive);
                        sb.AppendFormat(str1 , PayTerm.PaymentTermsId, PayTerm.PaymentTermsName, PayTerm.IsActive);
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
        public JsonResult GetPaymentTerms()
        {
            return Json(objpm.GetPaymentTerms(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPaytermRefDetails(int PaymentTermsId)
        {
            var getDetails = objpm.GetPayTermCheckItemDetails(PaymentTermsId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTermsCondition()
        {
            return Json(objpm.GetTermsCondition(), JsonRequestBehavior.AllowGet);
        }

    }
}
