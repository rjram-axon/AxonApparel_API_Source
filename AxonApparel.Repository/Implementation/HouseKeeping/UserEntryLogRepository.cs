using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class UserEntryLogRepository : IUserEntryLogRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.User_Entry_Log> GetEntryLogList(int userid, string modulename, string entryname, string machinename,
                                                                 string machineip, string entrymode, string FromEntryDate, string ToEntryDate, string entryno)
        {
            //IQueryable<Domain.User_Entry_Log> query = (from cd in entities.Proc_Apparel_GetUserEntryLogDet(userid, modulename, entryname, 
            //                                               machinename, machineip, entrymode,FromEntryDate, ToEntryDate, entryno)
            //                                           select new Domain.User_Entry_Log
            //                                   {
            //                                       EntryLogid = cd.EntryLogid,
            //                                       ModuleName = cd.ModuleName,
            //                                       MachineName = cd.MachineName,
            //                                       MachineIP = cd.MachineIP,
            //                                       UserID = (int)cd.UserID,
            //                                       EntryNo = cd.EntryNo,
            //                                       EntryName = cd.EntryName,
            //                                       EntryMode = cd.EntryMode,
            //                                       EntryDate = cd.EntryDate,
            //                                       UserName=cd.UserName
            //                                   }).AsQueryable();
            //return query;

            List<Domain.User_Entry_Log> lstemployee = new List<Domain.User_Entry_Log>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetUserEntryLogDet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userid", userid);
                cmd.Parameters.AddWithValue("@modulename", modulename);
                cmd.Parameters.AddWithValue("@entryname", entryname);
                cmd.Parameters.AddWithValue("@machinename", machinename);
                cmd.Parameters.AddWithValue("@machineip", machineip);
                cmd.Parameters.AddWithValue("@entrymode", entrymode);
                cmd.Parameters.AddWithValue("@FromEntryDate", FromEntryDate);
                cmd.Parameters.AddWithValue("@ToEntryDate", ToEntryDate);
                cmd.Parameters.AddWithValue("@entryno", entryno);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.User_Entry_Log employee = new Domain.User_Entry_Log();
                    employee.EntryLogid = Convert.ToInt32(rdr["EntryLogid"]);
                    employee.ModuleName = rdr["ModuleName"].ToString();
                    employee.MachineIP = rdr["MachineIP"].ToString();
                    employee.MachineName = rdr["MachineName"].ToString();
                    employee.UserID = Convert.ToInt32(rdr["UserID"]);
                    employee.EntryNo = rdr["EntryNo"].ToString();
                    employee.EntryName = rdr["EntryName"].ToString();
                    employee.EntryMode = rdr["EntryMode"].ToString();
                    employee.UserName = rdr["UserName"].ToString();
                    employee.EntryDate = Convert.ToDateTime(rdr["EntryDate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Domain.User_Entry_Log> GetDDLdet()
        {
            //var query = (from YD in entities.Proc_Apparel_LoginUserEntryLog()
            //             select new Domain.User_Entry_Log
            //             {

            //                 EntryName = YD.EntryName,
            //                 EntryNo = YD.EntryNo,
            //                 MachineName = YD.MachineName,
            //                 ModuleName = YD.ModuleName,
            //                 UserID = YD.UserID,                    
            //             }).AsQueryable();
           
            //return query;

            List<Domain.User_Entry_Log> lstemployee = new List<Domain.User_Entry_Log>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_LoginUserEntryLog", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.User_Entry_Log employee = new Domain.User_Entry_Log();
                    employee.UserID = Convert.ToInt32(rdr["UserID"]);
                    employee.EntryName = rdr["EntryName"].ToString();
                    employee.MachineName = rdr["MachineName"].ToString();
                    employee.ModuleName = rdr["ModuleName"].ToString();
                    employee.EntryNo = rdr["EntryNo"].ToString();     
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.User_Entry_Log> GetUsername()
        {
            //var userdet = (from us in entities.Proc_Apparel_LoginGetUserEntryLogName
            //                  join uel in entities.User_Entry_Log on us.UserId equals uel.UserID
            //                  where us.UserId == uel.UserID
            //               select new Domain.User_Entry_Log {
            //                   UserID = us.UserId,
            //                   UserName=us.Username1
                           
            //               }).AsQueryable();
            //return userdet;
            //var userdet = (from YD in entities.Proc_Apparel_LoginGetUserEntryLogName()
            //             select new Domain.User_Entry_Log
            //             {
            //                 UserID = YD.UserID,
            //                 UserName = YD.Username,                            
            //             }).AsQueryable();

            //return userdet;

            List<Domain.User_Entry_Log> lstemployee = new List<Domain.User_Entry_Log>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_LoginGetUserEntryLogName", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.User_Entry_Log employee = new Domain.User_Entry_Log();
                    employee.UserID = Convert.ToInt32(rdr["UserID"]);
                    employee.UserName = rdr["Username"].ToString();                
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public bool Add(Domain.User_Entry_Log objEntry)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.User_Entry_Log emtrymas = new Repository.User_Entry_Log();
                    if (objEntry != null)
                    {

                        emtrymas.UserID = objEntry.UserID;
                        emtrymas.EntryLogid = objEntry.EntryLogid;
                        emtrymas.EntryDate = DateTime.Now;
                        emtrymas.EntryMode = objEntry.EntryMode;
                        emtrymas.EntryName = objEntry.EntryName;
                        emtrymas.EntryNo = objEntry.EntryNo;
                        emtrymas.MachineIP = objEntry.MachineIP;
                        emtrymas.MachineName = objEntry.MachineName;
                        emtrymas.ModuleName = objEntry.ModuleName;

                    }

                    var sid = entities.User_Entry_Log.Add(emtrymas);
                    entities.SaveChanges();

                   
                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-AddData");
                    return false;
                    throw ex;
                }
            }
        }
        public IEnumerable<Domain.Popup_Alert> GetPopupAlert()
        {

            //List<Domain.User_Entry_Log> lstemployee = new List<Domain.User_Entry_Log>();
            //using (SqlConnection con = new SqlConnection(connStr))
            //{
            //    SqlCommand cmd = new SqlCommand("Proc_Apparel_LoginUserEntryLog", con);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    con.Open();
            //    //SqlDataReader rdr = cmd.ExecuteReader();
            //    while (rdr.Read())
            //    {
            //        Domain.User_Entry_Log employee = new Domain.User_Entry_Log();
            //        employee.UserID = Convert.ToInt32(rdr["UserID"]);
            //        employee.EntryName = rdr["EntryName"].ToString();
            //        employee.MachineName = rdr["MachineName"].ToString();
            //        employee.ModuleName = rdr["ModuleName"].ToString();
            //        employee.EntryNo = rdr["EntryNo"].ToString();
            //        lstemployee.Add(employee);
            //    }
            //    con.Close();
            //}
            //return lstemployee;

            List<Domain.Popup_Alert> PopupAl = new List<Popup_Alert>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPopupAlertMsg", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader sda = cmd.ExecuteReader();
                while (sda.Read())
                {
                    Domain.Popup_Alert popup = new Domain.Popup_Alert();
                    popup.Id =Convert.ToInt32(sda["Id"]);
                    popup.Message = sda["Message"].ToString();
                    popup.Status =Convert.ToBoolean(sda["Status"]);
                    popup.Userid = Convert.ToInt32(sda["UserId"]);
                    popup.User = sda["Username"].ToString();
                    PopupAl.Add(popup);
                }
                con.Close();
            }
            return PopupAl;
        }
        public bool UpdatePopupAlertstatus(List<Popup_alert> obj)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var b in obj)
                    {
                        var P = entities.Proc_Apparel_UpdatePopupAlertStatus(b.Id);
                        entities.SaveChanges();
                    }
                    reserved = true;
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Popup_alert-UpdDetData");
                }
            }
            return reserved;
        }
        public bool AddPopupAlert(Domain.Popup_Alert obj)
        {
            
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.Popup_alert popup = new Repository.Popup_alert();
                    if (obj != null)
                    {
                        popup.Message=obj.Message;
                        popup.UserId = obj.Userid;
                        popup.Status = false;
                    }
                    var G = entities.Popup_alert.Add(popup);
                    entities.SaveChanges();

                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PopupAlert-AddData");
                    return false;
                    throw ex;
                }
            }
        }
    }
}
