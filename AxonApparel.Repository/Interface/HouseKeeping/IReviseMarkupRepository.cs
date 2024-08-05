using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IReviseMarkupRepository
    {
        IQueryable<Domain.ItmStkDet> LoadMaingrid(string OrdNo, string RefNo, string Tranno, int ItemId, int PrdId, int CompId, string tyid);
        bool UpdateDetData(List<ItemStock> objPEID);
    }
}
