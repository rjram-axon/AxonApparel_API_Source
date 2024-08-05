using System;
using System.Collections.Generic;
using System.Linq;
using AxonApparel.Business;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.Process
{
    public class ProcessQualityController : Controller
    {
        //
        // GET: /ProcessQuality/
        IProcessQualityBusiness obj = new ProcessQualityBusiness();
        public ActionResult ProcessQualityIndex()
        {
            return View();
        }
        public JsonResult GetEntryItemLoad(int recptmasid)
        {

            return Json(obj.GetEntryItemLoad(recptmasid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEntryJobDetLoad(int recptmasid)
        {

            return Json(obj.GetEntryJobDetLoad(recptmasid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEntryStockLoad(int recptmasid)
        {

            return Json(obj.GetEntryStockLoad(recptmasid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(ProcQltyMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetQltyEditDetails(int Proc_Recpt_Masid)
        {
            return Json(obj.GetDataQltyEditDetails(Proc_Recpt_Masid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItemQltyEditDetails(int Proc_Recpt_Masid)
        {
            var getDetails = obj.GetItemQltyEditDetails(Proc_Recpt_Masid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadStockQltyEditDetails(int Proc_Recpt_Masid)
        {
            var getDetails = obj.GetStockQltyEditDetails(Proc_Recpt_Masid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProcQltyMas Ustr)
        {
            var result = obj.UpdateEntry(Ustr);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(ProcQltyMas Dstr)
        {
            var result = obj.DeleteEntry(Dstr);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
