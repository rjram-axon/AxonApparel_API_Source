using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Process
{
    public class ItemTransferController : Controller
    {
        //
        // GET: /ItemTransfer/
        IItemTransferBusiness obj = new ItemTransferBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult ItemTransferIndex()
        {
            LoadItemtransMainList(0, 0, 0, 0, "", "", "","","");
            return View();
        }
        [HttpPost]


        public JsonResult LoadItemtransList(int? compid, int? storeid, int? processid, int? itemid, int? colorid, int? sizeid, string ordtype, string Ordno, string jobno,
             string Transno, string Transtype, string Itemtype)
        {

            return Json(obj.LoadItemtransList(compid, storeid, processid, itemid, colorid, sizeid, ordtype, Ordno, jobno,
             Transno, Transtype, Itemtype), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItemtransMainList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate,string orderno,string refno)
        {

            // return Json(obj.LoadItemtransMainList(masid, compid, fromitemid, Toitemid, ordtype, frmdate, todate), JsonRequestBehavior.AllowGet);
            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ItemTransAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ItemTransAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)


                        menu = MenuNumber.MenuItemTransfer;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ItemTransAddFlg = "";
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
                var result = obj.LoadItemtransMainList(masid, compid, fromitemid, Toitemid, ordtype, frmdate, todate, orderno, refno).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ItemTransDet App in result)
                {

                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\"{0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnedit\" onclick=\"return getbyEditID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnremove\" onclick=\"return getbyDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GRNDelete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-times\" style=\"cursor: pointer;\"></i></button></a><button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Pur_Grn_Print({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.TransMasId, App.EntryNo, App.Companyid, App.Company, App.EntryDate, App.CreatedBy, App.User);


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
    
    }

        public JsonResult LoadItemtransMainDDLList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate)
        {
             return Json(obj.LoadItemtransMainList(masid, compid, fromitemid, Toitemid, ordtype, frmdate, todate, frmdate,  todate), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadItemtransEditList(int? masid)
        {

            return Json(obj.LoadItemtransEditList(masid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddItemtranfer(ItemTransMas Procobj)
        {
            var ProdMas = obj.AddItemtranfer(Procobj);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateItemtranfer(ItemTransMas Procobj)
        {
            var ProdMas = obj.UpdateItemtranfer(Procobj);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteItemtranfer(ItemTransMas Procobj)
        {
            var ProdMas = obj.DeleteItemtranfer(Procobj);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }
    }
}
