using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IOrderCancellationRepository
    {
        IList<BulkOrderCancel> GetDataList(int? CmpId, int? BMasId, string Ref_No, int? BuyId, int? StyleId, string frmDate, string ToDate, string OrderType);

        buy_ord_style GetDataById(int StyleID);
        bool UpdateCancelData(buy_ord_style objAd);
        bool UpdateData(buy_ord_style objAd);
    }
}
