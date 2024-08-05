using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProcessOrderBusiness
    {
        Response<IQueryable<Domain.ProcessOrderAddScreen>> Getrefno(int cmpid, int cmunitid);
        Response<IQueryable<Domain.ProcessOrderAddScreen>> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int stylid, string orderno);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputitmsgrid(string closed, string jobordno, int procid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputjoborddetgrid(string closed, string jobordno, int procid, string OpenPgAp);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputitmsgrid(string closed, string jobordno, int procid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputjoborddetgrid(string closed, string jobordno, int procid, string OpenPgAp);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid);
        Response<bool> CreateUnitEntry(Domain.ProcessOrdMas MasEntry);
        Response<bool> UpdateData(Domain.ProcessOrdMas objupd);
        Response<bool> AppUpdateData(Domain.ProcessOrdMas objaupd);
        Response<bool> RevUpdateData(Domain.ProcessOrdMas objrupd);
        Response<bool> RevClosureData(Domain.ProcessOrdMas objrupd);
        Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid);
        Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingriddet(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputJobDetgrid(int prodid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputJobDetgrid(int prodid);
        Response<IQueryable<Domain.ProcessOrdAddLess>> LoadEditAddlessgrid(int prodid);
        Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputStkdet(int cmpid, int prodid, string prodordno);
        Response<bool> DeleteDelEntry(Domain.ProcessOrdMas DelDEntry);
        Response<bool> DeleteIssDelEntry(Domain.ProcessOrdMas DelDEntry);
        Response<bool> CreateIssUnitEntry(Domain.ProcessIssueMas MasEntry);
        Response<bool> CreateIss(Domain.ProcessOrdMas MasEntry);
        Response<bool> UpdateIss(Domain.ProcessOrdMas objupd);
       Response<IQueryable<Domain.ProcessIssueMas>> LoadIssueNo(int ordid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOrderMaindetails(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOrderMaindetailsforProd(int prodid, string type);
       Response<IList<Domain.ProcessOrdDet>> GetProEntryCheckEditItemDetails(string TransNo);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> GetDataOrderRefDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> GetDataStyleDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);

       Response<IQueryable<Domain.ProcessOrderAddScreen>> GetProcessSupplier(int procordid);
       String GetUserGroup(int Userid);
    }
}
