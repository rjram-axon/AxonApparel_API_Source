using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IS2PhotoSuitBusiness
    {
        Response<int> Create(Domain.S2PhotoSuit ObjAdd);
        Response<IQueryable<S2PhotoSuit>> GetData();
        Response<S2PhotoSuit> GetId(int Id);
        Response<bool> Update(S2PhotoSuit Upd);
        Response<bool> Delete(int Id);
        Response<IList<Domain.S2PhotoSuit>> GetS2Entry();
    }
}
