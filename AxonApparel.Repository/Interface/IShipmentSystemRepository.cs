using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IShipmentSystemRepository : IBaseRepository<ShipmentSystem>
    {
        IList<Domain.ShipmentSystem> GetRepSysCheckItemDetails(int systemid);
        IEnumerable<ShipmentSystem> GetDataListAll();
    }
}
