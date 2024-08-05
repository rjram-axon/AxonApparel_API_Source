using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IStateRepository:IBaseRepository<State>
    {
        IEnumerable<State> GetDataAllStateList();
    }
}
