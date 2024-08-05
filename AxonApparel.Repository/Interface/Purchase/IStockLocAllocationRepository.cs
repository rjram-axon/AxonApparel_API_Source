using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IStockLocAllocationRepository
    {
       IQueryable<Domain.StockLocAllocation> GetStoreunit(int cmpid);
       IQueryable<Domain.StockLocAllocation> Gettranstype();
       IQueryable<Domain.StockLocAllocation> GetOrderno(int cmpid);
       IQueryable<Domain.StockLocAllocation> GetStyle(string orderno);
       IQueryable<Domain.StockLocAllocation> GetJobordno(string orderno);
       IQueryable<Domain.StockLocAllocation> GetTransno(int compid,int strunitid);
       IQueryable<Domain.StockLocAllocation> LoadItem(int compid, int suppid,string ordno,string refno,int strunitid,string transtype,string transno,string jobordno,int styleid,int itmgrpid);
       bool AddDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom,List<ItemStock> Stkdet,string Mode);
       IQueryable<Domain.StockAllocationMas> LoadMaingrid(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate, int AllocationID);
       IQueryable<Domain.StockAllocationMas> GetEditHeaderDet(int masid);
       IQueryable<Domain.StockLocAllocation> GetEditLoadItem(int masid,int compid,int strunitid);
       IQueryable<Domain.StockAllocationSection> GetEditSectionDet(int masid);
       bool UpdDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom, List<ItemStock> Stkdet, string Mode);
       bool DelDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom, List<ItemStock> Stkdet, string Mode);

       IQueryable<Domain.StockAllocationMas> LoadMaingriddrop(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate);
       IQueryable<Domain.StockAllocationSection> GetAlloStoreRepDetails(int? substoreid, int? entryid);
   }
}
