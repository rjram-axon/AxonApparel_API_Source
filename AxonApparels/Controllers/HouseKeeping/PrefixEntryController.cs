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

namespace AxonApparels.Controllers.HouseKeeping
{
    public class PrefixEntryController : Controller
    {
        //
        // GET: /PrefixEntry/

        IPrefixEntryBusiness AlDb = new PrefixEntryBusiness();

        public ActionResult PrefixEntryIndex()
        {
            return View();
        }
        public JsonResult LoadDataAlloPurchaseDetails(int? PrefixId)
        {
            var getDetails = AlDb.ListAllItemDetails(PrefixId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingriddet(int? PrefixId)
        {
            return Json(AlDb.ListAllItemDetails(PrefixId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PrefixEntry ObjA)
        {
            return Json(AlDb.UpdatePrefixEntry(ObjA), JsonRequestBehavior.AllowGet);
        }

    }
}
