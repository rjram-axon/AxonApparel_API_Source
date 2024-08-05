using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Common;
namespace AxonApparels.Controllers.OrderProcessing
{
    public class SampleOrderController : Controller
    {
        //
        // GET: /SampleOrder/
        IRoleBusiness roleobj = new RoleBusiness();


        public ActionResult SampleOrderIndex()
        {
            ListDetailsMain("Ord");
            return View();
        }


        public void ListDetailsMain( string OrderType)
        {
            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.OrderAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OrderAddFlg = "true";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (OrderType == "Ord")
                        {
                            menu = MenuNumber.MenuBulkOrder;
                        }
                        else if (OrderType == "Sty")
                        {
                            menu = MenuNumber.MenuOrderStyle;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OrderAddFlg = "";
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

            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
              //  return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

    }
}
