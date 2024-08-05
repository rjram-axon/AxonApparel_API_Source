using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
    public interface IPurchaseReturnEntryRepository
    {
        IQueryable<PurchaseOrder> GetDataSuppRepDetails(int? CompId);
        IQueryable<PurchaseOrder> GetDataGrnRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType);
        IQueryable<PurchaseOrder> GetDataPoRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType);
        IQueryable<PurchaseOrder> GetDataWrkRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id);
        IQueryable<PurchaseOrder> GetDataOrdRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id);
        IQueryable<PurchaseOrder> GetDataStyRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, string OrderNo, string job_ord_no);
        IQueryable<PurchaseOrder> GetDataDcRepDetails(int? GrnMasId, string Purchase_Type);
        IList<PurchaseReturnDet> GetRepGrnItemRetLoad(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType);
        //int AddData(Pur_return_mas objPoEntry);
        //bool AddDetData(Pur_return_mas objPoEntry,List<Pur_Return_Det> objPoDet);
        bool StockOutData(Pur_return_mas objPoEntry,List<Pur_Return_Det> objPoDet,List<Item_stock_outward> objPoAOutDet,string PurOrGrn,string RetNo);
        IQueryable<PurchaseReturn> GetDataRepRetEditDetails(int Id);
        IList<PurchaseReturnDet> GetRepGrnEditItemRetLoad(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType,int? Return_ID);
        //bool UpdateData(Pur_return_mas objPoEEntry);
        //bool UpdateDetData(List<Pur_Return_Det> objPoEDet);
        bool UpdateStockOutData(Pur_return_mas objPoEEntry,List<Item_stock_outward> objPoOutDet, string PurOrGrn, string Retno);
        bool DeleteStockOutData(Pur_return_mas objPoEEntry, List<Item_stock_outward> objPoOutDet, string PurOrGrn, string Retno);
        //bool UpdateStockOutInsData(List<Item_stock_outward> objPoOutDet, string PurOrGrn, string Retno);
    }
}
