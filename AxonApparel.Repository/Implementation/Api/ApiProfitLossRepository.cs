using AxonApparel.Contract.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiProfitLossRepository : IApiProfitLossRepository
    {
        OrderEntities Apiprofit = new OrderEntities();
        public IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFilterdetails(string category)
        {
            var query = (from data in Apiprofit.Proc_Apparel_ApiGetFilterations(category)
                         select new Proc_Apparel_ApiGetFilterations_Result
                         {
                             id = data.id,
                             value = data.value
                         }
                         ).AsQueryable();
            return query;
        }
       
        public IQueryable<Proc_Apparel_ApiPlannDetailCostingCostSummaryStatement_Result> GetDetailcosting(ApiGetOrderfilter filter)
        {
            var query = (from data in Apiprofit.Proc_Apparel_ApiPlannDetailCostingCostSummaryStatement(null, null, filter.Refno, filter.Buy_ord_masid, filter.Styleid)
                         select new Proc_Apparel_ApiPlannDetailCostingCostSummaryStatement_Result
                         {
                             Access_Type = data.Access_Type,
                             itemgroup = data.itemgroup,
                             EstAmount = data.EstAmount,
                             AppAmount = data.AppAmount,
                             Actualamount = data.Actualamount,
                             InvoiceAmount = data.InvoiceAmount,
                             Diff = data.Diff
                         }).AsQueryable();
            return query;
        }

        public IQueryable<Proc_Apparel_ApiGetOrderDetails_Result> Getorderdetails(ApiGetOrderfilter filter)
        {
            var query = (from data in Apiprofit.Proc_Apparel_ApiGetOrderDetails(filter.Buy_ord_masid, filter.Styleid, filter.Refno, filter.Fromdate, filter.Todate)
                         select new Proc_Apparel_ApiGetOrderDetails_Result
                         {
                             order_no = data.order_no,
                             Ref_no = data.Ref_no,
                             style = data.style,
                             Quantity = data.Quantity,
                             GUom = data.GUom,
                             Description = data.Description,
                             Imagepath = data.Imagepath,
                             Productionqty = data.Productionqty,
                             AllowancePer = data.AllowancePer,
                             Currency = data.Currency,
                             Price = data.Price,
                             Exchange = data.Exchange,
                             OrderPrice = data.OrderPrice,
                             OrderValue = data.OrderValue,
                             Salesprice = data.Salesprice,
                             Salesrate = data.Salesrate,
                             Despatchqty = data.Despatchqty,
                             despamount = data.despamount                             
                         }
                         ).AsQueryable();
            return query;
        }
    }
}
