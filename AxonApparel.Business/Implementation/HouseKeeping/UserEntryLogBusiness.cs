using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;


namespace AxonApparel.Business
{
    public class UserEntryLogBusiness : IUserEntryLogBusiness
    {
        IUserEntryLogRepository userlogRep = new UserEntryLogRepository();

        public Response<IEnumerable<Domain.User_Entry_Log>> GetEntryLogList(int userid, string modulename, string entryname, string machinename,
            string machineip, string entrymode, string FromEntryDate, string ToEntryDate, string entryno)
        {
            try
            {
                var entrylogDetList = userlogRep.GetEntryLogList(userid, modulename, entryname, machinename, machineip, entrymode,
                                                         FromEntryDate, ToEntryDate, entryno);

                return new Response<IEnumerable<Domain.User_Entry_Log>>(entrylogDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.User_Entry_Log>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Add(Domain.User_Entry_Log entrylogdet)
        {

            var AddDet = new Domain.User_Entry_Log
            {
               
                       UserID = entrylogdet.UserID,
                        EntryLogid = entrylogdet.EntryLogid,
                        EntryDate = entrylogdet.EntryDate,
                        EntryMode = entrylogdet.EntryMode,
                        EntryName = entrylogdet.EntryName,
                        EntryNo = entrylogdet.EntryNo,
                        MachineIP = entrylogdet.MachineIP,
                        MachineName = entrylogdet.MachineName,
                        ModuleName = entrylogdet.ModuleName,
            };
            var result = userlogRep.Add(AddDet);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

        }

        public Response<IEnumerable<Domain.User_Entry_Log>> GetDDLdet()
        {
            try
            {
                var detList = userlogRep.GetDDLdet();

                return new Response<IEnumerable<Domain.User_Entry_Log>>(detList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.User_Entry_Log>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.User_Entry_Log>> GetUsername()
        {
            try
            {
                var detList = userlogRep.GetUsername();

                return new Response<IEnumerable<Domain.User_Entry_Log>>(detList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.User_Entry_Log>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.Popup_Alert>> GetPopupAlert()
        {
            try
            {
                var detList = userlogRep.GetPopupAlert();
                return new Response<IEnumerable<Popup_Alert>>(detList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Popup_Alert>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<bool> PopupStatusUpdate(Domain.Popup_Alert obj)
        {
            var list = new List<Popup_alert>();

            foreach (var ls in obj.PopupAlert)
            {
                list.Add(new Popup_alert
                {
                    Id=ls.Id,
                });
            }
            var result = userlogRep.UpdatePopupAlertstatus(list);

            return new Response<bool>(result, Status.SUCCESS, "Update Successfully...");
        }
        public Response<bool> AddPopupAlert(Domain.Popup_Alert obj)
        {
            var AddDet = new Domain.Popup_Alert
            {
                Message=obj.Message,
                Userid=obj.Userid,
            };
            var result = userlogRep.AddPopupAlert(AddDet);
            return new Response<bool>(result, Status.SUCCESS, "Add Successfully...");
        }
    }
}