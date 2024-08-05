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

namespace AxonApparels.Controllers.Purchase
{
    public class PurchaseInvoiceController : Controller
    {
        //
        // GET: /PurchaseInvoice/

        IPurchaseInvoiceBusiness oblPur = new PurchaseInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult PurchaseInvoiceIndex()
        {
            GetMainLoad("", 0, 0, "", "", "", "", "","");
            return View();
        }

        public JsonResult GetOrderNo(int? company_id, int? supplierid, string OType)
        {
            return Json(oblPur.GetDataOrderDetails(company_id, supplierid, OType), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyle(int? company_id, int? supplierid, string OType, string OrdNo)
        {
            return Json(oblPur.GetDataStyleDetails(company_id, supplierid, OType, OrdNo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGrnNo(int? company_id, int? supplierid, string OType, string OrdNo, int? StyleId)
        {
            return Json(oblPur.GetDataGrnDetails(company_id, supplierid, OType, OrdNo, StyleId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPoNo(int? company_id, int? supplierid, string OType, string OrdNo, int? StyleId, int? GrnMasId)
        {
            return Json(oblPur.GetDataPoDetails(company_id, supplierid, OType, OrdNo, StyleId, GrnMasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataGridDetails(int? company_id, int? supplierid, string OType, string OrdNo, int? StyleId, int? GrnMasId, int? PMasId, string FromDate, string ToDate)
        {
            var getDetails = oblPur.ListAddDetails(company_id, supplierid, OType, OrdNo, StyleId, GrnMasId, PMasId, FromDate, ToDate).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvGrnItemDetails(string GMasId, int company_id, int supplierid)
        {
            var getDetails = oblPur.ListInGrnItemDetails(GMasId, company_id, supplierid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvSaveItemDetails(string GMasId, int company_id, int supplierid)
        {
            var getDetails = oblPur.ListInItemDetails(GMasId, company_id, supplierid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvOrdDetails(string GMasId, int company_id, int supplierid, int OItemID, int OColorID, int OSizeID, int Pur_Inv_DetID)
        {
            var getDetails = oblPur.ListInOrdDetails(GMasId, company_id, supplierid, OItemID, OColorID, OSizeID, Pur_Inv_DetID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(PurInvMas opj)
        {
            var result = oblPur.CreatePInvEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetSupp(string OType, int? company_id, string FromDate, string ToDate)
        {
            return Json(oblPur.GetDataSuppDetails(OType, company_id, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrd(string OType, int? company_id, int? supplierid, string FromDate, string ToDate)
        {
            return Json(oblPur.GetDataOrdDetails(OType, company_id,supplierid, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvSDcNo(string OType, int? company_id, int? supplierid, string OrdNo,string FromDate, string ToDate)
        {
            return Json(oblPur.GetDataInvDetails(OType, company_id, supplierid,OrdNo, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainLoad(string OType, int? company_id, int? supplierid, string OrdNo,string invoice_no,string supp_inv_no, string FromDate, string ToDate,string RefNo)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.POInvoiceAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.POInvoiceAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                     
                            menu = MenuNumber.MenuPurchaseInvoice;
                       
                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.POInvoiceAddFlg = "";
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
                var result = oblPur.GetDataInvMainDetails(OType, company_id, supplierid, OrdNo, invoice_no, supp_inv_no, FromDate, ToDate, RefNo).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PurInvMas App in result)
                {

                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return PurInvPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.pur_invid, App.Company, App.Supplier, App.invoice_no, App.invoice_date, App.supp_inv_no, App.Gross_amount);

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
        public JsonResult LoadEditInvDetails(int pur_invid)
        {
            return Json(oblPur.GetInvEditDetails(pur_invid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetInvGrnEditItemDetails(int pur_invid, int company_id, int supplierid)
        {
            var getDetails = oblPur.ListInGrnEditItemDetails(pur_invid, company_id, supplierid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvEditItemDetails(int Pur_inv_id, int Pur_grn_masid, int company_id, int supplierid)
        {
            var getDetails = oblPur.ListInEditItemDetails(Pur_inv_id, Pur_grn_masid, company_id, supplierid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvEditOrdDetails(int Pur_invID, int company_id, int supplierid, int OItemID, int OColorID, int OSizeID, int Pur_Inv_DetID)
        {
            var getDetails = oblPur.ListInOrdEditDetails(Pur_invID, company_id, supplierid, OItemID, OColorID, OSizeID, Pur_Inv_DetID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvEditAddLessDetails(int Pur_invID)
        {
            var getDetails = oblPur.ListInAddLessEditDetails(Pur_invID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PurInvMas ObjIE)
        {
            return Json(oblPur.UpdateInvEntry(ObjIE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PurInvMas ObjID)
        {
            return Json(oblPur.DeleteInvEntry(ObjID), JsonRequestBehavior.AllowGet);
        }
    }
}
