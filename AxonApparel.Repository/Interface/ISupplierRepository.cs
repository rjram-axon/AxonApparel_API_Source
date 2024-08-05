using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ISupplierRepository : IBaseRepository<Supplier>
    {
        IList<Domain.Supplier> GetRepSuppCheckItemDetails(int supplierid);
        IEnumerable<Domain.Supplier> GetDataListAll();

        IEnumerable<Domain.Supplier> GetSupplierSetup(int Processid, string Type);
    }
}
