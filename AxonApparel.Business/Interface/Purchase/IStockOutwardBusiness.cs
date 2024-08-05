using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IStockOutwardBusiness
    {
       Response<IQueryable<Domain.GenIssueDet>> GetUom(int itmid);
       Response<IQueryable<Domain.GenIssueDet>> GetItem(int ItemGroupId);
       Response<IQueryable<Domain.GenIssueDet>> GetPurUom(int itmid);
       Response<IQueryable<Domain.GenIssueStock>> GetStkDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno, int FabReqId,string Orderno,int Styleid);
       Response<IQueryable<Domain.GenIssueDet>> GetItmeditDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno);

       Response<bool> CreateUnitEntry(Domain.GenIssueMas GrnEntry);
       Response<bool> Update(Domain.GenIssueMas obj);
       Response<IQueryable<Domain.GenIssueMas>> GetDataMainList(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid,int? suppid,int? procid, string fromDate, string todate);
       Response<bool> Delete(Domain.GenIssueMas objDet);
       Response<IQueryable<Domain.GenIssueMas>> GetDataheaderdet(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate);
       Response<IList<Domain.GenIssueAddless>> ListGetEditAddlessDetails(int Id);



       Response<IQueryable<Domain.GenIssueDet>> loadItmReqDet(int ReqMasId);
       Response<IQueryable<Domain.GenIssueMas>> GetDataReqNoList();
       Response<IQueryable<Domain.GenIssueMas>> GetDataEditReqNoList(string ReqNo);
    }
}
