using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IStockAuditEntryRepository
    {
        IQueryable<StockAudit> GetDataDropRepDetails(int? BMasId, int? JobId, int? Styleid, string RefNo);
        IQueryable<StockAudit> GetDataDropProcessRepDetails();
        IList<StockAuditDet> GetRepSUItemRetLoad(int? Companyid, string OType, string StockType,string SupType, int? Itemid, int? item_Groupid, int? buyerid, int? Supplierid, int? StoreId, string Buy_Ord_no, string RefNo, string Job_Ord_no, int? Styleid, int? ProcessId);

        bool AddDetData(Stock_Audit_Mas objPoAUEntry,List<Stock_Audit_Det> objPoAUDet,string EntryNo,DateTime EntryDate);
        IQueryable<StockAudit> GetDataRepAudEditDetails(int Id);
        IList<StockAuditDet> GetRepAudEditItemRetLoad(int? Id);
        bool UpdateData(Stock_Audit_Mas objPoEEntry);
        bool DeleteData(Stock_Audit_Mas objPoDEntry);
    }
}
