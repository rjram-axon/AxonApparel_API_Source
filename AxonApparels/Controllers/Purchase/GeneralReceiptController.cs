using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class GeneralReceiptController : Controller
    {
        //
        // GET: /GeneralReceipt/
        IGeneralReceiptBusiness obj=new GeneralReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult GeneralReceiptIndex()
        {
            LoadMaingrid("", 0, 0, 0, "", "");
            return View();
        }
        public JsonResult Add(GeneralMemoRetMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetIssueNo()
        {

            return Json(obj.GetIssueno(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItm(int masid)
        {

            return Json(obj.Loaditm(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadHeaderdet(int masid)
        {

            return Json(obj.Loadheaderdet(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItmeditdet(int masid)
        {

            return Json(obj.Loadedititmdet(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingrid(string entryno, int? masid, int? cmpid, int? unitid, string fromdate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.GeneralReturnAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.GeneralReturnAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuGeneralReturn;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.GeneralReturnAddFlg = "";
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
                var result = obj.LoadMaingrid(entryno, masid, cmpid, unitid, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (GeneralMemoRetMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return StoresGenMemoRetPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Gen_MemoRet_MasId, App.unit, App.GenMemo_RetNo, App.GenMemoRetDate, App.GenMemoRet_RefNo, App.GenmemoRet_Refdate, App.MemoType);

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
        public JsonResult GetDataMainList(string entryno, int? masid, int? cmpid, int? unitid, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid(entryno, masid, cmpid, unitid, fromdate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(GeneralMemoRetMas ObjPSeq)
        {
            return Json(obj.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
