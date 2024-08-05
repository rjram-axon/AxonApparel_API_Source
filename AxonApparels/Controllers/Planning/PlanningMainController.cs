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

namespace AxonApparels.Controllers.Planning
{
    public class PlanningMainController : Controller
    {
        //
        // GET: /PlanningMain/
        IPlanningMainBusiness oblPm = new PlanningMainBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult PlanningMainIndex()
        {
            ListPlanning(0, "", "", 0, "", "", "", "", "", "", "", 0, 0, "", "N");

            return View();
        }
        public ActionResult ListPlanning(int? CompanyID, string Order_No, string Ref_no, int? StyleID, string frmDate, string ToDate, string OType, string Type, string OrderType, string bud, string buystat, int empid, int buyerid, string Job_Ord_No, string DispatchClosed)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
               // ViewBag.OrderAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                  //  ViewBag.OrderAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (Type == "Prog")
                        {
                            menu = MenuNumber.MenuPlanProgram;
                        }
                        else if (Type == "Bom")
                        {
                            menu = MenuNumber.MenuPgmBOM;
                        }
                        else if (Type == "Bud")
                        {
                            menu = MenuNumber.MenuPgmBudget;
                        }
                        else if (Type == "WorkFlow")
                        {
                            menu = MenuNumber.MenuPgmWorkFlow;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        Add = "";
                       // ViewBag.OrderAddFlg = "";
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
                var result = oblPm.GetDataMainList(CompanyID, Order_No, Ref_no, StyleID, frmDate, ToDate, OType, OrderType, bud, buystat, empid, buyerid, Job_Ord_No,DispatchClosed).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                if (OType == "U")
                {

                    foreach (PlanningMain App in result)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8})\" class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8})\" class=\"btnSelect btn btn_round btn-danger\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a>'],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                    }
                }
                else
                {
                    foreach (PlanningMain App in result)
                    {
                        if (Type == "Prog")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" disabled=\"disabled\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{12})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{12})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><a></a><button type=\"button\" id=\"btnPrint\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({8})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);
                        }
                        else if (Type == "Bom")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" disabled=\"disabled\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{12})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{12})\" " + Delete + "=\"" + Delete + "\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
                        else if (Type == "SamProg")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" disabled=\"disabled\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{12})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{12})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
                        else if (Type == "Bud" && App.CostDefId > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" disabled=\"disabled\">  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{13})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{13})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button></a><a><button type=\"button\" id=\"btnPrint\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({8})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
                        else if (Type == "Bud" && App.CostDefId == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" " + Add + "=\"" + Add + "\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >    <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{13})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{13})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><button type=\"button\" id=\"btnPrint\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({8})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
                        else if (Type == "WorkFlow" && App.ProSeq == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({8})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" " + Add + "=\"" + Add + "\"  style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{12})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {8} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDeleteID({8},{12})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
                        else if (Type == "WorkFlow" && App.ProSeq > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','<a id=\" {9} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{9}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyAddID({9})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  disabled=\"disabled\">  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {9} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyEditID({8},{12})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {9} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{9}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyPDeleteID({8},{10},{12})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button></a> '],", App.StyleID, App.Company, App.buyer, App.Order_No, App.Style, App.Ref_no, App.Order_date, App.Quantity, App.StyleRowid, App.ProSeq, App.TProgQty, App.ProdAmend, App.PlanApp, App.CostApp, App.CompanyID, App.buyerid, App.Job_Ord_No);

                        }
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
        public JsonResult GetOrderNo(string frmDate, string ToDate, string OrderType)
        {

            return Json(oblPm.GetDataOrderDetails(frmDate, ToDate, OrderType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStyle(string frmDate, string ToDate, string OrderType)
        {

            return Json(oblPm.GetDataStyleDetails(frmDate, ToDate, OrderType), JsonRequestBehavior.AllowGet);

        }
    }
}
