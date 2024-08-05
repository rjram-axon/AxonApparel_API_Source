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
    public class SecondsSalesController : Controller
    {
        //
        // GET: /SecondsSales/


        ISecondsSalesBusiness SBT = new SecondsSalesBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult SecondsSalesIndex()
        {
            GetMainLoad("", "", "", "", 0, 0, 0, "");
            return View();
        }


        public JsonResult GetTransnoMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid, string Otype)
        {
            var getDetails = SBT.GetMainLoad(FromDate, ToDate, OrderNo, Refno, Styid, masid, compid, Otype).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }


        public JsonResult LoadStockItemDetails(int?CompId, int? unitid, string OrderNo, string Refno, string styleid, int? itemgrpid, string Itemid, string Ordertype)
        {
            var getDetails = SBT.LoadStockItemDetails(CompId, unitid, OrderNo, Refno, styleid, itemgrpid, Itemid, Ordertype).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(FABRIC_SALES_MAS opj)
        {
            var result = SBT.Add(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(FABRIC_SALES_MAS opj)
        {
            var result = SBT.Update(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Delete(FABRIC_SALES_MAS opj)
        {
            var result = SBT.Delete(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid,string Otype)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.SecondsSalesAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.SecondsSalesAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuSecondSales;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.SecondsSalesAddFlg = "";
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
                var result = SBT.GetMainLoad(FromDate, ToDate, OrderNo, Refno, Styid, masid, compid, Otype).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (FABRIC_SALES_MAS App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return StkTransPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.Fabmasid, App.Entryno, App.EntryDate, App.dcno, App.Supplier);

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
        public JsonResult LoadEditMasDetails(int MasId)
        {
            return Json(SBT.LoadEditMasDetails(MasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditDetDetails(int MasId)
        {
            return Json(SBT.LoadEditDetDetails(MasId), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadStateDetails(int Companyid, int Supplierid)
        {
            return Json(SBT.LoadStateDetails(Companyid, Supplierid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadSSentryno()
        {
            return Json(SBT.LoadSSentryno(), JsonRequestBehavior.AllowGet);

        }

    }
}
