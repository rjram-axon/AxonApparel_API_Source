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
    public class BulkOrderNomSupBusiness:IBulkOrderNomBusiness
    {
        IBulkOrderNomRepository bulkordNomRep = new BulkOrderNomSupRepository();

        public Common.Response<int> CreateNomSupBulkOrder(Domain.BulkOrder BulOrd)
        {
            try
            {

                return new Response<int>(bulkordNomRep.AddData(new AxonApparel.Repository.NominatedSupplier
                {

                    Supplierid = BulOrd.SupplierId,
                    Itemid = BulOrd.ItemId,
                    Order_no = BulOrd.NSOrderNo,
                   

                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.BulkOrder>> GetNomSupp()
        {
            try
            {

                var nomList = bulkordNomRep.GetDataList();

                return new Response<IQueryable<Domain.BulkOrder>>(nomList.Select(m => new Domain.BulkOrder
                {
                 
                    Item = m.Item.Item1,
                    Supplier = m.Supplier.Supplier1,
                    Order_No = m.Order_no,
                    ItemId = (int)m.Itemid,
                    SupplierId = m.Supplierid,
                }), Status.SUCCESS, "Fetched Successfully");

            }


            catch (Exception)
            {
                return new Response<IQueryable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


      
    }
}
