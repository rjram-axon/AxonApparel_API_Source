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
    public class StyleController : Controller
    {
        IStyleBusiness styleobj = new StyleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        //
        // GET: /Style/

        public ActionResult StyleIndex()
        {
         
            List();
            return View();
        }

        [HttpPost]
        public JsonResult Add(Style Spm)
        {
            var result = styleobj.CreateStyle(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            return Json(styleobj.GetStyleId(ID), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Update(Style Spm)
        {
            return Json(styleobj.UpdateStyle(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(styleobj.DeleteStyle(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStyle()
        {
            return Json(styleobj.GetStyle(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult List()
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
                var result = styleobj.GetStyle();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                String str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuStyle, "'{0}','{1}','{2}','{3}'",SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.StyleAddFlg = StrArr[0];
                    str1 = StrArr[1];
                    foreach (Style Stylemode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Stylemode.StyleId, Stylemode.StyleName, Stylemode.ArticleNo, Stylemode.IsActive);
                        sb.AppendFormat(str1 , Stylemode.StyleId, Stylemode.StyleName, Stylemode.ArticleNo, Stylemode.IsActive);
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



            //var getStyleOrder = styleobj.GetStyle().Value.ToList();
            //return Json(getStyleOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStyleRefDetails(int StyleId)
        {
            var getDetails = styleobj.GetStyleCheckItemDetails(StyleId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
