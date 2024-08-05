using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IBulkOrderBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<BulkOrder>> GetBulkOrder();
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<BulkOrder>> MainGetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType, string DispatchClosed);
        Response<IQueryable<BulkOrder>> MainGetTargetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>

        Response<BulkOrder> GetDataById(int Buy_Ord_MasId);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="RefNo"></param>
        /// <returns></returns>

        Response<BulkOrder> ListMainGrid(string RefNo);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkOrder"></param>
        /// <returns></returns>

        Response<bool> CreateBulkOrder(BulkOrder BulOrd);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkOrder"></param>
        /// <returns></returns>

        Response<bool> UpdateBulkOrder(BulkOrder BulOrd);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>

        Response<bool> DeleteBulkOrder(int Buy_Ord_MasId);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<BulkOrder>> GetRefNo();
        Response<IEnumerable<BulkOrder>> GetOrderNoList();
        Response<IEnumerable<BulkOrder>> GetBuyRefNoList();
        Response<IList<BulkOrder>> GetNom(int BMasID);
        Response<IList<BulkOrder>> GetNomItem(string Supplier,int BMasId);
        Response<BulkOrder> GetDataByRef(string RefNo);
        Response<IQueryable<BulkOrder>> GetDataCheckPlanJobDetails(string OrdNo);
        Response<IEnumerable<BulkOrder>> GetSampleOrderRefNo();
        Response<IEnumerable<BulkOrder>> GetBulkOrderRefNo();
        Response<IEnumerable<BulkOrder>> GetSampleOrderNo();
        Response<IEnumerable<BulkOrder>> GetBulkOrderNo();
    }
}
