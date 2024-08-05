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
    public class OrderCancellationBusiness : IOrderCancellationBusiness
    {
        IOrderCancellationRepository ocRep = new OrderCancellationRepository();
        public Response<IList<BulkOrderCancel>> GetOrderClose(int? CmpId, int? BMasId, string Ref_No, int? BuyId, int? StyleId, string frmDate, string ToDate, string OrderType)
        {
            try
            {
                var ocList = ocRep.GetDataList(CmpId, BMasId, Ref_No, BuyId, StyleId, frmDate, ToDate, OrderType);

                return new Response<IList<BulkOrderCancel>>(ocList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrderCancel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<BulkOrderCancel> GetDataById(int StyleID)
        {
            try
            {
                var buo = ocRep.GetDataById(StyleID);
                return new Response<Domain.BulkOrderCancel>(new Domain.BulkOrderCancel
                {
                    COrdNo = buo.order_no,
                    StyleId = buo.Styleid,

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.BulkOrderCancel>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> UpdateOrderWithHeld(BulkOrderCancel BulOrd)
        {
            return new Response<bool>(ocRep.UpdateData(new AxonApparel.Repository.buy_ord_style
            {
                Despatch_Closed = BulOrd.Despatch_Closed,
                Cancel = BulOrd.CanCelled,
                order_no = BulOrd.COrdNo,
                Styleid = BulOrd.StyleId,
                OrderType = BulOrd.COrderType,
            }), Status.SUCCESS, "Updated Successfully");
        }
        public Response<bool> UpdateOrderClose(BulkOrderCancel BulOrd)
        {
            return new Response<bool>(ocRep.UpdateCancelData(new AxonApparel.Repository.buy_ord_style
            {

                Styleid = BulOrd.StyleId,
                order_no = BulOrd.COrdNo,


            }), Status.SUCCESS, "Updated Successfully");
        }



    }
}
