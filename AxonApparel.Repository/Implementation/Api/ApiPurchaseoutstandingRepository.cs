using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiPurchaseoutstandingRepository : IApiPurchaseoutstandingRepository
    {
        OrderEntities Apiorder = new OrderEntities();
        public IQueryable<Proc_Apparel_ApiSupplierOutstandingPurchase_Result> GetPurchaseoutstanding(int supplierid, string orderno, int styleid, string fromdate, string todate)
        {
            
            var query = (from data in Apiorder.Proc_Apparel_ApiSupplierOutstandingPurchase(supplierid, orderno, styleid, fromdate, todate)
                         select new Proc_Apparel_ApiSupplierOutstandingPurchase_Result
                         {
                             supplierid = data.supplierid,
                             supplier = data.supplier,
                             issuedqty = data.issuedqty,
                             receivedqty = data.receivedqty,
                             cancelqty = data.cancelqty,
                             balanceqty = data.balanceqty,
                             outuom = data.outuom,
                             inpuom = data.inpuom
                         }).AsQueryable();
            return query;
        }

        public IQueryable<Proc_Apparel_ApiSupplierOutstandingPurchasedetails_Result> GetPurchasesupplierdetails(int supplierid)
        {
            var query = (from data in Apiorder.Proc_Apparel_ApiSupplierOutstandingPurchasedetails(supplierid, null, null, null, null)
                         select new Proc_Apparel_ApiSupplierOutstandingPurchasedetails_Result
                         {
                             supplier = data.supplier,
                             supplierid = data.supplierid,
                             pur_ord_id = data.pur_ord_id,
                             pur_ord_no = data.pur_ord_no,
                             issuedqty = data.issuedqty,
                             receivedqty = data.receivedqty,
                             cancelqty = data.cancelqty,
                             balanceqty = data.balanceqty,
                             outuom = data.outuom,
                             inpuom = data.inpuom
                         }).AsQueryable();
            return query;   
        }
    }
}
