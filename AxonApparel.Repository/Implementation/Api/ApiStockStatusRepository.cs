using AxonApparel.Contract.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiStockStatusRepository : IApiStockStatusRepository
    {
        OrderEntities ApiStock = new OrderEntities();

        public IQueryable<ApiStockListfilter> GetFilterDetails(string category)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiGetFilterations(category)
                         select new ApiStockListfilter
                         { 
                            Id = data.id,
                            Value = data.value
                         }).AsQueryable();
            return query;

        }

        public IQueryable<Proc_Apparel_ApiGetItemStockCategory_Result> GetItemStockCategory(string otype)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiGetItemStockCategory(otype)
                         select new Proc_Apparel_ApiGetItemStockCategory_Result
                         {
                           itemtype = data.itemtype,
                           count = data.count
                         }).AsQueryable();
            return query;
        }


        public IQueryable<Proc_Apparel_ApiGetStockinTransaction_Result> GetItemStocktransactiondetails(string itemtype)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiGetStockinTransaction(itemtype)
                         select new Proc_Apparel_ApiGetStockinTransaction_Result
                         {
                             Document_Name = data.Document_Name,
                             Amount = data.Amount,
                             count = data.count,
                             qty = data.qty,
                             prefix = data.prefix
                         }).AsQueryable();
            return query;
        }
        public IQueryable<Proc_Apparel_ApiGetStoreWiseStockdetails_Result> GetStockinItemwise(string itemtype,string transtype)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiGetStoreWiseStockdetails(itemtype,transtype)
                         select new Proc_Apparel_ApiGetStoreWiseStockdetails_Result
                         {
                             item = data.item,
                             Abbreviation = data.Abbreviation,
                             qty = data.qty
                         }).AsQueryable();
            return query;
        }

        public IQueryable<Proc_Apparel_ApiStockStatusMainSummary_Result> GetStockdetails(ApiStockFilter filter)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiStockStatusMainSummary(filter.companyid,filter.Order_no,filter.Ref_no,filter.Styleid,filter.Itemid,filter.Colorid,filter.Sizeid,filter.Storeid)
                         select new Proc_Apparel_ApiStockStatusMainSummary_Result
                         {
                            item = data.item,
                            color = data.color,
                            size = data.size,
                            Balqty = data.Balqty,
                            uom = data.uom,
                            StoreName = data.StoreName,
                            itemid = data.itemid,
                            colorid = data.colorid,
                            sizeid = data.sizeid,
                            storeunitid = data.storeunitid   
                         }).AsQueryable();
            return query;
        }        

        public IQueryable<Proc_Apparel_ApiStockStatusSummary_Result> GetStockordersummary(ApiStockFilter filter)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiStockStatusSummary(filter.companyid, filter.Order_no, filter.Ref_no, filter.Styleid, filter.Itemid, filter.Colorid, filter.Sizeid, filter.Storeid)
                         select new Proc_Apparel_ApiStockStatusSummary_Result
                         {
                             Order_no = data.Order_no,
                             styleid = data.styleid,
                             style = data.style,
                             Ref_no = data.Ref_no,
                             item = data.item,
                             color = data.color,
                             size = data.size,
                             Balqty = data.Balqty,
                             uom = data.uom,
                             StoreName = data.StoreName,
                             itemid = data.itemid,
                             colorid = data.colorid,
                             sizeid = data.sizeid,
                             storeunitid = data.storeunitid
                         }).AsQueryable();
            return query;
        }

        public IQueryable<Proc_Apparel_ApiStockStatusTrackdetail_Result> GetStockTracking(ApiStockFilter filter)
        {
            var query = (from data in ApiStock.Proc_Apparel_ApiStockStatusTrackdetail(filter.companyid, filter.Order_no, filter.Ref_no, filter.Styleid, filter.Itemid, filter.Colorid, filter.Sizeid, filter.Storeid)
                         select new Proc_Apparel_ApiStockStatusTrackdetail_Result
                         {
                             transno = data.transno,
                             item = data.item,
                             color = data.color,
                             size = data.size,
                             Balqty = data.Balqty,
                             uom = data.uom,
                             StoreName = data.StoreName,
                             itemid = data.itemid,
                             colorid = data.colorid,
                             sizeid = data.sizeid,
                             storeunitid = data.storeunitid
                         }).AsQueryable();
            return query;
        }
    }
}
