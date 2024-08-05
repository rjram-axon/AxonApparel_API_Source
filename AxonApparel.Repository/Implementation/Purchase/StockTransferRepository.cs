using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class StockTransferRepository : IStockTransferRepository
    {


        PurchaseEntities entities = new PurchaseEntities();

        public IList<StockTransferDet> ListGetTfrRepItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? Processseqid,string reqno)
        {
            int Sizeid = 0;

            var query = (from ID in entities.Proc_Apparel_GetStockTransferEntryItemDetails(string.IsNullOrEmpty(FOrdNo) ? "" : FOrdNo, string.IsNullOrEmpty(TOrdNo) ? "" : TOrdNo, FromStyleid == null ? 0 : FromStyleid, ToStyleid == null ? 0 : ToStyleid, FTransType, TTransType, FromCompId == null ? 0 : FromCompId, ToCompId == null ? 0 : ToCompId, ItemId == null ? 0 : ItemId, ColorId == null ? 0 : ColorId, Sizeid, ItemGroupId == null ? 0 : ItemGroupId, FromStoreUnitID == null ? 0 : FromStoreUnitID, ToStoreUnitID == null ? 0 : ToStoreUnitID, string.IsNullOrEmpty(FromRef) ? "" : FromRef, string.IsNullOrEmpty(ToRef) ? "" : ToRef, string.IsNullOrEmpty(FJOrdNo) ? "" : FJOrdNo, string.IsNullOrEmpty(TJOrdNo) ? "" : TJOrdNo, Processid == null ? 0 : Processid, Processseqid == null ? 0 : Processseqid, string.IsNullOrEmpty(reqno) ? "" : reqno)
                         select new StockTransferDet
                         {
                             Item = ID.Item,
                             ItemId = (int)ID.ItemID,
                             Color = ID.Color,
                             ColorId = (int)ID.ColorID,
                             Size = ID.Size,
                             SizeId = (int)ID.SizeID,
                             UomId = (int)ID.UomID,
                             Uom = ID.Uom,
                             StockId = ID.StockId,
                             StockDate = ID.Stockdate,
                             LotNo = ID.LotNo,
                             StkQty = (decimal)ID.StockQty,
                             TransNo = ID.TransNo,
                             SupplierId = ID.SupplierID,
                             Supplier = ID.Supplier,
                             Process = ID.Process,
                             ProcessId = (int)ID.ProcessId,
                             MrpRate = (decimal)ID.MRate,
                             PrgQty = (decimal)ID.Prg_Qty,
                             StoreId = (int)ID.storeunitid,
                             PrgDetId = (int)ID.PrgDetID,
                             TransQty = 0,
                             NewStockId = 0,
                             AllotedQty = 0,
                             EditTransQty = 0,



                         }).AsQueryable();

            return query.ToList();
        }

        public IList<StockTransferDet> LoadProcessSeq(int? Processid, string JobNo)
        {

            var query = (from ID in entities.Proc_Apparel_GetprogSeqnolistforStockTransfer(Processid, JobNo)
                         select new StockTransferDet
                         {
                             ProgramSeqno = (int)ID.Prog_Seq_No,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StockTransferDet> LoadReqno(string JobNo,int mod)
        {
            if (mod ==0)
            {

                var query = (from ID in entities.Proc_Apparel_GetRequeNoAdd(JobNo)
                             select new StockTransferDet
                             {
                                 ReqNo = ID.Spl_Req_No,
                                 ReqId = ID.Spl_Reqid
                             }).AsQueryable();

                return query.ToList();
            }
            else {

                var query = (from ID in entities.Proc_Apparel_GetRequeNo(mod)
                             select new StockTransferDet
                             {
                                 ReqNo = ID.Spl_Req_No,
                                 ReqId = ID.Spl_Reqid
                             }).AsQueryable();

                return query.ToList();
            
            
            }

        }


        public IQueryable<StockTransferDet> GetPurchaseStockDet(int Compid, int Itemid, int Colorid, int Sizeid,int Uomid)
        {


            IQueryable<StockTransferDet> query = (from ID in entities.Proc_Apparel_GetStockDetforStockRecon(Itemid, Colorid, Sizeid, Compid, Uomid)
                                                  select new StockTransferDet
                                                  {
                                                      Item = ID.item,
                                                      ItemId = (int)ID.itemid,
                                                      Color = ID.color,
                                                      ColorId = (int)ID.colorid,
                                                      Size = ID.size,
                                                      SizeId = (int)ID.sizeid,
                                                      UomId = (int)ID.UomId,
                                                      Uom = ID.Uom,
                                                      StockId = ID.StockId,
                                                      StkQty = (decimal)ID.balQty,
                                                      TransNo = ID.Transno,
                                                      Supplier = ID.Supplier,
                                                      OrderNo = ID.Order_No,
                                                      RefNo = ID.Ref_No,
                                                      WorkOrdNo = ID.Job_Ord_No,
                                                      StockType = ID.stocktype,
                                                      TransQty = 0,
                                                      NewStockId = 0,
                                                      StoreId = (int)ID.StoreUnitID,
                                                      stktransno = 0,
                                                      stkcompid = ID.CompanyId,
                                                      ItemCat = ID.ItemCat,
                                                      Etype = "",
                                                      Styleid = ID.StyleId,
                                                      Companyid = ID.CompanyId,
                                                      OrderStatus=ID.OrderStatus

                                                  }).AsQueryable();

            return query;
        }

        public IQueryable<StockTransferDet> GetPurchaseStockDetApp(string Status, string FromDate, string ToDate)
        {

            if (Status == "P")
            {

                IQueryable<StockTransferDet> query = (from ID in entities.Proc_Apparel_GetStockDetforStockReconApp(Status, FromDate, ToDate)

                                                      select new StockTransferDet
                                                      {
                                                          Item = ID.item,
                                                          ItemId = (int)ID.itemid,
                                                          Color = ID.color,
                                                          ColorId = (int)ID.colorid,
                                                          Size = ID.size,
                                                          SizeId = (int)ID.sizeid,
                                                          UomId = (int)ID.UomId,
                                                          Uom = ID.Uom,
                                                          StockId = ID.StockId,
                                                          StkQty = (decimal)ID.balQty,
                                                          TransNo = ID.Transno,
                                                          Supplier = ID.Supplier,
                                                          OrderNo = ID.Order_No,
                                                          RefNo = ID.Ref_No,
                                                          WorkOrdNo = ID.Job_Ord_No,
                                                          StockType = ID.stocktype,
                                                          TransQty = (decimal)ID.TransQty,
                                                          NewStockId = 0,
                                                          StoreId = (int)ID.StoreUnitID,
                                                          stktransno = 0,
                                                          stkcompid = ID.CompanyId,
                                                          ItemCat = ID.ItemCat,
                                                          Etype = ID.ToOrdertype,
                                                          Styleid = ID.StyleId,
                                                          Companyid = (int)ID.ToComp,
                                                          OrderStatus = ID.OrderStatus,
                                                          ToOrderno = ID.ToOrder,
                                                          ToStyleid = (int)ID.ToStyleid,
                                                          ReqBy = ID.Reqby,
                                                          Reqdate = (DateTime)ID.ReqDate,
                                                          Appby = ID.Appby,
                                                          Appdate = (DateTime)ID.Appdate,
                                                          AppStatus = "P",
                                                          ToStyle = ID.ToStyle,
                                                          Cancel = "",
                                                          StkAppId = ID.StkAppId
                                                      }).AsQueryable();

                return query;
            }
            else {

                IQueryable<StockTransferDet> query = (from ID in entities.Proc_Apparel_GetStockDetforStockReconApp(Status, FromDate, ToDate)

                                                      select new StockTransferDet
                                                      {
                                                          Item = ID.item,
                                                          ItemId = (int)ID.itemid,
                                                          Color = ID.color,
                                                          ColorId = (int)ID.colorid,
                                                          Size = ID.size,
                                                          SizeId = (int)ID.sizeid,
                                                          UomId = (int)ID.UomId,
                                                          Uom = ID.Uom,
                                                          StockId = ID.StockId,
                                                          StkQty = (decimal)ID.balQty,
                                                          TransNo = ID.Transno,
                                                          Supplier = ID.Supplier,
                                                          OrderNo = ID.Order_No,
                                                          RefNo = ID.Ref_No,
                                                          WorkOrdNo = ID.Job_Ord_No,
                                                          StockType = ID.stocktype,
                                                          TransQty = (decimal)ID.TransQty,
                                                          NewStockId = 0,
                                                          StoreId = (int)ID.StoreUnitID,
                                                          stktransno = 0,
                                                          stkcompid = ID.CompanyId,
                                                          ItemCat = ID.ItemCat,
                                                          Etype = ID.ToOrdertype,
                                                          Styleid = ID.StyleId,
                                                          Companyid = (int)ID.ToComp,
                                                          OrderStatus = ID.OrderStatus,
                                                          ToOrderno = ID.ToOrder,
                                                          ToStyleid = (int)ID.ToStyleid,
                                                          ReqBy = ID.Reqby,
                                                          Reqdate = (DateTime)ID.ReqDate,
                                                          Appby = ID.Appby,
                                                          Appdate = (DateTime)ID.Appdate,
                                                          AppStatus = "A",
                                                          ToStyle = ID.ToStyle,
                                                          Cancel = "",
                                                          StkAppId = ID.StkAppId,
                                                          StkTransferNo = ID.StkTransferNo,

                                                      }).AsQueryable();

                return query;
            
            
            }
        }



        public bool AddDetData(List<StockTranStock> objPoAUDet, List<ItemStock> objPoItmStkDet, StockTranMasNew objPoAUEntry, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType)
        {
            bool reserved = false;
            int TfrId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var id = entities.StockTranMasNew.Add(objPoAUEntry);
                    entities.SaveChanges();
                    TfrId = objPoAUEntry.TransferId;

                    foreach (var Stk in objPoItmStkDet)
                    {

                        var Pg1 = entities.Proc_Apparel_GetStockTransferItemStkUpdate(Stk.qty, Stk.StockId, TransDate, TransNo, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, ToCompId, FromStyleid, ToStyleid, TfrId, Stk.Itemid, Stk.Colorid, Stk.sizeid, Stk.Markup_Rate, Stk.processId, Processid, FOType, TOType, ToStoreUnitID, Stk.ShipRowId);
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IQueryable<StockTransfer> GetDataOrderRepDetails(string FromDate, string ToDate)
        {
            IQueryable<StockTransfer> query = (from cd1 in entities.Proc_Apparel_GetStockTransLoadMainOrderRefDropDown(FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                               select new StockTransfer
                                                {

                                                    FOrdNo = cd1.FMOrderNo,
                                                    FromRef = cd1.FMRefNo,
                                                    TOrdNo = cd1.TMOrderNo,
                                                    ToRef = cd1.TMRefNo,


                                                }).AsQueryable();
            return query;
        }


        public IQueryable<StockTransfer> GetDataTransRepDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid)
        {
            string TType = "";

            IQueryable<StockTransfer> query = (from cd1 in entities.Proc_Apparel_GetStockTransLoadMainTransNoDropDown(FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), string.IsNullOrEmpty(FOrdNo) ? "" : FOrdNo, string.IsNullOrEmpty(TOrdNo) ? "" : TOrdNo, string.IsNullOrEmpty(FromRef) ? "" : FromRef, string.IsNullOrEmpty(ToRef) ? "" : ToRef, Processid == null ? 0 : Processid, ItemGroupId == null ? 0 : ItemGroupId, TType)
                                               select new StockTransfer
                                               {

                                                   TransNo = cd1.TransNo,
                                                   TransferId = cd1.TransferId,


                                               }).AsQueryable();
            return query;
        }


        public IQueryable<StockTransfer> GetDataTransMainRepDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid, int? TrfID)
        {
            IQueryable<StockTransfer> query = (from cd4 in entities.Proc_Apparel_GetStockTransLoadMain(FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), string.IsNullOrEmpty(FOrdNo) ? "" : FOrdNo, string.IsNullOrEmpty(TOrdNo) ? "" : TOrdNo, string.IsNullOrEmpty(FromRef) ? "" : FromRef, string.IsNullOrEmpty(ToRef) ? "" : ToRef, Processid == null ? 0 : Processid, ItemGroupId == null ? 0 : ItemGroupId, TrfID == null ? 0 : TrfID)
                                               select new StockTransfer
                                               {

                                                   TransferId = cd4.TransferId,
                                                   TransNo = cd4.TransNo,
                                                   FTransType = cd4.TType,
                                                   Process = cd4.Process,
                                                   TransDate = (DateTime)cd4.TransDate,
                                                   ToComp = cd4.ToCompany,
                                                   ItemGroup = cd4.ItemGroup,


                                               }).AsQueryable();
            return query;
        }


        public IQueryable<StockTransfer> GetDataRepEditTrfDetails(int Id)
        {
            IQueryable<StockTransfer> query = (from a in entities.Proc_Apparel_GetStockTransferEditDetails(Id)
                                               select new StockTransfer
                                                {
                                                    TransferId = a.TransferID,
                                                    TransNo = a.TransNo,
                                                    TransDate = (DateTime)a.TransDate,
                                                    Process = a.Process,
                                                    Processid = a.ProcessId,
                                                    FromStyleid = a.FromStyleid,
                                                    ToComp = a.TCompany,
                                                    ToCompId = a.TCompanyID,
                                                    TOrdNo = a.TMOrderNo,
                                                    TJOrdNo = a.ToRef,
                                                    ToRef = a.TMRefNo,
                                                    FromRef = a.FMRefNo,
                                                    ToStyleid = a.ToStyleid,
                                                    FromStyle = a.FStyle,
                                                    ToStyle = a.TStyle,
                                                    ItemGroup = a.Item_Group,
                                                    ItemGroupId = a.item_GroupID,
                                                    FTransType = a.TransType,
                                                    FromCompId = a.FCompanyID,
                                                    FroComp = a.FCompany,
                                                    Remarks = a.Remarks,
                                                    FBMasId = (int)a.FMBMasId,
                                                    TBMasId = (int)a.TMBMasId,
                                                    FJobId = a.FromRefJobId,
                                                    TJobId = a.ToRefJobId,
                                                    ToStoreUnitID = a.ToStoreUnitId,
                                                    FromStoreUnitID = a.FromStoreUnitId
                                                }).AsQueryable();

            return query;
        }


        public IList<StockTransferDet> ListGetTfrRepEditItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? TfrId)
        {
            int Sizeid = 0;

            var query = (from ID in entities.Proc_Apparel_GetStockTransferEditItemDetails(string.IsNullOrEmpty(FOrdNo) ? "" : FOrdNo, string.IsNullOrEmpty(TOrdNo) ? "" : TOrdNo, FromStyleid == null ? 0 : FromStyleid, ToStyleid == null ? 0 : ToStyleid, FTransType, TTransType, FromCompId == null ? 0 : FromCompId, ToCompId == null ? 0 : ToCompId, ItemId == null ? 0 : ItemId, ColorId == null ? 0 : ColorId, Sizeid, ItemGroupId == null ? 0 : ItemGroupId, FromStoreUnitID == null ? 0 : FromStoreUnitID, ToStoreUnitID == null ? 0 : ToStoreUnitID, string.IsNullOrEmpty(FromRef) ? "" : FromRef, string.IsNullOrEmpty(ToRef) ? "" : ToRef, string.IsNullOrEmpty(FJOrdNo) ? "" : FJOrdNo, string.IsNullOrEmpty(TJOrdNo) ? "" : TJOrdNo, Processid == null ? 0 : Processid, TfrId == null ? 0 : TfrId)
                         select new StockTransferDet
                         {
                             Item = ID.Item,
                             ItemId = (int)ID.ItemID,
                             Color = ID.Color,
                             ColorId = (int)ID.ColorID,
                             Size = ID.Size,
                             SizeId = (int)ID.SizeID,
                             UomId = (int)ID.UomID,
                             Uom = ID.Uom,
                             StockId = ID.StockId,
                             //StockDate = ID.Stockdate,
                             LotNo = ID.LotNo,
                             StkQty = (decimal)ID.StockQty,
                             TransNo = ID.TransNo,
                             SupplierId = ID.SupplierID,
                             Supplier = ID.Supplier,
                             Process = ID.Process,
                             ProcessId = (int)ID.ProcessId,
                             MrpRate = (decimal)ID.MRate,
                             PrgQty = (decimal)(ID.Prg_Qty + ID.TransQty),
                             //StoreId = (int)ID.storeunitid,
                             PrgDetId = (int)ID.PrgDetID,
                             TransQty = (decimal)ID.TransQty,
                             NewStockId = (int)ID.NewStockID,
                             AllotedQty = 0,
                             EditTransQty = (decimal)ID.TransQty,



                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(List<StockTranStock> objPoEUDet, List<ItemStock> objPoItmEStkDet, StockTranMasNew objPoEUEntry, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var App = entities.StockTranMasNew.Where(c => c.TransferId == objPoEUEntry.TransferId).FirstOrDefault();
                    if (App != null)
                    {

                        App.Remarks = objPoEUEntry.Remarks;
                        App.ToStoreUnitID = objPoEUEntry.ToStoreUnitID;

                    }
                    entities.SaveChanges();

                    foreach (var StkDet in objPoEUDet)
                    {
                        int NStockId = (int)StkDet.NEWSTOCKID;
                        int PrgDetid = 0;

                        foreach (var Stk in objPoItmEStkDet)
                        {
                            if (StkDet.FromStockId == Stk.StockId)
                            {
                                var Pg1 = entities.Proc_Apparel_GetStockTransferEditItemStkUpdate(Stk.qty, Stk.sQty, Stk.StockId, NStockId, TransDate, TransNo, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, ToCompId, FromStyleid, ToStyleid, objPoEUEntry.TransferId, Stk.Itemid, Stk.Colorid, Stk.sizeid, Stk.Markup_Rate, Stk.processId, Processid, FOType, TOType, Stk.ShipRowId, objPoEUEntry.ToStoreUnitID, Stk.ShipRowId);
                                entities.SaveChanges();
                            }
                        }
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool DeleteData(List<StockTranStock> objPoDUDet, List<ItemStock> objPoItmDStkDet, int TfrId, string TransNo, DateTime TransDate, string FOrdNo, string FJOrdNo, string TOrdNo, string TJOrdNo, int FromStyleid, int ToStyleid, int ToStoreUnitID, int ToCompId, int Processid, string FOType, string TOType)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var StkDet in objPoDUDet)
                    {
                        int NStockId = (int)StkDet.NEWSTOCKID;
                        int PrgDetid = 0;

                        foreach (var Stk in objPoItmDStkDet)
                        {
                            if (StkDet.FromStockId == Stk.StockId)
                            {
                                var Pg1 = entities.Proc_Apparel_GetStockTransferDeleteItemStkUpdate(Stk.qty, Stk.sQty, Stk.StockId, NStockId, TransDate, TransNo, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, ToCompId, FromStyleid, ToStyleid, TfrId, Stk.Itemid, Stk.Colorid, Stk.sizeid, Stk.Markup_Rate, Stk.processId, Processid, FOType, TOType, Stk.ShipRowId);
                                entities.SaveChanges();
                            }
                        }
                    }

                    var detlist = entities.StockTranStock.Where(c => c.TransferId == TfrId).ToList();
                    foreach (var det in detlist)
                    {
                        entities.StockTranStock.Remove(det);
                    }
                    entities.SaveChanges();

                    var mas = entities.StockTranMasNew.Where(c => c.TransferId == TfrId).FirstOrDefault();
                    entities.StockTranMasNew.Remove(mas);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool PurchaseStockTranfer(List<StockTransferDet> opj)
        {
            bool reserved = false;
            int TfrId = 0;
            string Transno = "";
            string tojobno = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //int trnsferno = 0;
                    foreach (var Stk in opj)
                    {
                        //if (trnsferno != Stk.stktransno)
                        //{
                        //    var tran = entities.Proc_Apparel_GetStockTransNo(Stk.Companyid).FirstOrDefault();

                        //    Transno = tran.ToString();
                        //    trnsferno = Stk.stktransno;
                            string toref="";
                            int  tosty=0;

                            var fromref = entities.buy_ord_style.Where(c => c.order_no == Stk.ToOrderno && c.Styleid == Stk.ToStyleid).FirstOrDefault();
                            if (fromref != null)
                            {
                                toref = fromref.WORKORDER;
                                tojobno = fromref.WORKORDER;
                                tosty = fromref.Styleid;
                            }
                            else {
                                toref = "";
                                tojobno = "";
                                tosty = 0;
                            }


                            //StockTranMasNew masdet = new StockTranMasNew()
                            //{
                            //    TransNo=Transno,
                            //    TransDate = Convert.ToDateTime(Stk.Transdate),
                            //    FromCompId = Stk.stkcompid,
                            //    ToCompId = Stk.stkcompid,
                            //    TransType = Stk.ItemCat + Stk.Etype,
                            //    FromRef = Stk.WorkOrdNo,
                            //    FromStyleid = Stk.Styleid,
                            //    ToRef = toref,
                            //    ToStyleid = tosty,
                            //    ItemGroupId = 0,
                            //    Processid = 0,
                            //    FromStoreUnitID = Stk.StoreId,
                            //    ToStoreUnitID = Stk.StoreId,
                            //    CreatedBy = Stk.Createdby,
                               
                            //    Remarks = "Stock Transfer from Purchase Entry",
                            //};


                            //var id = entities.StockTranMasNew.Add(masdet);
                            //entities.SaveChanges();
                            //TfrId = masdet.TransferId;
                       // }

                            
                        StockTransfer_Approval appadd =new StockTransfer_Approval{
                        
                              StkAppId =0,
                              ToComp =Stk.Companyid,
                              ToOrder =Stk.ToOrderno ,
                              ToStyleid =Stk.ToStyleid,
                              Fromstockid =Stk.StockId,
                              StockTransid =0,
                              TransQty =Stk.TransQty,
                              Ordtype =Stk.Etype,
                              AppStatus ="P",
                              Reqdate = Convert.ToDateTime(Stk.Transdate),
                              ReqBy=Stk.Createdby
                        
                        };

                        var app = entities.StockTransfer_Approval.Add(appadd);
                        entities.SaveChanges();





                    }


                    foreach (var itm in opj)
                    {

                        var Pg1 = entities.Proc_Apparel_UpdateStockTransferReq(itm.TransQty, itm.StockId, Convert.ToDateTime(itm.Transdate), Transno, itm.OrderNo, itm.ToOrderno, itm.WorkOrdNo, tojobno, itm.Companyid, itm.Styleid, itm.ToStyleid, TfrId, itm.ItemId, itm.ColorId, itm.SizeId, itm.MrpRate, itm.ProcessId, itm.ProcessId, itm.ItemCat, itm.Etype, itm.StoreId, 0);
                        entities.SaveChanges();

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool PurchaseStockTranferApp(List<StockTransferDet> opj)
        {
            bool reserved = false;
            int TfrId = 0;
            string Transno = "";
            string tojobno = "";

            int chktransid=0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //int trnsferno = 0;
                    foreach (var Stk in opj)
                    {

                        if (Stk.AppStatus == "A") {

                            var app = entities.StockTransfer_Approval.Where(c => c.StkAppId == Stk.StkAppId).FirstOrDefault();
                            chktransid=(int)app.StockTransid;


                            var app1 = entities.StockTransfer_Approval.Where(c => c.StkAppId == Stk.StkAppId).FirstOrDefault();
                            app1.AppStatus = "A";
                            entities.SaveChanges();

                            if(chktransid==0)
                            {
                            var tran = entities.Proc_Apparel_GetStockTransNo(Stk.Companyid).FirstOrDefault();

                             Transno = tran.ToString();
                             //trnsferno = Stk.stktransno;

                             string toref = "";
                             int tosty = 0;

                             var fromref = entities.buy_ord_style.Where(c => c.order_no == Stk.ToOrderno && c.Styleid == Stk.ToStyleid).FirstOrDefault();
                             if (fromref != null)
                             {
                                 toref = fromref.WORKORDER;
                                 tojobno = fromref.WORKORDER;
                                 tosty = fromref.Styleid;
                             }
                             else
                             {
                                 toref = "";
                                 tojobno = "";
                                 tosty = 0;
                             }


                             StockTranMasNew masdet = new StockTranMasNew()
                             {
                                 TransNo = Transno,
                                 TransDate = Convert.ToDateTime(Stk.Appdate),
                                 FromCompId = Stk.stkcompid,
                                 ToCompId = Stk.stkcompid,
                                 TransType = Stk.ItemCat + Stk.Etype,
                                 FromRef = Stk.WorkOrdNo,
                                 FromStyleid = Stk.Styleid,
                                 ToRef = toref,
                                 ToStyleid = tosty,
                                 ItemGroupId = 0,
                                 Processid = 0,
                                 FromStoreUnitID = Stk.StoreId,
                                 ToStoreUnitID = Stk.StoreId,
                                 CreatedBy = Stk.Createdby,

                                 Remarks = "Stock Transfer from request",
                             };


                             var id = entities.StockTranMasNew.Add(masdet);
                             entities.SaveChanges();
                             TfrId = masdet.TransferId;

                             var Pg1 = entities.Proc_Apparel_ReqStockTransferItemStkAdd(Stk.TransQty, Stk.StockId, Convert.ToDateTime(Stk.Appdate), Transno, Stk.OrderNo, Stk.ToOrderno, Stk.WorkOrdNo, tojobno, Stk.Companyid, Stk.Styleid, Stk.ToStyleid, TfrId, Stk.ItemId, Stk.ColorId, Stk.SizeId, Stk.MrpRate, Stk.ProcessId, Stk.ProcessId, Stk.ItemCat, Stk.Etype, Stk.StoreId, 0);
                             entities.SaveChanges();

                            var stktran = entities.StockTransfer_Approval.Where(c => c.StkAppId == Stk.StkAppId).FirstOrDefault();
                            app.StockTransid = TfrId;
                            entities.SaveChanges();

                            }

                        }


                        else if (Stk.AppStatus == "P") {

                            var app = entities.StockTransfer_Approval.Where(c => c.StkAppId == Stk.StkAppId).FirstOrDefault();
                            chktransid = (int)app.StockTransid;

                            if (chktransid > 0) {

                            var stktranmas = entities.StockTranMasNew.Where(c => c.TransferId == chktransid).FirstOrDefault();


                            // stockTransdet delete
                            var transtk = entities.StockTranStock.Where(t => t.TransferId == chktransid).ToList();


                            foreach (var tit in transtk)
                            {
                                entities.StockTranStock.Remove(tit);
                                entities.SaveChanges();
                            }

                                // stock delete
                                var itemstock =entities.ItemStock.Where(t=>t.Transno==stktranmas.TransNo).ToList();


                                foreach (var it in itemstock)
                                {
                                    entities.ItemStock.Remove(it);
                                    entities.SaveChanges();
                                }

                                // outward delete

                                var itemstockout = entities.Item_stock_outward.Where(t => t.TransNo == stktranmas.TransNo).ToList();


                                foreach (var ito in itemstockout)
                                {
                                    entities.Item_stock_outward.Remove(ito);
                                    entities.SaveChanges();
                                }

                                //mas delete

                                entities.StockTranMasNew.Remove(stktranmas);
                                entities.SaveChanges();
                            
                            }

                            app.StockTransid = 0;
                            app.AppStatus = "P";
                            entities.SaveChanges();

                            if (Stk.Cancel == "C") {

                                var Pg1 = entities.Proc_Apparel_RejectStockTransferReq(Stk.TransQty, Stk.StockId, Convert.ToDateTime(Stk.Appdate), Transno, Stk.OrderNo, Stk.ToOrderno, Stk.WorkOrdNo, tojobno, Stk.Companyid, Stk.Styleid, Stk.ToStyleid, TfrId, Stk.ItemId, Stk.ColorId, Stk.SizeId, Stk.MrpRate, Stk.ProcessId, Stk.ProcessId, Stk.ItemCat, Stk.Etype, Stk.StoreId, 0);
                                entities.SaveChanges();

                                entities.StockTransfer_Approval.Remove(app);
                                entities.SaveChanges();
                            
                            }

                        }


                        //if (trnsferno != Stk.stktransno)
                        //{
                        //    var tran = entities.Proc_Apparel_GetStockTransNo(Stk.Companyid).FirstOrDefault();

                        //    Transno = tran.ToString();
                        //    trnsferno = Stk.stktransno;
                        //string toref = "";
                        //int tosty = 0;

                        //var fromref = entities.buy_ord_style.Where(c => c.order_no == Stk.ToOrderno && c.Styleid == Stk.ToStyleid).FirstOrDefault();
                        //if (fromref != null)
                        //{
                        //    toref = fromref.WORKORDER;
                        //    tojobno = fromref.WORKORDER;
                        //    tosty = fromref.Styleid;
                        //}
                        //else
                        //{
                        //    toref = "";
                        //    tojobno = "";
                        //    tosty = 0;
                        //}


                        //StockTranMasNew masdet = new StockTranMasNew()
                        //{
                        //    TransNo=Transno,
                        //    TransDate = Convert.ToDateTime(Stk.Transdate),
                        //    FromCompId = Stk.stkcompid,
                        //    ToCompId = Stk.stkcompid,
                        //    TransType = Stk.ItemCat + Stk.Etype,
                        //    FromRef = Stk.WorkOrdNo,
                        //    FromStyleid = Stk.Styleid,
                        //    ToRef = toref,
                        //    ToStyleid = tosty,
                        //    ItemGroupId = 0,
                        //    Processid = 0,
                        //    FromStoreUnitID = Stk.StoreId,
                        //    ToStoreUnitID = Stk.StoreId,
                        //    CreatedBy = Stk.Createdby,

                        //    Remarks = "Stock Transfer from Purchase Entry",
                        //};


                        //var id = entities.StockTranMasNew.Add(masdet);
                        //entities.SaveChanges();
                        //TfrId = masdet.TransferId;
                        // }

                        //foreach (var itm in opj)
                        //{
                        //    if (itm.stktransno == trnsferno)
                        //    {
                        //        var Pg1 = entities.Proc_Apparel_GetStockTransferItemStkUpdate(itm.TransQty, Stk.StockId, Convert.ToDateTime(Stk.Transdate), Transno, Stk.OrderNo, Stk.ToOrderno, Stk.WorkOrdNo, tojobno, Stk.Companyid, Stk.Styleid, Stk.ToStyleid, TfrId, Stk.ItemId, Stk.ColorId, Stk.SizeId, Stk.MrpRate, Stk.ProcessId, Stk.ProcessId, Stk.ItemCat, Stk.Etype, Stk.StoreId, 0);
                        //        entities.SaveChanges();
                        //    }
                        //}

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

    }
}
