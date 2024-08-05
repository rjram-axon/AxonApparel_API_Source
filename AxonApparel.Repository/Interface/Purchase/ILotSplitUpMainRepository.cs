using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ILotSplitUpMainRepository
    {
        IQueryable<LotSplitUp> GetDataLotMainRepDetails(int? Companyid, int? SupplierId, string TransNo, string EntryNo, string MLotNo, string FromDate, string ToDate);
        IQueryable<LotSplitUp> GetDataOrderRepDetails(string FrmDate, string ToDate);

    }
}
