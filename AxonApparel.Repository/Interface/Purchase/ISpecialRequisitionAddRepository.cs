using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface ISpecialRequisitionAddRepository
    {
       IQueryable<Domain.SpecialRequisition> GetordernoDetails(int cmpid, string unit);
       IQueryable<Domain.SpecialRequisition> GetrefnoDetails(int cmpid, string orderno, string unit);
       IQueryable<Domain.SpecialRequisition> GetstyleDetails(int cmpid, string orderno,string refno, string unit);
       IQueryable<Domain.SpecialRequisition> GetwrknoDetails(int cmpid, string orderno, string refno,int styleid, string unit);
       IQueryable<Domain.SpecialRequisition> GetitmgrpDetails( string jbno);
       
       IQueryable<Domain.SpecialReqDet> GetgridDetails( string jborderno, string orderno, string refno, int styleid);
       IQueryable<Domain.SpecialReqDet> GetjobgridDetails(string jborderno, string orderno, string refno, int styleid);
       IQueryable<Domain.SpecialReqDet> GeteditgridDetails(int reqid);
       int AddData(Special_Req_Mas objEntry);
       bool AddDetData(Special_Req_Mas objEntry, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0);
       bool UpdDetData(Special_Req_Mas objEntry, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0);
       bool AppUpdDetData(Special_Req_Mas objEntry, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0);
       bool AppDelDetData(Special_Req_Mas objEntry, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0);
       bool UpdateData(Special_Req_Mas objupd);
       bool DeleteData(int id);
    }
}
