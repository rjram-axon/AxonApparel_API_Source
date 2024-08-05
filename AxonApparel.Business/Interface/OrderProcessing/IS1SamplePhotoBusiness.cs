using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IS1SamplePhotoBusiness
    {        
        Response<int> Create(Domain.S1SamplePhoto ObjAdd);
        Response<IQueryable<S1SamplePhoto>> GetData();
        Response<S1SamplePhoto> GetId(int Id);
        Response<bool> Update(S1SamplePhoto Upd);
        Response<bool> Delete(int Id);
        Response<IList<Domain.S1SamplePhoto>> GetS1Entry();
    }
}
