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
    public class SizeController : Controller
    {
        //
        // GET: /Size/
        ISizeBusiness sizeobj = new SizeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult SizeIndex()
        {
            Size s = new Size();
            List(s);
            return View();
        }
        public JsonResult Add(Size str)
        {
            var result = sizeobj.CreateSize(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Size str)
        {
            return Json(sizeobj.UpdateSize(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(sizeobj.GetSizeId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(sizeobj.DeleteSize(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getstores()
        {
            return Json(sizeobj.GetSize(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGSize()
        {
            return Json(sizeobj.GetGSize(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetYSize()
        {
            return Json(sizeobj.GetYSize(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFSize()
        {
            return Json(sizeobj.GetFSize(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Size br)
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
                var result = sizeobj.GetSize();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                        str1=GenRights.GenerateRights(RoleId ,MenuNumber.MenuSize ,"'{0}','{1}','{2}'",SUser)  ;

                        string[] StrArr = str1.Split('$');
                        ViewBag.SizeAddFlg = StrArr[0];
                        str1 = StrArr[1];

                    foreach (Size list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.SizeId, list.SizeName, list.IsActive);
                        sb.AppendFormat(str1, list.SizeId, list.SizeName, list.IsActive);
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
        public JsonResult GetSizeRefDetails(int SizeId)
        {
            var getDetails = sizeobj.GetSizeCheckItemDetails(SizeId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SeqAdd(int[] sbTwo)
        {
            var result = sizeobj.CreateSeqEntry(sbTwo);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetSizeSeqLoad()
        {
            var getCompDetails = sizeobj.GetSizeSeqList().Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
