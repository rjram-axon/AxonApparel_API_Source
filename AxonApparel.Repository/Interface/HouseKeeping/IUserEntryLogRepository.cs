using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IUserEntryLogRepository
    {
        bool Add(Domain.User_Entry_Log AddDet);
        IEnumerable<Domain.User_Entry_Log> GetDDLdet();
        IEnumerable<Domain.User_Entry_Log> GetUsername();
        IEnumerable<Domain.User_Entry_Log> GetEntryLogList(int userid, string modulename, string entryname, string machinename,
            string machineip, string entrymode, string FromEntryDate, string ToEntryDate, string entryno);
        IEnumerable<Domain.Popup_Alert> GetPopupAlert();
        bool UpdatePopupAlertstatus(List<Popup_alert> obj);
        bool AddPopupAlert(Domain.Popup_Alert obj);
    }
}