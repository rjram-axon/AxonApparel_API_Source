using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
using System.Net;

namespace AxonApparels.Controllers.UserEntryLog
{
    public class UserEntryLogController : Controller
    {
        
        IUserEntryLogBusiness entrylogbus = new UserEntryLogBusiness();
        //
        // GET: /RightsMain/
        public string IPadd="";
        public ActionResult UserEntryLogIndex()
        {
            return View();
        }
        public JsonResult GetIPaddress()
        {
            string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.UserHostAddress;
                }
            }
            Session["IPaddress"] = ipAddress;
            IPadd = ipAddress;
            return Json(ipAddress, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetComputerName()
        {

            string machinename = "";

            //string strUserAgent = Request.UserAgent.ToString().ToLower();
            //if (strUserAgent != null)
            //{
            //    if (Request.Browser.IsMobileDevice == true || strUserAgent.Contains("iphone") ||
            //        strUserAgent.Contains("blackberry") || strUserAgent.Contains("mobile") ||
            //        strUserAgent.Contains("windows ce") || strUserAgent.Contains("opera mini") ||
            //        strUserAgent.Contains("palm"))
            //    {
            //        GetIPaddress();
            //        machinename = "Mobile_device - " + IPadd;
            //        //Session["Machinename"] = machinename;
            //    }
            //    else
            //    {
            //        machinename = Dns.GetHostEntry(Request.ServerVariables["REMOTE_ADDR"]).HostName;
            //        if (string.IsNullOrEmpty(machinename))
            //        {
            //            machinename = System.Environment.MachineName;
            //        }
            //        //Session["Machinename"] = machinename.ToString();
            //    }
            //}
            //else
            //{
            //    //string macninename = System.Net.Dns.GetHostByName();
            //    machinename = Dns.GetHostEntry(Request.ServerVariables["REMOTE_ADDR"]).HostName;
            //    if (string.IsNullOrEmpty(machinename))
            //    {
            //        machinename = System.Environment.MachineName;
            //    }

            //}
            //if (string.IsNullOrEmpty(machinename)) {

            string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.UserHostAddress;
                }
            }

            machinename = ipAddress;

            //}
            Session["Machinename"] = machinename;
            return Json(machinename, JsonRequestBehavior.AllowGet);
        }
            [HttpPost]
        public JsonResult ListUserEntryLog(int userid, string modulename, string entryname, string machinename,
            string machineip, string entrymode, string FromEntryDate, string ToEntryDate, string entryno)
        {

            try
            {

                var result = entrylogbus.GetEntryLogList(userid, modulename, entryname, machinename, machineip, entrymode,
                                                         FromEntryDate, ToEntryDate, entryno);
                return Json(result, JsonRequestBehavior.AllowGet);
                //StringBuilder sb = new StringBuilder();
                //var result = entrylogbus.GetEntryLogList(userid, modulename, entryname, machinename, machineip, entrymode,
                //                                         FromEntryDate, ToEntryDate, entryno);
                //if (result == null)
                //    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                //foreach (User_Entry_Log entryloglist in result.Value)
                //{

                //    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}',],", entryloglist.EntryLogid, entryloglist.UserID, entryloglist.EntryNo, entryloglist.EntryDate, entryloglist.EntryMode, entryloglist.UserName, entryloglist.ModuleName, entryloglist.EntryName, entryloglist.MachineName, entryloglist.MachineIP);

                //}

                //string tableValue = sb.ToString();
                //tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


    
        public JsonResult Add(User_Entry_Log entrylogdet)
        {

            if (String.IsNullOrEmpty(entrylogdet.MachineIP))
            {
                string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                    if (string.IsNullOrEmpty(ipAddress))
                    {
                        ipAddress = Request.UserHostAddress;
                    }
                }
                
                entrylogdet.MachineIP = ipAddress;
            }
            if (String.IsNullOrEmpty(entrylogdet.MachineName))
            {
                string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                    if (string.IsNullOrEmpty(ipAddress))
                    {
                        ipAddress = Request.UserHostAddress;
                    }
                }

                entrylogdet.MachineName = ipAddress;
            }

            var result = entrylogbus.Add(entrylogdet);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDDLdet()
        {
            var result = entrylogbus.GetDDLdet();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUsername()
        {
            var result = entrylogbus.GetUsername();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPopupAlert()
        {
            //var result = entrylogbus.GetPopupAlert();
            //return Json(result,JsonRequestBehavior.AllowGet);
            return Json(entrylogbus.GetPopupAlert(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdatePopupStatus(Popup_Alert obj)
        {
            var result = entrylogbus.PopupStatusUpdate(obj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddPopupAlert(Popup_Alert obj)
        {
            var result = entrylogbus.AddPopupAlert(obj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }

}