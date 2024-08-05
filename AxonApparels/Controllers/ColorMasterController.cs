using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers
{
    public class ColorMasterController : Controller
    {
        //
        // GET: /ColorMaster/
        IColorMasterBusiness obj = new ColorMasterBusiness();

        public ActionResult ColorMasterIndex()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Add(ColorMaster str)
        {
            var result = obj.CreateColorMaster(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ColorMaster str)
        {
            return Json(obj.UpdateColorMaster(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(obj.GetColorMasterId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteColorMaster(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetColorMaster()
        {
            return Json(obj.GetColorMaster(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult List()
        {
            //try
            //{
            //    StringBuilder sb = new StringBuilder();
            //    var result = obj.GetColorMaster();
            //    if (result == null || result.Value == null)
            //        return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            //    foreach (ColorMaster list in result.Value)
            //    {
            //        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", list.ColorId, list.ColorName, list.ColorCode, list.ColorNo, list.IsActive);
            //    }
            //    string tableValue = sb.ToString();
            //    tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            //    return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    Response.Write(ex.InnerException.ToString());
            //    return Json("Failure", JsonRequestBehavior.AllowGet);
            //}
            var getcolor = obj.GetColorMaster().Value.ToList();
            return Json(getcolor, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetColorRefDetails(int ColorId)
        {
            var getDetails = obj.GetColorCheckItemDetails(ColorId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
