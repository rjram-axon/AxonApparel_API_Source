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

namespace AxonApparels.Controllers.Planning
{
    public class VendorController : Controller
    {
        //
        // GET: /Vendor/
        IVendorBusiness Ven = new VendorBusiness();

        public ActionResult VendorIndex()
        {
            return View();
        }
        public ActionResult ListVenDetailsMain(int? Companyid, string Buy_ord_no, string Ref_No, string EntryNo, int? Supplierid, string frmDate, string ToDate, string OType)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = Ven.MainGetVendor(Companyid, Buy_ord_no, Ref_No, EntryNo, Supplierid, frmDate, ToDate, OType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (Vendor App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"    class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"    class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> '],", App.Quoteid, App.Supplier, App.QuoteNo, App.QuoteDate, App.EntryNo, App.EntryDate, App.BuyOrdGeneral);
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
        public JsonResult GetEntryNo()
        {
            var result = Ven.GetOrderNoList();
            return Json(result, JsonRequestBehavior.AllowGet);           
        }
        public JsonResult Delete(int ID)
        {
            return Json(Ven.DeleteVen(ID), JsonRequestBehavior.AllowGet);
        }
    }
}
