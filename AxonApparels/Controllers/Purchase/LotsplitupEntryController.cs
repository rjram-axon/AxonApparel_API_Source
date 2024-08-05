using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Purchase
{
    public class LotsplitupEntryController : Controller
    {
        //
        // GET: /LotsplitupEntry/

        ILotSplitupEntryBusiness oblLot = new LotsplitUpEntryBusiness();

        public ActionResult LotsplitupEntryIndex()
        {
            return View();
        }

        public JsonResult GetLotEntryDetails(string TransNo, string EType)
        {
            return Json(oblLot.GetDataLotDetails(TransNo, EType), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadLotItemDetails(string TransNo, string EType)
        {
            var getDetails = oblLot.ListLotItemDetails(TransNo, EType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetLotEditEntryDetails(int LotSplitMasId, string EType)
        {
            return Json(oblLot.GetDataEditLotDetails(LotSplitMasId, EType), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadLotEditItemDetails(int LotSplitMasId, string EType)
        {
            var getDetails = oblLot.ListLotEditItemDetails(LotSplitMasId, EType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadLotEditSplitDetails(int? LotSplitMasId, int? StockId)
        {
            var getDetails = oblLot.ListLotEditSplitDetails(LotSplitMasId, StockId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(LotSplitUp opj)
        {
            var result = oblLot.CreateLotSplitEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(LotSplitUp ObjPE)
        {
            return Json(oblLot.UpdateLotEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(LotSplitUp ObjPFDelete)
        {
            return Json(oblLot.DeleteLot(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
    }
}
