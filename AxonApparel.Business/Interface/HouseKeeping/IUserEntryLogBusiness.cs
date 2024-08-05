using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IUserEntryLogBusiness 
    {
        Response<bool> Add(User_Entry_Log entrylogdet);
        Response<IEnumerable<Domain.User_Entry_Log>> GetDDLdet();
        Response<IEnumerable<Domain.User_Entry_Log>> GetUsername();
        Response<IEnumerable<Domain.User_Entry_Log>> GetEntryLogList(int userid, string modulename, string entryname, string machinename,
                                                                    string machineip, string entrymode, string FromEntryDate, string ToEntryDate, string entryno);
        Response<IEnumerable<Domain.Popup_Alert>> GetPopupAlert();
        Response<bool> PopupStatusUpdate(Domain.Popup_Alert obj);
        Response<bool> AddPopupAlert(Domain.Popup_Alert obj);

    }
}
