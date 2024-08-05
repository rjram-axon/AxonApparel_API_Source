using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
   public interface IProcessQuoteRepository
    {
        IQueryable<ProcessQuote> GetDataMainList(int? companyId, string orderNo, string RefNo, string EntryNo, int? SupId, string fromDate, string toDate, string OType);
        IQueryable<Process_Quote> GetDataList();
        bool DeleteData(int Id);
    }
}
