using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers
{
    public class P3EntryController : Controller
    {
        //
        // GET: /P3Entry/
        IP3EntryBusiness obj = new P3EntryBusiness();
        public ActionResult P3EntryIndex()
        {
            return View();
        }
        public JsonResult Add(P3Entry Spm)
        {
            var result = obj.Create(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(P3Entry Spm)
        {
            try
            {
                StringBuilder sb = new StringBuilder();


                var result = obj.GetData();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                //string str1 = null;


                // str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuCity, "'{0}','{1}','{2}','{3}'", SUser);

                //string[] StrArr = str1.Split('$');
                //ViewBag.CityAddFlg = StrArr[0];
                //str1 = StrArr[1];

                foreach (P3Entry mode in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", mode.P3EntryId, mode.RefNo, mode.Remarks);

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
        public JsonResult GetbyEditID(int ID)
        {
            return Json(obj.GetId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(P3Entry Spm)
        {
            return Json(obj.Update(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(obj.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetP3Entry()
        {
            return Json(obj.GetP3Entry(), JsonRequestBehavior.AllowGet);
        }
    }
}
