using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStockTransferBusiness
    {
        Response<IList<StockTransferDet>> LoadProcessSeq(int? Processid, string JobNo);
        Response<IList<StockTransferDet>> ListGetTfrItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? ProcessSeqid, string Reqno);
        Response<bool> CreateStockTransferEntry(StockTransfer POSUEntry);
        Response<IQueryable<StockTransfer>> GetDataOrderDetails(string FromDate, string ToDate);
        Response<IQueryable<StockTransfer>> GetDataTransDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid);
        Response<IQueryable<StockTransfer>> GetDataTransMainDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid, int? TransId);
        Response<IQueryable<StockTransfer>> GetTrfEditDetails(int Id);
        Response<IList<StockTransferDet>> ListGetTfrEditItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? TfrId);
        Response<bool> UpdateTransEntry(StockTransfer TransEEntry);
        Response<bool> DeleteTransEntry(StockTransfer PoDEntry);
        Response<IQueryable<StockTransferDet>> GetPurchaseStockDet(int Compid, int Itemid, int Colorid, int Sizeid,int Uomid);
        Response<bool> PurchaseStockTranfer(List<StockTransferDet> opj);
        Response<IList<StockTransferDet>> LoadReqno( string JobNo,int mod);

        Response<IQueryable<StockTransferDet>> GetPurchaseStockDetApp(string Status, string FromDate, string ToDate);
        Response<bool> PurchaseStockTranferApp(List<StockTransferDet> opj);
    }
}
