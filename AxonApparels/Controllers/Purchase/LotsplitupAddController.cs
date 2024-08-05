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
    public class LotsplitupAddController : Controller
    {
        //
        // GET: /LotsplitupAdd/

        ILotSplitUpAddBusiness obPMo = new LotSplitUpAddBusiness();

        public ActionResult LotsplitupAddIndex()
        {
            return View();
        }
        public JsonResult GetAddLotdetails(string OrderType, string StockType, int? SupplierId, int? Companyid, string TransNo, int? ProcessId)
        {
            var getDetails = obPMo.GetDataLotAddDetails(OrderType, StockType, SupplierId, Companyid, TransNo, ProcessId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetSuppNo(string OrderType, string StockType)
        {

            return Json(obPMo.GetDataLotSuppDropDetails(OrderType, StockType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCompNo(string OrderType, string StockType)
        {

            return Json(obPMo.GetDataLotDropDetails(OrderType, StockType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetTransNo(string OrderType, string StockType)
        {

            return Json(obPMo.GetDataLotTransNoDropDetails(OrderType, StockType), JsonRequestBehavior.AllowGet);

        }
    }
}
