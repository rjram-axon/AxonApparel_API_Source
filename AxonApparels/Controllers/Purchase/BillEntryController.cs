using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class BillEntryController : Controller
    {
        //
        // GET: /BillEntry/
        IBillEntryBusiness Bobj = new BillEntryBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult BillEntryIndex()
        {
            List(0, 0, "", "", "", "","E");
            return View();
        }
        public JsonResult Add(BillEntry str)
        {
            var result = Bobj.Create(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BillEntry str)
        {
            return Json(Bobj.Update(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getdet(int billid)
        {

            return Json(Bobj.Getdata(billid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(int id)
        {
            return Json(Bobj.Delete(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult List(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate,string SuppType)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.BillsAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.BillsAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                            menu = MenuNumber.MenuBills;
                      

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.BillsAddFlg = "";
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
                var result = Bobj.GetDataMainList(companyId, suppid, billno, ordtype, fromDate, todate, SuppType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BillEntry App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.BillID, App.company, App.supplier, App.BillNo, App.BillDate, App.SupBillNo, App.department);

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
        public JsonResult Listdet(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate, string SuppType)
        {
            return Json(Bobj.GetDataMainList(companyId, suppid, billno, ordtype, fromDate, todate, SuppType), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Listddldet(int? companyId)
        {
            return Json(Bobj.Listddldet(companyId), JsonRequestBehavior.AllowGet);

        }
    }
}
