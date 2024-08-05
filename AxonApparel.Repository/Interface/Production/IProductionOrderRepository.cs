using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IProductionOrderRepository
    {
        IQueryable<Domain.ProcessOrderAddScreen> Getrefno(int cmpid,int cmunitid);
        IQueryable<Domain.ProcessOrderAddScreen> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int styleid, string ordo);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOutputitmsgrid( string closed, string jobordno,int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadOutputJobdetgrid(string closed, string jobordno, int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputitmsgrid(string closed, string jobordno, int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputJobdetgrid(string closed, string jobordno, int procid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadInputStkWgrid(string itmcat, int itmid, int clrid,int sizeid,string jobordno,string transtype,int cmpid,int procid,int Storeid);
        int AddData(Production_Ord_Mas objEntry);
        bool AddDetData(Production_Ord_Mas obj,List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        bool UpdDetData(Production_Ord_Mas obj, List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        bool UpdateData(Production_Ord_Mas objupd);
        bool DeleteData(int id);
        IQueryable<Domain.ProcessOrderAddScreen> LoadMaingrid(int? cmpid, string closed,string buyrsamp,string processortype,int? prodordid,string prodord,string type,int? processorid,int? unitid,int? processid,string fromdate,string todate,int? buyerid,string orderno);
        IQueryable<Domain.ProcessOrderAddScreen> LoadMaingridord(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputJobdetgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputJobdetgrid(int prodid);
        IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputStkdet(int cmpid,int prodid,string prodordno);
        bool DeleteDetData(List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0);
        IQueryable<Domain.ProductionOrdAddLess> LoadEditAddlessgrid(int prodid);
    }
}
