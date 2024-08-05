using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IDesignationRepository:IBaseRepository<Designation>
    {
        IList<Domain.Designation> GetRepDesignationCheckItemDetails(int desginid);
        IEnumerable<Domain.Designation> GetDataListAll();
    }
}
