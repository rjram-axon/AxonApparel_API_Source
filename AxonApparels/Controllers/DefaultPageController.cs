
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.IO;
using System.Net.Mime;
//using Ionic.Zip;
using System.IO.Compression;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;
using System.Drawing;
using System.Drawing.Drawing2D;
namespace AxonApparels.Controllers
{
    public class DefaultPageController : Controller
    {
        //
        // GET: /DefaultPage/

        IOrderDashBusiness OrdDashBus = new OrderDashBusiness();
        IBuyOrderStyleBusiness BuyOrdobj = new BuyOrdStyleBusiness();
       // [OutputCache(Duration = 300, VaryByParam = "none")]
        public ActionResult DefaultPage()
        {
            List<AxonApparel.Domain.BuyOrdImg> list = new List<AxonApparel.Domain.BuyOrdImg>();
            list = BuyOrdobj.GetStlyeImglist().Value.ToList();
            return View(list);

            //return View();
        }
        //Dashboard - Users
        [WebMethod]
        public JsonResult LoadDashboard()
        {
            var getDetails = OrdDashBus.GetOrderBalBuss().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        [WebMethod]
        public JsonResult LoadDashboardRunDetails()
        {
            var getDetails = OrdDashBus.GetOrderRunBuss().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadChatUsers(int FromUserId)
        {
            return Json(OrdDashBus.LoadChatUsers(FromUserId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadChatUsers_NewMessage(int FromUserId)
        {
            return Json(OrdDashBus.LoadChatUsers_NewMessage(FromUserId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadChatUsers_GetNewMessageCount(int FromUserId)
        {
            return Json(OrdDashBus.LoadChatUsers_GetNewMessageCount(FromUserId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadChatMsg(int FromUserId, int ToUserId)
        {
            return Json(OrdDashBus.LoadChatMsg(FromUserId, ToUserId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadAllMsg(int FromUserId)
        {
            return Json(OrdDashBus.LoadAllMsg(FromUserId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_IsRead(OrderDash MasEntry)
        {
            var result = OrdDashBus.Update_IsRead(MasEntry);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(OrderDash str)
        {
            var result = OrdDashBus.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult OrderDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderDetBuss(frmDate, ToDate);
                var result1 = OrdDashBus.GetOrderDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string SDrill = ""; string OrderNo1 = ""; string NProcess = "";



                foreach (OrderDash Countrymode in result.Value)
                {
                    var OrdNo = Countrymode.OrderNo;

                    OrderNo += "{name:\"" + Countrymode.OrderNo + "\",y: " + Countrymode.OPerCent + ",drilldown:\"" + Countrymode.OrderNo + "\"},";
                    string Process = "";

                    foreach (OrderDash Countrymode1 in result1.Value)
                    {

                        if (OrdNo == Countrymode1.OrderNo)
                        {

                            if (SDrill != Countrymode1.OrderNo || NProcess != Countrymode1.Process)
                            {
                                Process += "[\"" + Countrymode1.Process + "\"," + Countrymode1.DPerCent + "],";

                            }
                            SDrill = Countrymode1.OrderNo;
                            NProcess = Countrymode1.Process;
                        }
                    }
                    OrderNo1 += "{name:\"" + Countrymode.OrderNo + "\",id: \"" + Countrymode.OrderNo + "\",data:[" + Process + "]},";
                }



                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);


            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult StyleOrderDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderStyleDetBuss(frmDate, ToDate);
                var result1 = OrdDashBus.GetOrderStyleDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string SDrill = ""; string OrderNo1 = ""; string NProcess = ""; string Process = "";



                foreach (OrderDash Countrymode in result.Value)
                {
                    var OrdNo = Countrymode.stlye;

                    //OrderNo += [" + Countrymode.stlye + "];

                    //OrderNo += OrdNo + ",";

                    //OrderNo += OrdNo + ",";

                    //string title = "\"The \u00C6olean Harp\", by Samuel Taylor Coleridge";

                    OrderNo += "\'" + OrdNo + "\',";
                    // OrderNo += dSet.Tables[0].Rows[i]["TopCount"] + ",";


                }

                int len = result1.Value.Count();
                string[] ary = new string[len];
                int i = 0;
                foreach (OrderDash Countrymode2 in result1.Value)
                {
                    Process = "";
                    if (i == 0)
                    {
                        foreach (OrderDash Countrymode1 in result1.Value)
                        {
                            if (Countrymode2.stlye == Countrymode1.stlye)
                            {
                                Process += Countrymode1.DStyleQty + ",";
                            }
                        }
                        ary[i] = Countrymode2.stlye;
                    }
                    else
                    {
                        foreach (OrderDash Countrymode1 in result1.Value)
                        {
                            foreach (string sty1 in ary)
                            {
                                if (sty1 != null)
                                {
                                    if (sty1 != Countrymode1.stlye && sty1 != Countrymode2.stlye)
                                    {
                                        if (Countrymode2.stlye == Countrymode1.stlye)
                                        {
                                            int chk = 0;
                                            foreach (string sty2 in ary)
                                            {
                                                if (sty2 == Countrymode1.stlye &&chk == 0) {
                                                    chk = 1;
                                                }
                                            }
                                            if (chk == 0)
                                            {

                                                Process += Countrymode1.DStyleQty + ",";
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (Process != "")
                    {
                        ary[i] = Countrymode2.stlye;
                        OrderNo1 += "{name:\'" + ary[i] + "\',data:[" + Process + "]},";
                    }
                    i++;
                    //OrderNo1 += "{name:\'" + Countrymode2.stlye + "\',data:[" + Process + "]},";
                }
                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult BuyOrderDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderBuyDetBuss(frmDate, ToDate);
                var result1 = OrdDashBus.GetOrderBuyDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string OrderNo1 = "";



                foreach (OrderDash Countrymode in result.Value)
                {
                    var buyer = Countrymode.Buyer;
                    OrderNo += "\'" + buyer + "\',";
                    string Process = "";

                    foreach (OrderDash Countrymode1 in result1.Value)
                    {

                        if (buyer == Countrymode1.Buyer)
                        {
                            Process += Countrymode1.BuyQty + ",";
                        }
                    }
                    OrderNo1 += "{name:\'" + Countrymode.Buyer + "\',data:[" + Process + "]},";

                }

                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);


            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult YarnStockDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderYarnDetBuss(frmDate, ToDate);
                var result1 = OrdDashBus.GetOrderYarnDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string OrderNo1 = "";


                foreach (OrderDash Countrymode in result.Value)
                {
                    var OrdNo = Countrymode.Item;

                    //OrderNo += [" + Countrymode.stlye + "];

                    //OrderNo += OrdNo + ",";

                    //OrderNo += OrdNo + ",";

                    //string title = "\"The \u00C6olean Harp\", by Samuel Taylor Coleridge";

                    OrderNo += "\'" + OrdNo + "\',";
                    // OrderNo += dSet.Tables[0].Rows[i]["TopCount"] + ",";


                }

                foreach (OrderDash Countrymode1 in result1.Value)
                {

                    //if (Item == Countrymode1.Item)
                    //{
                    //    Process += Countrymode1.BuyQty + ",";
                    //}

                    OrderNo1 += "{name:\'" + Countrymode1.Item + "\',y:  " + Countrymode1.ItmStkQty + " },";
                }
                //OrderNo1 += "{name:\'" + Countrymode.Buyer + "\',data:[" + Process + "]},";

                //OrderNo1 += "{name:\'" + Countrymode.Item + "\',id: \"" + Countrymode.ItmStkQty + "\"},";

                //}

                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);


            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult OrderWiseStockDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderWiseDetBuss(frmDate,ToDate);
                var result1 = OrdDashBus.GetOrderWiseDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string SDrill = ""; string OrderNo1 = ""; string NProcess = "";



                foreach (OrderDash Countrymode in result.Value)
                {
                    var OrdNo = Countrymode.OrderNo;

                    OrderNo += "{name:\"" + Countrymode.OrderNo + "\",y: " + Countrymode.OrdStkQty + ",drilldown:\"" + Countrymode.OrderNo + "\"},";
                    string Process = "";

                    foreach (OrderDash Countrymode1 in result1.Value)
                    {

                        if (OrdNo == Countrymode1.OrderNo)
                        {

                            if (SDrill != Countrymode1.OrderNo || NProcess != Countrymode1.OrdStkItem)
                            {
                                Process += "[\"" + Countrymode1.OrdStkItem + "\"," + Countrymode1.OrdStkQty + "],";

                            }
                            SDrill = Countrymode1.OrderNo;
                            NProcess = Countrymode1.OrdStkItem;
                        }
                    }
                    OrderNo1 += "{name:\"" + Countrymode.OrderNo + "\",id: \"" + Countrymode.OrderNo + "\",data:[" + Process + "]},";
                }



                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);


            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult OrderDesDetails(string frmDate, string ToDate)
        {

            try
            {

                var result = OrdDashBus.GetOrderDesDetBuss(frmDate, ToDate);
                var result1 = OrdDashBus.GetOrderDesDetBussDet(frmDate, ToDate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                if (result1 == null || result1.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string OrderNo = ""; string SDrill = ""; string OrderNo1 = ""; string NProcess = ""; string Process = "";



                foreach (OrderDash Countrymode in result.Value)
                {
                    var OrdNo = Countrymode.RefNo;

                    //OrderNo += [" + Countrymode.stlye + "];

                    //OrderNo += OrdNo + ",";

                    //OrderNo += OrdNo + ",";

                    //string title = "\"The \u00C6olean Harp\", by Samuel Taylor Coleridge";

                    OrderNo += "\'" + OrdNo + "\',";
                    // OrderNo += dSet.Tables[0].Rows[i]["TopCount"] + ",";


                }

                int len = result1.Value.Count();
                string[] ary = new string[len];
                int i = 0;
                foreach (OrderDash Countrymode2 in result1.Value)
                {
                    Process = "";
                    if (i == 0)
                    {
                       
                        foreach (OrderDash Countrymode1 in result1.Value)
                        {
                            //if (Countrymode2.RefNo == Countrymode1.RefNo)
                            //{
                            Process += Countrymode1.TotProdRunQty + ",";
                            // }
                        }
                        if (Process != "")
                        {
                            ary[i] = Countrymode2.RefNo;
                            OrderNo1 += "{name:\'" + "OD QTY" + "\',data:[" + Process + "]},";
                        }

                        Process = "";
                        foreach (OrderDash Countrymode1 in result1.Value)
                        {
                            //if (Countrymode2.RefNo == Countrymode1.RefNo)
                            //{
                            Process += Countrymode1.TotDesQty + ",";
                            // }
                        }
                        if (Process != "")
                        {
                            ary[i] = Countrymode2.RefNo;
                            OrderNo1 += "{name:\'" + "DIS QTY" + "\',data:[" + Process + "]},";
                        }
                        Process = "";
                        foreach (OrderDash Countrymode1 in result1.Value)
                        {
                            //if (Countrymode2.RefNo == Countrymode1.RefNo)
                            //{
                            Process += Countrymode1.TotBalQty + ",";
                            // }
                        }
                        if (Process != "")
                        {
                            ary[i] = Countrymode2.RefNo;
                            OrderNo1 += "{name:\'" + "BAL QTY" + "\',data:[" + Process + "]},";
                        }
                    }
                        //ary[i] = Countrymode2.RefNo;
                   // }
                    //else
                    //{
                    //    foreach (OrderDash Countrymode1 in result1.Value)
                    //    {
                    //        foreach (string sty1 in ary)
                    //        {
                    //            if (sty1 != null)
                    //            {
                    //                if (sty1 != Countrymode1.RefNo && sty1 != Countrymode2.RefNo)
                    //                {
                    //                    if (Countrymode2.RefNo == Countrymode1.RefNo)
                    //                    {
                    //                        int chk = 0;
                    //                        foreach (string sty2 in ary)
                    //                        {
                    //                            if (sty2 == Countrymode1.RefNo && chk == 0)
                    //                            {
                    //                                chk = 1;
                    //                            }
                    //                        }
                    //                        if (chk == 0)
                    //                        {

                    //                            Process += Countrymode1.TotBalQty + ",";
                    //                        }

                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    //}

                    //if (Process != "")
                    //{
                    //    ary[i] = Countrymode2.RefNo;
                    //    OrderNo1 += "{name:\'" + ary[i] + "\',data:[" + Process + "]},";
                    //}
                    i++;
                    //OrderNo1 += "{name:\'" + Countrymode2.stlye + "\',data:[" + Process + "]},";
                }
                return Json("[" + OrderNo1.Substring(0, OrderNo1.Length - 1) + "]" + "##[" + OrderNo.Substring(0, OrderNo.Length - 1) + "]", JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }
    }
}
