using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{  
    public class CommonProductionReceiptController : Controller
    {
        //
        // GET: /CommonProductionReceipt/
        ICommonProductionReceiptBusiness CommProBA = new CommonProductionReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CommonProductionReceiptIndex()
        {
            GetMaindt(0, "","", "", "", "", 0, "", "","", 0, 0,"GRN");
            return View();
        }

        //Loading Multiple option
        public JsonResult GetCommonProdMultipleIssueInfo(int CompanyUnitId, int ProcessId, int WorkDivisionId, string InterorExter, string OType, string RefNo, int StyId, string OrdNo, int CompId)
        {
            var getProdIssue = CommProBA.GetCommonProductionIssueDet(CompanyUnitId, ProcessId, WorkDivisionId, InterorExter, OType, RefNo, StyId, OrdNo, CompId).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        //Loading Receipt Grid option        
        public JsonResult GetCommonProdReceiptInfo(string ProdIssueId)
        {
            //try
            //{
                var getProdReceipt = CommProBA.GetCommonProductionReceiptDet(ProdIssueId).Value.ToList();
                return Json(getProdReceipt, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
        }

        //Loading Receipt Grid for edit mode
        public JsonResult GetProdReceiptForDet(int ProdReceptid)
        {
            //try
            //{
            var getProdReceipt = CommProBA.GetCommonProdReceiptForEdit(ProdReceptid).Value.ToList();
            return Json(getProdReceipt, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
        }

        //Loading Reason Grid for edit mode
        public JsonResult GetProdReasonForDet(int ReceptDetid)
        {
            //try
            //{
            var getProdReceipt = CommProBA.GetCommonProdReasonForEdit(ReceptDetid).Value.ToList();
            return Json(getProdReceipt, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
        }

        [HttpPost]
        public JsonResult Add(ProdReceiptMas Spm)
        {
            var result = CommProBA.CreateProductionReceipt(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProdReceiptMas Spm)
        {
            return Json(CommProBA.UpdateCommProdReceipt(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string JobWrkSample, string OrdNo, string Refno, int ProcessId, int processorid,string Type)
        {
            ViewBag.CommProdRecptAddFlg = "disabled";
            ViewBag.CommProdRecptEditFlg = "disabled";
            ViewBag.CommProdRecptDeleteFlg = "disabled";
            ViewBag.CommProdRecptPrintFlg = "disabled";

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CommProdRecptAddFlg = "";
                ViewBag.CommProdRecptEditFlg = "";
                ViewBag.CommProdRecptDeleteFlg = "";
                ViewBag.CommProdRecptPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    if (Type == "GRN")
                    {
                        menu = MenuNumber.MenuCommonReceipt;
                    }
                    else if (Type == "Qlty")
                    {
                        menu = MenuNumber.MenuCommonReceiptQlty;
                    
                    }


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();


                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CommProdRecptAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CommProdRecptEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CommProdRecptDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CommProdRecptPrintFlg = "";
                }
            }

            var getProdIssue = CommProBA.GetMaindt(CompanyId, Fromdate, Todate, RecptType, InterExter, DcNo, Recptid, JobWrkSample, OrdNo, Refno, ProcessId, processorid).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindtlist(int CompanyId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string JobWrkSample, string OrdNo, string Refno, int ProcessId, int processorid, string Type)
        {
            
            var getProdIssue = CommProBA.GetMaindtlist(CompanyId, Fromdate, Todate, RecptType, InterExter, DcNo, Recptid, JobWrkSample, OrdNo, Refno, ProcessId, processorid).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProdReceiptHeaderInfo(int ID)
        {
            var getProdReceiptHeaderInfo = CommProBA.GetCommProdReceiptHeaderInformation(ID).Value.ToList();
            return Json(getProdReceiptHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdReceiptItemstock(string ReceiptNo)
        {
            var getProdReceiptHeaderInfo = CommProBA.GetCommProdReceiptItemStock(ReceiptNo).Value;
            return Json(getProdReceiptHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(ProdReceiptMas Spm)
        {
            return Json(CommProBA.DeleteCommProdReceipt(Spm), JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetCommProdIssueitemdetforEdit(int ProdIssueId)
        //{
        //    var getProdIssue = CommProBA.GetCommProdIssueItemDetforEdit(ProdIssueId).Value.ToList();
        //    return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        //}
    }
}
