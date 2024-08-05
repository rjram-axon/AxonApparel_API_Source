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
    public class LotsplitUpEntryBusiness : ILotSplitupEntryBusiness
    {

        ILotSplitUpEntryRepository GLRep = new LotSplitUpEntryRepository();

        public Response<IQueryable<LotSplitUp>> GetDataLotDetails(string TransNo, string EType)
        {
            try
            {
                var CRGList = GLRep.GetRepLotEntryLoad(TransNo, EType);

                return new Response<IQueryable<LotSplitUp>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<LotSplitUpItem>> ListLotItemDetails(string TransNo, string EType)
        {
            try
            {
                var CurRGList = GLRep.GetRepLotItemLoad(TransNo, EType);

                return new Response<IList<LotSplitUpItem>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<LotSplitUpItem>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateLotSplitEntry(LotSplitUp PLotSplitEntry)
        {
            int? ProcssID = 0;

            try
            {                           
                
                AxonApparel.Repository.LotSplitMas LotInsert = new AxonApparel.Repository.LotSplitMas
                {
                    TransNo = PLotSplitEntry.TransNo,
                    EntryNo = PLotSplitEntry.EntryNo,
                    EntryDate = PLotSplitEntry.EntryDate,
                    Companyid = PLotSplitEntry.Companyid,
                    SplitType = PLotSplitEntry.SplitType,
                    RefNo = PLotSplitEntry.RefNo,
                    CreatedBy = PLotSplitEntry.CreatedBy,
                    
                };


                var ItmList = new List<LotSplitDet>();

                foreach (var PItem in PLotSplitEntry.LotSplitUpDet)
                {
                    if (PItem.processid == 0)
                    {
                        ProcssID = null;
                    }
                    else
                    {
                        ProcssID = PItem.processid;
                    }

                    if (PItem.SplQty > 0)
                    {
                        ItmList.Add(new LotSplitDet
                        {
                            LotSplitMasId = PItem.LotSplitMasid,
                            itemid = PItem.itemid,
                            Sizeid = PItem.Sizeid,
                            colorid = PItem.colorid,
                            Orderno = PItem.Orderno,
                            Styleid = PItem.Styleid,
                            LSNo = PItem.LSno,
                            Quantity = PItem.SplQty,
                            processid = ProcssID,
                            Stockid = PItem.Stockid,
                            LotNo = PItem.LotNo,
                        });
                    }
                }


                var result = GLRep.AddDetData(LotInsert,ItmList, PLotSplitEntry.TransNo, PLotSplitEntry.EntryDate, PLotSplitEntry.EntryNo, PLotSplitEntry.Companyid, PLotSplitEntry.SupplierId);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<LotSplitUp>> GetDataEditLotDetails(int LotSplitMasId, string EType)
        {
            try
            {
                var CRGList = GLRep.GetRepLotEditEntryLoad(LotSplitMasId, EType);

                return new Response<IQueryable<LotSplitUp>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<LotSplitUpItem>> ListLotEditItemDetails(int LotSplitMasId, string EType)
        {
            try
            {
                var CurRGList = GLRep.GetRepLotEditItemLoad(LotSplitMasId, EType);

                return new Response<IList<LotSplitUpItem>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<LotSplitUpItem>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<LotSplitUpItem>> ListLotEditSplitDetails(int? LotSplitMasId, int? StockId)
        {
            try
            {
                var CurRGList = GLRep.GetRepLotEditSplitLoad(LotSplitMasId, StockId);

                return new Response<IList<LotSplitUpItem>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<LotSplitUpItem>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateLotEntry(LotSplitUp PELEntry)
        {
            int? ProcssID = 0;

            try
            {

                //var LotMasID = GLRep.UpdateData(new AxonApparel.Repository.LotSplitMa
                //{

                //    EntryDate = PELEntry.EntryDate,
                //    SplitType = PELEntry.SplitType,
                //    RefNo = PELEntry.RefNo,
                //    LotSplitMasId = PELEntry.LotSplitMasId,

                //});


                AxonApparel.Repository.LotSplitMas LotUpdate = new AxonApparel.Repository.LotSplitMas
                {
                    EntryDate = PELEntry.EntryDate,
                    SplitType = PELEntry.SplitType,
                    RefNo = PELEntry.RefNo,
                    LotSplitMasId = PELEntry.LotSplitMasId,

                };

                var ItmList = new List<LotSplitDet>();

                foreach (var PEItem in PELEntry.LotSplitUpDet)
                {
                    if (PEItem.processid == 0)
                    {
                        ProcssID = null;
                    }
                    else
                    {
                        ProcssID = PEItem.processid;
                    }

                    if (PEItem.SplQty > 0)
                    {
                        ItmList.Add(new LotSplitDet
                        {
                            LotSplitMasId = PEItem.LotSplitMasid,
                            LotSplitDetId = PEItem.LotSplitDetid,
                            itemid = PEItem.itemid,
                            Sizeid = PEItem.Sizeid,
                            colorid = PEItem.colorid,
                            Orderno = PEItem.Orderno,
                            Styleid = PEItem.Styleid,
                            LSNo = PEItem.LSno,
                            Quantity = PEItem.SplQty,
                            processid = ProcssID,
                            Stockid = PEItem.Stockid,
                            LotNo = PEItem.LotNo,
                        });
                    }
                }


                var result = GLRep.UpdateDetData(LotUpdate,ItmList, PELEntry.LotSplitMasId, PELEntry.TransNo, PELEntry.EntryDate, PELEntry.EntryNo, PELEntry.Companyid);


                var EItmList = new List<LotSplitDet>();

                foreach (var PItem in PELEntry.LotSplitUpDet)
                {
                    if (PItem.processid == 0)
                    {
                        ProcssID = null;
                    }
                    else
                    {
                        ProcssID = PItem.processid;
                    }

                    if (PItem.SplQty > 0 && PItem.LotSplitDetid == 0)
                    {
                        EItmList.Add(new LotSplitDet
                        {
                            LotSplitMasId = PELEntry.LotSplitMasId,
                            itemid = PItem.itemid,
                            Sizeid = PItem.Sizeid,
                            colorid = PItem.colorid,
                            Orderno = PItem.Orderno,
                            Styleid = PItem.Styleid,
                            LSNo = PItem.LSno,
                            Quantity = PItem.SplQty,
                            processid = ProcssID,
                            Stockid = PItem.Stockid,
                            LotNo = PItem.LotNo,
                        });
                    }
                }


                var result1 = GLRep.AddDetData(LotUpdate,EItmList, PELEntry.TransNo, PELEntry.EntryDate, PELEntry.EntryNo, PELEntry.Companyid, PELEntry.SupplierId);

                //var EItmList = new List<Pur_Grn_Det>();

                //foreach (var PItem in PEDGEntry.PurchaseGrnItemDet)
                //{


                //    if (PItem.received_qty > 0 && PItem.Grn_DetId == 0)
                //    {
                //        EItmList.Add(new Pur_Grn_Det
                //        {
                //            Grn_MasId = PEDGEntry.Grn_MasId,
                //            itemid = PItem.itemid,
                //            sizeid = PItem.sizeid,
                //            colorid = PItem.colorid,
                //            received_qty = PItem.received_qty,
                //            uomId = PItem.uomId,
                //            rate = PItem.rate,
                //            balance = PItem.balance,
                //            invoiced_qty = 0,
                //            debit_id = PItem.debit_id,
                //            excess_qty = PItem.excess_qty,
                //            debit_rate = PItem.debit_rate,
                //            MfrId = EmpId,
                //            Sec_Qty = PItem.Sec_Qty,
                //            Excess_Stockid = PItem.Excess_Stockid,
                //            rejected_qty = PItem.rejected_qty,
                //            shortage_qty = PItem.shortage_qty,
                //            accepted_qty = PItem.accepted_qty,
                //            return_qty = PItem.return_qty,
                //            debit_qty = PItem.debit_qty,
                //            receivable_qty = PItem.receivable_qty,
                //            Qlty_Excess = PItem.Qlty_Excess,
                //            Excess_return = PItem.Excess_return,
                //            itemremarks = PItem.itemremarks,
                //            Closed = false,
                //            Short_stkid = PItem.Short_stkid,
                //            Reject_stkid = PItem.Reject_stkid,
                //            QltyItemRemarks = PItem.QltyItemRemarks,
                //            ReturnQty = PItem.ReturnQty,
                //            Grn_RtnId = PItem.Grn_RtnId,

                //        });
                //    }
                //}

                //var EOrdListDetails = new List<Pur_Grn_Order>();

                //if (PEDGEntry.PurchaseGrnODet != null)
                //{
                //    foreach (var POrderDetails in PEDGEntry.PurchaseGrnODet)
                //    {
                //        if (POrderDetails.actual_mfrid == 0)
                //        {
                //            supId = null;
                //        }
                //        else
                //        {
                //            supId = POrderDetails.actual_mfrid;
                //        }
                //        if (POrderDetails.Grn_DetOrdId == 0)
                //        {
                //            EOrdListDetails.Add(new Pur_Grn_Order
                //            {


                //                pur_ord_detid = POrderDetails.pur_ord_detid,
                //                actual_mfrid = supId,//POrderDetails.actual_mfrid,
                //                quantity = POrderDetails.quantity,
                //                Rate = POrderDetails.Rate,
                //                Invoiced_Qty = POrderDetails.Invoiced_Qty,
                //                Rate_Diff = POrderDetails.Rate_Diff,
                //                Excess_Qty = POrderDetails.Excess_Qty,
                //                ItemID = POrderDetails.OItemid,
                //                ColorID = POrderDetails.OColorid,
                //                SizeID = POrderDetails.OSizeid,
                //                UOMId = POrderDetails.OUomid,

                //            });
                //        }
                //    }
                //}
                //var result1 = GRep.AddDetData(EItmList, EOrdListDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteLot(LotSplitUp PoLDEntry)
        {
            try
            {
                int? ProcssID = 0;
                var detailOrderListEdit = new List<LotSplitDet>();
                if (PoLDEntry.LotSplitUpDet != null)
                {
                    foreach (var ItemD in PoLDEntry.LotSplitUpDet)
                    {



                        detailOrderListEdit.Add(new LotSplitDet
                        {

                            LotSplitMasId = ItemD.LotSplitMasid,
                            itemid = ItemD.itemid,
                            Sizeid = ItemD.Sizeid,
                            colorid = ItemD.colorid,
                            Orderno = ItemD.Orderno,
                            Styleid = ItemD.Styleid,
                            LSNo = ItemD.LSno,
                            Quantity = ItemD.SplQty,
                            processid = ProcssID,
                            Stockid = ItemD.Stockid,
                            LotNo = ItemD.LotNo,
                        });
                    }
                }

                var result1 = GLRep.DeleteData(detailOrderListEdit, PoLDEntry.LotSplitMasId);

                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
