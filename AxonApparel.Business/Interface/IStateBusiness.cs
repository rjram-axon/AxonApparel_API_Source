using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IStateBusiness
    {
        Response<IQueryable<State>> GetState();
        Response<State> GetId(int Id);
        Response<int> Create(State Add);
        Response<bool> Update(State Upd);
        Response<bool> Delete(int Id);
        Response<IEnumerable<State>> GetAllBusState();
    }
}
