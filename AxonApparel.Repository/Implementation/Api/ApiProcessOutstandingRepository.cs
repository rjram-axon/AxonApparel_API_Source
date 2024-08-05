using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiProcessOutstandingRepository : IApiProcessOutstandingRepository
    {
        OrderEntities Apiorder = new OrderEntities();
        public IQueryable<Proc_Apparel_ApiSupplierOutstanding_Result> GetProcessOutstandingdetails()
        {
            var query = (from data in Apiorder.Proc_Apparel_ApiSupplierOutstanding()
                         select new Proc_Apparel_ApiSupplierOutstanding_Result
                         {
                             supplierid = data.supplierid,
                             supplier = data.supplier,
                             issuedqty = data.issuedqty,
                             receivedqty = data.receivedqty,
                             balanceqty = data.balanceqty,
                             outuom = data.outuom
                         }).AsQueryable(); 
            return query;
        }       

        public IQueryable<Proc_Apparel_ApiSupplierOutstandingProcesswise_Result> GetSupplierprocesswise(int supplierid)
        {
            var query = (from data in Apiorder.Proc_Apparel_ApiSupplierOutstandingProcesswise(supplierid)
                        select new Proc_Apparel_ApiSupplierOutstandingProcesswise_Result
                        {
                         supplierid = data.supplierid,
                         supplier = data.supplier,
                         processid = data.processid,
                         Process = data.Process,
                         issuedqty = data.issuedqty,
                         receivedqty = data.receivedqty,
                         cancelqty = data.cancelqty,
                         balanceqty = data.balanceqty,
                         outuom = data.outuom,
                         inpuom = data.inpuom
                        }).AsQueryable();
            return query;
        }

        public IQueryable<Proc_Apparel_ApiProcessWiseSupplieroutstandingdetail_Result> GetProcesswisedetail(int supplierid, int processid)
        {
            var query = (from data in Apiorder.Proc_Apparel_ApiProcessWiseSupplieroutstandingdetail(supplierid, processid)
                         select new Proc_Apparel_ApiProcessWiseSupplieroutstandingdetail_Result
                         {
                             supplierid = data.supplierid,
                             supplier = data.supplier,
                             process = data.process,
                             processorder = data.processorder,
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
