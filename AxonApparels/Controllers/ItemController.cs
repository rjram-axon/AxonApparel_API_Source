using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class ItemController : Controller
    {
        IItemBusiness itemobj = new ItemBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        
        //
        // GET: /Item/

        public ActionResult ItemIndex()
        {
            Item im = new Item();
            List(im);
            return View();
        }

        public JsonResult GetShift()
        {
            return Json(itemobj.GetShift(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItem()
        {
            return Json(itemobj.GetDropItem(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetComponent()
        {
            return Json(itemobj.GetComponent(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFabric()
        {
            return Json(itemobj.GetFabric(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetYarn()
        {
            return Json(itemobj.GetYarn(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHsn()
        {
            return Json(itemobj.GetHsn(), JsonRequestBehavior.AllowGet);
        }
            

        [HttpPost]
        public JsonResult Add(Item Spm)
        {
            var result = itemobj.CreateItem(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            return Json(itemobj.GetItemId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFID(string[] FIG)
        {
            return Json(itemobj.GetFItemId(FIG), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Update(Item Spm)
        {
            return Json(itemobj.UpdateItem(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccessoryItem()
        {
            return Json(itemobj.GetAccessoryItem(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetGeneralItem()
        {
            return Json(itemobj.GetGeneralItem(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGarmentItem()
        {
            return Json(itemobj.GetGarmentItem(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(itemobj.DeleteItem(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult List(Item itm)
        {

            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                string str = null;
                var result = itemobj.GetItem();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                {
                    str = GenRights.GenerateRights(roleid, MenuNumber.MenuItem, "'{0}','{1}','{2}'",SUser);
                    string[] StrArr = str.Split('$');
                    ViewBag.ItemAddFlg = StrArr[0];
                    str = StrArr[1];

                    foreach (var itemoj in result.Value)
                    {

                        sb.AppendFormat(str, itemoj.Itemid, itemoj.ItemName , itemoj.IsActive);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }



            //var getDetails = itemobj.GetItem().Value.ToList();
            //var jsonResult = Json(getDetails, JsonRequestBehavior.AllowGet);
            //jsonResult.MaxJsonLength = int.MaxValue;
            //return jsonResult;
        }
        public JsonResult GetItemRefDetails(int Itemid)
        {
            var getDetails = itemobj.GetItemCheckItemDetails(Itemid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGstDetails(string HSNCODE)
        {
            return Json(itemobj.GetDataGetGstDetails(HSNCODE), JsonRequestBehavior.AllowGet);
        }
       
       
        public JsonResult GetItembygrpid(string Itemgrpid)
        {
            var getDetails = itemobj.GetItembygrpid(Itemgrpid).Value;
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
