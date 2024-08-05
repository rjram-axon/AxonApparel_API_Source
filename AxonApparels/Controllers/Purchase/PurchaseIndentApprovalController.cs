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
    public class PurchaseIndentApprovalController : Controller
    {
        //
        // GET: /PurchaseIndent/

        IPurchaseIndentApprovalBusiness oblIPur = new PurchaseIndentApprovalBusiness();

        public ActionResult PurchaseIndentApprovalIndex()
        {
            GetPurIndMainAppDetails("", "", 0, 0, 0, 0, 0, "", "", "", "");
            return View();
        }

        public JsonResult GetMIOrderRefNo(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainOrderRefDetails(Companyid, Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIIndentNo(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainIndEmpDetails(Companyid, Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMIStatus(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            return Json(oblIPur.GetDataIndMainStatusDetails(Companyid, Purchase_Type, FrmDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurIndMainAppDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate, string AppType)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = oblIPur.GetDataPurIndMainAppDetails(OrdNo, RefNo, Company_unitid, Companyid, SectionID, EmployeeId, IndentMasid, Purchase_Type, FrmDate, ToDate, AppType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PurchaseIndentApprovalMas App in result)
                {
                    if (AppType == "N")
                    {

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.IndentMasid, App.CompUnit, App.Section, App.IndentNo, App.IndentDate, App.Employee);

                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.IndentMasid, App.CompUnit, App.Section, App.IndentNo, App.IndentDate, App.Employee);

                    }
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
        public JsonResult Approval(PurchaseIndentApprovalMas ObjPE)
        {
            return Json(oblIPur.AppPoIndEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Revert(PurchaseIndentApprovalMas ObjPD)
        {
            return Json(oblIPur.RevPoIndEntry(ObjPD), JsonRequestBehavior.AllowGet);
        }
    }
}
