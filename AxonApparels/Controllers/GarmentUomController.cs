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
    public class GarmentUomController : Controller
    {
        IGarmentUomBusiness Garmobj = new GarmentUomBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /GarmentUom/

        public ActionResult Garment_UomIndex()
        {
            PortOfLoading gu = new PortOfLoading();
            List(gu);
            return View();
        }

        [HttpPost]
        public JsonResult Add(Garment_Uom Gu)
        {
            var result = Garmobj.CreateGarmentUom(Gu);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetByID(int ID)
        {
            return Json(Garmobj.GetGarmentUomId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Garment_Uom Gu)
        {
            return Json(Garmobj.UpdateGarmentUom(Gu), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(Garmobj.DeleteGarmentUom(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGUom()
        {
            return Json(Garmobj.GetGarmentUom(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBaseUom()
        {
            return Json(Garmobj.GetBaseUom(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(PortOfLoading Po)
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
                var result = Garmobj.GetGarmentUom();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuGarmentUom, "'{0}','{1}','{2}','{3}','{4}'",SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.GarmentUomAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Garment_Uom Garmmode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Garmmode.GUomId, Garmmode.GUom, Garmmode.GUom_Lookup, Garmmode.To_BUom, Garmmode.IsActive);
                        sb.AppendFormat(str1 , Garmmode.GUomId, Garmmode.GUom, Garmmode.GUom_Lookup, Garmmode.To_BUom, Garmmode.IsActive);
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
        public JsonResult GetGuomRefDetails(int GUomId)
        {
            var getDetails = Garmobj.GetGuomCheckItemDetails(GUomId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
