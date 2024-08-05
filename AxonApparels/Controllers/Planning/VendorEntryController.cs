using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Collections;
using System.Web.Routing;

namespace AxonApparels.Controllers.Planning
{
    public class VendorEntryController : Controller
    {
        //
        // GET: /VendorEntry/

        IVendorEntryBusiness VObj = new VendorEntryBusiness();

        public ActionResult VendorEntryIndex()
        {
            return View();
        }
        public JsonResult SaveVendor(Vendor ObjVend)
        {
            var result = VObj.CreateVendorEntry(ObjVend);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListOrderDetails(string MasId)
        {
            var getDetails = VObj.GetDataOrdItemList(MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult VEditMainList(int MasID)
        {

            return Json(VObj.GetDataVenBusDetails(MasID), JsonRequestBehavior.AllowGet);

        }
        public ActionResult ListVenEditDetDetails(int MasId)
        {
            var getVeDetails = VObj.GetEditDetList(MasId).Value.ToList();
            return Json(getVeDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPurQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Compid)
        {
            var getVeDetails = VObj.GetPurQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid, Compid).Value.ToList();
            return Json(getVeDetails, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(Vendor ObjVenEn)
        {
            return Json(VObj.UpdateVendorEntry(ObjVenEn), JsonRequestBehavior.AllowGet);
        }
    }
}
