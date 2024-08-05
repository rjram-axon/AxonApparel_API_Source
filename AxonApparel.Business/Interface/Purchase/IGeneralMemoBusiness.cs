using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
  public  interface IGeneralMemoBusiness
    {
      Response<IList<Domain.GeneralMemoDet>> GetItemLoad( string Itmgrpid);
      Response<bool> CreateUnitEntry(Domain.GeneralMemoMas Entry);
      Response<bool> Update(Domain.GeneralMemoMas obj);
      Response<IQueryable<Domain.GeneralMemoMas>> GetDataMainList(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate);
      Response<IQueryable<Domain.GeneralMemoDet>> GeteditItemLoad(int masid);
      Response<bool> Delete(int id);
    }
}
