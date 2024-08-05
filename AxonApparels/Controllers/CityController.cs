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
    public class CityController : Controller
    {
        ICityBusiness cityobj = new CityBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /City/

        public ActionResult CityIndex()
        {
            City ct = new City();
            List(ct);
            return View();
        }

        [HttpPost]
        public JsonResult Add(City Spm)
        {
            var result = cityobj.CreateCity(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(cityobj.GetCityId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(City Spm)
        {
            return Json(cityobj.UpdateCity(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(cityobj.DeleteCity(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCities()
        {
            return Json(cityobj.GetCity(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(City Spm)
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
                var result = cityobj.GetCity();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuCity, "'{0}','{1}','{2}','{3}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.CityAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (City Citymode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Citymode.CityId, Citymode.CityName, Citymode.CountryName, Citymode.IsActive);
                        sb.AppendFormat(str1, Citymode.CityId, Citymode.CityName, Citymode.CountryName, Citymode.IsActive);
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
        public JsonResult GetCityRefDetails(int cityId)
        {
            var getDetails = cityobj.GetCityCheckItemDetails(cityId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
