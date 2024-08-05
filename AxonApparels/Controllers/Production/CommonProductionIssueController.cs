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
    public class CommonProductionIssueController : Controller
    {
        //
        // GET: /CommonProductionIssue/
        ICommonProductionIssueBusiness CommProBA = new CommonProductionIssueBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CommonProductionIssueIndex()
        {
            GetMaindt(0,"","", "", 0, 0, 0, "", "", "", "");
            return View();
        }
        //Loading Multiple option
        public JsonResult GetCommonProdIssueInfo(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType, string RNo, string OdNo)
        {
            var getProdIssue = CommProBA.GetCommonProductionIssueDet(CompanyId, CompanyUnitId, ProcessId, Ordertype, ProcessType, RNo, OdNo).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        //Load Item in Edit Mode
        public JsonResult GetCommProdIssueitemdetforEdit(int ProdIssueId)
        {
            var getProdIssue = CommProBA.GetCommProdIssueItemDetforEdit(ProdIssueId).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }
        //Load Job Orders in Edit Mode
        public JsonResult GetCommonProdJobOrddetforEdit(int ProdIssueId)
        {
            var getComProdJobOrd = CommProBA.GetCommonProductionJobOrderDet(ProdIssueId).Value.ToList();
            return Json(getComProdJobOrd, JsonRequestBehavior.AllowGet);
        }
        //Load Stock in Edit Mode
        public JsonResult GetCommonProdstckdetforEdit(int CompanyId, int ProdIssueId)
        {
            var getComProdJobOrd = CommProBA.GetCommonProductionJobOrderDetforEdit(CompanyId, ProdIssueId).Value.ToList();
            return Json(getComProdJobOrd, JsonRequestBehavior.AllowGet);
        }

        //Load Item in Add Mode
        public JsonResult GetCommonProdIssueitemstckdet(string NoofPrgId, string InorOut)        
        {
            var getProdIssue = CommProBA.GetCommonProductionIssueItemStckDet(NoofPrgId, InorOut).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }
        //Load Job Orders in Add Mode
        public JsonResult GetCommonProdJobOrddet(string ProdPrgId)
        {
            var getComProdJobOrd = CommProBA.GetCommonProductionJobOrderDet(ProdPrgId).Value.ToList();
            return Json(getComProdJobOrd, JsonRequestBehavior.AllowGet);
        }
        //Load Stock in Add Mode
        public JsonResult GetCommonProdstckdet(int CompanyId, string JobOrdNo, int Itemid, int Colorid, int Sizeid, string Programid,int storeid)
        {
            var getComProdJobOrd = CommProBA.GetCommonProductionJobOrderDet(CompanyId, JobOrdNo, Itemid, Colorid, Sizeid, Programid,storeid).Value.ToList();
            return Json(getComProdJobOrd, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(ProductionIssueMas Spm)
        {
            var result = CommProBA.CreateProductionIss(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(CommonProductionIssue Spm)
        {
            return Json(CommProBA.UpdateCommProdIss(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, int ProcessId, int UnitId, int IssId, string Refno, string JobOrdNo, string OrdNo, string ProcessorType)
        {
            ViewBag.CommProdAddFlg = "disabled";
            ViewBag.CommProdEditFlg = "disabled";
            ViewBag.CommProdDeleteFlg = "disabled";
            ViewBag.CommProdPrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CommProdAddFlg = "";
                ViewBag.CommProdEditFlg = "";
                ViewBag.CommProdDeleteFlg = "";
                ViewBag.CommProdPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCommonIssue;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

               
                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CommProdAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CommProdEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CommProdDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CommProdPrintFlg = "";
                }
            }


            var getProdIssue = CommProBA.GetMaindt(CompanyId, Fromdate, Todate, OrderType, ProcessId, UnitId, IssId, Refno, JobOrdNo, OrdNo, ProcessorType).Value.ToList();
            return Json(getProdIssue, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCommonHeaderInfo(int ID)
        {
            var getProdItemWorkOrder = CommProBA.GetCommProdIssHeaderInformation(ID).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(CommonProductionIssue dSpm)
        {
            return Json(CommProBA.DeleteCommProdIssue(dSpm), JsonRequestBehavior.AllowGet);
        }

    }
}
