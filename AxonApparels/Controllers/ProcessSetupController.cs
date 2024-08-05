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
    public class ProcessSetupController : Controller
    {
        //
        // GET: /ProcessSetup/
        IProcessSetupBusiness ProtObj = new ProcessSetupBusiness();
        IGenerateRightsBusiness GenReceipt = new GenerateRightsBusiness();


        public ActionResult ProcessSetupIndex()
        {
            ProcessSetup ps = new ProcessSetup();
            List(ps);
            return View();
        }
        public ActionResult List(ProcessSetup ObjPro)
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
                var result = ProtObj.GetProcessSetup();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenReceipt.GenerateRights(RoleId, MenuNumber.MenuProcessSetup, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.ProcessSetupAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (ProcessSetup App in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.ProcessSetupid, App.ProcessName, App.CuttingorSewing);
                        sb.AppendFormat(str1 , App.ProcessSetupid, App.ProcessName, App.CuttingorSewing);
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
        public JsonResult Add(ProcessSetup ObjPros)
        {
            var result = ProtObj.CreateProcessSetup(ObjPros);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProcessSetup ObjPros)
        {
            return Json(ProtObj.UpdateProcessSetup(ObjPros), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(ProtObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ProtObj.DeleteProcessSetup(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDropListProcess()
        {
            return Json(ProtObj.GetProcessSetup(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyprocessID(int? ProcessId)
        {
            return Json(ProtObj.GetbyprocessID(ProcessId), JsonRequestBehavior.AllowGet);
        }
    }
}
