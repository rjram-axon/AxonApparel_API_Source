using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class GarmentItemController : Controller
    {
        IGarmentItemBusiness gbus = new GarmentItemBusiness();
        //
        // GET: /GarmentItem/

        public ActionResult GarmentItemIndex()
        {
            return View();
        }
        public JsonResult GetOrderStyleTempLateDDL()
        {
            return Json(gbus.GetOrderStyleTempLateDDL(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(string type, int buyormasid)
        {

            try
            {

                StringBuilder sb = new StringBuilder();
                var result = gbus.GetBuyOrderItemLoad(buyormasid);
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BuyOrderStyle BuySty in result.Value)
                {

                    if (type == "Gitm")
                    {
                        if (BuySty.ItemCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {6} \" onclick=\"return getbyGarAddID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarEditID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarDeleteID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName);
                        }
                        else if (BuySty.ItemCount > 0 && BuySty.GCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {6} \" onclick=\"return getbyGarAddID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarEditID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarDeleteID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName);
                        }
                        else if (BuySty.ItemCount > 0 && BuySty.GCount > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {6} \" onclick=\"return getbyGarAddID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarEditID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {6} \" onclick=\"return getbyGarDeleteID({6})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{6}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName);
                        }
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


        public JsonResult GetStyleTemp(int id)
        {
            var result = gbus.GetStyleTemp(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
         public JsonResult GetOrderStyleTemp(int id)
         {
             var result = gbus.GetOrderStyleTemp(id);
             return Json(result, JsonRequestBehavior.AllowGet);
         }
          [HttpPost]
         public JsonResult Add(Ord_styleTempMas Spm)
         {
             var result = gbus.CreateOrderStyleTemplate(Spm);
             return Json(result, JsonRequestBehavior.AllowGet);
         }
         public JsonResult Update(Ord_styleTempMas str)
         {
             return Json(gbus.UpdateOrderStyleTemplate(str), JsonRequestBehavior.AllowGet);
         }
         public JsonResult Delete(int id)
         {
             return Json(gbus.DeleteData(id), JsonRequestBehavior.AllowGet);
         }
        public JsonResult GetGarmentOrderNo(int buyormasid)
        {
           return Json(gbus.GetGarmentOrderNoList(buyormasid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckPlanOrdTempDetails(int id, int detid)
        {
            return Json(gbus.GetDataCheckPlanTempDetails(id, detid), JsonRequestBehavior.AllowGet);
        }
    }
}
       