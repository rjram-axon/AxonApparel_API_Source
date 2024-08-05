using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Text.RegularExpressions;
using System.IO;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class StyleEntryController : Controller
    {
        //
        // GET: /Style Entry/
        IBuyOrderStyleBusiness BuyOrdobj = new BuyOrdStyleBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult StyleEntryIndex()
        {
            List("Sty", 0);
            return View();
        }

        [HttpPost]
        public JsonResult Add(BuyOrderStyle Spm)
        {
            var result = BuyOrdobj.CreateBuyOrderStyle(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(BuyOrderStyle Spm)
        {
            return Json(BuyOrdobj.UpdateBuyOrderStyle(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyIDOrder(int Id)
        {
            //int id = OrderId; //contains selected courseid
            //var result = BuyOrdobj.GetOrderRef(OrderId);
            return Json(BuyOrdobj.GetOrderRef(Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyIDforCopyStyle(int ID, string styletype)
        {
            return Json(BuyOrdobj.GetDataById(ID, styletype), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            return Json(BuyOrdobj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetShipmentEntry(int Id)
        {
            return Json(BuyOrdobj.GetShipmentChecking(Id), JsonRequestBehavior.AllowGet);
        }
        public ActionResult Getorderno(int buyormasid)
        {
            //var getDetails = BuyOrdobj.GetOrderno(buyormasid).Value.ToList();
            //return Json(getDetails, JsonRequestBehavior.AllowGet);
            return Json(BuyOrdobj.GetOrderno(buyormasid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(BuyOrdobj.DeleteBuyOrderStyle(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStyleItem(int Id)
        {
            //int id = OrderId; //contains selected courseid
            //var result = BuyOrdobj.GetOrderRef(OrderId);
            return Json(BuyOrdobj.GetItemStylebyId(Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetenquiryNo()
        {
            //int id = OrderId; //contains selected courseid
            //var result = BuyOrdobj.GetOrderRef(OrderId);
            return Json(BuyOrdobj.GetEnquiryNo(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleNumber(string OrdNo)
        {
            return Json(BuyOrdobj.GetStyleNo(OrdNo), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(string Type, int buyormasid)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StyleAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StyleAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (Type == "Ship")
                        {
                            menu = MenuNumber.MenuOrderShipment;
                        }
                        else if (Type == "Sty")
                        {
                            menu = MenuNumber.MenuOrderStyle;
                        }
                        else if (Type == "Prod")
                        {
                            menu = MenuNumber.MenuJobWork;
                        }
                        else if (Type == "Meas")
                        {
                            menu = MenuNumber.MenuMeasurment;
                        }
                        else if (Type == "Approve")
                        {
                            menu = MenuNumber.MenuOrderApproval;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StyleAddFlg = "";
                        Add = "";
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
                var result = BuyOrdobj.GetBuyOrderStyleLoad(buyormasid);
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BuyOrderStyle BuySty in result.Value)
                {
                    if (Type == "Ship")
                    {

                        if (BuySty.BShipNo > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"Editbtnship\" onclick=\"return getbyEditID({0},{8})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  id=\"Delbtnship\" onclick=\"return getbyDeleteID({0},{8})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.BShipNo == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"Addbtnship\" onclick=\"return getbyAddID({0})\" " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyEditID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyDeleteID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Sty")
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"EditbtnSty\" onclick=\"return getbyEditID({0},{7})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  id=\"Delbtnship\" onclick=\"return getbyDeleteID({0},{7})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                    }
                    else if (Type == "Prod")
                    {

                        if (BuySty.JobcountId > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getProdAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getProdAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"Editbtnprod\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  id=\"Delbtnship\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.JobcountId == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getProdAddID({0})\" id=\"Addbtnprod\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getProdEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Meas")
                    {

                        if (BuySty.MeasCount > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getMeasAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"EditbtnMes\" onclick=\"return getMeasEditID({0})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  id=\"Delbtnship\" onclick=\"return getMeasbyDeleteID({0})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.MeasCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"AddbtnMes\" onclick=\"return getMeasAddID({0})\" " + Add + "=\"" + Add + "\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" onclick=\"return getMeasEditID({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getMeasbyDeleteID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Precos")
                    {

                        if (BuySty.PrecostingCount > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecosAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.PrecostingCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecosAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Precostfab")
                    {

                        if (BuySty.PrecostingfabCount > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecostfabAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostfabEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostfabbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.PrecostingfabCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecostfabAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostfabEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostfabbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Precosttrims")
                    {

                        if (BuySty.Trimsconsumption > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecosttrimsAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosttrimsEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosttrimsbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.Trimsconsumption == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecosttrimsAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosttrimsEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecosttrimsbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Precostrate")
                    {

                        if (BuySty.chkrate > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecostrateAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostrateEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostratebyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.chkrate == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \" onclick=\"return getPrecostrateAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostrateEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getPrecostratebyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

                        }
                    }
                    else if (Type == "Approve")
                    {

                        if (BuySty.AppCount > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getApproveAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"EditbtnApp\" onclick=\"return getApproveEditID({0})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"DelbtnApp\" onclick=\"return getApproveDeleteID({0})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);
                        }
                        else if (BuySty.AppCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"AddbtnApp\" onclick=\"return getApproveAddID({0})\" " + Add + "=\"" + Add + "\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ProdAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getApproveEditID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getApproveDeleteID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.StyleRowid, BuySty.order_no, BuySty.styleName, BuySty.OrderQuantity, BuySty.StyQty, BuySty.BShipNo, BuySty.StyleAmend, BuySty.StyApp, BuySty.ShipApp);

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



        //public ActionResult List(string Type, int buyormasid)
        //{
        //    try
        //    {
        //        StringBuilder sb = new StringBuilder();
        //        //ViewBag.CompAddFlg = "false";

        //        var username = Session["UserName"].ToString();
        //        var SUser = "";
        //        if (username == "superuser")
        //        {
        //            SUser = "superuser";
        //        }
        //        var result = BuyOrdobj.GetBuyOrderStyleLoad(buyormasid);
        //        if (result == null || result.Value == null)
        //            return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

        //        //Get Role for assinging rights
        //        int roleid = Convert.ToInt16(Session["RoleId"]);
        //        if (roleid != 0)
        //        {
        //            //var roleoj = roleobj.GetRolebyId(roleid);
        //            //var res = roleoj.Value;
        //            string str = null;

        //            str = GenRights.GenerateRights(roleid, MenuNumber.MenuStyle, "'{0}','{1}','{2}','{3}','{4}'", SUser);

        //            string[] StrArr = str.Split('$');
        //            ViewBag.CompAddFlg = StrArr[0];
        //            str = StrArr[1];

        //            foreach (BuyOrderStyle BuySty in result.Value)
        //            {
        //                sb.AppendFormat(str, complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
        //            }

        //        }

        //        string tableValue = sb.ToString();
        //        tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
        //        return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
               
        //    }
        //    catch (Exception ex)
        //    {
        //        Response.Write(ex.InnerException.ToString());
        //        return Json("Failure", JsonRequestBehavior.AllowGet);
        //    }
        //}





        public JsonResult PrecostOrdList(string buyormasid)
        {

            try
            {

                StringBuilder sb = new StringBuilder();
                var result = BuyOrdobj.GetBuyOrderTargetStyleLoad(buyormasid);
                return Json(result, JsonRequestBehavior.AllowGet);
               
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteFile(long id)
        {
            UploadsViewModel uploadsViewModel = new UploadsViewModel();
            try
            {
                /* Use input Id to delete the record from db logically by setting IsDeleted bit in your table or delete it physically whatever is suitable for you
                   for DEMO purpose i am stroing it in Session */

                // UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;



                UploadsViewModel viewModel = new UploadsViewModel();
                viewModel = Session["Uploads"] as UploadsViewModel;

                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();

                if (viewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            uploadsViewModel.Uploads.Add(upload);
                        }
                    }

                    AxonApparel.Domain.File file = uploadsViewModel.Uploads.Single(x => x.FileID == id);

                    System.IO.File.Delete(Server.MapPath(file.FilePath));
                    uploadsViewModel.Uploads.Remove(file);
                    Session["Uploads"] = null;
                    Session["Uploads"] = uploadsViewModel;
                    return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", (uploadsViewModel.Uploads == null ? new UploadsViewModel().Uploads : uploadsViewModel.Uploads));
                }
                else
                {

                    AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);


                    System.IO.File.Delete(Server.MapPath(file.FilePath));
                    viewModel.Uploads.Remove(file);
                    Session["Uploads"] = null;
                    Session["Uploads"] = viewModel;
                    return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", (viewModel.Uploads == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
                }

                //AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);


                //System.IO.File.Delete(Server.MapPath(file.FilePath));
                //viewModel.Uploads.Remove(file);
            }

            //UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;

            //AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);
            //string[] lines = Regex.Split(file.FilePath, "/");

            //try
            //{
            //    //System.IO.File.Delete(Server.MapPath(file.FilePath));
            //    System.IO.Directory.Delete(Server.MapPath("~/Uploads/" + lines[2]), true);
            //    viewModel.Uploads.Remove(file);
            //}

            catch (Exception)
            {
                return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);
            }
            return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);
        }
        public ActionResult AttachDeleteFile(long id)
        {
            UploadsViewModel uploadsViewModel = new UploadsViewModel();
            try
            {
                /* Use input Id to delete the record from db logically by setting IsDeleted bit in your table or delete it physically whatever is suitable for you
                   for DEMO purpose i am stroing it in Session */

                // UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;



                UploadsViewModel viewModel = new UploadsViewModel();
                viewModel = Session["Uploads"] as UploadsViewModel;

                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();

                if (viewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            uploadsViewModel.Uploads.Add(upload);
                        }
                    }

                    AxonApparel.Domain.File file = uploadsViewModel.Uploads.Single(x => x.FileID == id);

                    System.IO.File.Delete(Server.MapPath(file.FilePath));
                    uploadsViewModel.Uploads.Remove(file);
                    Session["Uploads"] = null;
                    Session["Uploads"] = uploadsViewModel;
                    return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", (uploadsViewModel.Uploads == null ? new UploadsViewModel().Uploads : uploadsViewModel.Uploads));
                }
                else
                {

                    AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);


                    System.IO.File.Delete(Server.MapPath(file.FilePath));
                    viewModel.Uploads.Remove(file);
                    Session["Uploads"] = null;
                    Session["Uploads"] = viewModel;
                    return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", (viewModel.Uploads == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
                }

                //AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);


                //System.IO.File.Delete(Server.MapPath(file.FilePath));
                //viewModel.Uploads.Remove(file);
            }

            //UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;

            //AxonApparel.Domain.File file = viewModel.Uploads.Single(x => x.FileID == id);
            //string[] lines = Regex.Split(file.FilePath, "/");

            //try
            //{
            //    //System.IO.File.Delete(Server.MapPath(file.FilePath));
            //    System.IO.Directory.Delete(Server.MapPath("~/Uploads/" + lines[2]), true);
            //    viewModel.Uploads.Remove(file);
            //}

            catch (Exception)
            {
                return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", uploadsViewModel.Uploads);
            }
            return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", uploadsViewModel.Uploads);
        }
        public JsonResult AddSession(BuyOrderStyle Spm)
        {
            Session["Uploads"] = null;
            Session["Uploads"] = Spm.Buyordimg;


            var result = Session["Uploads"];
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetFiles(long Id)
        {
            if (Session["Uploads"] == null)
            {
                UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;

                return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", (viewModel == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
            }
            else
            {
                UploadsViewModel uploadsViewModel = new UploadsViewModel();

                UploadsViewModel viewModel = new UploadsViewModel();
                viewModel = Session["Uploads"] as UploadsViewModel;

                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();

                if (viewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            uploadsViewModel.Uploads.Add(upload);
                        }
                    }

                    return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", (uploadsViewModel.Uploads == null ? new UploadsViewModel().Uploads : uploadsViewModel.Uploads));
                }

                ////viewModel.Uploads = tstimag;

                return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", (viewModel == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
            }
        }
        public ActionResult AttachGetFiles(long Id)
        {
            if (Session["Uploads"] == null)
            {
                UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;

                return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", (viewModel == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
            }
            else
            {
                UploadsViewModel uploadsViewModel = new UploadsViewModel();

                UploadsViewModel viewModel = new UploadsViewModel();
                viewModel = Session["Uploads"] as UploadsViewModel;

                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();

                if (viewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            uploadsViewModel.Uploads.Add(upload);
                        }
                    }

                    return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", (uploadsViewModel.Uploads == null ? new UploadsViewModel().Uploads : uploadsViewModel.Uploads));
                }

                ////viewModel.Uploads = tstimag;

                return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", (viewModel == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
            }
        }
        public JsonResult GetFilelist(long Id)
        {
            if (Session["Uploads"] == null)
            {
                UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;
                //Session["tst"] = viewModel.Uploads;
                return Json(viewModel.Uploads, JsonRequestBehavior.AllowGet);
            }
            else
            {
                //UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;
                //List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                //tstimag = Session["Uploads"] as List<BuyOrdImg>;

                UploadsViewModel uploadsViewModel = new UploadsViewModel();

                UploadsViewModel viewModel = new UploadsViewModel();
                viewModel = Session["Uploads"] as UploadsViewModel;

                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();

                if (viewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            uploadsViewModel.Uploads.Add(upload);
                        }
                    }

                    return Json(uploadsViewModel.Uploads, JsonRequestBehavior.AllowGet);
                }





                //ViewBag.tst = viewModel.Uploads;
                //viewModel.Uploads = tstimag;
                return Json(viewModel.Uploads, JsonRequestBehavior.AllowGet);
                //return viewModel;
            }
        }

        [HttpPost]
        public ActionResult Upload(FormCollection form, HttpPostedFileBase file, string TitleVal)
        {

            //HttpPostedFileBase file = Request.Files[0];
            UploadsViewModel uploadsViewModel = Session["Uploads"] != null ? Session["Uploads"] as UploadsViewModel : new UploadsViewModel();
            if (uploadsViewModel != null)
            {
                uploadsViewModel.ID = long.Parse(form["id"]);

                string appPath = AppDomain.CurrentDomain.BaseDirectory;
                DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);
                long fileid = 0;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                if (uploadsViewModel.Uploads.Count == 0)
                {
                    upload.FileID = uploadsViewModel.Uploads.Count + 1;
                }
                else
                {
                    for (var j = 0; j < uploadsViewModel.Uploads.Count; j++)
                    {
                        fileid = uploadsViewModel.Uploads[j].FileID;
                    }

                    upload.FileID = fileid + 1;

                }

                upload.FileName = file.FileName;
                upload.FilePath = "~/Uploads/" + TitleVal + "/" + file.FileName;


                //if (file.ContentLength < 4048576)    we can check file size before saving if we need to restrict file size or we can check it on client side as well
                //{

                if (file != null)
                {
                    file.SaveAs(Server.MapPath(upload.FilePath));
                    uploadsViewModel.Uploads.Add(upload);
                    Session["Uploads"] = uploadsViewModel;
                }

                // Save FileName and Path to Database according to your business requirements

                //}
                return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);
            }
            else
            {
                UploadsViewModel ViewModel = new UploadsViewModel();
                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;
                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                long fileid = 0;
                if (tstimag.Count > 0)
                {
                    // AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                    if (ViewModel.Uploads.Count == 0)
                    {
                        upload.FileID = ViewModel.Uploads.Count + 1;
                    }
                    else
                    {
                        for (var j = 0; j < ViewModel.Uploads.Count; j++)
                        {
                            fileid = ViewModel.Uploads[j].FileID;
                        }

                        upload.FileID = fileid + 1;

                    }

                    upload.FileName = file.FileName;
                    upload.FilePath = "~/Uploads/" + TitleVal + "/" + file.FileName;


                    tstimag.Add(new BuyOrdImg { FileID = upload.FileID, FileName = upload.FileName, FilePath = upload.FilePath });


                    //tstimag[tstimag.Count].FileID = upload.FileID;
                    //tstimag[tstimag.Count].FileName = upload.FileName;
                    //tstimag[tstimag.Count].FilePath = upload.FilePath;
                }


                if (uploadsViewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            ViewModel.Uploads.Add(upload);
                        }
                    }


                }

                ViewModel.ID = long.Parse(form["id"]);

                string appPath = AppDomain.CurrentDomain.BaseDirectory;
                DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);




                //if (file.ContentLength < 4048576)    we can check file size before saving if we need to restrict file size or we can check it on client side as well
                //{

                if (file != null)
                {
                    file.SaveAs(Server.MapPath(upload.FilePath));
                    // ViewModel.Uploads.Add(upload);
                    Session["Uploads"] = ViewModel;
                }
                return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", ViewModel.Uploads);
            }

            // return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);

        }

        [HttpPost]
        public ActionResult AttachUpload(FormCollection form, HttpPostedFileBase file, string TitleVal)
        {

            //HttpPostedFileBase file = Request.Files[0];
            UploadsViewModel uploadsViewModel = Session["Uploads"] != null ? Session["Uploads"] as UploadsViewModel : new UploadsViewModel();
            if (uploadsViewModel != null)
            {
                uploadsViewModel.ID = long.Parse(form["id"]);

                string appPath = AppDomain.CurrentDomain.BaseDirectory;
                DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);
                long fileid = 0;

                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                if (uploadsViewModel.Uploads.Count == 0)
                {
                    upload.FileID = uploadsViewModel.Uploads.Count + 1;
                }
                else
                {
                    for (var j = 0; j < uploadsViewModel.Uploads.Count; j++)
                    {
                        fileid = uploadsViewModel.Uploads[j].FileID;
                    }

                    upload.FileID = fileid + 1;

                }

                upload.FileName = file.FileName;
                upload.FilePath = "~/Uploads/" + TitleVal + "/" + file.FileName;


                //if (file.ContentLength < 4048576)    we can check file size before saving if we need to restrict file size or we can check it on client side as well
                //{

                if (file != null)
                {
                    file.SaveAs(Server.MapPath(upload.FilePath));
                    uploadsViewModel.Uploads.Add(upload);
                    Session["Uploads"] = uploadsViewModel;
                }

                // Save FileName and Path to Database according to your business requirements

                //}
                return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", uploadsViewModel.Uploads);
            }
            else
            {
                UploadsViewModel ViewModel = new UploadsViewModel();
                List<BuyOrdImg> tstimag = new List<BuyOrdImg>();
                tstimag = Session["Uploads"] as List<BuyOrdImg>;
                AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                long fileid = 0;
                if (tstimag.Count > 0)
                {
                    // AxonApparel.Domain.File upload = new AxonApparel.Domain.File();
                    if (ViewModel.Uploads.Count == 0)
                    {
                        upload.FileID = ViewModel.Uploads.Count + 1;
                    }
                    else
                    {
                        for (var j = 0; j < ViewModel.Uploads.Count; j++)
                        {
                            fileid = ViewModel.Uploads[j].FileID;
                        }

                        upload.FileID = fileid + 1;

                    }

                    upload.FileName = file.FileName;
                    upload.FilePath = "~/Uploads/" + TitleVal + "/" + file.FileName;


                    tstimag.Add(new BuyOrdImg { FileID = upload.FileID, FileName = upload.FileName, FilePath = upload.FilePath });


                    //tstimag[tstimag.Count].FileID = upload.FileID;
                    //tstimag[tstimag.Count].FileName = upload.FileName;
                    //tstimag[tstimag.Count].FilePath = upload.FilePath;
                }


                if (uploadsViewModel == null)
                {
                    //viewModel = new UploadsViewModel().Uploads;

                    if (tstimag.Count > 0)
                    {
                        //foreach (var n in tstimag)
                        for (var j = 0; j < tstimag.Count; j++)
                        {
                            upload = new AxonApparel.Domain.File();

                            string[] res;
                            res = tstimag[j].FilePath.Split('/');
                            string FileName = res[3];

                            upload.FileID = tstimag[j].FileID;
                            upload.FileName = FileName;// tstimag[j].Imgtitle;
                            upload.FilePath = tstimag[j].FilePath;
                            ViewModel.Uploads.Add(upload);
                        }
                    }


                }

                ViewModel.ID = long.Parse(form["id"]);

                string appPath = AppDomain.CurrentDomain.BaseDirectory;
                DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);




                //if (file.ContentLength < 4048576)    we can check file size before saving if we need to restrict file size or we can check it on client side as well
                //{

                if (file != null)
                {
                    file.SaveAs(Server.MapPath(upload.FilePath));
                    // ViewModel.Uploads.Add(upload);
                    Session["Uploads"] = ViewModel;
                }
                return PartialView("~/Views/OrderMeasurement/_AttachmentPartial.cshtml", ViewModel.Uploads);
            }

            // return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);

        }

        public JsonResult CheckShipPlanDetails(string order_no, int Styleid)
        {

            return Json(BuyOrdobj.GetDataCheckShipPlanDetails(order_no, Styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult CheckStlyeNo(int Styleid, string order_no)
        {
            return Json(BuyOrdobj.GetDataCheckStyle(Styleid, order_no), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStlyeImglist()
        {
            return Json(BuyOrdobj.GetStlyeImglist(), JsonRequestBehavior.AllowGet);
        }


        //public JsonResult GetStyleItem(int Styleid)
        //{
        //    return Json(BuyOrdobj.GetStyleItemInfo(Styleid), JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetStylerowidDetails(string order_no, int Styleid)
        {

            return Json(BuyOrdobj.GetStylerowidDetails(order_no, Styleid), JsonRequestBehavior.AllowGet);

        }
    }
}
