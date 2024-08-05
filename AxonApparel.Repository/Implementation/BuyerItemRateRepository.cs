using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BuyerItemRateRepository:IBuyerItemRateRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<BuyerItemRate> GetItemrateMainList(int? BuyerId, int? ItemId, int? ColorId, int? SizeId, int? SupplierId)
        {

            IQueryable<BuyerItemRate> query = (from cd1 in entities.Proc_Apparel_GetBuyerWiseItemMainDetails(BuyerId, ItemId, ColorId, SizeId, SupplierId)
                                               select new BuyerItemRate
                                           {
                                               BuyerId=cd1.BuyerId,
                                               BuyerName=cd1.Buyer,
                                               ItemId=cd1.ItemId,
                                               Item=cd1.Item,
                                               ColorId=cd1.ColorId,
                                               Color=cd1.Color,
                                               SizeId=cd1.SizeId,
                                               Size=cd1.Size,
                                               Rate=(int)cd1.Rate,
                                               SupplierId=cd1.SupplierId,
                                               Supplier=cd1.Supplier

                                             


                                           }).AsQueryable();
            return query;
        }

    }
}
