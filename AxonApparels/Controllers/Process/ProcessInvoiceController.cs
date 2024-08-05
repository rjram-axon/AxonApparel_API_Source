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
using AxonApparel.Common;

namespace AxonApparels.Controllers.Process
{
    public class ProcessInvoiceController : Controller
    {
        //
        // GET: /ProcessInvoice/

        IProcessInvoiceBusiness oblPro = new ProcessInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult ProcessInvoiceIndex()
        {
            GetMainLoad("", 0, "", "", 0, 0, 0, 0, 0, "", "","N");
            return View();
        }
        public JsonResult GetPrnNo(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            return Json(oblPro.GetDataPrnDetails(companyid, companyunitid, processorid, processid, processordid, ProcRecId, OrdNo, RefNo, OrderType, ProcessorType, FDate, DDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessOrdNo(int? companyid, int? companyunitid, int? processid, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            return Json(oblPro.GetDataProcOrdNoDetails(companyid, companyunitid, processid, OrderType, ProcessorType, FDate, DDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessIssNo(int? companyid, int? companyunitid, int? processid, int? processordid, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            return Json(oblPro.GetDataProcIssDetails(companyid, companyunitid, processid, processordid, OrderType, ProcessorType, FDate, DDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrnGridLoad(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string ProcDcNo, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            var getPrnDetails = oblPro.ListPrnAddDetails(companyid, companyunitid, processorid, processid, processordid, ProcRecId, OrdNo, RefNo, ProcDcNo, OrderType, ProcessorType, FDate, DDate).Value.ToList();
            return Json(getPrnDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvPrnItemDetails(string PrnMasId, int CompanyId, int SupplierId, int ProcessId, int UnitId, string InternalOrExternal, string OrderType)
        {
            var getDetails = oblPro.ListInPrnItemDetails(PrnMasId, CompanyId, SupplierId, ProcessId, UnitId, InternalOrExternal, OrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvSaveItemDetails(string PrnMasId, int CompanyId, int SupplierId, int ProcessId, int UnitId, string InternalOrExternal, string OrderType)
        {
            var getDetails = oblPro.ListProInItemDetails(PrnMasId, CompanyId, SupplierId, ProcessId, UnitId, InternalOrExternal, OrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvOrdDetails(string PrnMasId, string OrderType)
        {
            var getDetails = oblPro.ListProInOrderDetails(PrnMasId, OrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ProInvMas opj)
        {
            var result = oblPro.CreateProInvEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetMPrnNo(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataPrnDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUnit(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataUnitDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcess(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataProcessDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderRefNo(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataOrderRefDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcessor(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataProcessorDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEntryNo(string OrderType, int? CompanyId, string FromDate, string ToDate)
        {
            return Json(oblPro.GetDataEntryNoDetails(OrderType, CompanyId, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainLoad(string OrderType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrnMasId, int? Process_Invid, string OrdNo, string RefNo, string MultiFlag)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProcInvAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProcInvAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuProcessInvoice;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ProcInvAddFlg = "";
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
                var result = oblPro.GetDataProInvMainDetails(OrderType, CompanyId, FromDate, ToDate, ProcessId, UnitId, SupplierId, PrnMasId, Process_Invid, OrdNo, RefNo, MultiFlag).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProInvMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\"  " + Edit + "=\"" + Edit + "\"  onclick=\"return getbyID({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return ProcessInvPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Process_Invid, App.Entry_No, App.Entry_Date, App.SubBillNo, App.Unit, App.Process, App.Supplier, App.OrderType, App.Inv_Amount);

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
        public JsonResult LoadEditProInvDetails(int Process_Invid)
        {
            return Json(oblPro.GetProInvEditDetails(Process_Invid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetInvPrnEditItemDetails(int Process_Invid, int CompanyId, int SupplierId)
        {
            var getDetails = oblPro.ListInPrnEditItemDetails(Process_Invid, CompanyId, SupplierId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvEditItemDetails(int Process_Invid, int Proc_Recpt_Masid, int CompanyId, int SupplierId)
        {
            var getDetails = oblPro.ListProInEditItemDetails(Process_Invid, Proc_Recpt_Masid, CompanyId, SupplierId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvEditOrdDetails(int Process_Invid, int CompanyId, int SupplierId, int Process_recpt_DetId)
        {
            var getDetails = oblPro.ListProInOrdEditDetails(Process_Invid, CompanyId, SupplierId, Process_recpt_DetId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvEditAddLessDetails(int Process_Invid)
        {
            var getDetails = oblPro.ListProInAddLessEditDetails(Process_Invid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProInvEditRateDiffDetails(int Process_Invid)
        {
            var getDetails = oblPro.ListProInRateDiffEditDetails(Process_Invid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProInvMas ObjIE)
        {
            return Json(oblPro.UpdateProInvEntry(ObjIE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(ProInvMas ObjID)
        {
            return Json(oblPro.DeleteProInvEntry(ObjID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult BillAdd(int billId, string EntryNo, string MType)
        {
            return Json(oblPro.BillAddInvEntry(billId, EntryNo, MType), JsonRequestBehavior.AllowGet);
        }

        /////////////multi invoice

        public JsonResult MultiGetInvPrnItemDetails(string PrnMasId, int CompanyId, int SupplierId, string ProcessId, int UnitId, string InternalOrExternal, string OrderType)
        {
            var getDetails = oblPro.MultiListInPrnItemDetails(PrnMasId, CompanyId, SupplierId, ProcessId, UnitId, InternalOrExternal, OrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MultiGetProInvSaveItemDetails(string PrnMasId, int CompanyId, int SupplierId, string ProcessId, int UnitId, string InternalOrExternal, string OrderType)
        {
            var getDetails = oblPro.MultiListProInItemDetails(PrnMasId, CompanyId, SupplierId, ProcessId, UnitId, InternalOrExternal, OrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MultiGetInvPrnEditItemDetails(int Process_Invid, int CompanyId, int SupplierId)
        {
            var getDetails = oblPro.MultiListInPrnEditItemDetails(Process_Invid, CompanyId, SupplierId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        /////////////////bill No validate

        public JsonResult GetBillInvNo(int? CompanyId, int? SupplierId, string Inv_Date, int? BillId, string BOrdType, string BPurType,string IorE)
        {
            return Json(oblPro.GetDataBillDetails(CompanyId, SupplierId, Inv_Date, BillId, BOrdType, BPurType, IorE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEditBillInvNo(int? CompanyId, int? SupplierId, string Inv_Date, string Entry_No, string BOrdType, string BPurType)
        {
            return Json(oblPro.GetDataEditBillDetails(CompanyId, SupplierId, Inv_Date, Entry_No, BOrdType, BPurType), JsonRequestBehavior.AllowGet);
        }
    }
}
