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
    public class ShipmentSystemController : Controller
    {
        //
        // GET: /ShipmentSystem/

        IShipmentSystemBusiness ShipSys = new ShipmentSystemBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ShipmentSystemIndex()
        {
            ShipmentSystem ss = new ShipmentSystem();
            List(ss);
            return View();
        }
        public ActionResult List(ShipmentSystem ObjShipSys)
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
                var result = ShipSys.GetShipmentSystems();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string Str1 = null;
                var roleId = Convert.ToInt16(Session["RoleId"]);
                if (roleId != 0)
                {

                    Str1 = GenRights.GenerateRights(roleId, MenuNumber.MenuShipmentMode, "'{0}','{1}','{2}','{3}'",SUser);

                    string[] StrArr = Str1.Split('$');
                    ViewBag.ShipmentSystemAddFlg = StrArr[0];
                    Str1 = StrArr[1];

                    foreach (ShipmentSystem shipsystem in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", shipsystem.SystemId, shipsystem.System, shipsystem.FreeOrCharge, shipsystem.IsActive);
                        sb.AppendFormat(Str1 , shipsystem.SystemId, shipsystem.System, shipsystem.FreeOrCharge, shipsystem.IsActive);
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
        public JsonResult Add(ShipmentSystem ObjShipSys)
        {
            var result = ShipSys.CreateShipmentSystem(ObjShipSys);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ShipmentSystem ObjShipSys)
        {
            return Json(ShipSys.UpdateShipmentSystem(ObjShipSys), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(ShipSys.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ShipSys.DeleteShipmentSystem(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShipSystem()
        {
            return Json(ShipSys.GetShipmentSystems(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShipsysRefDetails(int SystemId)
        {
            var getDetails = ShipSys.GetShipSysCheckItemDetails(SystemId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
