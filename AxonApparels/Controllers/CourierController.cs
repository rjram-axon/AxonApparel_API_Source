using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class CourierController : Controller
    {
        //
        // GET: /Courier/
        ICourierBusiness obj = new CourierBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult CourierIndex()
        {
            Courier  cru = new Courier();
            List(cru);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Courier str)
        {
            var result = obj.CreateCourier(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Courier str)
        {
            return Json(obj.UpdateCourier(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(obj.GetCourierId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteCourier(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCourier()
        {
            return Json(obj.GetCourier(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Courier str)
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
                var result = obj.GetCourier();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuCourier, "'{0}','{1}','{2}','{3}'",SUser); 
                    string[] StrArr = str1.Split('$');
                    str1 = StrArr[1];
                    ViewBag.CourierAddFlag = StrArr[0];
                    foreach (Courier list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.CourierId, list.CourierName, list.CourierAddress, list.IsActive);
                        sb.AppendFormat(str1, list.CourierId, list.CourierName, list.CourierAddress, list.IsActive);
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


   
    }
}
