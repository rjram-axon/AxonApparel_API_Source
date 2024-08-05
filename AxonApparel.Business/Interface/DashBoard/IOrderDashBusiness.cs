using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IOrderDashBusiness
    {
       Response<IList<OrderDash>> GetOrderRunBuss();
       Response<IList<OrderDash>> GetOrderBalBuss();
       Response<IList<OrderDash>> GetOrderDetBuss(string frmDate, string ToDate);
       Response<IList<OrderDash>> GetOrderDetBussDet(string frmDate, string ToDate);
       Response<IList<OrderDash>> GetOrderStyleDetBuss(string FDt, string TDt);
       Response<IList<OrderDash>> GetOrderStyleDetBussDet(string FDt, string TDt);
       Response<IList<OrderDash>> GetOrderBuyDetBuss(string FDt, string TDt);
       Response<IList<OrderDash>> GetOrderBuyDetBussDet(string FDt, string TDt);
       Response<IList<OrderDash>> GetOrderYarnDetBuss(string FDt, string TDt);
       Response<IList<OrderDash>> GetOrderYarnDetBussDet(string FDt, string TDt);

       Response<IList<OrderDash>> GetOrderWiseDetBuss(string frmDate, string ToDate);
       Response<IList<OrderDash>> GetOrderWiseDetBussDet(string frmDate, string ToDate);


       Response<IList<OrderDash>> GetOrderDesDetBuss(string frmDate, string ToDate);
       Response<IList<OrderDash>> GetOrderDesDetBussDet(string frmDate, string ToDate);

       Response<IEnumerable<OrderDash>> LoadChatUsers(int FromUserId);

       Response<IEnumerable<OrderDash>> LoadChatUsers_NewMessage(int FromUserId);

       Response<IEnumerable<OrderDash>> LoadChatUsers_GetNewMessageCount(int FromUserId);
       Response<IEnumerable<OrderDash>> LoadChatMsg(int FromUserId, int ToUserId);

       Response<IEnumerable<OrderDash>> LoadAllMsg(int FromUserId);

       Response<bool> CreateUnitEntry(OrderDash MasEntry);

       Response<bool> Update_IsRead(OrderDash MasEntry);
    }
}
