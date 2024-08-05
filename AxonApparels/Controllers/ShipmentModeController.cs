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
    public class ShipmentModeController : Controller
    {
        IModeOfShipmentBusiness modeOfShip = new ModeOfShipmentBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ShipmentModeIndex()
        {
            ShipmentMode sm = new ShipmentMode();
            List(sm);
            return View();
        }
        //Test Changes
        [HttpPost]
        public JsonResult Add(ShipmentMode Spm)
        {   
            var result = modeOfShip.CreateModeOfShipment(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(modeOfShip.GetModeOfShipmentById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ShipmentMode Spm)
        {
            return Json(modeOfShip.UpdateModeOfShipment(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(modeOfShip.DeleteModeOfShipment(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(ShipmentMode Spm)
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
                var result = modeOfShip.GetModeOfShipments();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string Str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    Str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuShipmentMode, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = Str1.Split('$');
                    ViewBag.ShipmentModeAddFlg = StrArr[0];
                    Str1 = StrArr[1];

                    foreach (ShipmentMode shipMode in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></i></a> <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", shipMode.ShipmentModeId, shipMode.ShipementMode, shipMode.IsActive);
                        sb.AppendFormat(Str1 , shipMode.ShipmentModeId, shipMode.ShipementMode, shipMode.IsActive);
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
        public JsonResult GetShipMode()
        {
            return Json(modeOfShip.GetModeOfShipments(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShipModeRefDetails(int ShipmentModeId)
        {
            var getDetails = modeOfShip.GetShipModeCheckItemDetails(ShipmentModeId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
