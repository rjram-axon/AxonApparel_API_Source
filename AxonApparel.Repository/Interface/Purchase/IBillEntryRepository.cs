using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IBillEntryRepository:IBaseRepository<BillEntry>
    {
        IQueryable<Domain.BillEntry> Getdata(int billid);
        IQueryable<Domain.BillEntry> GetDataMainList(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate, string SuppType);
        IQueryable<Domain.BillEntry> Listddldet(int? companyId);
    }
}
