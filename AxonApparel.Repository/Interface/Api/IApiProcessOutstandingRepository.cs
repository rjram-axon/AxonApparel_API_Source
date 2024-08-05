using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiProcessOutstandingRepository
    {
        IQueryable<Proc_Apparel_ApiSupplierOutstanding_Result> GetProcessOutstandingdetails();
        IQueryable<Proc_Apparel_ApiSupplierOutstandingProcesswise_Result> GetSupplierprocesswise(int supplierid);
        IQueryable<Proc_Apparel_ApiProcessWiseSupplieroutstandingdetail_Result> GetProcesswisedetail(int supplierid, int processid);

    }
}
