using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IBillEntryBusiness
    {
      // Response<IQueryable<BillEntry>> GetBillEntry();
     
        //Response<BillEntry> GetId(int Id);
        Response<int> Create(BillEntry Add);
       // Response<bool> Update(BillEntry Upd);
        Response<bool> Delete(int Id);
        Response<IQueryable<Domain.BillEntry>> Getdata(int billid);
        Response<bool> Update(Domain.BillEntry obj);
        Response<IQueryable<Domain.BillEntry>> GetDataMainList(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate, string SuppType);
        Response<IQueryable<Domain.BillEntry>> Listddldet(int? companyId);
    }
}
