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
    public class FabricMasterController : Controller
    {
        //
        // GET: /FabricMaster/
        IFabricMasterBusiness FabricMasobj = new FabricMasterBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult FabricMasterIndex()
        {
            GetFabricMainDetails();
            return View();
        }

        public JsonResult Add(FabricMaster opj)
        {
            var result = FabricMasobj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(FabricMaster opj)
        {
            var result = FabricMasobj.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(FabricMaster opj)
        {
            var result = FabricMasobj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetFabricmasDetails(int Id)
        {
            return Json(FabricMasobj.GetFabricmasDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFabricEditDetails(int Id)
        {
            return Json(FabricMasobj.GetFabricEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFabricyarnEditDetails(int Id)
        {
            return Json(FabricMasobj.GetFabricyarnEditDetails(Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFabricprocessEditDetails(int Id)
        {
            return Json(FabricMasobj.GetFabricprocessEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFabricMainDetails()
        {
            ViewBag.FabricMasAddFlg = "disabled";
            ViewBag.FabricMasEditFlg = "disabled";
            ViewBag.FabricMasDeleteFlg = "disabled";
            ViewBag.FabricMasPrintFlg = "disabled";

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.FabricMasAddFlg = "";
                ViewBag.FabricMasEditFlg = "";
                ViewBag.FabricMasDeleteFlg = "";
                ViewBag.FabricMasPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuFabricMaster;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.FabricMasAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.FabricMasEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.FabricMasDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.FabricMasPrintFlg = "";
                }
            }


            return Json(FabricMasobj.GetFabricMainDetails(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFabricdetfromyarn(int itemid,int colorid,int sizeid)
        {
            return Json(FabricMasobj.GetFabricdetfromyarn(itemid, colorid, sizeid), JsonRequestBehavior.AllowGet);
        }


    }
}
