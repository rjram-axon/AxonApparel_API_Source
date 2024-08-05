using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Production
{
    public class FabricDelySectionController : Controller
    {
        //
        // GET: /FabricDelySection/
        
        IFabricDelySectionBusiness FabBA = new FabricDelySectionBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult FabricDelySectionIndex()
        {
         //   GetMaindt(0, 0, 0, 0, 0, "", "", "I", "", "", "", "", "", 0,"");
            return View();
        }

        [HttpPost]
        public JsonResult Add(FabricDelySection_Mas Spm)
        {
            var result = FabBA.CreateFabricDelySection(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateDet(FabricDelySection_Mas Spm)
        {
            var resultupdate = FabBA.UpdateDetData(Spm);
            return Json(resultupdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateReceipt(FabricDelySection_Mas Spm)
        {
            var resultupdate = FabBA.UpdateReceipt(Spm);
            return Json(resultupdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteReceipt(FabricDelySection_Mas Spm)
        {
            var resultupdate = FabBA.DeleteReceipt(Spm);
            return Json(resultupdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id, string FabDelyIssueNo)
        {
            return Json(FabBA.Delete(id, FabDelyIssueNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInOutDet(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            return Json(FabBA.GetInputOutDet(Prodprgid, JobOrdNo, Ordertype), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInputItemStock(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId)
        {
            var getItemStockInfo = FabBA.GetInputItemStockInfo(JobOrdNo, CompanyId, IssueStoreId, StyleId, ColorId, ItemId, SizeId).Value;
            if (getItemStockInfo == null)
            {
                return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
            }            
        }

        public JsonResult GetMainDDLValues(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string FabDelyNo, string jobordno, string FromDate, string ToDate, int supplierid, string type)
        {
            var result = FabBA.GetMaindt(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, FabDelyNo, jobordno, FromDate, ToDate, supplierid).Value.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }        

        public JsonResult GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string FabDelyNo, string jobordno, string FromDate, string ToDate, int supplierid, string type)
        {

            ViewBag.FabricDeliveryAddFlg = "disabled";
            var Edit = "disabled";
            var Delete = "disabled";
            var Print = "disabled";

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.FabricDeliveryAddFlg = "";
                 Edit = "";
                 Delete = "";
                 Print = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCuttingIssue;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.FabricDeliveryAddFlg = "";
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
            var result = FabBA.GetMaindt(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, FabDelyNo, jobordno, FromDate, ToDate, supplierid).Value.ToList();
           if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            
            //if (result. == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
           foreach (AxonApparel.Domain.FabricDelySection str in result)
           {
               if (type == "Issue")
               {
                   sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"   data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"  onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"   data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"  onclick=\"return Delete({0},\\'{3}\\')\"  " + Delete + "=\"" + Delete + "\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Print({0})\" " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.FabDelyIssueId, str.OrderNo, str.RefNo, str.FabDelyIssueNo, str.StrFabDelyIssueDate, str.WorkDivision, str.Incharger, str.ProdPrgId, str.ProdPrgNo, str.WorkOrder);
               }
               else if (type == "Receipt")
               {
                   if (str.ChkRecpt == 0)
                   {
                      // sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnRecAdd\" onclick=\"return AddReceipt({0})\"  " + ViewBag.CuttingOrderAddFlg + "=\"" + ViewBag.CuttingOrderAddFlg + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a>'],", str.FabDelyIssueId, str.OrderNo, str.RefNo, str.FabDelyIssueNo, str.StrFabDelyIssueDate, str.WorkDivision, str.Incharger, str.ProdPrgId, str.ProdPrgNo, str.WorkOrder);
                       sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnRecAdd\" onclick=\"return AddReceipt({0})\"  " + ViewBag.CuttingOrderAddFlg + "=\"" + ViewBag.CuttingOrderAddFlg + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" " + "disabled" + "=\"" + "disabled" + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" " + "disabled" + "=\"" + "disabled" + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btn btn_round btn-success\" " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.FabDelyIssueId, str.OrderNo, str.RefNo, str.FabDelyIssueNo, str.StrFabDelyIssueDate, str.WorkDivision, str.Incharger, str.ProdPrgId, str.ProdPrgNo, str.WorkOrder);

                       //<a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Print({0})\"  " + "disabled" + "=\"" + "disabled" + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>
                   }
                   else
                   {
                       sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return AddReceipt({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0},\\'{3}\\')\"  " + Delete + "=\"" + Delete + "\"   class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btn btn_round btn-success\" onclick=\"return Print({0})\" " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.FabDelyIssueId, str.OrderNo, str.RefNo, str.FabDelyIssueNo, str.StrFabDelyIssueDate, str.WorkDivision, str.Incharger, str.ProdPrgId, str.ProdPrgNo, str.WorkOrder);
                       //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnRecAdd\" onclick=\"return AddReceipt({0})\"  class=\"btnSelect btn btn_round btn-success\" " + "disabled" + "=\"" + "disabled" + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \" onclick=\"return AddReceipt({0})\"  " + ViewBag.CuttingOrderEditFlg + "=\"" + ViewBag.CuttingOrderEditFlg + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0},\\'{3}\\')\"  " + ViewBag.CuttingOrderDeleteFlg + "=\"" + ViewBag.CuttingOrderDeleteFlg + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Print({0})\"  " + ViewBag.CuttingOrderPrintFlg + "=\"" + ViewBag.CuttingOrderPrintFlg + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.FabDelyIssueId, str.OrderNo, str.RefNo, str.FabDelyIssueNo, str.StrFabDelyIssueDate, str.WorkDivision, str.Incharger, str.ProdPrgId, str.ProdPrgNo, str.WorkOrder);
                   }
               }
           }
            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            //return Json(result, JsonRequestBehavior.AllowGet);
            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);           
        }

        public JsonResult GetFabricHeaderInfo(int ID)
        {
            var getProdItemWorkOrder = FabBA.GetFabricHeaderInformation(ID).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFabricInputItemStockEditMode(int ID, int ItemID, int ColorID, int SizeID)
        {
            var getItemStockInfo = FabBA.GetFabricInputItemStockInfoEditMode(ID, ItemID, ColorID, SizeID).Value;
            if (getItemStockInfo == null)
            {
                return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
            }           
        }      

        public ActionResult GetFaricDelySectionOrderList(int CompanyId, int CompanyUnitId, string OrderType, string RefNo, int StyleId, string OrderNo, int Buyerid)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = FabBA.GetFaricDelySectionOrderList(CompanyId, CompanyUnitId, OrderType, RefNo, StyleId, OrderNo, Buyerid);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetInOutDetEdit(int FabricDelyIssueId, int Prodprgid)
        {
            return Json(FabBA.GetInputOutDetEdit(FabricDelyIssueId, Prodprgid), JsonRequestBehavior.AllowGet);
        }
    }
}
