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
    public class GSTController : Controller
    {
        IGSTInterBusiness iobj = new GSTInterBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /GST/

        public ActionResult GSTIndex()
        {
            GSTModel gm = new GSTModel();
            List(gm);
            return View();        }
      
       

        [HttpPost]
        public JsonResult Add(GSTModel Gu)
        {
            var result = iobj.CreateGSTModel(Gu);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetByID(int ID)
        {
            return Json(iobj.GetGSTModel(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(GSTModel Gu)
        {
            return Json(iobj.UpdateGSTModel(Gu), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(iobj.DeleteGSTModel(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(GSTModel Po)
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
                var result = iobj.GetGSTList();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuGST, "'{0}','{1}','{2}','{3}','{4}','{5}','{6}'", SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.GSTAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (GSTModel Gstmode in result.Value)
                    {
                        sb.AppendFormat(str1, Gstmode.id, Gstmode.GSTtaxcode, Gstmode.GSTtaxdesc, Gstmode.CGSTper, Gstmode.SGSTper,
                          Gstmode.IGSTper, Gstmode.Addtaxper);
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
        public JsonResult GetGSTRefDetails(int ID)
        {
            var getDetails = iobj.GetGSTRefDetails(ID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
