using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class DesignationController : Controller
    {
        IDesignationBusiness Desigobj = new DesignationBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /Designation/

        public ActionResult DesignationIndex()
        {
            Designation dg = new Designation();
            List(dg);
            return View();
        }

        [HttpPost]
        public JsonResult Add(Designation Spm)
        {
            var result = Desigobj.CreateDesignation(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(Desigobj.GetDesignationId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Designation Spm)
        {
            return Json(Desigobj.UpdateDesignation(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(Desigobj.DeleteDesignation(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDesignation()
        {
            return Json(Desigobj.GetDesignation(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Designation Spm)
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
                var result = Desigobj.GetDesignation();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var Roleid = Convert.ToInt16(Session["Roleid"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuDesignation, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.DesignationAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Designation Designationmode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Designationmode.Id, Designationmode.DesignationName, Designationmode.IsActive);
                        sb.AppendFormat(str1, Designationmode.Id, Designationmode.DesignationName, Designationmode.IsActive);
                    }
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
        public JsonResult GetDesignationRefDetails(int Id)
        {
            var getDetails = Desigobj.GetDesignationCheckItemDetails(Id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
