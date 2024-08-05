
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IOrderDashRepository
    {
        IList<OrderDash> GetDataDashRep(string frmDate, string ToDate);
        IList<OrderDash> GetDataDashBalRep();
        IList<OrderDash> GetDataDashRunRep();
        IList<OrderDash> GetDataDashDetRep(string frmDate, string ToDate);

        IList<OrderDash> GetDataStyleDashRep(string FDt, string TDt);
        IList<OrderDash> GetDataStyleDashDetRep(string FDt, string TDt);

        IList<OrderDash> GetDataBuyDashRep(string FDt, string TDt);
        IList<OrderDash> GetDataBuyDashDetRep(string FDt, string TDt);

        IList<OrderDash> GetDataYarnDashRep(string FDt, string TDt);
        IList<OrderDash> GetDataYarnDashDetRep(string FDt, string TDt);

        IList<OrderDash> GetDataOrderDashRep(string frmDate, string ToDate);
        IList<OrderDash> GetDataOrderDashDetRep(string frmDate, string ToDate);

        IList<OrderDash> GetDataDetDashRep(string frmDate, string ToDate);
        IList<OrderDash> GetDataDetDashDetRep(string frmDate, string ToDate);

        IEnumerable<OrderDash> LoadChatUsers(int FromUserId);

        IEnumerable<OrderDash> LoadChatUsers_NewMessage(int FromUserId);

        IEnumerable<OrderDash> LoadChatUsers_GetNewMessageCount(int FromUserId);
        IEnumerable<OrderDash> LoadChatMsg(int FromUserId, int ToUserId);

        IEnumerable<OrderDash> LoadAllMsg(int FromUserId);

        bool AddDetData(TandA_Chat obj);
        bool Update_IsRead(TandA_Chat objupd);
    }
}
