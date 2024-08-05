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
    public class OrderItemDetailsController : Controller
    {
        IOrderItemDetailsBusiness oidbus = new OrderItemdetailsBusiness();
        //
        // GET: /GarmentItem/

        public ActionResult OrderItemdetailsIndex()
        {
            return View();
        }
        public JsonResult GetOrderStyleTempLateDDL()
        {
            return Json(oidbus.GetOrderStyleTempLateDDL(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(string type, int buyormasid)
        {

            try
            {

                StringBuilder sb = new StringBuilder();
                var result = oidbus.GetBuyOrderItemLoad(buyormasid);
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BuyOrderStyle BuySty in result.Value)
                {

                    if (type == "oid")
                    {
                        //if (BuySty.OrderItemCount == 0)
                        //{
                        //    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {8} \" onclick=\"return getbyGarAddID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \" onclick=\"return getbyGarEditID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \" onclick=\"return getbyGarDeleteID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName, BuySty.StyleRowid);
                        //}
                         if ( BuySty.OrderItemCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {8} \" onclick=\"return getbyGarAddID({8},{5})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \" onclick=\" \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \" onclick=\" \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName, BuySty.StyleRowid);
                        }
                        else if ( BuySty.OrderItemCount > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {8} \" onclick=\" \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GarmentItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \" onclick=\"return getbyGarEditID({8},{5})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \" onclick=\"return getbyGarDeleteID({8},{5})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"   class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.Styleid, BuySty.order_no, BuySty.styleName, BuySty.buyerItem, BuySty.Buyerid, BuySty.GItem_Id, BuySty.Template_Id, BuySty.BuyerName, BuySty.StyleRowid);
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
            var result = oidbus.GetStyleTemp(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderStyleTemp(int id)
        {
            var result = oidbus.GetOrderStyleTemp(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add(OrdCons_Mas Spm)
        {
            var result = oidbus.CreateOrderStyleTemplate(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OrdCons_Mas str)
        {
            return Json(oidbus.UpdateOrderStyleTemplate(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(oidbus.DeleteData(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGarmentOrderNo(int buyormasid)
        {
            return Json(oidbus.GetGarmentOrderNoList(buyormasid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult processdet(int conmasid)
        {
            return Json(oidbus.processdet(conmasid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult yarnfabdet(int conmasid)
        {
            return Json(oidbus.yarnfabdet(conmasid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckPlanOrdTempDetails(int id, int detid)
        {
            return Json(oidbus.GetDataCheckPlanTempDetails(id, detid), JsonRequestBehavior.AllowGet);
        }
    }
}
