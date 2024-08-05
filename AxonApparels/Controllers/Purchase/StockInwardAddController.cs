using AxonApparel.Business.Implementation;
using AxonApparel.Business.Interface;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers.Purchase
{
    public class StockInwardAddController : Controller
    {
        //
        // GET: /StockInwardAdd/
        IStockInwardAddBusiness obPMo = new StockInwardAddBusiness();
        public ActionResult StockInwardAddIndex()
        {
            return View();
        }
        public JsonResult GetJobNo(int cmpid)
        {

            return Json(obPMo.GetjobordnoDetails(cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderNo(int cmpid)
        {

            return Json(obPMo.GetordnoDetails(cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetRefNo(int cmpid)
        {

            return Json(obPMo.GetrefnoDetails(cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetItemgrp(string jobordno)
        {

            return Json(obPMo.GetitemgrpDetails(jobordno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadgrid(string jobordno)
        {

            return Json(obPMo.GetLoadgridDetails(jobordno), JsonRequestBehavior.AllowGet);

        }
        public ActionResult SupplierList()
        {
            var getDetails = obPMo.GetLoadsupplier().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Loadonprocess(string jobordno,int pid)
        {

            return Json(obPMo.GetLoadonprocess(jobordno,pid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadonitemgrp(string jobordno, int itmid)
        {

            return Json(obPMo.GetLoadonitmgrp(jobordno, itmid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(UnitGrnMas str)
        {
            var result = obPMo.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Loadongrnnoedit(int mid)
        {

            return Json(obPMo.GetLoadoneditgrnno(mid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadeditdet(string jobordno)
        {

            return Json(obPMo.GetLoadoneditdet(jobordno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadeditgrid(int mid,string jobno,string type)
        {

            return Json(obPMo.GetLoadgrid(mid, jobno, type), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStkMainDetails(int URNMasid)
        {

            return Json(obPMo.GetDataMainList(URNMasid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(UnitGrnMas ObjPSeq)
        {
            return Json(obPMo.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(obPMo.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
