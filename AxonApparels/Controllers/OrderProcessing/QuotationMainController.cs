using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class QuotationMainController : Controller
    {
        //
        // GET: /QuotationMain/
        IQuotationMainBusiness obPGo = new QuotationMainBusiness();

        public ActionResult QuotationMainIndex()
        {
            return View();
        }
        public JsonResult GetgridMainDetails(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate, string RefNo)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obPGo.GetDataMainList(companyId, buyerid, quotetype, quoteno, enqno, styleid, fromDate, todate, RefNo).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (MarkQuoteMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return QuotationPrint({0},{9})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.QuoteID, App.BuyerId, App.buyer, App.QuoteNo, App.QuoteDate, App.StyleId, App.style, App.QuoteType, App.enquiryno, App.Companyid, App.company,App.RefNo);                    
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

        public JsonResult GetMainddldet(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate, string RefNo)
        {
            return Json(obPGo.GetDataMainList(companyId, buyerid, quotetype, quoteno, enqno, styleid, fromDate, todate, RefNo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRevNumber(int QuoteID)
        {
            return Json(obPGo.GetDetRecNo(QuoteID), JsonRequestBehavior.AllowGet);
        }
    }
}
