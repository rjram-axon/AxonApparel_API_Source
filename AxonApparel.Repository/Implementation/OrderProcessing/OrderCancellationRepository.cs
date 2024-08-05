using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
namespace AxonApparel.Repository
{
    public class OrderCancellationRepository : IOrderCancellationRepository
    {
        OrderEntities entities = new OrderEntities();
        public IList<BulkOrderCancel> GetDataList(int? CmpId, int? BMasId, string Ref_No, int? BuyId, int? StyleId, string frmDate, string ToDate, string OrderType)
        {




            var query = (from cdc in entities.Proc_Apparel_GetBulkCancelMainDetails(CmpId, BMasId, Ref_No, BuyId, StyleId, OrderType, frmDate, ToDate)
                         select new BulkOrderCancel
                         {
                             CClose = cdc.Closed,
                             Despatch_Closed = cdc.Despatch_Closed,
                             Buyer = cdc.Buyer,
                             Style = cdc.style,
                             COrdNo = cdc.order_no,
                             CRefNo = cdc.Ref_no,
                             //Order_Date = (DateTime)cdc.Order_date,
                             Employee = cdc.Employee,
                             StyleId = cdc.styleid,
                             CBmasId = cdc.Buy_Ord_MasId,
                             CCompId = cdc.companyid,

                         }).AsQueryable();

            return query.ToList();



        }


        public buy_ord_style GetDataById(int StyleId)
        {

            return entities.buy_ord_style.Where(c => c.Styleid == StyleId).FirstOrDefault();
        }
        public bool UpdateData(buy_ord_style objAd)
        {
            var result = false;

            //var App = entities.buy_ord_style.Where(c => c.Styleid == objAd.Styleid && c.order_no == objAd.order_no).FirstOrDefault();

            //int WCancel = 0;

            //if (App != null)
            //{
            //    if (objAd.OrderType == "W")
            //    {

            //        App.Despatch_Closed = objAd.OrderType;
            //        App.Cancel = WCancel;
            //    }
            //    else if (objAd.OrderType == "Y")
            //    {
            //        App.Despatch_Closed = objAd.OrderType;
            //    }
            //    else
            //    {
            //        App.Despatch_Closed = objAd.OrderType;
            //    }

            //}
            var App = entities.buy_ord_style.Where(c => c.order_no == objAd.order_no && c.Styleid == objAd.Styleid).FirstOrDefault();

            if (App != null)
            {

                App.Despatch_Closed = "N";

            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdateCancelData(buy_ord_style objAd)
        {
            var result = false;

            var App = entities.buy_ord_style.Where(c => c.order_no == objAd.order_no && c.Styleid == objAd.Styleid).FirstOrDefault();
                  
            if (App != null)
            {

                App.Despatch_Closed = "Y";
               
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
    }
}
