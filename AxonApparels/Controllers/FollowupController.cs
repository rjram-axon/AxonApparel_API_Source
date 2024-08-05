using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;

namespace AxonApparels.Controllers
{
    public class FollowupController : Controller
    {
        IFollowUpBusiness followupobj = new FollowupBusiness();

        //
        // GET: /Followup/

        public ActionResult FollowUpIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(Followup Spm)
        {
            var result = followupobj.CreateFollowup(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(followupobj.GetFollowupId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Followup Spm)
        {
            return Json(followupobj.UpdateFollowup(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(followupobj.DeleteFollow(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFollowup()
        {
            return Json(followupobj.GetFollowup(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Followup Spm)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = followupobj.GetFollowup();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (Followup followupmode in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", followupmode.FollowId, followupmode.CompanyName, followupmode.EmployeeName, followupmode.BuyerName);
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
