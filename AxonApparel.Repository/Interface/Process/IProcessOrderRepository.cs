using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IProcessOrderRepository
    {
        IQueryable<Domain.ProcessOrderAddScreen> Getrefno(int cmpid, int cmunitid);
        IQueryable<Domain.ProcessOrderAddScreen> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype,int buyerid,string refno,int stylid,string orderno);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOutputitmsgrid(string closed, string jobordno, int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOutputJobdetgrid(string closed, string jobordno, int procid, string OpenPgAp);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputitmsgrid(string closed, string jobordno, int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputJobdetgrid(string closed, string jobordno, int procid, string OpenPgAp);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid);
        int AddData(Process_Ord_Mas objEntry);
        bool AddDetData(Process_Ord_Mas obj,List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        bool UpdDetData(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        bool UpdateData(Process_Ord_Mas objupd);
        bool AppUpdateDetData(Process_Ord_Mas objupd, string Mode);
        bool RevUpdateDetData(Process_Ord_Mas objrevupd, string Mode);
        bool AppClosureDetData(Process_Ord_Mas objrevupd, string Mode);
        bool DeleteData(int id);
        IQueryable<Domain.ProcessOrderAddScreen> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid);
        IQueryable<Domain.ProcessOrderAddScreen> LoadMaingriddet(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputJobdetgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputJobdetgrid(int prodid);
        IQueryable<Domain.ProcessOrdAddLess> LoadEditAddlessgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputStkdet(int cmpid, int prodid, string prodordno);
        bool DeleteDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        bool DeleteIssueDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
        //int AddIssData(Process_Issue_Mas objEntry);
        //bool AddIssDetData(DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objstkdet, string Mode, int unitmId = 0);
        bool AddIss(Process_Ord_Mas obj,List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
        bool UpdIss(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
        IQueryable<Domain.ProcessIssueMas> LoadIssueNo(int ordid);
        bool MarkUpRateOrdUpdation(int ProcOrderId);
        bool MarkUpRateIssUpdation(int ProcOrderId);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOrderMaindetails(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOrderMaindetailsforProd(int prodid, string type);
        IList<Domain.ProcessOrdDet> GetDataProcessRepEditCheckItemDetails(string TransNo);

        IQueryable<Domain.ProcessOrderAddScreen> GetDataOrdeRefRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<Domain.ProcessOrderAddScreen> GetDataStyleRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);

        IQueryable<Domain.ProcessOrderAddScreen> GetProcessSupplier(int procordid);
        String GetUserGroup(int Userid);
    }
}
