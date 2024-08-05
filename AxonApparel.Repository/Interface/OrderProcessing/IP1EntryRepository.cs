using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IP1EntryRepository:IBaseRepository<P1Entry>
    {
       IQueryable<BuyOrderStyle> GetDescription(int id);
       IList<Domain.P1Entry> GetP1Entry();
    }
}
