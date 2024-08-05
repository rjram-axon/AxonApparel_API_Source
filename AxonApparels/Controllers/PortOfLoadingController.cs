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
    public class PortOfLoadingController : Controller
    {
        IPortOfLoadingBusiness PortObj = new PortOfLoadingBusiness();
        IGenerateRightsBusiness GenRighta = new GenerateRightsBusiness();
        //
        // GET: /PortOfLoading/

        public ActionResult PortOfLoadingIndex()
        {
            PortOfLoading pl = new PortOfLoading();
            List(pl);
            return View();
        }

        [HttpPost]
        public JsonResult Add(PortOfLoading Po)
        {
            var result = PortObj.CreatePortOfLoading(Po);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetByID(int ID)
        {
            return Json(PortObj.GetPortOfLoadingId(ID),JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPortOfLoading()
        {
            return Json(PortObj.GetPortOfLoading(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PortOfLoading Po)
        {
            return Json(PortObj.UpdatePortOfLoading(Po),JsonRequestBehavior.AllowGet); 
        }

        public JsonResult Delete(int ID)
        {
            return Json(PortObj.DeletePortOfLoading(ID),JsonRequestBehavior.AllowGet);
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
                var result = PortObj.GetPortOfLoading();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {

                    str = GenRighta.GenerateRights(RoleId, MenuNumber.MenuPortOfLoading, "'{0}','{1}','{2}','{3}','{4}'",SUser);
                    string[] StrArr = str.Split('$');
                    ViewBag.PortofLoadingAddFlg = StrArr[0];
                    str = StrArr[1];

                    foreach (PortOfLoading Portmode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Portmode.PortOfLoadingId, Portmode.PortOfLoading1, Portmode.Country, Portmode.PortCode, Portmode.IsActive);
                        sb.AppendFormat(str , Portmode.PortOfLoadingId, Portmode.PortOfLoading1, Portmode.Country, Portmode.PortCode, Portmode.IsActive);
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
        public JsonResult GetPortOfLoadingRefDetails(int PortOfLoadingId)
        {
            var getDetails = PortObj.GetPortOfLoadingCheckItemDetails(PortOfLoadingId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
