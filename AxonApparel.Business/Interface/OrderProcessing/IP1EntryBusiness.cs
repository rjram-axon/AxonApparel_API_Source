using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IP1EntryBusiness
    {
       Response< IQueryable<Domain.BuyOrderStyle>> GetDescription(int id);
       Response<int> Create(P1Entry ObjAdd);
       Response<IQueryable<P1Entry>> GetData();
       Response<P1Entry> GetId(int Id);
       Response<bool> Update(P1Entry Upd);
       Response<bool> Delete(int Id);
       Response<IList<Domain.P1Entry>> GetP1Entry();
    }
}
