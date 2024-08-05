using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
using AxonApparel.Business;

namespace AxonApparel.Business
{
    public class GenerateRightsBusiness : IGenerateRightsBusiness
    {
        IRoleBusiness RoleObj = new RoleBusiness();

        public string GenerateRights(int RoleId, int Mnuname, string noofColumns, string suser)
        {
            string str1 = null;

            //var firstName = Session["FirstName"];

            string SUPERUSER = suser;

            //int roleid = Convert.ToInt16(Session["RoleId"]);
            if (RoleId != null)
            {
                Role res = new Role();
                if (SUPERUSER != "superuser")
                {
                    var ret = RoleObj.GetRolebyId(RoleId, Mnuname, 0);
                     res = ret.Value; 
                }
                else
                {

                    var RolObj = RoleObj.GetRolebyIdAll(RoleId);
                     res = RolObj.Value;
                }

                if (res != null)
                {
                    //foreach (var list in res.RoleDetList)
                    //{
                    foreach (var list in res.RoleDetList)
                    {
                        //var 
                        if (list.MenuId == Mnuname)
                        {

                            if (list.AddFlg == 0)
                            {
                                str1 = "false$";
                            }
                            else
                            {
                                str1 = "true$";
                            }
                            if (SUPERUSER == "superuser")
                            {
                                str1 = "true$";
                            }
                            str1 += "[" + noofColumns + ",'<a id=\" {0} \" ";

                            if (SUPERUSER == "superuser")
                            {
                                str1 += " onclick=\"return getbyID({0})\"  ";
                            }
                            else
                            {
                                if (list.EditFlg != 0)
                                {
                                    str1 += " onclick=\"return getbyID({0})\"  ";
                                }
                            }
                            str1 += "  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> " +
                                     " <button type=\"button\" id=\"btnEdit\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" ";

                            if (SUPERUSER != "superuser")
                            {

                                if (list.EditFlg == 0)
                                {
                                    str1 += " disabled=\"disabled\"  ";
                                }
                            }

                            // Delete option not required for Testing DC Receipt Approval and DC Cancel
                            if (list.MenuName != "Testing DC Approval" && list.MenuName != "Testing DC Cancel")
                            {
                                str1 += "style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>" +
                                    " <a id=\" {0} \" ";
                            }

                            if (SUPERUSER == "superuser" && list.MenuName != "Testing DC Approval" && list.MenuName != "Testing DC Cancel")
                            {
                                str1 += " onclick=\"return Delete({0})\" ";
                            }
                            else
                            {
                                if (list.DelFlg != 0 && list.MenuName != "Testing DC Approval" && list.MenuName != "Testing DC Cancel")
                                {
                                    str1 += " onclick=\"return Delete({0})\" ";
                                }
                            }
                            if (list.MenuName != "Testing DC Approval" && list.MenuName != "Testing DC Cancel")
                            {
                                str1 += " data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">" +
                                    " <button type=\"button\" id=\"btnDelete\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" ";
                            }
                            if (SUPERUSER != "superuser")
                            {

                                if (list.DelFlg == 0)
                                {
                                    str1 += " disabled=\"disabled\"  ";
                                }
                            }
                            //str1 += " style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],";
                            //str1 += " style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>";

                            //str1 += "style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>" +
                            //        " <a id=\" {0} \" ";

                            str1 += "style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>";
                                   

                            //Print Option

                            //if (SUPERUSER == "superuser")
                            //{
                            //    str1 += " onclick=\"return Print({0})\"  ";
                            //}
                            //else
                            //{
                            //    if (list.PrintFlg != 0)
                            //    {
                            //        str1 += " onclick=\"return Print({0})\"  ";
                            //    }
                            //}
                            //str1 += "  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> " +
                            //         " <button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" ";

                            //if (SUPERUSER != "superuser")
                            //{

                            //    if (list.PrintFlg == 0)
                            //    {
                            //        str1 += " disabled=\"disabled\"  ";
                            //    }
                            //}
                            //str1 += " style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\">  <i class=\"fa fa-print\"></i> </button></a>'],";

                            //View Option 
                            if (SUPERUSER == "superuser")
                            {
                                str1 += " <a id=\" {0} \" onclick=\"return getViewbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn-round btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"View Item\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-eye\"></i> </button></a> ";
                            }
                            else
                            {
                                if (list.PrintFlg != 0)
                                {
                                    str1 += " <a id=\" {0} \" onclick=\"return getViewbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn-round btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"View Item\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-eye\"></i> </button></a> ";
                                }
                            }

                            str1 += " '],";


                        }
                    }
                }
            }
            return str1;

        }
    }
}
