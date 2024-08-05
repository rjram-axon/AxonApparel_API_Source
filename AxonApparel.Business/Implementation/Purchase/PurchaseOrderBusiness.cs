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
    public class PurchaseOrderBusiness : IPurchaseOrderBusiness
    {

        IPurchaseOrderRepository GRep = new PurchaseOrderRepository();



        public Response<IList<PurchaseOrder>> ListDetails(int? companyId, int? BuyId, string BMasId, string RefNo, string StyId, string OType, string PType, string LocalImport, string PurIndType, string Itype, string Igroup)
        {
            try
            {
                var CurGList = GRep.GetRepLoad(companyId, BuyId, BMasId, RefNo, StyId, OType, PType, LocalImport, PurIndType, Itype, Igroup);

                return new Response<IList<PurchaseOrder>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PurchaseOrder>> ListIndentOrdDetails(int? companyId, int? BuyId, string BMasId, string RefNo, int? StyId, string OType, string PType, string LocalImport, string PurIndType)
        {
            try
            {
                var CurGList = GRep.GetRepLoadIndentord(companyId, BuyId, BMasId, RefNo, StyId, OType, PType, LocalImport, PurIndType);

                return new Response<IList<PurchaseOrder>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PurchaseOrder>> ListSRDetails(int? companyId, int? BuyId, string OrdNo, string RefNo, int? StyId, string OType, string PType)
        {
            try
            {
                var CurGList = GRep.GetSRRepLoad(companyId, BuyId, OrdNo, RefNo, StyId, OType, PType);

                return new Response<IList<PurchaseOrder>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<TermsCondition>> GetTermEditDetails(int Id)
        {
            try
            {
                var termcondList = GRep.GetTermsCondLoad(Id);

                return new Response<IList<TermsCondition>>(termcondList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<TermsCondition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PurchaseOrderItemDet>> ListEntryItemDetails(string StyleRowId, string OType, string Purchase_ItemType, string LocalImport, string IGId, string PurIndType, int supplierid, string UserName)
        {
            try
            {
                var CurRGList = GRep.GetRepEntryItemLoad(StyleRowId, OType, Purchase_ItemType, LocalImport, IGId, PurIndType, supplierid, UserName);

                return new Response<IList<PurchaseOrderItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseOrderDet>> ListEntryOrderDetails(string StyleRowId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string OType, string LocalImport, string PurIndType)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEntryOrderLoad(StyleRowId, Itemid, ColorId, Sizeid, Uomid, quantity, OType, LocalImport, PurIndType);

                return new Response<IList<PurchaseOrderDet>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePOrderEntry(PurchaseOrder POEntry)
        {


            int? CurID = 0;
            int? ColID = 0;
            int? SizID = 0;
            int? BillCId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? ICurID = 0;
            int? IsPay = 0;
            int? IBuyJobID = 0;
            decimal? ExRate = 0;
            string PayMode = "";
            string Remarks = "";
            decimal? Adv = 0;
            DateTime? CDate = null;

            if (POEntry.currencyid == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = POEntry.currencyid;
            }
            if (POEntry.remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = POEntry.remarks;
            }
            if (POEntry.chequedate == null)
            {
                CDate = null;
            }
            else
            {
                CDate = POEntry.chequedate;
            }
            if (POEntry.paymode == null)
            {
                PayMode = "NILL";
            }
            else
            {
                PayMode = POEntry.paymode;
            }
            if (POEntry.advance == 0)
            {
                Adv = 0;
            }
            else
            {
                Adv = POEntry.advance;
            }
            if (POEntry.BillCompany == 0)
            {
                BillCId = null;
            }
            else
            {
                BillCId = POEntry.BillCompany;
            }

            if (POEntry.ToApprove == 0)
            {
                ToAppId = null;
            }
            else
            {
                ToAppId = POEntry.ToApprove;
            }
            if (POEntry.ApprovedBY == 0)
            {
                AppById = null;
            }
            else
            {
                AppById = POEntry.ApprovedBY;
            }
            if (POEntry.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = POEntry.CreatedBy;
            }
            if (POEntry.Paytermid == 0)
            {
                IsPay = null;
            }
            else
            {
                IsPay = POEntry.Paytermid;
            }
            if (POEntry.exchange_rate == 0)
            {
                ExRate = (decimal)0.00;
            }
            else
            {
                ExRate = POEntry.exchange_rate;
            }
            try
            {

                AxonApparel.Repository.Pur_Ord_Mas purordInsert = new AxonApparel.Repository.Pur_Ord_Mas
                {
                    pur_ord_no = POEntry.pur_ord_no,
                    companyid = POEntry.companyid,
                    orddate = POEntry.orddate,
                    supplierid = POEntry.SupplierId,
                    Purchase_Type = POEntry.Purchase_Type,
                    Purchase_ItemType = POEntry.Purchase_ItemType,
                    remarks = POEntry.remarks,
                    ord_commit = POEntry.ord_commit,
                    cancel = false,
                    Unit_Supplier_Self = POEntry.Unit_Supplier_Self,
                    Unit_Supplier = POEntry.Unit_Supplier,
                    Amount = POEntry.Amount,
                    ord_close = false,
                    unit_or_other = POEntry.unit_or_other,
                    Amend = POEntry.Amend,
                    currencyid = CurID,
                    exchange_rate = (decimal)ExRate,
                    LocalImport = POEntry.LocalImport,
                    ReqDate = POEntry.orddate,
                    BillCompany = BillCId,
                    Closed = "N",
                    remainderid = POEntry.remainderid,
                    ReqNo = POEntry.ReqNo,
                    BillCompType = POEntry.BillCompType,
                    TaxPercent = POEntry.TaxPercent,
                    TaxAmount = POEntry.TaxAmount,
                    WITH_ANNEXURE = POEntry.WITH_ANNEXURE,
                    AddLessType = POEntry.AddLessType,
                    AddLessManualOrFormula = POEntry.AddLessManualOrFormula,
                    IsApproved = POEntry.IsApproved,
                    Paytermid = IsPay,
                    ToApprove = ToAppId,
                    //ApprovedBY = AppById,
                    //ApproveDate = POEntry.orddate,
                    RateMode = "O",
                    CreatedBy = IsCrBy,
                    Potype = POEntry.Potype,
                    TOTCGSTAMT = POEntry.TOTCGSTAMT,
                    TOTSGSTAMT = POEntry.TOTSGSTAMT,
                    TOTIGSTAMT = POEntry.TOTIGSTAMT,
                    chequeno = POEntry.chequeno,
                    //chequedate = POEntry.chequedate,
                    advance = (decimal)Adv,
                    paymode = PayMode,

                };

                var ItmList = new List<Pur_Ord_Det>();

                foreach (var PItem in POEntry.PurchaseItemDet)
                {
                    if (PItem.currencyid == 0)
                    {
                        ICurID = null;
                    }
                    else
                    {
                        ICurID = PItem.currencyid;
                    }

                    if (PItem.ColorID == 0)
                    {
                        ColID = null;
                    }
                    else
                    {
                        ColID = PItem.ColorID;
                    }


                    if (PItem.SizeID == 0)
                    {
                        SizID = null;
                    }
                    else
                    {
                        SizID = PItem.SizeID;
                    }
                    if (PItem.quantity > 0)
                    {
                        ItmList.Add(new Pur_Ord_Det
                        {
                            Pur_ord_id = PItem.Pur_ord_id,
                            ItemID = PItem.ItemID,
                            SizeID = SizID,
                            ColorID = ColID,
                            UOMId = PItem.PurUomId,
                            quantity = PItem.quantity,
                            ReceivedQty = 0,
                            Rate = PItem.Rate,
                            Reqdate = PItem.Reqdate,
                            ItemRemark = PItem.ItemRemarks,
                            Sec_Qty = PItem.Sec_Qty,
                            Sec_UOMid = PItem.BaseUnitId,
                            //Mfrid = PItem.Mfrid,
                            Cancel_Qty = 0,//PItem.Cancel_Qty,
                            Close_Qty = 0,//PItem.Close_Qty,
                            Amend = PItem.Amend,
                            currencyid = ICurID,
                            exchangerate = 0,//PItem.exchangerate,
                            receivable_qty = 0,//PItem.receivable_qty,
                            Debit_qty = 0,//PItem.Debit_qty,
                            RefConversion = PItem.RefConversion,
                            ReturnQty = PItem.ReturnQty,
                            //reqdatefrom = PItem.reqdatefrom,
                            //reqdatto = PItem.reqdatto,
                            //reqdateto = PItem.reqdateto,
                            CGSTAMt = PItem.CGSTAMt,
                            SGSTAMT = PItem.SGSTAMT,
                            IGSTAMT = PItem.IGSTAMT,
                            CGST = PItem.CGST,
                            SGST = PItem.SGST,
                            IGST = PItem.IGST,
                            HSNCODE = PItem.HSNCODE,
                            TOTCGSTAMT = PItem.TOTCGSTAMT,
                            TOTSGSTAMT = PItem.TOTSGSTAMT,
                            TOTIGSTAMT = PItem.TOTIGSTAMT,
                            GSTtaxcode = PItem.gsttaxcode,
                            IndDetId = PItem.IndDetId,
                        });
                    }
                }

                var OrdListDetails = new List<Pur_Ord_BuyJob>();

                if (POEntry.PurchaseODet != null)
                {
                    foreach (var POrderDetails in POEntry.PurchaseODet)
                    {

                        if (POrderDetails.IndBuyJobId == 0)
                        {
                            IBuyJobID = null;
                        }
                        else
                        {
                            IBuyJobID = POrderDetails.IndBuyJobId;
                        }

                        if (POrderDetails.ColorID == 0)
                        {
                            ColID = null;
                        }
                        else
                        {
                            ColID = POrderDetails.ColorID;
                        }


                        if (POrderDetails.SizeID == 0)
                        {
                            SizID = null;
                        }
                        else
                        {
                            SizID = POrderDetails.SizeID;
                        }

                        OrdListDetails.Add(new Pur_Ord_BuyJob
                        {
                            Pur_Ord_BuyJobid = POrderDetails.Pur_Ord_BuyJobid,
                            Order_No = POrderDetails.OrderNo,
                            Styleid = POrderDetails.Styleid,
                            quantity = POrderDetails.quantity,
                            pur_ord_Detid = POrderDetails.pur_ord_Detid,
                            BomdetId = POrderDetails.BuyODetId,
                            pur_ord_id = POrderDetails.pur_ord_id,
                            ReceivedQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReturnQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemID = POrderDetails.ItemID,
                            SizeID = SizID,
                            ColorID = ColID,
                            UOMId = POrderDetails.PurUomId,
                            IndBuyJobId = POrderDetails.IndBuyJobId,
                            Plan_ItmRemarks = POrderDetails.PlanItmRmks

                        });
                    }
                }

                var AccListDetails = new List<Pur_Ord_AddLess>();
                if (POEntry.PurchaseAccounts != null)
                {
                    foreach (var Acc in POEntry.PurchaseAccounts)
                    {
                        AccListDetails.Add(new Pur_Ord_AddLess
                        {
                            Pur_Ord_Discountid = Acc.Pur_Ord_Discountid,
                            Pur_Ord_id = Acc.Pur_Ord_id,
                            Addlessid = Acc.Addlessid,
                            Percentage = Acc.Percentage,
                            PlusOrMinus = Acc.PlusOrMinus,
                            Amount = Acc.Amount,
                        });
                    }
                }

                var TermSCondDetails = new List<TermsCondition>();
                if (POEntry.TermsCondDet != null)
                {
                    foreach (var Acc in POEntry.TermsCondDet)
                    {
                        TermSCondDetails.Add(new TermsCondition
                        {
                            TermId = Acc.TermId,
                            TermName = Acc.TermName,
                            Description = Acc.Description
                        });
                    }
                }

                var result = GRep.AddDetData(purordInsert, ItmList, OrdListDetails, AccListDetails, POEntry.Purchase_Type, TermSCondDetails, POEntry.PurIndType);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataPurEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepEditDetails(Id);

                return new Response<IQueryable<PurchaseOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseOrderItemDet>> GetItemEditDetails(int Id, string OType, string LocalImport, string PurIndType)
        {
            try
            {
                var CRGList = GRep.GetRepEntryEditItemLoad(Id, OType, LocalImport, PurIndType);

                return new Response<IList<PurchaseOrderItemDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseOrderDet>> ListGetEditOrderDetails(string PurOrdId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string OType, string LocalImport, string PurIndType)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEditOrderLoad(PurOrdId, Itemid, ColorId, Sizeid, Uomid, quantity, OType, LocalImport, PurIndType);

                return new Response<IList<PurchaseOrderDet>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePoEntry(PurchaseOrder PoEEntry)
        {
            int? ColID = 0;
            int? SizID = 0;
            int? CurID = 0;
            int? BillCId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? ICurID = 0;
            decimal? Adv = 0;
            decimal? ExRate = 0;
            string PayMode = "";
            string Remarks = "";

            if (PoEEntry.exchange_rate == 0)
            {
                ExRate = (decimal)0.00;
            }
            else
            {
                ExRate = PoEEntry.exchange_rate;
            }
            if (PoEEntry.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = PoEEntry.CreatedBy;
            }

            if (PoEEntry.currencyid == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = PoEEntry.currencyid;
            }
            if (PoEEntry.remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = PoEEntry.remarks;
            }



            //if (PoEEntry.BillCompany == 0)
            //{
            //    BillCId = null;
            //}
            //else
            //{
            //    BillCId = PoEEntry.BillCompany;
            //}

            //if (PoEEntry.ToApprove == 0)
            //{
            //    ToAppId = null;
            //}
            //else
            //{
            //    ToAppId = PoEEntry.ToApprove;
            //}
            if (PoEEntry.ApprovedBY == 0)
            {
                AppById = null;
            }
            else
            {
                AppById = PoEEntry.ApprovedBY;
            }
            if (PoEEntry.advance == 0)
            {
                Adv = 0;
            }
            else
            {
                Adv = PoEEntry.advance;
            }
            if (PoEEntry.paymode == null)
            {
                PayMode = "NILL";
            }
            else
            {
                PayMode = PoEEntry.paymode;
            }

            try
            {


                //var PurID = GRep.UpdateData(new AxonApparel.Repository.Pur_Ord_Mas
                //{

                //    pur_ord_no = PoEEntry.pur_ord_no,
                //    pur_ord_id = PoEEntry.pur_ord_id,
                //    companyid = PoEEntry.companyid,
                //    orddate = PoEEntry.orddate,
                //    supplierid = PoEEntry.SupplierId,
                //    Purchase_Type = PoEEntry.Purchase_Type,
                //    Purchase_ItemType = PoEEntry.Purchase_ItemType,
                //    remarks = PoEEntry.remarks,
                //    ord_commit = PoEEntry.ord_commit,
                //    cancel = false,
                //    Unit_Supplier_Self = PoEEntry.Unit_Supplier_Self,
                //    Unit_Supplier = PoEEntry.Unit_Supplier,
                //    Amount = PoEEntry.Amount,
                //    ord_close = false,
                //    unit_or_other = PoEEntry.unit_or_other,
                //    Amend = PoEEntry.Amend,
                //    currencyid = PoEEntry.currencyid,
                //    exchange_rate = 1,
                //    LocalImport = PoEEntry.LocalImport,
                //    ReqDate = PoEEntry.orddate,
                //    BillCompany = PoEEntry.BillCompany,
                //    Closed = "N",
                //    remainderid = PoEEntry.remainderid,
                //    ReqNo = PoEEntry.ReqNo,
                //    BillCompType = PoEEntry.BillCompType,
                //    TaxPercent = PoEEntry.TaxPercent,
                //    TaxAmount = PoEEntry.TaxAmount,
                //    WITH_ANNEXURE = PoEEntry.WITH_ANNEXURE,
                //    AddLessType = PoEEntry.AddLessType,
                //    AddLessManualOrFormula = PoEEntry.AddLessManualOrFormula,
                //    IsApproved = PoEEntry.IsApproved,
                //    ToApprove = PoEEntry.ToApprove,
                //    ApprovedBY = AppById,
                //    ApproveDate = PoEEntry.orddate,

                //    CreatedBy = IsCrBy,
                //    Paytermid = PoEEntry.Paytermid,
                //    Potype = PoEEntry.Potype,
                //    TOTCGSTAMT = PoEEntry.TOTCGSTAMT,
                //    TOTSGSTAMT = PoEEntry.TOTSGSTAMT,
                //    TOTIGSTAMT = PoEEntry.TOTIGSTAMT,
                //    chequeno = PoEEntry.chequeno,
                //    //chequedate = POEntry.chequedate,
                //    advance = (decimal)Adv,
                //    paymode = PayMode,
                //    //
                //});



                AxonApparel.Repository.Pur_Ord_Mas purgrnEdit = new AxonApparel.Repository.Pur_Ord_Mas
                {

                    pur_ord_no = PoEEntry.pur_ord_no,
                    pur_ord_id = PoEEntry.pur_ord_id,
                    companyid = PoEEntry.companyid,
                    orddate = PoEEntry.orddate,
                    supplierid = PoEEntry.SupplierId,
                    Purchase_Type = PoEEntry.Purchase_Type,
                    Purchase_ItemType = PoEEntry.Purchase_ItemType,
                    remarks = Remarks,
                    ord_commit = PoEEntry.ord_commit,
                    cancel = false,
                    Unit_Supplier_Self = PoEEntry.Unit_Supplier_Self,
                    Unit_Supplier = PoEEntry.Unit_Supplier,
                    Amount = PoEEntry.Amount,
                    ord_close = false,
                    unit_or_other = PoEEntry.unit_or_other,
                    Amend = PoEEntry.Amend,
                    currencyid = CurID,
                    exchange_rate = (decimal)ExRate,
                    LocalImport = PoEEntry.LocalImport,
                    ReqDate = PoEEntry.orddate,
                    BillCompany = PoEEntry.BillCompany,
                    Closed = "N",
                    remainderid = PoEEntry.remainderid,
                    ReqNo = PoEEntry.ReqNo,
                    BillCompType = PoEEntry.BillCompType,
                    TaxPercent = PoEEntry.TaxPercent,
                    TaxAmount = PoEEntry.TaxAmount,
                    WITH_ANNEXURE = PoEEntry.WITH_ANNEXURE,
                    AddLessType = PoEEntry.AddLessType,
                    AddLessManualOrFormula = PoEEntry.AddLessManualOrFormula,
                    IsApproved = PoEEntry.IsApproved,
                    ToApprove = PoEEntry.ToApprove,
                    ApprovedBY = AppById,
                    ApproveDate = PoEEntry.ApproveDate,

                    CreatedBy = IsCrBy,
                    Paytermid = PoEEntry.Paytermid,
                    Potype = PoEEntry.Potype,
                    TOTCGSTAMT = PoEEntry.TOTCGSTAMT,
                    TOTSGSTAMT = PoEEntry.TOTSGSTAMT,
                    TOTIGSTAMT = PoEEntry.TOTIGSTAMT,
                    chequeno = PoEEntry.chequeno,
                    //chequedate = POEntry.chequedate,
                    advance = (decimal)Adv,
                    paymode = PayMode,


                };

                var ItmList = new List<Pur_Ord_Det>();

                foreach (var PItem in PoEEntry.PurchaseItemDet)
                {

                    if (PItem.currencyid == 0)
                    {
                        ICurID = null;
                    }
                    else
                    {
                        ICurID = PItem.currencyid;
                    }


                    if (PItem.ColorID == 0)
                    {
                        ColID = null;
                    }
                    else
                    {
                        ColID = PItem.ColorID;
                    }


                    if (PItem.SizeID == 0)
                    {
                        SizID = null;
                    }
                    else
                    {
                        SizID = PItem.SizeID;
                    }

                    if (PItem.quantity > 0)
                    {

                        ItmList.Add(new Pur_Ord_Det
                        {
                            Pur_ord_id = PoEEntry.pur_ord_id,
                            Pur_Ord_DetId = PItem.Pur_Ord_DetId,
                            ItemID = PItem.ItemID,
                            SizeID = SizID,
                            ColorID = ColID,
                            UOMId = PItem.PurUomId,
                            quantity = PItem.quantity,
                            ReceivedQty = 0,
                            Rate = PItem.Rate,
                            Reqdate = PItem.Reqdate,
                            ItemRemark = PItem.ItemRemarks,
                            Sec_Qty = PItem.Sec_Qty,
                            Sec_UOMid = PItem.BaseUnitId,
                            //Mfrid = PItem.Mfrid,
                            Cancel_Qty = 0,//PItem.Cancel_Qty,
                            Close_Qty = 0,//PItem.Close_Qty,
                            Amend = PItem.Amend,
                            currencyid = ICurID,
                            exchangerate = 0,//PItem.exchangerate,
                            receivable_qty = 0,//PItem.receivable_qty,
                            Debit_qty = 0,//PItem.Debit_qty,
                            RefConversion = PItem.RefConversion,
                            ReturnQty = PItem.ReturnQty,
                            //reqdatefrom = PItem.reqdatefrom,
                            //reqdatto = PItem.reqdatto,
                            //reqdateto = PItem.reqdateto,
                            CGSTAMt = PItem.CGSTAMt,
                            SGSTAMT = PItem.SGSTAMT,
                            IGSTAMT = PItem.IGSTAMT,
                            CGST = PItem.CGST,
                            SGST = PItem.SGST,
                            IGST = PItem.IGST,
                            HSNCODE = PItem.HSNCODE,
                            TOTCGSTAMT = PItem.TOTCGSTAMT,
                            TOTSGSTAMT = PItem.TOTSGSTAMT,
                            TOTIGSTAMT = PItem.TOTIGSTAMT,
                            GSTtaxcode = PItem.gsttaxcode,
                            IndDetId = PItem.IndDetId,
                        });
                    }
                }

                var OrdListDetails = new List<Pur_Ord_BuyJob>();
                if (PoEEntry.PurchaseODet != null)
                {
                    foreach (var POrderDetails in PoEEntry.PurchaseODet)
                    {

                        if (POrderDetails.ColorID == 0)
                        {
                            ColID = null;
                        }
                        else
                        {
                            ColID = POrderDetails.ColorID;
                        }


                        if (POrderDetails.SizeID == 0)
                        {
                            SizID = null;
                        }
                        else
                        {
                            SizID = POrderDetails.SizeID;
                        }
                        OrdListDetails.Add(new Pur_Ord_BuyJob
                        {

                            Pur_Ord_BuyJobid = POrderDetails.Pur_Ord_BuyJobid,
                            Order_No = POrderDetails.OrderNo,
                            Styleid = POrderDetails.Styleid,
                            quantity = POrderDetails.quantity,
                            BomdetId = POrderDetails.BuyODetId,
                            //pur_ord_Detid = POrderDetails.pur_ord_Detid,
                            pur_ord_id = PoEEntry.pur_ord_id,
                            ReceivedQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReturnQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemID = POrderDetails.ItemID,
                            SizeID = SizID,
                            ColorID = ColID,
                            UOMId = POrderDetails.PurUomId,
                            IndBuyJobId = POrderDetails.IndBuyJobId,
                            Plan_ItmRemarks = POrderDetails.PlanItmRmks
                        });
                    }
                }


                var AccListDetails = new List<Pur_Ord_AddLess>();
                if (PoEEntry.PurchaseAccounts != null)
                {
                    foreach (var Acc in PoEEntry.PurchaseAccounts)
                    {


                        AccListDetails.Add(new Pur_Ord_AddLess
                        {

                            Pur_Ord_Discountid = Acc.Pur_Ord_Discountid,
                            Pur_Ord_id = PoEEntry.pur_ord_id,
                            Addlessid = Acc.Addlessid,
                            Percentage = Acc.Percentage,
                            PlusOrMinus = Acc.PlusOrMinus,
                            Amount = Acc.Amount,

                        });
                    }
                }
                //var result1 = GRep.UpdateAccData(AccListDetails);


                var result = GRep.UpdateDetData(purgrnEdit, ItmList, OrdListDetails, AccListDetails, PoEEntry.Purchase_Type, PoEEntry.PurIndType);


                //Edit Case



                var AccLDetails = new List<Pur_Ord_AddLess>();
                if (PoEEntry.PurchaseAccounts != null)
                {
                    foreach (var Acc in PoEEntry.PurchaseAccounts)
                    {
                        if (Acc.Pur_Ord_Discountid == 0)
                        {

                            AccLDetails.Add(new Pur_Ord_AddLess
                            {

                                //Pur_Ord_Discountid = Acc.Pur_Ord_Discountid,
                                Pur_Ord_id = PoEEntry.pur_ord_id,
                                Addlessid = Acc.Addlessid,
                                Percentage = Acc.Percentage,
                                PlusOrMinus = Acc.PlusOrMinus,
                                Amount = Acc.Amount,

                            });
                        }
                    }
                }
                //var result5 = GRep.AddDetAccData(AccLDetails);


                var eItmList = new List<Pur_Ord_Det>();

                foreach (var PItem in PoEEntry.PurchaseItemDet)
                {
                    if (PItem.Pur_Ord_DetId == 0)
                    {
                        if (PItem.currencyid == 0)
                        {
                            ICurID = null;
                        }
                        else
                        {
                            ICurID = PItem.currencyid;
                        }


                        if (PItem.quantity > 0)
                        {

                            eItmList.Add(new Pur_Ord_Det
                            {
                                Pur_ord_id = PoEEntry.pur_ord_id,
                                Pur_Ord_DetId = PItem.Pur_Ord_DetId,
                                ItemID = PItem.ItemID,
                                SizeID = PItem.SizeID,
                                ColorID = PItem.ColorID,
                                UOMId = PItem.PurUomId,
                                quantity = PItem.quantity,
                                ReceivedQty = 0,
                                Rate = PItem.Rate,
                                // Reqdate = PItem.Reqdate,
                                ItemRemark = PItem.ItemRemarks,
                                Sec_Qty = PItem.Sec_Qty,
                                Sec_UOMid = PItem.BaseUnitId,
                                //Mfrid = PItem.Mfrid,
                                Cancel_Qty = 0,//PItem.Cancel_Qty,
                                Close_Qty = 0,//PItem.Close_Qty,
                                Amend = PItem.Amend,
                                currencyid = ICurID,
                                exchangerate = 0,//PItem.exchangerate,
                                receivable_qty = 0,//PItem.receivable_qty,
                                Debit_qty = 0,//PItem.Debit_qty,
                                RefConversion = PItem.RefConversion,
                                ReturnQty = PItem.ReturnQty,
                                //reqdatefrom = PItem.reqdatefrom,
                                //reqdatto = PItem.reqdatto,
                                //reqdateto = PItem.reqdateto,
                                CGSTAMt = PItem.CGSTAMt,
                                SGSTAMT = PItem.SGSTAMT,
                                IGSTAMT = PItem.IGSTAMT,
                                CGST = PItem.CGST,
                                SGST = PItem.SGST,
                                IGST = PItem.IGST,
                                HSNCODE = PItem.HSNCODE,
                                TOTCGSTAMT = PItem.TOTCGSTAMT,
                                TOTSGSTAMT = PItem.TOTSGSTAMT,
                                TOTIGSTAMT = PItem.TOTIGSTAMT,
                                GSTtaxcode = PItem.gsttaxcode,
                                IndDetId = PItem.IndDetId,
                            });
                        }
                    }
                }

                var TermSCondDetails = new List<TermsCondition>();
                if (PoEEntry.TermsCondDet != null)
                {
                    foreach (var Acc in PoEEntry.TermsCondDet)
                    {
                        TermSCondDetails.Add(new TermsCondition
                        {
                            TermId = Acc.TermId,
                            TermName = Acc.TermName,
                            Description = Acc.Description
                        });
                    }
                }

                var result3 = GRep.AddDetData(purgrnEdit, eItmList, OrdListDetails, AccLDetails, PoEEntry.Purchase_Type, TermSCondDetails, PoEEntry.PurIndType);
                //




                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseOrderAccount>> ListGetEditAddlessDetails(int Id)
        {
            try
            {
                var CurRGLOrder = GRep.GetRepEditAccLoad(Id);

                return new Response<IList<PurchaseOrderAccount>>(CurRGLOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderAccount>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<bool> DeletePurchase(PurchaseOrder PoDEntry)
        {
            try
            {
                var detailOrderListEdit = new List<Pur_Ord_BuyJob>();
                if (PoDEntry.PurchaseODet != null)
                {
                    foreach (var Order in PoDEntry.PurchaseODet)
                    {



                        detailOrderListEdit.Add(new Pur_Ord_BuyJob
                        {

                            Pur_Ord_BuyJobid = Order.Pur_Ord_BuyJobid,
                            Order_No = Order.OrderNo,
                            Styleid = Order.Styleid,
                            quantity = Order.quantity,
                            BomdetId = Order.BuyODetId,
                            //pur_ord_Detid = POrderDetails.pur_ord_Detid,
                            pur_ord_id = PoDEntry.pur_ord_id,
                            ReceivedQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReturnQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemID = Order.ItemID,
                            SizeID = Order.SizeID,
                            ColorID = Order.ColorID,
                            UOMId = Order.PurUomId,
                        });
                    }
                }

                var result1 = GRep.DeleteData(detailOrderListEdit, PoDEntry.pur_ord_id, PoDEntry.Purchase_Type, PoDEntry.PurIndType);

                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetPoOrderNoList()
        {
            try
            {
                var OrdList = GRep.GetDataList();
                return new Response<IQueryable<PurchaseOrder>>(OrdList.Select(m => new PurchaseOrder
                {
                    pur_ord_id = m.pur_ord_id,
                    pur_ord_no = m.pur_ord_no
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<IQueryable<PurchaseOrder>> GetDataOrderDetails(int? companyid, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataOrderRepDetails(companyid, OType);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(int? companyid, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataStyleRepDetails(companyid, OType);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataPurNomDetails(string StyleRowId, string IGId)
        {
            try
            {
                var ProductWO = GRep.GetRepDataPurNomDetails(StyleRowId, IGId);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<TermsCondition>> GetLoadTerms(int Termdetid)
        {
            try
            {
                var termcondList = GRep.GetLoadTerms(Termdetid);

                return new Response<IList<TermsCondition>>(termcondList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<TermsCondition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.TermDet>> GetTermDesc(int Termdetid)
        {
            try
            {
                var termcondList = GRep.GetTermDesc(Termdetid);

                return new Response<IQueryable<Domain.TermDet>>(termcondList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TermDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PurchaseOrder>> GetStateGST(int Supplierid, int Companyid)
        {
            try
            {
                var termcondList = GRep.GetStateGST(Supplierid, Companyid);

                return new Response<IQueryable<Domain.PurchaseOrder>>(termcondList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
