using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IOrderCancellationBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
       Response<IList<BulkOrderCancel>> GetOrderClose(int? CmpId, int? BMasId, string Ref_No, int? BuyId, int? StyleId, string frmDate, string ToDate, string OrderType);

       /// <summary>
       /// 
       /// </summary>
       /// <param name="StyleID"></param>
       /// <returns></returns>

       Response<BulkOrderCancel> GetDataById(int StyleID);

       Response<bool> UpdateOrderClose(BulkOrderCancel BulOrd);
       Response<bool> UpdateOrderWithHeld(BulkOrderCancel BulOrd);
   
    }
}
