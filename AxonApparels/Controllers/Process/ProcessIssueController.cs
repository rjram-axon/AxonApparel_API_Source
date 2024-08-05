using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;

namespace AxonApparels.Controllers
{
    public class ProcessIssueController : Controller
    {
        //
        // GET: /ProcessIssue/
        IProcessIssueBusiness obj = new ProcessIssueBusiness();

        public ActionResult ProcessIssueIndex()
        {
            return View();
        }
        public JsonResult GetSupp()
        {

            return Json(obj.Getsupp(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProcess()
        {

            return Json(obj.Getprocess(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadgrid(int cmpunitid, int procid, string ordertype, string processortype, int buyerid, string refno, string ordno, int procserid)
        {

            return Json(obj.Loadgrid(cmpunitid, procid, ordertype, processortype, buyerid, refno, ordno, procserid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loaditmsgrid(int procid)
        {

            return Json(obj.Loaditmsgrid(procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadJobdetgrid(int procid)
        {

            return Json(obj.LoadJobdetgrid(procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadStkgrid(string jmasid,int cmpid)
        {

            return Json(obj.LoadStkdet(jmasid,cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult IssueAdd(ProcessIssueMas str)
        {
            var result = obj.CreateIssUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingrid(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(cmpid, issueno, processid, ordno, masid, procordno, unitid, refno, ordtype, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessIssueAddgrid App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{1})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0},{1})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \" <button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return ProcessIssPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.processissueid, App.processordid, App.processissue, App.procdate, App.cmpunit, App.process, App.refno, App.ordtype);

                }



                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult LoadMaingriddet(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid(cmpid, issueno, processid, ordno, masid, procordno, unitid, refno, ordtype, fromdate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(ProcessIssueMas str)
        {
            var result = obj.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(ProcessIssueMas ObjPE)
        {
            return Json(obj.DeleteDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadEdititmsgrid(int procid)
        {

            return Json(obj.Loadedititmsgrid(procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadeditJobdetgrid(int procid)
        {

            return Json(obj.LoadeditJobdetgrid(procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadeditStkgrid(string jmasid, int cmpid)
        {

            return Json(obj.LoadeditStkdet(jmasid, cmpid), JsonRequestBehavior.AllowGet);

        }

    }
}
