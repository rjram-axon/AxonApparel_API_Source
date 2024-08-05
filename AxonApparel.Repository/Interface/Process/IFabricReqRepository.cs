using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IFabricReqRepository
    {
       IQueryable<Domain.FabricDet> LoadItemDet(int Bmasid, int Styleid);
       bool Add(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode);
       IQueryable<Domain.FabricMas> LoadMaingrid(int? bmasid, int? styleid, int? fabid,  string processortype, string fromdate, string todate,string Otype, int ProcessorId);
       IQueryable<Domain.FabricDet> LoadEditItemDet(int Masid);
       bool Update(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode);
       bool Delete(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode);
    }
}
