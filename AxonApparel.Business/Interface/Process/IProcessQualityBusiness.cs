using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProcessQualityBusiness
    {
        Response<IList<Domain.ProcQltyDet>> GetEntryItemLoad(int RecptMasid);
        Response<IList<Domain.ProcQltyJobDet>> GetEntryJobDetLoad(int RecptMasid);
        Response<IList<Domain.ProcQltyStock>> GetEntryStockLoad(int RecptMasid);
        Response<bool> CreateUnitEntry(Domain.ProcQltyMas MasEntry);

        Response<IQueryable<Domain.ProcQltyMas>> GetDataQltyEditDetails(int Id);
        Response<IList<Domain.ProcQltyJobDet>> GetItemQltyEditDetails(int RecptMasid);
        Response<IList<Domain.ProcQltyStock>> GetStockQltyEditDetails(int RecptMasid);

        Response<bool> UpdateEntry(Domain.ProcQltyMas UEntry);
        Response<bool> DeleteEntry(Domain.ProcQltyMas DEntry);
    }
}
