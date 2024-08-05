using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IOpeningStockRepository
    {
       IQueryable<Domain.ItmStkDet> GetItem(int itmgrpid,string itmcat);
       IQueryable<Domain.ItmStkDet> GetUom(int itmid);
       int AddData(ItemStock objEntry);
       bool AddDetData(List<ItemStock> objDet, List<Op_Stock> objstk, int companyid, string Transno, int CreBy, int StoreUnitID, string Remarks, string Mode, int Companyunitid);
       bool UpdateDetData(List<ItemStock> objDet, List<Op_Stock> objOPDet, int companyid, string Transno, int CreBy, int StoreUnitID, string Remarks, int Companyunitid);
       bool UpdateData(ItemStock objupd);
       IQueryable<Domain.ItmStkDet> GetDataMainList(string ordertype,  string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate);
       IQueryable<Domain.ItmStkDet> GetDataMain(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate);
       IQueryable<Domain.ItmStkDet> GetEditGrid(string transno);
       bool DeleteData(string transno);
       IQueryable<Domain.ItmStkDet> GetOrdno(string ordtype);
       IQueryable<Domain.ItmStkDet> ChkPlanned(string OrderNo, int Styleid, int Itemid, int Colorid, int Sizeid);
   }
}
