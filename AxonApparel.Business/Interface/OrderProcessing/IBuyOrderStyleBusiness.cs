using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IBuyOrderStyleBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<BuyOrderStyle>> GetBuyOrderStyle();
        Response<IQueryable<BuyOrderStyle>> GetBuyOrderStyleLoad(int buyormasid);
        Response<IQueryable<BuyOrderStyle>> GetBuyOrderTargetStyleLoad(string buyormasid);
        Response<IQueryable<BuyOrderStyle>> GetOrderno(int BMasId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>
        Response<BuyOrderStyle> GetDataById(int Buy_Ord_MasId, string styletype = "");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>
        Response<BuyOrderStyle> GetOrderRef(int OrderId);

        Response<IQueryable<Domain.Item>> GetItemStylebyId(int StyleId);

        Response<IQueryable<Domain.Enquiry>> GetEnquiryNo();

        Response<bool> GetShipmentChecking(int StyleRowId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>
        //Response<Domain.BuyOrderStyle> GetOrderQuantity(string OrderNo);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkOrder"></param>
        /// <returns></returns>
        Response<int> CreateBuyOrderStyle(BuyOrderStyle BulOrd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkOrder"></param>
        /// <returns></returns>
        Response<bool> UpdateBuyOrderStyle(BuyOrderStyle BulOrd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_MasId"></param>
        /// <returns></returns>

        Response<bool> DeleteBuyOrderStyle(int Buy_Ord_MasId);

        Response<IQueryable<BuyOrderStyle>> GetDataCheckShipPlanDetails(string OrdNo, int Styleid);
        Response<IQueryable<BuyOrderStyle>> GetStylerowidDetails(string OrdNo, int Styleid);
        Response<BuyOrderStyle> GetDataCheckStyle(int Styleid, string OrdNo);
        Response<Domain.Style> GetStyleItemInfo(int Styleid);
        Response<IQueryable<Domain.Style>> GetStyleNo(string orderno);

        Response<IQueryable<Domain.BuyOrdImg>> GetStlyeImglist();

        Response<IQueryable<Domain.BuyOrdImg>> GetStlyeImgdet(string Style, string Orderno);

        Response<IQueryable<BuyOrderStyle>> GetStlyeImgOrder(string Style);
    }
}
