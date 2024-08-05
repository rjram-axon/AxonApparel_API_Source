using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
namespace AxonApparels.Controllers.OrderProcessing
{
    public class EnquiryController : Controller
    {
        //
        // GET: /Enquiry/
        IEnquiryBusiness EnqObj = new EnquiryBusiness();

        public ActionResult EnquiryIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(Enquiry ObjEnq)
        {
            var result = EnqObj.CreateEnquiry(ObjEnq);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddEnqStyle(Enquiry ObjEnq)
        {
            var result = EnqObj.CreateStyleEnquiry(ObjEnq);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Enquiry ObjEnq)
        {
            return Json(EnqObj.UpdateEnquiry(ObjEnq), JsonRequestBehavior.AllowGet);
        }
  
        public JsonResult EditMainList(int ID)
        {
            return Json(EnqObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(EnqObj.DeleteEnquiry(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListEnquiryEntry(int? CompanyId, string EnquiryNo,int? BuyerId,int? StyleId, string frmDate, string ToDate)
        
        {
            try
            {
                
                StringBuilder sb = new StringBuilder();
                var result = EnqObj.GetEnquiry(CompanyId, EnquiryNo, BuyerId, StyleId, frmDate, ToDate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (Enquiry App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.EnquiryId, App.Buyer, App.EnquiryNo, App.EnqDate, App.BuyerRef, App.Style);
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
        public JsonResult GetEntryNo()
        {
            var result = EnqObj.GetEntryNoList();
            return Json(result, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult GetBuyRefNo()
        {
            var result = EnqObj.GetBuyRefNo();
            return Json(result, JsonRequestBehavior.AllowGet);
           
        }
    }
}
