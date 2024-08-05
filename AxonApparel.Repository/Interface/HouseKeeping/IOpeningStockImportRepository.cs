using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IOpeningStockImportRepository
    {
       Domain.ItmStkDet GetListUserStatus(Domain.ItmStkDet data);
    }
}
