using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
   public interface IVendorRepository
    {
       IQueryable<Vendor> GetDataMainList(int? companyId, string orderNo, string RefNo, string EntryNo, int? SupId, string fromDate, string toDate, string OType);
       IQueryable<VendorQuoteMas> GetDataList();
       bool DeleteData(int Id);
    }
}
