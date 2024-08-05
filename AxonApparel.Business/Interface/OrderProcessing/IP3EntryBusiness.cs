using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IP3EntryBusiness
    {
        Response<int> Create(P3Entry ObjAdd);
        Response<IQueryable<P3Entry>> GetData();
        Response<P3Entry> GetId(int Id);
        Response<bool> Update(P3Entry Upd);
        Response<bool> Delete(int Id);
        Response<IList<Domain.P3Entry>> GetP3Entry();
    }
}
