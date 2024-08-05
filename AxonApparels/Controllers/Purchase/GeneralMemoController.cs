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
    public class GeneralMemoController : Controller
    {
        //
        // GET: /GeneralMemo/
        IGeneralMemoBusiness obj = new GeneralMemoBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult GeneralMemoIndex()
        {
            GetgenememMainDetails(0, "", 0, 0, "", 0, "", "");
            return View();
        }
        public JsonResult LoadItmDetails(string Itmgrpid)
        {
          
            var getDetails = obj.GetItemLoad(Itmgrpid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(GeneralMemoMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(GeneralMemoMas ObjPSeq)
        {
            return Json(obj.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDataMainList(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate)
        {

            return Json(obj.GetDataMainList(cmpid, entryno, unitid, masid, refno, buyerid, fromDate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetgenememMainDetails(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.GeneralMemoAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.GeneralMemoAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuGeneralMemo;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.GeneralMemoAddFlg = "";
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
                var result = obj.GetDataMainList(cmpid, entryno, unitid, masid, refno, buyerid, fromDate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (GeneralMemoMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"   " + Edit + "=\"" + Edit + "\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  " + Print + "=\"" + Print + "\" > <button type=\"button\" id=\"btnPrint\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return StoreGenMemoPrint({0})\"    data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Gen_memo_Masid, App.unit, App.Gen_memo_No, App.Gen_memo_date, App.Gen_memo_RefNo, App.Gen_memo_Refdate);

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
        public JsonResult GetEditdet( int masid)
        {

            return Json(obj.GeteditItemLoad(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(int id)
        {
            return Json(obj.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
