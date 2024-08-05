using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class TrimsController : Controller
    {
        //
        // GET: /Trims/
        ITrimsAccessoryBusiness TrimsDet = new TrimsAccessoryBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult TrimsIndex()
        {
            LoadRights();
            return View();
        }


        public void LoadRights()
        {
            try
            {
                ViewBag.TrimsAddFlg = "disabled";
                ViewBag.TrimsUpdateFlg = "disabled";
                ViewBag.TrimsDeleteFlg = "disabled";
                ViewBag.TrimsPrintFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.TrimsAddFlg = "";
                    ViewBag.TrimsPrintFlg = "";
                    ViewBag.TrimsUpdateFlg = "";
                    ViewBag.TrimsDeleteFlg = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                    {
                        menu = MenuNumber.MenuPlanTrims;
                        var res = roleobj.GetRolebyId(roleid, menu, 0);
                        var ret = res.Value.RoleDetList.ToList();

                        if (ret[0].AddFlg == 1)
                        {
                            ViewBag.TrimsAddFlg = "";
                        }
                        if (ret[0].EditFlg == 1)
                        {
                            ViewBag.TrimsUpdateFlg = "";
                        }
                        if (ret[0].DelFlg == 1)
                        {
                            ViewBag.TrimsDeleteFlg = "";
                        }
                        if (ret[0].PrintFlg == 1)
                        {
                            ViewBag.TrimsPrintFlg = "";
                        }
                    }
                }
            }
            catch (Exception e) { 
            
            }
        }


        public JsonResult GetJobOrder(string OrderNo)
        {
            return Json(TrimsDet.GetTrimsDetails(OrderNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrimsSizeDet(string OrderNo, int ItemId, int StyleId)
        {
            var getTrimsSizeDetails = TrimsDet.GetTrimsSizeDetails(OrderNo, StyleId, ItemId);
            return Json(getTrimsSizeDetails, JsonRequestBehavior.AllowGet);
            //return Json(TrimsDet.GetTrimsSizeDetails(OrderNo, StyleId, ItemId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrimsStyleDet(string OrderNo, int ItemId, int StyleId, int AccItemId)
        {
            return Json(TrimsDet.GetTrimsStyleDetails(OrderNo, StyleId, ItemId, AccItemId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrimsColorDet(string OrderNo, int ItemId, int StyleId)
        {
            var getTrimsColorDetails = TrimsDet.GetTrimsColorDetails(OrderNo, StyleId, ItemId);
            return Json(getTrimsColorDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Add Mode for Ship(Header)
        public JsonResult GetAccShipDetail(string type, string OrderNo, int ItemId, int StyleId)
        {
            var getTrimsColorDetails = TrimsDet.GetAccShipmentDet(type, OrderNo, ItemId, StyleId);
            return Json(getTrimsColorDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Add Mode for Color-Ship
        public JsonResult GetAccShipColorDetail(string type, string OrderNo, int ItemId, int StyleId)
        {
            var getTrimsColorDetails = TrimsDet.GetAccShipColorDetails(type, OrderNo, StyleId, ItemId);
            return Json(getTrimsColorDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Edit Mode for General
        public JsonResult GetTrimsGeneralDetForEdit(string ApplyType, string OrderNo, int ItemId, int StyleItemid, int Styleid, int PlanTypeId)
        {
            var getTrimsGeneralDetails = TrimsDet.GetTrimsGeneralForEdit(ApplyType, OrderNo, ItemId, StyleItemid, Styleid, PlanTypeId);
            return Json(getTrimsGeneralDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Edit Mode for Colour
        public JsonResult GetTrimsColorDetForEdit(string OrderNo, int ItemId, int StyleItemid, int Styleid, int PlanType, string applytype)
        {
            var getTrimsColorDetails = TrimsDet.GetTrimsColorDetailsForEdit(OrderNo, ItemId, StyleItemid, Styleid, PlanType, applytype);
            return Json(getTrimsColorDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Edit Mode for Size
        public JsonResult GetTrimsSizeDetForEdit(string OrderNo, int ItemId, int Styleid, int PlanType, int applyid, int StyleItemid)
        {
            var getTrimsSizeDetails = TrimsDet.GetTrimsSizeDetailsForEdit(OrderNo, ItemId, Styleid, PlanType, applyid, StyleItemid);
            return Json(getTrimsSizeDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Edit Mode for Style
        public JsonResult GetTrimsStyleDetForEdit(string OrderNo, int ItemId, int Styleid,int StyleItemid)
        {
            var getTrimsStyleDetails = TrimsDet.GetTrimsStyleDetailsForEdit(OrderNo, ItemId, Styleid, StyleItemid);
            return Json(getTrimsStyleDetails, JsonRequestBehavior.AllowGet);
        }

        //Trims Edit Mode for General-Auto
        public JsonResult GetTrimsGeneralForEdit(string OrderNo, int ItemId, int Styleid, int StyleItemid)
        {
            var getTrimsStyleDetails = TrimsDet.GetTrimsStyleDetailsForEdit(OrderNo, ItemId, Styleid, StyleItemid);
            return Json(getTrimsStyleDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUombyItem(int ID)
        {
            return Json(TrimsDet.GetUom(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Getloadedit(int ID)
        {
            return Json(TrimsDet.Getloadedit(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccReqId(AccessoryReqMas objdet)
        {
            return Json(TrimsDet.GetAccReqInfo(objdet), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccReqMasandDet(int ID)
        {
            return Json(TrimsDet.GetAccReqMasDet(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccReqDet(int ID)
        {
            return Json(TrimsDet.GetAccReqColorSizeDet(ID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //public JsonResult Add(List<AccessoryReqMas> AccReqMas, List<AccessoryReqDet> ComboColorList, List<AccessoryReqDet> ComboSizeList, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid)
        public JsonResult Add(AccessoryReqMas objTrim)
        {
            var result = TrimsDet.CreateAccessories(objTrim.Allowance, objTrim.quantity, objTrim.AccReqMas, objTrim.ComboShipList, objTrim.ComboColorList, objTrim.ComboSizeList, objTrim.ComboStyleList, objTrim.OrderNo, objTrim.EntryDate, objTrim.StyleId, objTrim.BuyOrdMasId, objTrim.ItemId, objTrim.AccColorID, objTrim.AccSizeID, objTrim.Mode, objTrim.PlanId, objTrim);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddStyleTemplate(string OrderNo, int Styleid, string StyleName)
        {
            var result = TrimsDet.CreateStyleTemplate(OrderNo, Styleid, StyleName);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddStyleTemplateTrims(AccessoryReqMas objTrim)
        {
            var result = TrimsDet.CreateStyleTemplateAcc(objTrim.Allowance, objTrim.quantity, objTrim.OrderNo, objTrim.EntryDate, objTrim.StyleId, objTrim.BuyOrdMasId, objTrim.ItemId, objTrim.AccColorID, objTrim.AccSizeID, objTrim.Mode, objTrim.PlanId, objTrim);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ColorList()
        {
            var getDetails = TrimsDet.GetColor().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SizeList()
        {
            var getDetails = TrimsDet.GetSize().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult FabSizeList()
        {
            var getDetails = TrimsDet.GetFabSize().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetItemList(string OrderNo, int StyleId, int Itemid)
        {
            var getDetails = TrimsDet.GetAccorPacDet(OrderNo, StyleId, Itemid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(AccessoryReqMas ObjPSeq)
        {
            return Json(TrimsDet.UpdateAccessories(ObjPSeq), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID, string orderno, int styleid, List<TrimsColorDetails> ComboColor, List<TrimsSizeDetails> ComboSize, List<TrimsStyleDetails> ComboStyle, int Mode, int PlanId, List<TrimsGenAuto> Genauto, List<TrimsGenAuto> GenManual,List<TrimsGenAuto>GenShip)
        {
            return Json(TrimsDet.DeleteAccessories(ID, orderno, styleid, ComboColor, ComboSize, ComboStyle, Mode, PlanId, Genauto, GenManual, GenShip), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrossCheckingBOM(string orderno, int styleid, int itemid, int PlanTypeId, string ApplyType)
        {
            return Json(TrimsDet.TrimsBOMAppChecking(orderno, styleid, itemid, PlanTypeId, ApplyType));
        }

        public JsonResult CheckItemDetails(string orderno, int StyleId, int Itemid, int CAItemId, int ApplyID, string AutoOrMan)
        {
            return Json(TrimsDet.GetCheckItemDetails(orderno, StyleId, Itemid, CAItemId, ApplyID, AutoOrMan), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadordtemp(string OrderNo, int StyleId, int Itemid, int Userid,int Stytempid)
        {
            var result = TrimsDet.Loadordtemp(OrderNo, StyleId, Itemid, Userid, Stytempid);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckPlanTrimOrdTempDetails(string OrderNo, int StyleId, int Itemid, int CAItemId)
        {
            return Json(TrimsDet.GetDataCheckPlanTrimTempDetails(OrderNo, StyleId, Itemid, CAItemId), JsonRequestBehavior.AllowGet);
        }
    }
}
