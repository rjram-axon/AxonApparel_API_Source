using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class CommunicationController : Controller
    {
        //
        // GET: /CommunicationIndex/
        ICommunicationBusiness commu = new CommunicationBusiness();

        public ActionResult CommunicationIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(Communication CommuAdd)
        {
            var result = commu.CreateCommunication(CommuAdd);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Communication CommUpd)
        {
            return Json(commu.UpdateCommunication(CommUpd), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            return Json(commu.GetCommunicationId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(commu.DeleteCommunication(ID), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Communication Spm)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = commu.GetCommunication();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (Communication communicationmode in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", communicationmode.CommunicationId, communicationmode.CompanyName, communicationmode.RefNo, communicationmode.Inward);
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(result, JsonRequestBehavior.AllowGet);
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
    }
}
