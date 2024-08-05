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
    public class BulkOrderShipmentController : Controller
    {
        //
        // GET: /BulkOrderShipment/
        IBulkOrderShipmentBusiness ShipObj = new BulkOrderShipmentBusiness();

        public ActionResult BulkOrderShipmentIndex()
        {
            return View();
        }
        public JsonResult SaveShipment(BuyOrdShipment ObjShipEn, ProductionWorkOrder Spm)
        {
            var result = ShipObj.CreateBulkShipmentEntry(ObjShipEn, Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPackDetails(int SNo, string PackType, int StyleRowId)
        {

            var getPacDetails = ShipObj.GetPackType(SNo, PackType, StyleRowId).Value.ToList();
            return Json(getPacDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListPackSepDetails(int SNo, string PackType, int StyleRowId)
        {
            var getPacDetails = ShipObj.GetPackSepType(SNo, PackType, StyleRowId).Value.ToList();
            return Json(getPacDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListShipDetDetails(int StyleRowId)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = ShipObj.GetShipDetDetails(StyleRowId);

                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (BuyOrdShipment App in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.ShipRowId, App.Ship_Date, App.Dest, App.Dest_Code, App.PortOfLoading, App.PortOfLoadingId, App.UOM, App.UomID, App.Quantity, App.Lotno, App.ItemMode, App.ItemModeType);
                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                var obj = new { tableValue = tableValue, Data = result.Value };
                return Json(new { data = obj }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ListShipEditDetails(int StyleRowId)
        {
            var getCompDetails = ShipObj.ShipEditDetails(StyleRowId).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPackEditDetails(int ShipRowId, int StyleRowId, int SSNo)
        {
            //try
            //{
            //    StringBuilder sb = new StringBuilder();
            //    var result = ShipObj.GetListPackEditDetails(ShipRowId, StyleRowId, SSNo).Value.ToList();
            //    if (result == null || result == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


            //    foreach (BuyOrdShipPack App in result)
            //    {
            //        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.Color, App.Size, App.ComboId, App.SizeId, App.StyleRow, App.SSNO, App.ShipRow, App.Buy_Ord_OrderDetId, App.Quantity);
            //    }

            //    string tableValue = sb.ToString();
            //    tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            //    var obj = new { tableValue = tableValue, Data = result };
            //    return Json(new { data = obj }, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    return Json("Failure", JsonRequestBehavior.AllowGet);
            //}
            var getEPacDetails = ShipObj.GetListPackEditDetails(ShipRowId, StyleRowId, SSNo).Value.ToList();
            return Json(getEPacDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPackLoadEditDetails(int StyleRowId)
        {
            var getEPacDetails = ShipObj.GetListPackLoadEditDetails(StyleRowId).Value.ToList();
            return Json(getEPacDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ShipObj.DeleteShip(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BuyOrdShipment ObjShipEn, ProductionWorkOrder Spm)
        {
            return Json(ShipObj.UpdateBulkShipmentEntry(ObjShipEn, Spm), JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditListPackSepDetails(int StyleRowId)
        {
            var getPacDetails = ShipObj.GetRepShipSepDetList(StyleRowId).Value.ToList();
            return Json(getPacDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditListPackDetails(int StyleRowId, string orderno)
        {
            var getPacDetails = ShipObj.GetItemPackDetList(StyleRowId, orderno).Value.ToList();
            return Json(getPacDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckWorkPlanDetails(string Workorder)
        {
            return Json(ShipObj.GetDataCheckPlanWorkDetails(Workorder), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetReportPath(string SessionName) {
            var Path = Session[SessionName].ToString();
            return Json(Path, JsonRequestBehavior.AllowGet);
        }

    }
}
