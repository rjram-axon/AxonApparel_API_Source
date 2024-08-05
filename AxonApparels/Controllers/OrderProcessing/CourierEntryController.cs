using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Collections;
using System.Web.Routing;
namespace AxonApparels.Controllers.OrderProcessing
{
    public class CourierEntryController : Controller
    {
        //
        // GET: /CourierEntry/

        ICourierEntryBusiness EnqObj = new CourierEntryBusiness();

        public ActionResult CourierEntryIndex()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SaveCourier(CourierEntry ObjCurEn)
        {
            var result = EnqObj.CreateCourierEntry(ObjCurEn);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public List<T> ConvertQueryToList<T>(IQueryable<T> query)
        {
            return query.ToList();
        }

        public ActionResult ListCourierEntry(int? CompanyId, string EntryNo, string frmDate, string ToDate, int? DespLocationId,string DespType)
        {            
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = EnqObj.GetCourierEntry(CompanyId, EntryNo, frmDate, ToDate, DespLocationId, DespType).Value.ToList();                

                //if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                //foreach (CourierEntryList App in result.Value)
                //{
                //    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.Courier_MasId, App.Courier, App.EntryNo, App.EntryDate,App.DespLocation);
                //}                

                //string tableValue = sb.ToString();
                //tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (CourierEntryList App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.Courier_MasId, App.Courier, App.EntryNo, App.EntryDate, App.DespLocation);
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

        public JsonResult EditMainList(int ID)
        {
            return Json(EnqObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListCourierDetDetails(int ID)
        {
            
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = EnqObj.GetCourierDetDetails(ID);

                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (CourierEntryList App in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],",App.Item, App.Color, App.Size, App.Uom, App.Quantity);
                }
              
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                var obj=new {tableValue=tableValue,Data=result.Value};
                return Json(new { data = obj }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Update(CourierEntry ObjCurEn)
        {
            return Json(EnqObj.UpdateCourierEntry(ObjCurEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(EnqObj.DeleteCourierEntry(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEntryNo()
        {
            var result = EnqObj.GetEntryNoList();
            return Json(result, JsonRequestBehavior.AllowGet);
            //  return Json(bulBus.GetOrderNoList(), JsonRequestBehavior.AllowGet);
        }
    }
}
