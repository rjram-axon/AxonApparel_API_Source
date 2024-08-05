using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class OpeningStockController : Controller
    {
        //
        // GET: /OpeningStock/
        IOpeningStockBusiness OsBus = new OpeningStockBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult OpeningStockIndex()
        {
            GetOPMainDetails("", "", 0, "", "", 0, "", "");
            return View();
        }
        public JsonResult GetItem(int itmgrpid,string itmcat)
        {
            return Json(OsBus.GetItem(itmgrpid,itmcat), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetUom(int itmid)
        {
            return Json(OsBus.GetUom(itmid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult ChkPlanned(string  OrderNo,int Styleid,int Itemid,int Colorid,int Sizeid)
        {
            return Json(OsBus.ChkPlanned(OrderNo, Styleid, Itemid, Colorid, Sizeid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Add(ItemStockDom str)
        {
            var result = OsBus.CreateEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ItemStockDom ObjPSeq)
        {
            return Json(OsBus.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOPMainDetails(string ordertype,  string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.OPStockAddFlg = "disabled";
                ViewBag.OPStockEditFlg = "disabled";
                ViewBag.OPStockDeleteFlg = "disabled";
                ViewBag.OPStockPrintFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OPStockAddFlg = "";
                    ViewBag.OPStockEditFlg = "";
                    ViewBag.OPStockDeleteFlg = "";
                    ViewBag.OPStockPrintFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                    menu = MenuNumber.MenuOpeningStock;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OPStockAddFlg = "";
                    }
                    if (ret[0].EditFlg == 1)
                    {
                        Edit = "";
                        ViewBag.OPStockEditFlg = "";
                    }
                    if (ret[0].DelFlg == 1)
                    {
                        Delete = "";
                        ViewBag.OPStockDeleteFlg = "";
                    }
                    if (ret[0].PrintFlg == 1)
                    {
                        Print = "";
                        ViewBag.OPStockPrintFlg = "";
                    }
                }


                StringBuilder sb = new StringBuilder();
                var result = OsBus.GetDataMain(ordertype,  transno, companyid, orderno, refno, styleid, fromDate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ItmStkDet App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({4})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> | <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0,7})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return OpenstkPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.companyid, App.company, App.Transno, App.transdate, App.itemgrpid, App.itmgrp, App.Type);
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

        public JsonResult GetOPLoad(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
        {
            return Json(OsBus.GetDataMain(ordertype, transno, companyid, orderno, refno, styleid, fromDate, todate), JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetOPMainddldet(string ordertype,  string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
        {
            return Json(OsBus.GetDataMainList(ordertype,  transno, companyid, orderno, refno, styleid, fromDate, todate), JsonRequestBehavior.AllowGet);


        }

        public JsonResult Delete(string Transno)
        {
            return Json(OsBus.Delete(Transno), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEditGrid( string transno)
        {
            return Json(OsBus.Geteditgrid(transno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrdno(string ordtype)
        {
            return Json(OsBus.GetOrdno(ordtype), JsonRequestBehavior.AllowGet);

        }
    }
}
