using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class StockTransferBusiness : IStockTransferBusiness
    {


        IStockTransferRepository STRK = new StockTransferRepository();



        public Response<IList<StockTransferDet>> LoadProcessSeq(int? Processid, string JobNo)
        {
            try
            {
                var CurRGList = STRK.LoadProcessSeq(Processid, JobNo);

                return new Response<IList<StockTransferDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockTransferDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StockTransferDet>> LoadReqno( string JobNo,int mod)
        {
            try
            {
                var CurRGList = STRK.LoadReqno(JobNo, mod);

                return new Response<IList<StockTransferDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockTransferDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<StockTransferDet>> ListGetTfrItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? ProcessSeqid,string Reqno)
        {
            try
            {
                var CurRGList = STRK.ListGetTfrRepItemDetails(FromCompId, ToCompId, FTransType, FSTransType, TTransType, TSTransType, ItemId, ColorId, ItemGroupId, FromStoreUnitID, ToStoreUnitID, MillId, FromStyleid, ToStyleid, FromRef, ToRef, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, Processid, ProcessSeqid, Reqno);

                return new Response<IList<StockTransferDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockTransferDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateStockTransferEntry(StockTransfer POSUEntry)
        {

            int? LotID = 0;
            int? TLotID = 0;
            int? TStoreID = 0;
            string TType = "";
            string TJobno = "";
            try
            {
                //if (POSUEntry.TJOrdNo == "")
                //{
                //    TJobno = null;
                //}
                //else {
                //    TJobno = POSUEntry.TJOrdNo;
                //}

                if (POSUEntry.FromLotid == 0)
                {
                    LotID = null;
                }
                else
                {
                    LotID = POSUEntry.FromLotid;
                }

                if (POSUEntry.ToLotid == 0)
                {
                    TLotID = null;
                }
                else
                {
                    TLotID = POSUEntry.ToLotid;
                }

                if (POSUEntry.ToStoreUnitID == 0)
                {
                    TStoreID = null;
                }
                else
                {
                    TStoreID = POSUEntry.ToStoreUnitID;
                }


                if (POSUEntry.FTransType == "B" && POSUEntry.TTransType == "B")
                {
                    TType = "BB";
                }
                else if (POSUEntry.FTransType == "B" && POSUEntry.TTransType == "S")
                {
                    TType = "BS";
                }
                else if (POSUEntry.FTransType == "B" && POSUEntry.TTransType == "G")
                {
                    TType = "BG";
                }
                else if (POSUEntry.FTransType == "S" && POSUEntry.TTransType == "B")
                {
                    TType = "SB";

                }
                else if (POSUEntry.FTransType == "S" && POSUEntry.TTransType == "S")
                {
                    TType = "SS";
                }
                else if (POSUEntry.FTransType == "S" && POSUEntry.TTransType == "G")
                {
                    TType = "SG";
                }
                else if (POSUEntry.FTransType == "G" && POSUEntry.TTransType == "B")
                {
                    TType = "GB";
                }
                else if (POSUEntry.FTransType == "G" && POSUEntry.TTransType == "S")
                {
                    TType = "GS";
                }
                else if (POSUEntry.FTransType == "G" && POSUEntry.TTransType == "G")
                {
                    TType = "GG";
                }

                else if (POSUEntry.FTransType == "G" && POSUEntry.TTransType == "R")
                {
                    TType = "GR";
                }
                else if (POSUEntry.FTransType == "B" && POSUEntry.TTransType == "R")
                {
                    TType = "BR";
                }

                else if (POSUEntry.FTransType == "S" && POSUEntry.TTransType == "R")
                {
                    TType = "SR";
                }


                AxonApparel.Repository.StockTranMasNew StkTfrInsert = new AxonApparel.Repository.StockTranMasNew
                {
                    TransNo = POSUEntry.TransNo,
                    TransDate = POSUEntry.TransDate,
                    FromCompId = POSUEntry.FromCompId,
                    ToCompId = POSUEntry.ToCompId,
                    Remarks = POSUEntry.Remarks,
                    TransType = TType,
                    FromRef = POSUEntry.FJOrdNo,
                    ToRef = POSUEntry.TJOrdNo,
                    CreatedBy = POSUEntry.CreatedBy,
                    FromStoreUnitID = POSUEntry.FromStoreUnitID,
                    ToStoreUnitID = TStoreID,
                    FromLotid = LotID,
                    ToLotid = TLotID,
                    FromStyleid = POSUEntry.FromStyleid,
                    ToStyleid = POSUEntry.ToStyleid,
                    ItemGroupId = POSUEntry.ItemGroupId,
                    Processid = POSUEntry.Processid,

                };



                var ItmList = new List<StockTranStock>();

                foreach (var PItem in POSUEntry.StockTransDet)
                {




                    if (PItem.TransQty > 0)
                    {

                        ItmList.Add(new StockTranStock
                        {
                            TransferId = PItem.TrasId,
                            FromStockId = PItem.StockId,
                            TransQty = PItem.TransQty,
                            Markup_Rate = PItem.MrpRate,
                            NEWSTOCKID = PItem.NewStockId,

                        });
                    }
                }

                var SKList = new List<ItemStock>();

                foreach (var SItem in POSUEntry.StockTransDet)
                {




                    if (SItem.TransQty > 0)
                    {

                        SKList.Add(new ItemStock
                        {
                            Itemid = SItem.ItemId,
                            Colorid = SItem.ColorId,
                            sizeid = SItem.SizeId,
                            uomid = SItem.UomId,
                            StockId = SItem.StockId,
                            Markup_Rate = SItem.MrpRate,
                            qty = SItem.TransQty,
                            transdate = POSUEntry.TransDate,
                            StockDate = POSUEntry.TransDate,
                            Transno = POSUEntry.TransNo,
                            processId = SItem.ProcessId,
                            ShipRowId = SItem.PrgDetId,//For Load ProdPrgid in Itemstock



                        });
                    }
                }

                var result = STRK.AddDetData(ItmList, SKList, StkTfrInsert, POSUEntry.TransNo, POSUEntry.TransDate, POSUEntry.FOrdNo, POSUEntry.FJOrdNo, POSUEntry.TOrdNo, POSUEntry.TJOrdNo, POSUEntry.FromStyleid, POSUEntry.ToStyleid, POSUEntry.ToStoreUnitID, POSUEntry.ToCompId, POSUEntry.Processid, POSUEntry.FTransType, POSUEntry.TTransType);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockTransfer>> GetDataOrderDetails(string FromDate, string ToDate)
        {
            try
            {
                var PWO = STRK.GetDataOrderRepDetails(FromDate, ToDate);

                return new Response<IQueryable<StockTransfer>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockTransfer>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.StockTransferDet>> GetPurchaseStockDet(int Compid, int Itemid, int Colorid, int Sizeid,int Uomid)
        {
            try
            {
                var PWO = STRK.GetPurchaseStockDet(Compid, Itemid, Colorid, Sizeid,Uomid);

                return new Response<IQueryable<Domain.StockTransferDet>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockTransferDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockTransfer>> GetDataTransDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid)
        {
            try
            {
                var PWO = STRK.GetDataTransRepDetails(FromDate, ToDate, FOrdNo, TOrdNo, FromRef, ToRef, ItemGroupId, Processid);

                return new Response<IQueryable<StockTransfer>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockTransfer>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockTransfer>> GetDataTransMainDetails(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid, int? TransId)
        {
            try
            {
                var PWO = STRK.GetDataTransMainRepDetails(FromDate, ToDate, FOrdNo, TOrdNo, FromRef, ToRef, ItemGroupId, Processid, TransId);

                return new Response<IQueryable<StockTransfer>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockTransfer>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockTransfer>> GetTrfEditDetails(int Id)
        {
            try
            {
                var ProdutWO = STRK.GetDataRepEditTrfDetails(Id);

                return new Response<IQueryable<StockTransfer>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockTransfer>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StockTransferDet>> ListGetTfrEditItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? TfrId)
        {
            try
            {
                var CurRGList = STRK.ListGetTfrRepEditItemDetails(FromCompId, ToCompId, FTransType, FSTransType, TTransType, TSTransType, ItemId, ColorId, ItemGroupId, FromStoreUnitID, ToStoreUnitID, MillId, FromStyleid, ToStyleid, FromRef, ToRef, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, Processid, TfrId);

                return new Response<IList<StockTransferDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockTransferDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateTransEntry(StockTransfer TransEEntry)
        {
            int? LotID = 0;
            int? TLotID = 0;
            int? TStoreID = 0;
            string TType = "";
            try
            {


                if (TransEEntry.FromLotid == 0)
                {
                    LotID = null;
                }
                else
                {
                    LotID = TransEEntry.FromLotid;
                }

                if (TransEEntry.ToLotid == 0)
                {
                    TLotID = null;
                }
                else
                {
                    TLotID = TransEEntry.ToLotid;
                }

                if (TransEEntry.ToStoreUnitID == 0)
                {
                    TStoreID = null;
                }
                else
                {
                    TStoreID = TransEEntry.ToStoreUnitID;
                }


                if (TransEEntry.FTransType == "B" && TransEEntry.TTransType == "B")
                {
                    TType = "BB";
                }
                else if (TransEEntry.FTransType == "B" && TransEEntry.TTransType == "S")
                {
                    TType = "BS";
                }
                else if (TransEEntry.FTransType == "B" && TransEEntry.TTransType == "G")
                {
                    TType = "BG";
                }
                else if (TransEEntry.FTransType == "S" && TransEEntry.TTransType == "B")
                {
                    TType = "SB";

                }
                else if (TransEEntry.FTransType == "S" && TransEEntry.TTransType == "S")
                {
                    TType = "SS";
                }
                else if (TransEEntry.FTransType == "S" && TransEEntry.TTransType == "G")
                {
                    TType = "SG";
                }
                else if (TransEEntry.FTransType == "G" && TransEEntry.TTransType == "B")
                {
                    TType = "GB";
                }
                else if (TransEEntry.FTransType == "G" && TransEEntry.TTransType == "S")
                {
                    TType = "GS";
                }
                else if (TransEEntry.FTransType == "G" && TransEEntry.TTransType == "G")
                {
                    TType = "GG";
                }

                else if (TransEEntry.FTransType == "G" && TransEEntry.TTransType == "R")
                {
                    TType = "GR";
                }
                else if (TransEEntry.FTransType == "B" && TransEEntry.TTransType == "R")
                {
                    TType = "BR";
                }

                else if (TransEEntry.FTransType == "S" && TransEEntry.TTransType == "R")
                {
                    TType = "SR";
                }



                AxonApparel.Repository.StockTranMasNew StkTfrEdit = new AxonApparel.Repository.StockTranMasNew
                {
                    TransNo = TransEEntry.TransNo,
                    TransDate = TransEEntry.TransDate,
                    FromCompId = TransEEntry.FromCompId,
                    ToCompId = TransEEntry.ToCompId,
                    Remarks = TransEEntry.Remarks,
                    TransType = TType,
                    FromRef = TransEEntry.FJOrdNo,
                    ToRef = TransEEntry.TJOrdNo,
                    CreatedBy = TransEEntry.CreatedBy,
                    FromStoreUnitID = TransEEntry.FromStoreUnitID,
                    ToStoreUnitID = TStoreID,
                    FromLotid = LotID,
                    ToLotid = TLotID,
                    FromStyleid = TransEEntry.FromStyleid,
                    ToStyleid = TransEEntry.ToStyleid,
                    ItemGroupId = TransEEntry.ItemGroupId,
                    Processid = TransEEntry.Processid,
                    TransferId = TransEEntry.TransferId,

                };


                var ItmList = new List<StockTranStock>();

                foreach (var PItem in TransEEntry.StockTransDet)
                {




                    if (PItem.TransQty > 0)
                    {

                        ItmList.Add(new StockTranStock
                        {
                            TransferId = PItem.TrasId,
                            FromStockId = PItem.StockId,
                            TransQty = PItem.TransQty,
                            Markup_Rate = PItem.MrpRate,
                            NEWSTOCKID = PItem.NewStockId,

                        });
                    }
                }

                var SKList = new List<ItemStock>();

                foreach (var SItem in TransEEntry.StockTransDet)
                {




                    if (SItem.TransQty > 0)
                    {

                        SKList.Add(new ItemStock
                        {
                            Itemid = SItem.ItemId,
                            Colorid = SItem.ColorId,
                            sizeid = SItem.SizeId,
                            uomid = SItem.UomId,
                            StockId = SItem.StockId,
                            Markup_Rate = SItem.MrpRate,
                            qty = SItem.TransQty,
                            transdate = TransEEntry.TransDate,
                            StockDate = TransEEntry.TransDate,
                            Transno = TransEEntry.TransNo,
                            sQty = SItem.EditTransQty,
                            processId = SItem.ProcessId,
                            ShipRowId = SItem.PrgDetId,


                        });
                    }
                }

                var result = STRK.UpdateDetData(ItmList, SKList, StkTfrEdit, TransEEntry.TransNo, TransEEntry.TransDate, TransEEntry.FOrdNo, TransEEntry.FJOrdNo, TransEEntry.TOrdNo, TransEEntry.TJOrdNo, TransEEntry.FromStyleid, TransEEntry.ToStyleid, TransEEntry.ToStoreUnitID, TransEEntry.ToCompId, TransEEntry.Processid, TransEEntry.FTransType, TransEEntry.TTransType);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteTransEntry(StockTransfer PoDEntry)
        {


            try
            {


                var ItmList = new List<StockTranStock>();

                if (PoDEntry.StockTransDet.Count > 0)
                {

                    foreach (var PItem in PoDEntry.StockTransDet)
                    {




                        if (PItem.TransQty > 0)
                        {

                            ItmList.Add(new StockTranStock
                            {
                                TransferId = PoDEntry.TransferId,
                                FromStockId = PItem.StockId,
                                TransQty = PItem.TransQty,
                                Markup_Rate = PItem.MrpRate,
                                NEWSTOCKID = PItem.NewStockId,

                            });
                        }
                    }

                }


                var SKList = new List<ItemStock>();
                if (PoDEntry.StockTransDet.Count > 0)
                {
                    foreach (var SItem in PoDEntry.StockTransDet)
                    {




                        if (SItem.TransQty > 0)
                        {

                            SKList.Add(new ItemStock
                            {
                                Itemid = SItem.ItemId,
                                Colorid = SItem.ColorId,
                                sizeid = SItem.SizeId,
                                uomid = SItem.UomId,
                                StockId = SItem.StockId,
                                Markup_Rate = SItem.MrpRate,
                                qty = SItem.TransQty,
                                transdate = PoDEntry.TransDate,
                                StockDate = PoDEntry.TransDate,
                                Transno = PoDEntry.TransNo,
                                sQty = SItem.EditTransQty,
                                processId = SItem.ProcessId,
                                ShipRowId = SItem.PrgDetId,


                            });
                        }
                    }
                }

                var result = STRK.DeleteData(ItmList, SKList, PoDEntry.TransferId, PoDEntry.TransNo, PoDEntry.TransDate, PoDEntry.FOrdNo, PoDEntry.FJOrdNo, PoDEntry.TOrdNo, PoDEntry.TJOrdNo, PoDEntry.FromStyleid, PoDEntry.ToStyleid, PoDEntry.ToStoreUnitID, PoDEntry.ToCompId, PoDEntry.Processid, PoDEntry.FTransType, PoDEntry.TTransType);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> PurchaseStockTranfer(List<StockTransferDet> opj)
        {
            try
            {

                var result = STRK.PurchaseStockTranfer(opj);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockTransferDet>> GetPurchaseStockDetApp(string Status, string FromDate, string ToDate)
        {
            try
            {
                var PWO = STRK.GetPurchaseStockDetApp(Status, FromDate, ToDate);

                return new Response <IQueryable<Domain.StockTransferDet>>(PWO, AxonApparel.Common.Status.SUCCESS , "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockTransferDet>>(null, AxonApparel.Common.Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> PurchaseStockTranferApp(List<StockTransferDet> opj)
        {
            try
            {

                var result = STRK.PurchaseStockTranferApp(opj);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
