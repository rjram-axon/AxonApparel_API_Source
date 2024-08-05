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
    public class ProcessSeqMainController : Controller
    {
        //
        // GET: /ProcessSeqMain/
        IProcessSeqMainBusiness obj = new ProcessSeqMainBusiness();
        public ActionResult ProcessSeqMainIndex()
        {
            return View();
        }

        public ActionResult ListPlanning(int? CompanyId, int? BuyerId, string Order_No, string Ref_No, string FDate, string ToDate, string OrdType)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.GetDataMainList(CompanyId, BuyerId, Order_No, Ref_No, FDate, ToDate, OrdType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessSequenceMain App in result)
                {
                    //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {6} \" onclick=\"return getbyID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"> Process </button></a>'],",App.Styleid, App.Order_No, App.Ref_No, App.JobNo, App.BuyerName, App.MerchandiserName,App.Stylerowid);
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {6} \" onclick=\"return getbyID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" style=\"width:25px;padding:0px;\" title=\"Add\" class=\"btnSelect btn btn-round btn-success\"> <i class=\"fa fa-plus\"></i> </button></a>'],", App.Styleid, App.Order_No, App.Ref_No, App.JobNo, App.BuyerName, App.MerchandiserName, App.Stylerowid);
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
