using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IStockOutwardRepository
    {
       IQueryable<Domain.GenIssueDet> GetUom(int itmid);
       IQueryable<Domain.GenIssueDet> GetItem(int ItemGroupId);
       IQueryable<Domain.GenIssueDet> GetPurUom(int itmid);
       IQueryable<Domain.GenIssueStock> GetStkDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno, int FabReqId,string Orderno,int Styleid);
       IQueryable<Domain.GenIssueDet> GetItmeditDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno);

       int AddData(GenIssueMas objEntry);
       bool AddDetData(GenIssueMas objmas, List<GenIssueDet> objdet, List<GenIssueStock> objstk, List<GenIssueAddless> objaddls, string Mode, int unitmId = 0);
       bool UpdDetData(GenIssueMas objmas, List<GenIssueDet> objdet, List<GenIssueStock> objstk, List<GenIssueAddless> objaddls, string Mode, int unitmId = 0);

       bool UpdateData(GenIssueMas objUpd);
       IQueryable<Domain.GenIssueMas> GetDataMainList(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid,int? suppid,int? procid, string fromDate, string todate);
       bool DeleteData(GenIssueMas obDjmas, List<GenIssueStock> objDstk);
       IQueryable<Domain.GenIssueMas> GetDataheaderdet(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate);
       IList<Domain.GenIssueAddless> GetStkoutEditAccLoad(int Id);
       IQueryable<Domain.GenIssueDet> RepItmReqDet(int ReqMasId);
       IQueryable<Domain.GenIssueMas> GetDataRepReqNoList();
       IQueryable<Domain.GenIssueMas> GetDataEditRepReqNoList(string ReqNo);
   }
}
