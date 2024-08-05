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
    public class BoxConversionController : Controller
    {
        //
        // GET: /BoxConversion/

        IBoxConversionBusiness obj = new BoxConversionBusiness();

        public ActionResult BoxConversionIndex()
        {
            return View();
        }
        public JsonResult GetSknDetails()
        {
            return Json(obj.GetBussSknDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Loaditmsgrid(int SKUMasID)
        {
            return Json(obj.Loaditmsgrid(SKUMasID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GeRefNoDetails(int Buy_Ord_MasId)
        {
            return Json(obj.GeRefNoBussDetails(Buy_Ord_MasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GeOrdDetails(int Buy_Ord_MasId)
        {
            return Json(obj.GeOrdNoBussDetails(Buy_Ord_MasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Loaditmstockgrid(int BMasId, int SknMasId)
        {
            return Json(obj.LoadBussitmsgrid(BMasId, SknMasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(BoxConversionMas opj)
        {
            var result = obj.CreateBoxEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingriddet(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate, int? BoxConMasId)
        {

            return Json(obj.LoadMaingrid(CompanyId, StoreId, BoxConNo, OrderNo, FromDate, ToDate, BoxConMasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingrid(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate, int? BoxConMasId)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(CompanyId, StoreId, BoxConNo, OrderNo, FromDate, ToDate, BoxConMasId).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BoxConversionMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return getDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \" <button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return BoxConPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.BoxConMasId, App.BoxConNo, App.BoxConDate, App.OrderNo);
                    
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
        public JsonResult Update(BoxConversionMas opj)
        {
            var result = obj.UpdateBoxEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(BoxConversionMas opj)
        {
            var result = obj.DeleteBoxEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
