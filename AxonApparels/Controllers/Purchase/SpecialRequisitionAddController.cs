using AxonApparel.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.Purchase
{
    public class SpecialRequisitionAddController : Controller
    {
        //
        // GET: /SpecialRequisitionAdd/
        ISpecialRequisitionAddBusiness obPGo = new SpecialRequisitionAddBusiness();

        public ActionResult SpecialRequisitionAddIndex()
        {
            return View();
        }
        public JsonResult GetOrderNo(int cmpid,string unit)
        {

            return Json(obPGo.GetordnoDetails(cmpid,unit), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetRefNo(int cmpid, string orderno, string unit)
        {

            return Json(obPGo.GetrefnoDetails(cmpid, orderno, unit), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStyle(int cmpid, string orderno,string refno, string unit)
        {

            return Json(obPGo.GetstyleDetails(cmpid, orderno,refno, unit), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getwrkordno(int cmpid, string orderno, string refno,int styleid, string unit)
        {

            return Json(obPGo.GetwrknoDetails(cmpid, orderno, refno,styleid, unit), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getitmgrp(string jbno)
        {

            return Json(obPGo.GetitmgrpDetails(jbno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadgrid(string jborderno, string orderno, string refno, int styleid)
        {

            return Json(obPGo.GetgridDetails(jborderno,orderno,refno,styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadjobgrid(string jborderno, string orderno, string refno, int styleid)
        {

            return Json(obPGo.GetjobgridDetails(jborderno, orderno, refno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(SpecialReqMas str)
        {
            var result = obPGo.CreateEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(SpecialReqMas ObjPSeq)
        {
            return Json(obPGo.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AppUpdate(SpecialReqMas ObjPSeq)
        {
            return Json(obPGo.AppUpdate(ObjPSeq), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(obPGo.Delete(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Loadeditgrid(int reqid)
        {

            return Json(obPGo.GetgrideditDetails(reqid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult AppDelete(SpecialReqMas ObjPSeq)
        {
            return Json(obPGo.AppDelete(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
    }
}
