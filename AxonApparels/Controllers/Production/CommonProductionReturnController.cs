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
    public class CommonProductionReturnController : Controller
    {
        //
        // GET: /CommonProductionReturn/
        ICommonProductionReturnBusiness CommProBA = new CommonProductionReturnBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CommonProductionReturnIndex()
        {
            GetMaindt(0, "", "", "", "", "", 0, "", 0, "", "");
            return View();
        }

        //Loading Multiple option
        public JsonResult GetCommonProdMultipleIssueInfo(string InterorExter, int CompanyId, int Processid, string OrderType, int OrdNo, int RefNo, int SupplierId, int StyleId, int IssueId)
        {
            var getProdIssue = CommProBA.GetCommonProductionIssueDet(InterorExter, CompanyId, Processid, OrderType, OrdNo, RefNo, SupplierId, StyleId, IssueId).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        //Loading Receipt List
        public JsonResult GetCommonProdReceiptInfo(string ProdIssueId)
        {
            var getProdIssue = CommProBA.GetCommonProductionReceiptDet(ProdIssueId).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        //Loading Receipt List on Edit Mode
        public JsonResult GetCommonProdRecptEditMode(int ID)
        {
            var getProdIssue = CommProBA.GetCommonProdRecptDetforEdit(ID).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(ProductionReturnMas Spm)
        {
            var result = CommProBA.CreateProductionReturn(Spm);            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate, string RecptType, string InterExter, string OrderNo, int ProcessId, string RefNo, int ReturnId, string PrgNo, string OrdType)
        {
            ViewBag.CommProdRetAddFlg = "disabled";
            ViewBag.CommProdRetEditFlg = "disabled";
            ViewBag.CommProdRetDeleteFlg = "disabled";
            ViewBag.CommProdRetPrintFlg = "disabled";

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CommProdRetAddFlg = "";
                ViewBag.CommProdRetEditFlg = "";
                ViewBag.CommProdRetDeleteFlg = "";
                ViewBag.CommProdRetPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCommonReturn;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();


                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CommProdRetAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CommProdRetEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CommProdRetDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CommProdRetPrintFlg = "";
                }
            }
            var getProdIssue = CommProBA.GetMaindt(CompanyId, Fromdate, Todate, RecptType, InterExter, OrderNo, ProcessId, RefNo, ReturnId, PrgNo, OrdType).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdReturnHeaderInfo(int ID)
        {
            var getProdReceiptHeaderInfo = CommProBA.GetCommProdReturnHeaderInformation(ID).Value.ToList();
            return Json(getProdReceiptHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProductionReturnMas Spm)
        {
            return Json(CommProBA.UpdateProductionReturn(Spm), JsonRequestBehavior.AllowGet);
        }
                
        public JsonResult Delete(int returnid, List<ProductionReturnDet> returndetail)
        {
            return Json(CommProBA.DeleteCommProdReturn(returnid, returndetail), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetCommonProdRetReasonEditMode(int ID)
        {
            var getProdIssue = CommProBA.GetCommonProdRetReasonEditMode(ID).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }


    }
}
