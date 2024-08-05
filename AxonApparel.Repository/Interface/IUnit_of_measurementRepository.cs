using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IUnit_of_measurementRepository:IBaseRepository<Unit_of_measurement>
    {
        IList<Domain.Unit_of_measurement> GetRepUomCheckItemDetails(int UomId);
        IEnumerable<Unit_of_measurement> GetDataListAll();
    }
}
