using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class StockInwardMainController : Controller
    {
        //
        // GET: /StockInwardMain/

        IStockInwardMainBusiness obPGo = new StockInwardMainBusiness();
         IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult StockInwardMainIndex()
        {
            GetStkMainDetails(0, 0, 0, "", 0, "", 0, 0, "", "", "","","");
            return View();
        }

        public JsonResult GetStkMainDetails(int? companyId,int? suppid, int? processid,string jobordNo,int? unitgrnmasid,string unitgrnno,int? fromunit,int? forunit,string recptcat,string fromDate,string todate,string Otype,string Utype)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StkInwardAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StkInwardAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuStockInward;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StkInwardAddFlg = "";
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
                var result = obPGo.GetDataMainList(companyId, suppid, processid, jobordNo, unitgrnmasid, unitgrnno, fromunit, forunit, recptcat, fromDate, todate, Otype, Utype).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (UnitGrnMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0,7})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0,7})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return StkInwPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Unit_GRN_Masid, App.fromunitnam, App.forunitnam, App.Unit_GRN_No, App.reference, App.orderno, App.Process, App.Companyid);

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

        public JsonResult GetStkMainddldet(int? companyId, int? suppid, int? processid, string jobordNo, int? unitgrnmasid, string unitgrnno, int? fromunit, int? forunit, string recptcat, string fromDate, string todate, string Otype, string Utype)
        {
            return Json(obPGo.GetDataMainList(companyId, suppid, processid, jobordNo, unitgrnmasid, unitgrnno, fromunit, forunit, recptcat, fromDate, todate, Otype, Utype), JsonRequestBehavior.AllowGet);

        
        }

    }
}
