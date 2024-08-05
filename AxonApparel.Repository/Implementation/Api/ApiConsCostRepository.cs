using AxonApparel.Contract.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiConsCostRepository : IApiConsCostRepository
    {
        OrderEntities ApiCost = new OrderEntities();
        public IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFiltrationdetails(string category)
        {
            var query = (from data in ApiCost.Proc_Apparel_ApiGetFilterations(category)
                         select new Proc_Apparel_ApiGetFilterations_Result
                         { 
                            id = data.id,
                            value = data.value
                         }
                         ).AsQueryable();

            return query;
        }
        public IQueryable<Proc_Apparel_ApiConsolidatedCostSummary_Result> GetConsolidatedCostingDetails(ApiConsDataFilter filter)
        {
            var query = (from data in ApiCost.Proc_Apparel_ApiConsolidatedCostSummary(filter.Order_no,filter.Styleid)
                         select new Proc_Apparel_ApiConsolidatedCostSummary_Result
                         {
                             Order_no = data.Order_no,
                             Ref_no = data.Ref_no,
                             Style = data.Style,
                             Quantity = data.Quantity,
                             Guom = data.Guom,
                             Description = data.Description,
                             Imagepath = data.Imagepath,
                             Productionqty = data.Productionqty,
                             Allowanceper = data.Allowanceper,
                             Currency = data.Currency,
                             Price = data.Price,
                             Exchange =  data.Exchange,
                             OrderPrice = data.OrderPrice,
                             Ordervalue = data.Ordervalue,
                             Salesprice = data.Salesprice,
                             Salesrate = data.Salesrate,
                             Despamount = data.Despamount,
                             Plan_amount = data.Plan_amount,
                             ActualAmount = data.ActualAmount,
                             Actualvalue = data.Actualvalue          
                         }).AsQueryable();

            return query;
        }
    }
}
