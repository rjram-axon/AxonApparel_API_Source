using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class TermsTemplateController : Controller
    {
        //
        // GET: /TermsTemplate/

        ITermTemplateBusiness termtempobj = new TermTemplateBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TermsTemplateIndex()
        {
            List();
            return View();
        }
        [HttpPost]
        public JsonResult Add(Terms Spm)
        {
            var result = termtempobj.CreateTermTemplate(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult List()
        {
            int MasId=0;
            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                var result = termtempobj.GetTermTemplate();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

           
                foreach (Terms termmode in result.Value)
                {

                    sb.AppendFormat("['{0}','{1}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", termmode.TermsTempNameId, termmode.TermsTempName);
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

            //var getStyleOrder = styleobj.GetStyle().Value.ToList();
            //return Json(getStyleOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTermEditDetails(int TermsTempNameId)
        {
            return Json(termtempobj.GetDataTermEditDetails(TermsTempNameId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItemEditDetails(int TermsTempNameId)
        {
            var getDetails = termtempobj.GetItemEditDetails(TermsTempNameId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(Terms Upm)
        {
            var result = termtempobj.UpdateTermTemplate(Upm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(Terms Dpm)
        {
            var result = termtempobj.DeleteTermTemplate(Dpm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
