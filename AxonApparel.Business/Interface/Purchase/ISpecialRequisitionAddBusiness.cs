using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface ISpecialRequisitionAddBusiness
    {
        Response<IQueryable<Domain.SpecialRequisition>> GetordnoDetails(int cmpid,string unit);
        Response<IQueryable<Domain.SpecialRequisition>> GetrefnoDetails(int cmpid, string orderno, string unit);
        Response<IQueryable<Domain.SpecialRequisition>> GetstyleDetails(int cmpid, string orderno,string refno, string unit);
        Response<IQueryable<Domain.SpecialRequisition>> GetwrknoDetails(int cmpid, string orderno, string refno,int styleid, string unit);
        Response<IQueryable<Domain.SpecialRequisition>> GetitmgrpDetails(string jbno);
        Response<IQueryable<Domain.SpecialReqDet>> GetgridDetails(string jborderno, string orderno, string refno, int styleid);
        Response<IQueryable<Domain.SpecialReqDet>> GetjobgridDetails(string jborderno, string orderno, string refno, int styleid);
        Response<IQueryable<Domain.SpecialReqDet>> GetgrideditDetails( int reqid);
        Response<bool> CreateEntry(Domain.SpecialReqMas Entry);
        Response<bool> Update(Domain.SpecialReqMas obj);
        Response<bool> AppUpdate(Domain.SpecialReqMas obj);
        Response<bool> AppDelete(Domain.SpecialReqMas obj);
        Response<bool> Delete(int id);
    }
}
