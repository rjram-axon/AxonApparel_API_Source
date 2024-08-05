using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class SeasonController : Controller
    {
        ISeasonBusiness objSea = new SeasonBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult SeasonIndex()
        {
            Season ss = new Season();
            List(ss);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Season obSea)
        {
            var result = objSea.CreateSeason(obSea);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(objSea.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Season obSea)
        {
            return Json(objSea.UpdateSeason(obSea), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(objSea.DeleteSeason(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Season obSea)
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
                var result = objSea.GetSeason();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string Str1;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    Str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuSeason, "'{0}','{1}','{2}'",SUser);
                    
                    string[] StrArr = Str1.Split('$');
                    ViewBag.SeasonAddFlg = StrArr[0];
                    Str1 = StrArr[1];
                    
                    foreach (Season Sean in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Sean.SeasonId, Sean.SeasonName, Sean.IsActive);
                        sb.AppendFormat(Str1, Sean.SeasonId, Sean.SeasonName, Sean.IsActive);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSeason()
        {
            return Json(objSea.GetSeason(), JsonRequestBehavior.AllowGet);
        }
    }
}
