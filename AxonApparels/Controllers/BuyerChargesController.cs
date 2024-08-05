using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers
{
    public class BuyerChargesController : Controller
    {
        //
        // GET: /BuyerCharges/
        IBuyerChargesBusiness buyerobj = new BuyerChargesBusiness();
        public ActionResult BuyerChargesIndex()
        {
            return View();
        }
        public JsonResult AddMas(BuyerCharges str)
        {
            var result = buyerobj.Add(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingrid()
        {
            var getcommdetails = buyerobj.LoadMaingrid().Value.ToList();
            return Json(getcommdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getbyId(int Buyerid)
        {
            var getcommdetails = buyerobj.GetbyId(Buyerid).Value.ToList();
            return Json(getcommdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BuyerCharges str)
        {
            var result = buyerobj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(BuyerCharges str)
        {
            var result = buyerobj.Delete(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Checkbuy(int buyid)
        {
            return Json(buyerobj.ListMainGrid(buyid), JsonRequestBehavior.AllowGet);
        }
    }
}
