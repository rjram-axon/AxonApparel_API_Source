using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IStockLocAllocationBusiness
    {
        Response<IQueryable<Domain.StockLocAllocation>> GetStkStoreunit(int cmpid);
        Response<IQueryable<Domain.StockLocAllocation>> Gettranstype();
        Response<IQueryable<Domain.StockLocAllocation>> GetOrderno(int cmpid);
        Response<IQueryable<Domain.StockLocAllocation>> GetStyle(string orderno);
        Response<IQueryable<Domain.StockLocAllocation>> GetJobordno(string orderno);
        Response<IQueryable<Domain.StockLocAllocation>> GetTransno(int compid,int strunitid);
        Response<IQueryable<Domain.StockLocAllocation>> LoadItem(int compid, int suppid,string ordno,string refno,int strunitid,string transtype,string transno,string jobordno,int styleid,int itmgrpid);
        Response<bool> CreateUnitEntry(Domain.StockAllocationMas Entry);
        Response<IQueryable<Domain.StockAllocationMas>> LoadMaingrid(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate, int AllocationID);
        Response<IQueryable<Domain.StockAllocationMas>> GetEditHeaderDet(int masid);
       Response<IQueryable<Domain.StockLocAllocation>> GetEditLoadItem(int masid,int compid,int strunitid);
       Response<IQueryable<Domain.StockAllocationSection>> GetEditSectionDet(int masid);
       Response<bool> UpdateEntry(Domain.StockAllocationMas Entry);
       Response<bool> DeleteEntry(Domain.StockAllocationMas Entry);

       Response<IQueryable<Domain.StockAllocationSection>> GetDataGetAlloStore(int? substoreid, int? entryid);
       Response<IQueryable<Domain.StockAllocationMas>> LoadMaingriddrop(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate);
    }
}
