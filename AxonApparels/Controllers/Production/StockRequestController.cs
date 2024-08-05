using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;

namespace AxonApparels.Controllers.Production
{
    public class StockRequestController : Controller
    {       
        //
        // GET: /StockRequest/
        IStockRequestBusiness obj = new StockRequestBusiness();

        public ActionResult StockRequestIndex()
        {
            return View();
        }

        public JsonResult Loadgrid(int Reqstno, int Entryno)
        {

            return Json(obj.Loadgrid(Reqstno, Entryno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingriddet(int Companyid, int Despatchid, string Despfromdate, string DespTodate)
        {

            return Json(obj.LoadMaingrid(Companyid, Despatchid, Despfromdate, DespTodate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingrid(int Companyid, int Despatchid, string Despfromdate, string DespTodate)
        {
           
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(Companyid, Despatchid, Despfromdate, DespTodate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BoxDespatchMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return getDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \" <button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return BoxConPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.DespatchId, App.Company, App.DespatchNo, App.DespatchDate);

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
        public JsonResult LoaditmEditgrid(int BoxConMasId)
        {
            return Json(obj.GetitmEditGrid(BoxConMasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoaditmEditstockgrid(int BoxConMasId)
        {
            return Json(obj.GetitmEditStockGrid(BoxConMasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadQntygrid(string SkuNo)
        {

            return Json(obj.LoadQntygrid(SkuNo), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadgridItmstock(string SkuNo)
        {

            return Json(obj.LoadgridItmstock(SkuNo), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetSknDetails()
        {
            return Json(obj.GetBussSknDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDespatchNo()
        {
            return Json(obj.GetBussDespatchNo(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetReqstDetails()
        {
            return Json(obj.GetBussReqstDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(BoxDespatchMas opj)
        {
            var result = obj.AddBuss(opj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BoxDespatchMas opj)
        {
            var result = obj.UpdateBoxEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(BoxDespatchMas opj)
        {
            var result = obj.DeleteBoxEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
