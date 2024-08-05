using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;
namespace AxonApparels.Controllers
{
    public class ProcessController : Controller
    {
        IProcessBusines ProObj = new  ProcessBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ProcessIndex()
        {
            AxonApparel.Domain.Process pr = new AxonApparel.Domain.Process();
            List(pr);
            //Process pr = new Process
            return View();
        }
        public ActionResult List(AxonApparel.Domain.Process ObjPro)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                var result = ProObj.GetProcess();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuProcess, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.ProcessAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (AxonApparel.Domain.Process App in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.ProcessId, App.ProcessName, App.IsActive);
                        sb.AppendFormat(str1 , App.ProcessId, App.ProcessName, App.IsActive);
                    }
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
        [HttpPost]
        public JsonResult Add(AxonApparel.Domain.Process ObjPro)
        {
            var result = ProObj.CreateProcess(ObjPro);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(AxonApparel.Domain.Process ObjApp)
        {
            return Json(ProObj.UpdateProcess(ObjApp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(ProObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ProObj.DeleteProcess(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcess()
        {
            return Json(ProObj.GetProcess(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPanelProcess()
        {
            return Json(ProObj.GetPanelProcess(), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProcessSeqSetUp()
        {
            return Json(ProObj.GetProcessSeqSetUp(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessSeqSetSeqUp()
        {
            return Json(ProObj.GetProcessSeqSetSeqUp(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ProgramList()
        {
            var getCompDetails = ProObj.GetProgramlist().Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessRefDetails(int ProcessId)
        {
            var getDetails = ProObj.GetProcessCheckItemDetails(ProcessId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
