using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Purchase
{
    public class PurchaseIndentController : Controller
    {
        //
        // GET: /PurchaseIndent/

        IPurchaseIndentBusiness oblIPur = new PurchaseIndentBusiness();

        public ActionResult PurchaseIndentIndex()
        {
            return View();
        }
        public JsonResult GetOrderNo(int? Companyid, string Purchase_Type)
        {
            return Json(oblIPur.GetDataAOrderDetails(Companyid, Purchase_Type), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetBuyer(int? Companyid, string Purchase_Type)
        {
            return Json(oblIPur.GetDataABuyDetails(Companyid, Purchase_Type), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetWorkNo(int? Companyid, string Purchase_Type)
        {
            return Json(oblIPur.GetDataAWorkDetails(Companyid, Purchase_Type), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadDetails(int? Companyid, int? BuyerId, string OrdNo, string RefNo, string JobNo, string Purchase_Type, string Purchase_itemType)
        {
            var getDetails = oblIPur.ListDetails(Companyid, BuyerId, OrdNo, RefNo, JobNo, Purchase_Type, Purchase_itemType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadIndentItemDetails(string StyleRowId, string Purchase_Type, string Purchase_itemType)
        {
            var getDetails = oblIPur.ListEntryIndItemDetails(StyleRowId, Purchase_Type, Purchase_itemType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadIndentOrderDetails(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string Purchase_Type)
        {
            var getDetails = oblIPur.ListEntryIndOrderDetails(StyleRowId, ItemID, ColorID, SizeID, PurUomId, quantity, Purchase_Type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(PurchaseIndentMas opj)
        {
            var result = oblIPur.CreatePIndOrderEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIOrderRefNo(int? Companyid,string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainOrderRefDetails(Companyid,Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIIndentNo(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainIndEmpDetails(Companyid,Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIStatus(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainStatusDetails(Companyid,Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = oblIPur.GetDataPurIndMainDetails(OrdNo, RefNo, Company_unitid, Companyid, SectionID, EmployeeId, IndentMasid, Purchase_Type, FrmDate, ToDate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                    foreach (PurchaseIndentMas App in result)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Pur_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.IndentMasid, App.CompUnit, App.Section, App.IndentNo, App.IndentDate, App.Employee);

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
        public JsonResult LoadEditIndDetails(int IndentMasid)
        {
            return Json(oblIPur.GetIndEditDetails(IndentMasid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItemEditDetailsInd(string IndentMasid, string Purchase_Type)
        {
            var getDetails = oblIPur.GetEditIndDetDetails(IndentMasid, Purchase_Type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOrderEditDetailsInd(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type)
        {
            var getDetails = oblIPur.GetEditIndOrdDetails(IndentMasid, OItemid, OColorid, OSizeid, OUomid, Purchase_Type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PurchaseIndentMas ObjPE)
        {
            return Json(oblIPur.UpdatePoIndEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PurchaseIndentMas ObjPD)
        {
            return Json(oblIPur.DeletePoIndEntry(ObjPD), JsonRequestBehavior.AllowGet);
        }
    }
}
