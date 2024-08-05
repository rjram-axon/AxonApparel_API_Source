using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IProductionReceiptRepository
    {
        IQueryable<Domain.ProductionRecptMas> Getprocess(int cmpid, int cmunitid, string ordtype);
        IQueryable<Domain.ProductionRecptMas> Getprocessor();
        IQueryable<Domain.ProductionRecptMas> Getwrkdiv();
        IQueryable<Domain.ProductionRecptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProductionRecptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed,int buyerid,string refno,string ordno,int clid,string procrtype);
        IQueryable<Domain.ProductionRecptMas> Loadorderno(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProductionRecptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProductionRecptDet> LoadItmgrid(string pid);
        IQueryable<Domain.ProductionRecptJobdet> Loadjobdetgrid(string pid);
        int AddData(Production_Recpt_Mas objEntry);
        bool AddDetData(Production_Recpt_Mas obj,string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0);
        bool UpdDetData(Production_Recpt_Mas obj, string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0);

        bool UpdateData( Production_Recpt_Mas objupd);
        bool DeleteDetData(string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0);
        IQueryable<Domain.ProductionRecptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid);
        IQueryable<Domain.ProductionRecptMas> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid);
        IQueryable<Domain.ProductionRecptDet> LoadEditItmgrid(int pid);
        IQueryable<Domain.ProductionRecptJobdet> LoadEditjobdetgrid(int pid);
        IQueryable<Domain.ProductionRecptDet> ChkDC(string recpt,int pid);
    }
}
