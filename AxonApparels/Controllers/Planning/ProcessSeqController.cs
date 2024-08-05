using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Domain;
namespace AxonApparels.Controllers.Planning
{
    public class ProcessSeqController : Controller
    {
        //
        // GET: /ProcessSeq/
        IProcessSeqBusiness obj = new ProcessSeqBusiness();

        public ActionResult ProcessSeqIndex()
        {
            return View();
        }
        public JsonResult Delete(int ID)
        {
            return Json(obj.DeletePlanCon(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPlanning(int? CompanyId, int? BuyerId, int? Styleid, string Order_No, string Ref_No, string JobNo, string FDate, string ToDate, string OrdType)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.GetDataMainList(CompanyId, BuyerId, Styleid, Order_No, Ref_No, JobNo, FDate, ToDate, OrdType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessSequenceMain App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {6} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({6})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({6},{7})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><a><button type=\"button\" id=\"btnPrint\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Stylerowid, App.Order_No, App.Ref_No, App.JobNo, App.BuyerName, App.MerchandiserName, App.Processseqmasid, App.CPrgNo);
                    
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
        public JsonResult GetOrderNo(string frmDate, string ToDate)
        {

            return Json(obj.GetDataOrderDetails(frmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
    }
}
