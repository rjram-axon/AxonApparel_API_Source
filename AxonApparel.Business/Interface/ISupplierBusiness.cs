using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ISupplierBusiness
    {
        Response<IEnumerable<Supplier>> GetSupplier();
        Response<Supplier> GetSupplierId(int SupplierId);
        Response<int> CreateSupplier(Supplier SupplierAdd);
        Response<bool> UpdateSupplier(Supplier SupplierUpd);
        Response<bool> DeleteSupplier(int SupplierId);
        Response<IList<Supplier>> GetSuppCheckItemDetails(int SupplierId);
        Response<IEnumerable<Supplier>> GetSupplierSetup(int Processid, string Type);

    }
}
