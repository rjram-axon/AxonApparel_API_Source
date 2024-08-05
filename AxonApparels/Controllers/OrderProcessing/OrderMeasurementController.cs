using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Text.RegularExpressions;
using System.IO;

namespace AxonApparels.Controllers
{
    public class OrderMeasurementController : Controller
    {
        //
        // GET: /OrderMeasurement/

        IBulkOrderMeasurementBusiness BuyOrdMobj = new BulkOrderMeasurementBusiness();

        public ActionResult OrderMeasurementIndex()
        {
            return View();
        }
        public JsonResult GetOrderMeasuDetails(int Id)
        {
            return Json(BuyOrdMobj.GetDataByOrderMeasu(Id), JsonRequestBehavior.AllowGet);            
        }
        public JsonResult GetOrderMeasuImg(int Id)
        {
            return Json(BuyOrdMobj.GetOrderMeasuImg(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadGarItemDetails(int StyleRowid, string OrderNo)
        {
            var getDetails = BuyOrdMobj.ListEntryItemDetails(StyleRowid, OrderNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadGarSizeItemDetails(int StyleRowid,string OrderNo)
        {
            var getDetails = BuyOrdMobj.ListEntrySizeItemDetails(StyleRowid, OrderNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(BulkOrderMeasurement opj)
        {
            var result = BuyOrdMobj.CreateMOrderEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(BulkOrderMeasurement ObjPE)
        {
            return Json(BuyOrdMobj.UpdateMeaEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(BulkOrderMeasurement ObjPFDelete)
        {
            return Json(BuyOrdMobj.DeleteMeas(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadGarCompEditItemDetails(int MeasureMasId)
        {
            var getDetails = BuyOrdMobj.ListEntryCompEditItemDetails(MeasureMasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadGarSizeEditItemDetails(int MeasureMasId)
        {
            var getDetails = BuyOrdMobj.ListEntryEditSizeItemDetails(MeasureMasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
    }
}
