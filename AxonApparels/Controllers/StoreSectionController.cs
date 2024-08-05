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
    public class StoreSectionController : Controller
    {
        //
        // GET: /StoreSection/

        IStoreSectionBusiness strobj = new StoreSectionBusiness();
        IRoleBusiness Roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
     
        public ActionResult StoreSectionIndex()
        {
            StoreSection sc = new StoreSection();
            List(sc);
            return View();
        }
        [HttpPost]
        public JsonResult Add(StoreSection Spm)
        {
            var result = strobj.CreateSection(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(strobj.GetSectionId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(StoreSection Spm)
        {
            return Json(strobj.UpdateSection(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(strobj.DeleteSection(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSections()
        {
            return Json(strobj.GetSection(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(StoreSection Spm)
        {
            //try
            //{
            //    StringBuilder sb = new StringBuilder();

            //    var username = Session["UserName"].ToString();
            //    var SUser = "";
            //    if (username == "superuser")
            //    {
            //        SUser = "superuser";
            //    }
            //    string str1 = null;
            //    var result = strobj.GetSection();
            //    if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

            //    int roleid = Convert.ToInt16(Session["Roleid"]);
            //    if (roleid != 0)
            //    {
            //        var Rolobj = Roleobj.GetRolebyId(roleid);
            //        var res = Rolobj.Value;

            //        str1 = GenRights.GenerateRights(roleid, MenuNumber.MenuStoreSection, "'{0}','{1}','{2},'{3}' ",SUser);
            //        string[] StrArr = str1.Split('$');
            //        str1 = StrArr[1];
            //        ViewBag.StoreSectionAddFlag = StrArr[0]; 

            //        foreach (StoreSection str in result.Value)
            //        {
            //            sb.AppendFormat(str1, str.SectionId, str.SectionName, str.StoreName, str.Status);
            //        }

            //    }

            //    string tableValue = sb.ToString();
            //    tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            //    //return Json(result, JsonRequestBehavior.AllowGet);
            //    return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    Response.Write(ex.InnerException.ToString());
            //    return Json("Failure", JsonRequestBehavior.AllowGet);
            //}
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = strobj.GetSection();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (StoreSection str in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", str.SectionId, str.SectionName, str.StoreName, str.Status);
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

    }
}
