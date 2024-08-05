using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class QuotationAddController : Controller
    {
        //
        // GET: /QuotationAdd/
        IQuotationAddBusiness obPGo = new QuotationAddBusiness();

        public JsonResult GetQuotationNoDDL()
        {
            return Json(obPGo.GetQuotationNo(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult QuotationAddIndex()
        {
            return View();
        }
        public JsonResult Getprocess()
        {

            return Json(obPGo.Getprocess(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getuom(int itmid)
        {

            return Json(obPGo.GetUom(itmid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(MarkQuoteMas str)
        {
            var result = obPGo.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(MarkQuoteMas str)
        {
            var result = obPGo.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getmasdet(int qid)
        {

            return Json(obPGo.GetMasdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getfabdet(int qid)
        {

            return Json(obPGo.GetFabdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getyarndet(int qid)
        {

            return Json(obPGo.Getyarndet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getprocdet(int qid)
        {

            return Json(obPGo.Getprocdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getbomdet(int qid)
        {

            return Json(obPGo.Getbomdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getcmtdet(int qid)
        {

            return Json(obPGo.Getcmtdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getcommdet(int qid)
        {

            return Json(obPGo.Getcommdet(qid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getenqno(int cid)
        {

            return Json(obPGo.Getquoenqno(cid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getenqnodet(string enqno)
        {

            return Json(obPGo.Getquoenqdet(enqno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(int id)
        {
            return Json(obPGo.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
