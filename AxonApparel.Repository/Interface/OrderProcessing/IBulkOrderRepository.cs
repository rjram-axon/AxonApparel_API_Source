
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IBulkOrderRepository 
    {
        //Buy_Ord_Mas1 AddBuyerOrderDetails(Buy_Ord_Mas1 objAd);
        //bool AddBuyerOrderNominatedSuppliers(string buyordNo,List<NominatedSupplier> nominatedSupplier);
        bool AddDetData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo);
        bool AmendData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo, int masid, string Mode);
        bool DeleteData(int Id);
        bool UpdateDetData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo, BuyerAmendDetails objAmdAd);
        Buy_Ord_Mas GetDataById(int id);
        Buy_Ord_Mas ListMainGrid(string RefNo);
        IEnumerable<Buy_Ord_Mas> GetDataListAll();
        IEnumerable<Buy_Ord_Mas> GetDataListTest(string RefNo);
        IQueryable<BulkOrder> GetDataMainList(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType, string DispatchClosed);
        IQueryable<BulkOrder> MainGetTargetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType);
        IList<BulkOrder> GetRepGetNomSupplier(int BMasId);
        IList<BulkOrder> GetRepGetNomItemSupplier(string Supplier,int BID);
        Buy_Ord_Mas CheckRefRep(string RefNo);
        IQueryable<BulkOrder> GetDataRepCheckPlanJobDetails(string OrdNo);
        
    }
    
}
