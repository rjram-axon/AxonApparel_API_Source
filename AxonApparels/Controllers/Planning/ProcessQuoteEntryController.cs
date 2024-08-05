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
    public class ProcessQuoteEntryController : Controller
    {
        //
        // GET: /ProcessQuoteEntry/

        IProcessQuoteEntryBusiness PQObj = new ProcessQuoteEntryBusiness();

        public ActionResult ProcessQuoteEntryIndex()
        {
            return View();
        }
        public JsonResult SavePQuote(ProcessQuote ObjPend)
        {
            var result = PQObj.CreatePQuoteEntry(ObjPend);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PQEditMainList(int MasID)
        {
            return Json(PQObj.GetDataPQEditBusDetails(MasID), JsonRequestBehavior.AllowGet);

        }
        public ActionResult ListPQPREditDetDetails(int MasId)
        {
            var getPReDetails = PQObj.GetEditPQPRDetList(MasId).Value.ToList();
            return Json(getPReDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListPQPROrdDetDetails(string JobOrdNo)
        {
            var getPROrdDetails = PQObj.GetOrdPQPRDetList(JobOrdNo).Value.ToList();
            return Json(getPROrdDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListOrdProcessDetails(string JobOrdNo, int ProcessId)
        {
            var getOrdDetails = PQObj.GetOrdItemList(JobOrdNo, ProcessId).Value.ToList();
            return Json(getOrdDetails, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetProcessQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid,int Processid, int Compid)
        {
            var getOrdDetails = PQObj.GetProcessQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid,Processid, Compid).Value.ToList();
            return Json(getOrdDetails, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ListPQIEditDetDetails(int MasId)
        {
            var getPIReDetails = PQObj.GetEditPQIDetList(MasId).Value.ToList();
            return Json(getPIReDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdatePQuote(ProcessQuote ObjUPend)
        {
            return Json(PQObj.UpdatePQEntry(ObjUPend), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderDetails(int MasId)
        {
            return Json(PQObj.GetDataOrdDetails(MasId), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListEditOrderDetails(int MasId)
        {
            var getOrdReDetails = PQObj.GetEditOrderList(MasId).Value.ToList();
            return Json(getOrdReDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
