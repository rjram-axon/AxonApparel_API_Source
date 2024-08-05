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

    public class ColorController : Controller
    {
        //
        // GET: /Color/
        IColorBusiness colorobj = new ColorBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ColorIndex()
        {
            Color cl = new Color();
            List(cl);
            return View();
        }
        [HttpPost]        
        public JsonResult Add(Color str)
        {
            var result = colorobj.CreateColor(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            return Json(colorobj.GetColorId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Color Spm)
        {
            return Json(colorobj.UpdateColor(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(colorobj.DeleteColor(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetColor()
        {
            return Json(colorobj.GetColor(), JsonRequestBehavior.AllowGet);
        }
       
        public ActionResult List(Color Spm)
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
                var result = colorobj.GetColor();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuColor, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.ColorAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Color mode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", mode.ColorId, mode.ColorName, mode.IsActive);
                        sb.AppendFormat(str1, mode.ColorId, mode.ColorName, mode.IsActive);
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

        public JsonResult GetColorRefDetails(int ColorId)
        {
            var getDetails = colorobj.GetColorCheckItemDetails(ColorId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
