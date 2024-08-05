using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers.Planning
{
    public class BudgetController : Controller
    {
        //
        // GET: /Budget /
        IBudgetBusiness obj = new BudgetBusiness();
        public ActionResult BudgetIndex()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Getlist(string order, int stylId)
        {
            var getdetails = obj.GetBudgetOrderDetails(order, stylId).Value.ToList();
            return Json(getdetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBOMCopy(string OrderNo, int Styleid)
        {
            var getdetails = obj.GetBOMCopy(OrderNo, Styleid).Value.ToList();
            return Json(getdetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBom(string order, int stylId)
        {
            var getbomdetails = obj.DisplayBuyerOrderBom(order, stylId).Value.ToList();
            return Json(getbomdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcesslist(string type, string order, int stylId, int costid,int mode,int strwid)
        {
            var getprocessdetails = obj.GetBuyerOrder_valuess1(type, order, stylId, costid,mode,strwid).Value.ToList();
            return Json(getprocessdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductnlist(string type, string order, int stylId, int costid, int mode, int strwid)
        {
            var getprocessdetails = obj.GetBuyerOrder_valuess2(type, order, stylId, costid,mode,strwid).Value.ToList();
            return Json(getprocessdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPreProcessdet(int Proessid, int Itemid, int Colorid, int sizeid)
        {
            var getprocessdetails = obj.GetPreProcessdet(Proessid, Itemid, Colorid, sizeid).Value.ToList();
            return Json(getprocessdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcess(string type, string order, int stylId, int costid, int mode, int strwid)
        {
            var getprocessdetails = obj.GetBuyerOrder_Store_valuesforproc(type, order, stylId, costid, mode, strwid).Value.ToList();
            return Json(getprocessdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductn(string type, string order, int stylId, int costid, int mode, int strwid)
        {
            var getprocessdetails = obj.GetBuyerOrder_Store_valuesforprodtn(type, order, stylId, costid,mode,strwid).Value.ToList();
            return Json(getprocessdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCommercial(string type, int costid,string orderno,int mode,int styleid)
        {
            var getcommdetails = obj.GetBudgetDetails(type,  costid,orderno,mode,styleid).Value.ToList();
            return Json(getcommdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBomedit(string type, int costid, string orderno, int mode,int styleid)
        {
            var getcommdetails = obj.GetBudgetDetailsBomedit(type, costid, orderno, mode,styleid).Value.ToList();
            return Json(getcommdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMasteredit(string type, int costid, string orderno, int mode, int styleid)
        {
            var getcommdetails = obj.GetBudgetDetailsMasteredit(type, costid, orderno, mode, styleid).Value.ToList();
            return Json(getcommdetails, JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult AddMas(Cost_Defn_Mas str)
        {
            var result = obj.Add(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Cost_Defn_Mas ObjPSeq)
        {
            return Json(obj.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult delete(int Id)
        {
            var Prod = obj.Delete(Id);
            return Json(Prod, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShipmentwiserate(int stylerowid)
        {
            var getdetails = obj.GetShipmentwiserate(stylerowid).Value.ToList();
            return Json(getdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessQuotedet(int ProcId, string WorkOrdNo)
        {
            var result = obj.GetProcessQuoteDet(ProcId, WorkOrdNo);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurchaseQuotedet(string OrdNo, int ItemId, int colorId, int SizeId)
        {
            var result = obj.GetPurchaseQuoteDet(OrdNo, ItemId, colorId, SizeId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
