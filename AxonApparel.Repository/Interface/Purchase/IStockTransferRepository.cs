using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IStockTransferRepository
    {
        IList<StockTransferDet> ListGetTfrRepItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? Processseqid,string Reqno);
        IList<StockTransferDet> LoadProcessSeq(int? Processid, string JobNo);
        IList<StockTransferDet> LoadReqno( string JobNo,int mod);
        bool AddDetData(List<StockTranStock> objPoAUDet, List<ItemStock> objPoItmStkDet, StockTranMasNew objPoAUEntry, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType);
        IQueryable<StockTransfer> GetDataOrderRepDetails(string FromDate, string ToDate);
        IQueryable<StockTransfer> GetDataTransRepDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid);
        IQueryable<StockTransfer> GetDataTransMainRepDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid, int? TrfID);
        IQueryable<StockTransfer> GetDataRepEditTrfDetails(int Id);
        IList<StockTransferDet> ListGetTfrRepEditItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? TfrId);
        IQueryable<StockTransferDet> GetPurchaseStockDet(int Compid, int Itemid, int Colorid, int Sizeid,int Uomid);
        bool UpdateDetData(List<StockTranStock> objPoEUDet, List<ItemStock> objPoItmEStkDet, StockTranMasNew objPoEUEntry, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType);
        bool DeleteData(List<StockTranStock> objPoDUDet, List<ItemStock> objPoItmDStkDet, int TfrId, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType);
        bool PurchaseStockTranfer(List<StockTransferDet> TOType);

        IQueryable<StockTransferDet> GetPurchaseStockDetApp(string Status, string FromDate, string ToDate);
        bool PurchaseStockTranferApp(List<StockTransferDet> TOType);
    }
}
