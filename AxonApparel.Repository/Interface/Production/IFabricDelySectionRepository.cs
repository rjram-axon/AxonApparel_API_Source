using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IFabricDelySectionRepository
    {
        IQueryable<FabricDelySection> GetFaricDelySectionOrderList(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid);
        IList<FabricDelySection> GetInputOutputDetails(int Prodprgid, string JobOrdNo, string Ordertype);
        IQueryable<CuttingOrderStockProperties> GetItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId);
        IQueryable<FabricDelyStockProperties> GetFabricItemStockInfoEditMode(int FabDelyIssueId, int ItemID, int ColorID, int SizeID);        
        IEnumerable<Domain.FabricDelySection> GetMainData(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate, int supplierid);
     
        IQueryable<FabricDelySection> GetFabricHeaderInfo(int FabricDelyIssueId);
        IList<FabricDelySection> GetInputOutputEdit(int FabricDelyIssueId, int Prodprgid);

        bool AddData1(FabDelySec_Issue_Mas obj, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, FabricDelySection_Mas FabDelySecAdd);
        bool UpdDetData(FabDelySec_Issue_Mas obj, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, FabricDelySection_Mas FabDelySecAdd);
        bool Delete(int id, string FabDelyIssueNo);

        bool UpdateReceipt(FabDelySec_Issue_Mas obj, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, FabricDelySection_Mas FabDelySecAdd);                
    }
}
