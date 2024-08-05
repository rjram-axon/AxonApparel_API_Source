using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class StyleTemplateController : Controller
    {
        IStyleTemplateBusiness styletempobj = new StyleTemplateBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        //
        // GET: /StyleTemplate/

        public ActionResult StyleTemplateIndex()
        {
            List();
            return View();
        }

        public JsonResult GetStyleTempLateDDL()
        {
            return Json(styletempobj.GetStyleTemplate(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult List()
        {
            try
            {


                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StyleTemplateAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StyleTemplateAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                    {
                        menu = MenuNumber.MenuStyleTemplate;
                    }
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StyleTemplateAddFlg = "";
                        Add = "";
                    }
                    if (ret[0].EditFlg == 1)
                    {
                        Edit = "";
                    }
                    if (ret[0].DelFlg == 1)
                    {
                        Delete = "";
                    }
                    if (ret[0].PrintFlg == 1)
                    {
                        Print = "";
                    }
                }




                StringBuilder sb = new StringBuilder();

                //var username = Session["UserName"].ToString();
                //var SUser = "";
                //if (username == "superuser")
                //{
                //    SUser = "superuser";
                //}
                var result = styletempobj.GetStyleTemplate();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                //String str1 = null;
                //var Roleid = Convert.ToInt16(Session["RoleId"]);
                //if (Roleid != 0)
                //{
                //    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuStyleTemplate, "'{0}','{1}'", SUser);
                //    string[] StrArr = str1.Split('$');
                //    ViewBag.StyleAddFlg = StrArr[0];
                //    str1 = StrArr[1];
                //    foreach (StyleTemplateMas Stylemode in result.Value)
                //    {
                //        sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Stylemode.StyleId, Stylemode.StyleName, Stylemode.ArticleNo, Stylemode.IsActive);
                //        //sb.AppendFormat(str1, Stylemode.TemplateId, Stylemode.Template);
                //    }
                //}
                foreach (StyleTemplateMas Stylemode in result.Value)
                {

                    sb.AppendFormat("['{0}','{1}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"   " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \" onclick=\"return view({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn-round btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"View\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-eye\"></i> </button></a>'],", Stylemode.TemplateId, Stylemode.Template);
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

        [HttpPost]
        public JsonResult Add(StyleTemplateMas Spm)
        {
            var result = styletempobj.CreateStyleTemplate(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(StyleTemplateMas str)
        {
            return Json(styletempobj.UpdateStyleTemplate(str), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(styletempobj.GetStyleTempId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleTemp(int id)
        {
            var result = styletempobj.GetStyleTemp(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(styletempobj.DeleteData(id), JsonRequestBehavior.AllowGet);
        }
    }
}
