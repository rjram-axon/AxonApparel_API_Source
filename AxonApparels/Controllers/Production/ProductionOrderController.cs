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
    public class ProductionOrderController : Controller
    {
        //
        // GET: /ProductionOrder/
        IProductionOrderBusiness obj = new ProductionOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult ProductionOrderIndex()
        {
            LoadMaingrid(0, "", "","", 0, "", "", 0, 0, 0, "", "",0,"");
            return View();
        }
        public JsonResult Getrefno(int cmpid,int cmpunitid)
        {

            return Json(obj.Getrefno(cmpid,cmpunitid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int styleid, string orderno)
        {

            return Json(obj.Loadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, styleid, orderno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOutputitmsgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadOutputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputitmsgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadInputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOutputjobdetgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadOutputjoborddetgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputjobdetgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadInputjoborddetgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid )
        {

            return Json(obj.LoadInputStkWgrid(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(ProductionOrdMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProductionOrdMas str)
        {
            var result = obj.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult Delete(int id)
        //{
        //    return Json(obj.Delete(id), JsonRequestBehavior.AllowGet);
        //}
        public JsonResult LoadMaingriddet(int cmpid, string closed, string buyrsamp, string processortype, int prodordid, string prodord, string type, int processorid, int unitid, int processid, string fromdate, string todate, int buyerid, string orderno)
        {

            return Json(obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, buyerid, orderno), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, int? buyerid, string orderno)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProdOrderAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProdOrderAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuSewingIssue;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ProdOrderAddFlg = "";
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
                var result = obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, buyerid, orderno).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessOrderAddScreen App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" onclick=\"return getbyID({0})\" " + Edit + "=\"" + Edit + "\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"     data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" onclick=\"return getDeleteID({0})\" " + Delete + "=\"" + Delete + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\"  class=\"btnSelect btn btn_round btn-success\"  " + Print + "=\"" + Print + "\"  onclick=\"return ProdOrdPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type);

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
        public JsonResult LoadMaingridord(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProdOrderAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProdOrderAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuSewingIssue;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ProdOrderAddFlg = "";
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
                var result = obj.LoadMaingridord(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessOrderAddScreen App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','<a id=\" {0} \" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\"  class=\"btnSelect btn btn_round btn-success\"  " + Print + "=\"" + Print + "\"  onclick=\"return ProdOrdPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type, App.buyer, App.buyerid, App.orderno);

                    //sb.AppendFormat(App.productionordid ,App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type, App.buyer, App.buyerid, App.orderno);

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
        public JsonResult LoadEditOutputItmgrid( int prodid)
        {

            return Json(obj.LoadEditOutputitmsgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputItmgrid(int prodid)
        {

            return Json(obj.LoadEditInputitmsgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditOutputjobdetgrid(int prodid)
        {

            return Json(obj.LoadEditOutputJobDetgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputjobdetgrid(int prodid)
        {

            return Json(obj.LoadEditInputJobDetgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditAddlessgrid(int prodid)
        {

            return Json(obj.LoadEditAddlessgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputStkDet(int cmpid,int prodid,string prodordno)
        {

            return Json(obj.LoadEditInputStkdet(cmpid,prodid,prodordno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(ProductionOrdMas ObjPE)
        {
            return Json(obj.DeleteDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
    }
}
