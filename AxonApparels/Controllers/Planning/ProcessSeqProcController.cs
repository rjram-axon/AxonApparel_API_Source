using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.Planning
{
    public class ProcessSeqProcController : Controller
    {

        //
        // GET: /ProcessSeqProc/
        IProcessSeqProcBusiness obj = new ProcessSeqProcBusiness();
        public ActionResult ProcessSeqProcIndex()
        {

            ProcessSequenceMain proc = new ProcessSequenceMain();
           
            return View();
        }
        public JsonResult GetPlanDetails(int StyleRowId)
        {

            return Json(obj.GetDataPlanDetails(StyleRowId), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Add(ProcessSequenceMain ObjPSeq,int []sbTwo)
        {
            var result = obj.CreateProcessMainEntry(ObjPSeq,sbTwo);
         
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListProcSeqDetails(int StyleRowId)
        {
            var getCompDetails = obj.GetProcSeqList(StyleRowId).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProcessSequenceMain ObjPSeq, int[] UpsbTwo)        
        {
            return Json(obj.UpdateConEntry(ObjPSeq, UpsbTwo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStylerowid(int id)
        {
            return Json(obj.Getstylerowid(id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult CheckProSeq(int[]Processid, string JobNo)
        {
            return Json(obj.GetDataByProSeq(Processid, JobNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckProMade(int[] Processid, string JobNo)
        {
            return Json(obj.GetDataByPrgProSeq(Processid, JobNo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AutoProg(int[] Processid, string JobNo, int CreatedBy)
        {
            var result = obj.CreateAutoPrgEntry(Processid, JobNo, CreatedBy);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
