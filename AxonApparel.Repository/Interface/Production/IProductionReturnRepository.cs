using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
     public interface IProductionReturnRepository
    {
         IQueryable<Domain.ProductionReturn> Getprocess(int cmpid, int cmunitid);
         IQueryable<Domain.ProductionReturn> Getsupp();
         IQueryable<Domain.ProductionReturn> Getbuyer(int cmpid, int cmunitid,int processid,int processorid);
         IQueryable<Domain.ProductionReturn> Getorder(int cmpid, int cmunitid, int processid, int processorid);
         IQueryable<Domain.ProductionReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid,int buyerid,string refno,string ordno,string ordtype,string procordtype);
         IQueryable<Domain.ProductionReturnItemDet> LoadItmdet(string prodord);
         int AddData(Production_Recpt_Mas objEntry);
         bool AddDetData(Production_Recpt_Mas obj,string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0);
         bool UpdDetData(Production_Recpt_Mas obj, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0);

         IQueryable<Domain.ProductionRecptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, string ordno);
         IQueryable<Domain.ProductionRecptMas> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid);
         IQueryable<Domain.ProductionReturnItemDet> LoadEditItmdet(int masid, string prodord);
         bool UpdateData(Production_Recpt_Mas objupd);
         bool DeleteDetData(string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0);
     }
}
