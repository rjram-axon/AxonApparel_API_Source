using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IStockAuditEntryBusiness
    {
       Response<IQueryable<StockAudit>> GetDataDropDetails(int? BMasId,int? JobId,int? Styleid,string RefNo);
       Response<IQueryable<StockAudit>> GetDataProcessDropDetails();
       Response<IList<StockAuditDet>> ListGetSUItemDetails(int? Companyid, string OType, string StockType,string SupType, int? Itemid, int? item_Groupid, int? buyerid, int? Supplierid, int? StoreId, string Buy_Ord_no, string RefNo, string Job_Ord_no, int? Styleid, int? ProcessId);
       Response<bool> CreateStockAuditEntry(StockAudit POAUEntry);
       Response<IQueryable<StockAudit>> GetDataPurAudEditDetails(int Id);
       Response<IList<StockAuditDet>> ListGetEditAudDetails(int? Id);
       Response<bool> UpdatePoAuEntry(StockAudit PoEEntry);
       Response<bool> DeleteAudit(StockAudit PoDEntry);
    }
}
