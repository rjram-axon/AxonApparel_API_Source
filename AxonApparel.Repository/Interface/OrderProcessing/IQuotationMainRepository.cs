using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IQuotationMainRepository
    {
       IQueryable<Domain.MarkQuoteMas> GetDataMainList(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate,string RefNo);
       IQueryable<Domain.MarkQuoteMas> GetRepDetRecNo(int id);
    }
}
