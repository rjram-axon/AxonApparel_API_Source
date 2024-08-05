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

namespace AxonApparels.Controllers.Production
{
    public class ProductionInvoiceController : Controller
    {
        //
        // GET: /ProductionInvoice/

        IProductionInvoiceBusiness oblPrd = new ProductionInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult ProductionInvoiceIndex()
        {
            GetMainLoad("", "", 0, "", "", 0, 0, 0, 0, "", "", "");
            return View();
        }
        public JsonResult GetPrdGridLoad(int? Companyid, int? CompanyUnitId, int? Processorid, string Processid, int? BuyerId, string OrdNo, string OrdRefNo, string OrderType, string InternalOrExternal)
        {
            var getPrnDetails = oblPrd.ListPrdAddDetails(Companyid, CompanyUnitId, Processorid, Processid, BuyerId, OrdNo, OrdRefNo, OrderType, InternalOrExternal).Value.ToList();
            return Json(getPrnDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvPrdItemDetails(string PrdMasId, int Processorid, int Processid)
        {
            var getDetails = oblPrd.ListInPrdItemDetails(PrdMasId, Processorid, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvSaveItemDetails(string PrdMasId, int Processorid, int Processid)
        {
            var getDetails = oblPrd.ListProdEntryItemDetails(PrdMasId, Processorid, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvOrdDetails(string PrdMasId, int Processorid, int Processid)
        {
            var getDetails = oblPrd.ListProdInOrderDetails(PrdMasId, Processorid, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ProdInvMas opj)
        {
            var result = oblPrd.CreateProdInvEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMEntryNo(int? Companyid, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataEntryDetails(Companyid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMUnit(int? Companyid, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataUnitDetails(Companyid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMOrdRef(int? Companyid, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataOrderRefDetails(Companyid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMWkDiv(int? Companyid, string InternalOrExternal, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataWkDivDetails(Companyid, InternalOrExternal, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMWkOrder(int? Companyid, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataWkOrderDetails(Companyid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMProcess(int? Companyid, string FromDate, string ToDate)
        {
            return Json(oblPrd.GetDataProcessDetails(Companyid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMainLoad(string OrderType, string InternalOrExternal, int? Companyid, string FromDate, string ToDate, int? ProcessId, int? CompanyUnitId, int? Processorid, int? ProdInvid, string OrdNo, string OrdRefNo, string WorkOrder)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProdInvAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProdInvAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuProductionInvoice;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ProdInvAddFlg = "";
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
                var result = oblPrd.GetDataProdInvMainDetails(OrderType, InternalOrExternal, Companyid, FromDate, ToDate, ProcessId, CompanyUnitId, Processorid, ProdInvid, OrdNo, OrdRefNo, WorkOrder).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProdInvMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" " + Edit + "=\"" + Edit + "\"  onclick=\"return getbyID({0})\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" onclick=\"return getDeleteID({0})\"  class=\"btnSelect btn btn_round btn-danger\" " + Delete + "=\"" + Delete + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return ProcessInvPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.ProdInvid, App.RefNo, App.InvNo, App.InvDate, App.CompanyUnit, App.Process, App.Processor, App.OrderType);

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
        public JsonResult LoadEditProdInvDetails(int ProdInvid)
        {
            return Json(oblPrd.GetProdInvEditDetails(ProdInvid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetInvPrdEditItemDetails(int Prodinvid, int Companyid, int Processorid)
        {
            var getDetails = oblPrd.ListInPrdEditItemDetails(Prodinvid, Companyid, Processorid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvEditItemDetails(int ProdInvId, int GrnMasid, int Companyid, int Processorid)
        {
            var getDetails = oblPrd.ListProdInEditItemDetails(ProdInvId, GrnMasid, Companyid, Processorid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvEditOrdDetails(int Prod_InvId, int Companyid, int Processorid, int Prod_recpt_DetId)
        {
            var getDetails = oblPrd.ListProdInOrdEditDetails(Prod_InvId, Companyid, Processorid, Prod_recpt_DetId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvEditAddLessDetails(int ProdInvId)
        {
            var getDetails = oblPrd.ListProdInAddLessEditDetails(ProdInvId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdInvEditRateDiffDetails(int ProdInvId)
        {
            var getDetails = oblPrd.ListProdInRateDiffEditDetails(ProdInvId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProdInvMas ObjIE)
        {
            return Json(oblPrd.UpdateProdInvEntry(ObjIE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(ProdInvMas ObjID)
        {
            return Json(oblPrd.DeleteProdInvEntry(ObjID), JsonRequestBehavior.AllowGet);
        }
    }
}
