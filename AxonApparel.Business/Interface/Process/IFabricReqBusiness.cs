using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IFabricReqBusiness
    {
        Response<IQueryable<Domain.FabricDet>> LoadItemDet(int Bmasid, int Styleid);
        Response<bool> CreateUnitEntry(Domain.FabricMas MasEntry);
       Response<IQueryable<Domain.FabricMas>> LoadMaingrid(int? bmasid, int? styleid, int? fabid, string processortype, string fromdate, string todate,string Otype, int ProcessorId);
        Response<IQueryable<Domain.FabricDet>> LoadEditItemDet(int Masid);
        Response<bool> UpdateEntry(Domain.FabricMas MasEntry);
        Response<bool> DeleteEntry(Domain.FabricMas MasEntry);

    }
}
