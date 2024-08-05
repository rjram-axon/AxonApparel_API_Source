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
    public class ColorGroupController : Controller
    {
        //
        // GET: /ColorGroup/
        IColorGroupBusiness obj = new ColorGroupBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ColorGroupIndex()
        {
            ColorGroup cg = new ColorGroup();
            List(cg);
            return View();
        }
        
        [HttpPost]
        public JsonResult Add(ColorGroup str)
        {
            var result = obj.CreateColorGroup(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ColorGroup str)
        {
            return Json(obj.UpdateColorGroup(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(obj.GetColorGroupId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteColorGroup(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getstores()
        {
            return Json(obj.GetColorGroup(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(ColorGroup str)
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
                string str1 = null;
                var result = obj.GetColorGroup();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {

                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuColorGroup, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.ColorGroupAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (ColorGroup list in result.Value)
                    {
                        sb.AppendFormat(str1, list.ColorGroupId, list.ColorGroupName, list.IsActive);
                    }

                }


    //            foreach (ColorGroup list in result.Value)
  //              {
//                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.ColorGroupId, list.ColorGroupName, list.IsActive);
                //}
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

