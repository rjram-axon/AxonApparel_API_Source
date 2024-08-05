using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class Unit_of_measurementController : Controller
    {
        //
        // GET: /Unit_of_measurement/
        IUnit_of_measurementBusiness uomobj = new Unit_of_measurementBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult UomIndex()
        {
            Unit_of_measurement um = new Unit_of_measurement();
            List(um);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Unit_of_measurement str)
        {
            var result = uomobj.CreateUom(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Unit_of_measurement str)
        {
            return Json(uomobj.UpdateUom(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(uomobj.GetUomId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(uomobj.DeleteUom(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getuoms()
        {
            return Json(uomobj.GetUom(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Unit_of_measurement br)
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
                var result = uomobj.GetUom();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuUnitOfMeasurement, "'{0}','{1}','{2}','{3}'",SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.UnitOfMeasurementAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Unit_of_measurement list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.UomId, list.Uom, list.Abbreviation, list.IsActive);
                        sb.AppendFormat(str1 , list.UomId, list.Uom, list.Abbreviation, list.IsActive);
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
        public JsonResult GetUomRefDetails(int UomId)
        {
            var getDetails = uomobj.GetUomCheckItemDetails(UomId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
