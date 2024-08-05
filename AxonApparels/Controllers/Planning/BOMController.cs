using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;

namespace AxonApparels.Controllers.Planning
{
    public class BOMController : Controller
    {
        //
        // GET: /BOM/
        IBomBusiness obj = new BomBusiness();
        public ActionResult BOMIndex()
        {
            return View();
        }
        public ActionResult ItemList()
        {
            var getCompDetails = obj.Getitemgrouplist().Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListDetails(string order, int stylId, string Type,string IGId)
        {
            var getCompDetails = obj.GetList(order, stylId, Type, IGId).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Bom ObjApp, int StyrowId, string Type)
        {
            return Json(obj.Update(ObjApp, StyrowId, Type), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UnitConvList(int ID)
        {
            return Json(obj.GetUCList(ID), JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListItem()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.GetItemList().Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (Bom App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','<a id=\" {0} \" onclick=\"return getbyId({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"> Process </button></a>'],", App.Buyordmasdetid, App.Itemid, App.item, App.Category1, App.Category2, App.BOM_qty, App.pgmqty, App.uom, App.Conv_Mode, App.ToPurUOM, App.BOM_qty, App.PurFor_Job, App.CSP, App.ItemClosure, App.action);
                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UomList(string baseunit)
        {
            return Json(obj.GetUomList(baseunit), JsonRequestBehavior.AllowGet);
        }
    }
}
