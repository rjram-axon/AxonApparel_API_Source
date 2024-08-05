using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IStockInwardMainRepository
    {

        IQueryable<Domain.UnitGrnMas> GetDataMainList(int? companyId, int? suppid, int? processid, string jobordNo, int? unitgrnmasid, string unitgrnno, int? fromunit, int? forunit, string recptcat, string fromDate, string todate,string Otype,string Utype);
    }
}
