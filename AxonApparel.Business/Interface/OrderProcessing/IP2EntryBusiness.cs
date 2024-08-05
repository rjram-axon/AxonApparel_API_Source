using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IP2EntryBusiness
    {
        Response<int> Create(P2Entry ObjAdd);
        Response<IQueryable<P2Entry>> GetData();
        Response<P2Entry> GetId(int Id);
        Response<bool> Update(P2Entry Upd);
        Response<bool> Delete(int Id);
        Response<IList<Domain.P2Entry>> GetP2Entry();
    }
}
