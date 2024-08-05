using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
  public  interface ILotSplitUpMainBusiness
    {
      Response<IQueryable<LotSplitUp>> GetDataLotMainDetails(int? Companyid, int? SupplierId, string TransNo, string EntryNo, string MLotNo, string FromDate, string ToDate);
      Response<IQueryable<LotSplitUp>> GetDataOrderDetails( string FrmDate, string ToDate);
    }
}
