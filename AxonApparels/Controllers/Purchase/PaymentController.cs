using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class PaymentController : Controller
    {
        //
        // GET: /Payment/
        IPaymentBusiness obj = new PaymentBusiness();
        public ActionResult PaymentIndex()
        {
            return View();
        }
          [HttpPost]
        public JsonResult AddList(int Supplierid,int Companyid,string Type)
        {
            return Json(obj.AddList(Supplierid, Companyid, Type), JsonRequestBehavior.AllowGet);
        }
         [HttpPost]  
         public JsonResult Add(Bill_Adj_mas objvalue)
         {
            var result = obj.Create(objvalue);
            return Json(result, JsonRequestBehavior.AllowGet);

         }

         public JsonResult Update(Bill_Adj_mas objvalue)
         {
             var result = obj.Update(objvalue);
             return Json(result, JsonRequestBehavior.AllowGet);

         }

         public JsonResult Delete(Bill_Adj_mas objvalue)
         {
             var result = obj.Delete(objvalue);
             return Json(result, JsonRequestBehavior.AllowGet);

         }
         public JsonResult GetmainList(int Supplierid, int Companyid,string Paymentno,string FromDate,string ToDate,string advance)
         {

             StringBuilder sb = new StringBuilder();
             var result = obj.GetmainList(Supplierid, Companyid, Paymentno, FromDate, ToDate, advance);
             if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
             foreach (Bill_Adj_mas List in result.Value)
             {
                 sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\"    onclick=\"return getbyID({0})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDeletec\" onclick=\"return DeletebyId({0})\"    class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", List.Trans_masid, List.Company, List.Supplier, List.Trans_No, List.Trans_Date, List.Cheque_Date, List.Cheque_Amt);
             }
             string tableValue = sb.ToString();
             tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
             return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

             //return Json(obj.GetmainList(Supplierid, Companyid, Paymentno, FromDate, ToDate, advance), JsonRequestBehavior.AllowGet);
         }

         public JsonResult GetEditMas(int Transid)
         {
             return Json(obj.GetEditMas(Transid), JsonRequestBehavior.AllowGet);
         }

         public JsonResult GetEditDet(int Transid)
         {
             return Json(obj.GetEditDet(Transid), JsonRequestBehavior.AllowGet);
         }
         public JsonResult GetPaymentNo(int Companyid)
         {
             return Json(obj.GetPaymentNo(Companyid), JsonRequestBehavior.AllowGet);
         }
    }
}
