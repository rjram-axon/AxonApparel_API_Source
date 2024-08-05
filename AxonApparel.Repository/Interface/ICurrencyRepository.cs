using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ICurrencyRepository:IBaseRepository<Currency>
    {
        IList<Domain.Currency> GetRepCurrencyCheckItemDetails(int Currid);
        IEnumerable<Currency> GetDataListAll();
    }
}
