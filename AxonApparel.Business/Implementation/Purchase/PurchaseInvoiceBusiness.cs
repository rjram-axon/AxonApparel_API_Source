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
    public class PurchaseInvoiceBusiness : IPurchaseInvoiceBusiness
    {


        IPurchaseInvoiceRepository GRep = new PurchaseInvoiceRepository();

        public Response<IQueryable<PurInvMas>> GetDataOrderDetails(int? companyid, int? SuppId, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataOrderRepDetails(companyid, SuppId, OType);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetDataStyleDetails(int? companyid, int? SuppId, string OType, string OrdNo)
        {
            try
            {
                var ProductWO = GRep.GetDataStyleRepDetails(companyid, SuppId, OType, OrdNo);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetDataGrnDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId)
        {
            try
            {
                var ProductWO = GRep.GetDataGrnRepDetails(companyid, SuppId, OType, OrdNo, StyId);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurInvMas>> GetDataPoDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId)
        {
            try
            {
                var ProductWO = GRep.GetDataPoRepDetails(companyid, SuppId, OType, OrdNo, StyId, GrnMasId);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvMas>> ListAddDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId, int? PMasId, string FromDate, string ToDate)
        {
            try
            {
                var CurGList = GRep.GetRepAddLoad(companyid, SuppId, OType, OrdNo, StyId, GrnMasId, PMasId, FromDate, ToDate);

                return new Response<IList<PurInvMas>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvDc>> ListInGrnItemDetails(string GMasId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvGrnItemLoad(GMasId, CompId, SuppId);

                return new Response<IList<PurInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvDet>> ListInItemDetails(string GMasId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvItemLoad(GMasId, CompId, SuppId);

                return new Response<IList<PurInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvOrdDet>> ListInOrdDetails(string GMasId, int CompId, int SuppId, int ItemId, int ColorId, int SizeId, int GrnDetId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvOrdLoad(GMasId, CompId, SuppId, ItemId, ColorId, SizeId, GrnDetId);

                return new Response<IList<PurInvOrdDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvOrdDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePInvEntry(PurInvMas PIEntry)
        {


            int? CurID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? DebId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            int? CompUnitId = 0;
            if (PIEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = PIEntry.CurrencyId;
            }
            if (PIEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PIEntry.ledgerid;
            }
            if (PIEntry.CreditID == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PIEntry.CreditID;
            }
            if (PIEntry.DebitID == 0)
            {
                DebId = null;
            }
            else
            {
                DebId = PIEntry.DebitID;
            }
            if (PIEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PIEntry.voucherid;
            }

            try
            {

                AxonApparel.Repository.Pur_Inv_Mas puroInvInsert = new AxonApparel.Repository.Pur_Inv_Mas
                {
                    invoice_no = PIEntry.invoice_no,
                    invoice_date = PIEntry.invoice_date,
                    company_id = (int)PIEntry.company_id,
                    supplierid = PIEntry.supplierid,
                    Gross_amount = PIEntry.Gross_amount,
                    Addless_amount = PIEntry.Addless_amount,
                    remarks = PIEntry.remarks,
                    invoice_value = PIEntry.invoice_value,
                    supp_inv_no = PIEntry.supp_inv_no,
                    supp_inv_date = PIEntry.supp_inv_date,
                    CreditID = CreId,
                    DebitID = DebId,
                    DebtRaised = PIEntry.DebtRaised,
                    Approved = PIEntry.Approved,
                    AddLessManualOrFormula = PIEntry.AddLessManualOrFormula,
                    CurrencyId = CurID,
                    ExchangeRate = PIEntry.ExchangeRate,
                    CreatedBy = PIEntry.CreatedBy,
                    ledgerid = LegId,
                    voucherid = VocId,

                };

                AxonApparel.Repository.Pur_Inv_Debit_Credit puroInvCdrDib = new AxonApparel.Repository.Pur_Inv_Debit_Credit
                {
                    Pur_Inv_id = PIEntry.pur_invid,
                    Reason = PIEntry.DReason,
                    CreditAmount = PIEntry.CRateDiff,
                    DebitAmount=PIEntry.DRateDiff,
                    Head = PIEntry.DHead,

                };
                var GrnItmList = new List<Pur_Inv_Dc>();

                foreach (var GItem in PIEntry.PurInvDcDet)
                {

                    GrnItmList.Add(new Pur_Inv_Dc
                        {
                            pur_grn_masid = GItem.pur_grn_masid,
                            Pur_Inv_DcId = GItem.Pur_Inv_DcId,
                            pur_invid = GItem.pur_invid,

                        });

                }

                var ItemDetails = new List<Pur_Inv_Det>();

                if (PIEntry.PurInvDDet != null)
                {
                    foreach (var Item in PIEntry.PurInvDDet)
                    {



                        if (Item.pur_ord_detid == 0)
                        {
                            PDetId = null;
                        }
                        else
                        {
                            PDetId = Item.pur_ord_detid;
                        }

                        ItemDetails.Add(new Pur_Inv_Det
                        {

                            Pur_inv_Detid = Item.Pur_inv_Detid,
                            Pur_inv_id = Item.Pur_inv_id,
                            Pur_grn_detid = Item.Pur_grn_detid,
                            Rate = Item.InvRate,
                            InvoiceQty = Item.InvoiceQty,
                            pur_inv_dcid = Item.pur_inv_dcid,
                            closed = Item.closed,
                            Rate_Diff = Item.DiffRate,
                            Excess_Qty = Item.DiffQty,
                            pur_ord_detid = PDetId,
                            balance_qty = Item.balance_qty,
                            CGSTAMt = Item.CGSTAMt,
                            SGSTAMT = Item.SGSTAMT,
                            IGSTAMT = Item.IGSTAMT,
                            CGST = Item.CGST,
                            SGST = Item.SGST,
                            IGST = Item.IGST,
                            HSNCODE = Item.HSNCODE,
                            pur_grn_masid=Item.Pur_grn_masid,


                        });
                    }
                }


                var InvOrdDetails = new List<Pur_Inv_Ord_det>();
                if (PIEntry.PurInvOrdDDet != null)
                {
                    foreach (var Ord in PIEntry.PurInvOrdDDet)
                    {

                        InvOrdDetails.Add(new Pur_Inv_Ord_det
                        {

                            Pur_Inv_Ord_DetID = Ord.Pur_Inv_Ord_DetID,
                            Pur_invID = Ord.Pur_invID,
                            Pur_Inv_DetID = Ord.Pur_Inv_DetID,
                            Order_No = Ord.Order_No,
                            StyleID = Ord.StyleID,
                            InvoiceQty = Ord.InvoiceQty,

                        });
                    }
                }

                var InvAccDetails = new List<Pur_Inv_Addless>();
                if (PIEntry.PurInvAddLess != null)
                {
                    foreach (var Ac in PIEntry.PurInvAddLess)
                    {

                      
                        if (Ac.company_unitid == 0)
                        {
                            CompUnitId = null;
                        }
                        else
                        {
                            CompUnitId = Ac.company_unitid;
                        }

                        InvAccDetails.Add(new Pur_Inv_Addless
                        {

                            Pur_Inv_AddlessId = Ac.Pur_Inv_AddlessId,
                            pur_invid = Ac.pur_invid,
                            company_unitid = CompUnitId,
                            addless_id = Ac.addless_id,
                            percentage = Ac.percentage,
                            amount = Ac.amount,
                            aorl=Ac.aorl,

                        });
                    } 
                }

                var result = GRep.AddDetData(puroInvInsert, GrnItmList, ItemDetails, InvOrdDetails, InvAccDetails, puroInvCdrDib);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<IQueryable<PurInvMas>> GetDataSuppDetails(string OType, int? company_id, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataSuppRepDetails(OType, company_id, FromDate, ToDate);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetDataOrdDetails(string OType, int? company_id, int? SuppId, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataOrderRepDetails(OType, company_id,SuppId, FromDate, ToDate);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetDataInvDetails(string OType, int? company_id, int? SuppId, string OrdNo, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataInvRepDetails(OType, company_id, SuppId,OrdNo, FromDate, ToDate);

                return new Response<IQueryable<PurInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetDataInvMainDetails(string OType, int? company_id, int? SuppId, string OrdNo, string InvNo, string SupDcno, string FromDate, string ToDate, string RefNo)
        {
            try
            {
                var PWO = GRep.GetDataMainRepDetails(OType, company_id, SuppId, OrdNo, InvNo, SupDcno, FromDate, ToDate, RefNo);

                return new Response<IQueryable<PurInvMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurInvMas>> GetInvEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepEditInvDetails(Id);

                return new Response<IQueryable<PurInvMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvDc>> ListInGrnEditItemDetails(int InvId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvGrnEditItemLoad(InvId, CompId, SuppId);

                return new Response<IList<PurInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvDet>> ListInEditItemDetails(int InvId, int GrnMasId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvEditItemLoad(InvId, GrnMasId,CompId, SuppId);

                return new Response<IList<PurInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvOrdDet>> ListInOrdEditDetails(int InvId, int CompId, int SuppId, int ItemId, int ColorId, int SizeId, int GrnDetId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvEditOrdLoad(InvId, CompId, SuppId, ItemId, ColorId, SizeId, GrnDetId);

                return new Response<IList<PurInvOrdDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvOrdDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurInvAddless>> ListInAddLessEditDetails(int InvId)
        {
            try
            {
                var CurRGList = GRep.GetRepInvEditAddLessLoad(InvId);

                return new Response<IList<PurInvAddless>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurInvAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateInvEntry(PurInvMas InvEEntry)
        {
            int? CurID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? DebId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            int? CompUnitId = 0;
            if (InvEEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = InvEEntry.CurrencyId;
            }
            if (InvEEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = InvEEntry.ledgerid;
            }
            if (InvEEntry.CreditID == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = InvEEntry.CreditID;
            }
            if (InvEEntry.DebitID == 0)
            {
                DebId = null;
            }
            else
            {
                DebId = InvEEntry.DebitID;
            }
            if (InvEEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = InvEEntry.voucherid;
            }

            try
            {



                AxonApparel.Repository.Pur_Inv_Mas InvMasEdit = new AxonApparel.Repository.Pur_Inv_Mas
                {

                    invoice_no = InvEEntry.invoice_no,
                    invoice_date = InvEEntry.invoice_date,
                    company_id = (int)InvEEntry.company_id,
                    supplierid = InvEEntry.supplierid,
                    Gross_amount = InvEEntry.Gross_amount,
                    Addless_amount = InvEEntry.Addless_amount,
                    remarks = InvEEntry.remarks,
                    invoice_value = InvEEntry.invoice_value,
                    supp_inv_no = InvEEntry.supp_inv_no,
                    supp_inv_date = InvEEntry.supp_inv_date,
                    CreditID = CreId,
                    DebitID = DebId,
                    DebtRaised = InvEEntry.DebtRaised,
                    Approved = InvEEntry.Approved,
                    AddLessManualOrFormula = InvEEntry.AddLessManualOrFormula,
                    CurrencyId = CurID,
                    ExchangeRate = InvEEntry.ExchangeRate,
                    CreatedBy = InvEEntry.CreatedBy,
                    ledgerid = LegId,
                    voucherid = VocId,
                    pur_invid=InvEEntry.pur_invid,

                };

                AxonApparel.Repository.Pur_Inv_Debit_Credit puroInvEditCdrDib = new AxonApparel.Repository.Pur_Inv_Debit_Credit
                {
                    Pur_Inv_id = InvEEntry.pur_invid,
                    Reason = InvEEntry.DReason,
                    CreditAmount = InvEEntry.CRateDiff,
                    DebitAmount = InvEEntry.DRateDiff,
                    Head = InvEEntry.DHead,

                };
                var EGrnItmList = new List<Pur_Inv_Dc>();

                foreach (var GItem in InvEEntry.PurInvDcDet)
                {

                    EGrnItmList.Add(new Pur_Inv_Dc
                    {
                        pur_grn_masid = GItem.pur_grn_masid,
                        Pur_Inv_DcId = GItem.Pur_Inv_DcId,
                        pur_invid = GItem.pur_invid,

                    });

                }

                var EItemDetails = new List<Pur_Inv_Det>();

                if (InvEEntry.PurInvDDet != null)
                {
                    foreach (var Item in InvEEntry.PurInvDDet)
                    {



                        if (Item.pur_ord_detid == 0)
                        {
                            PDetId = null;
                        }
                        else
                        {
                            PDetId = Item.pur_ord_detid;
                        }

                        EItemDetails.Add(new Pur_Inv_Det
                        {

                            Pur_inv_Detid = Item.Pur_inv_Detid,
                            Pur_inv_id = Item.Pur_inv_id,
                            Pur_grn_detid = Item.Pur_grn_detid,
                            Rate = Item.InvRate,
                            InvoiceQty = Item.InvoiceQty,
                            pur_inv_dcid = Item.pur_inv_dcid,
                            closed = Item.closed,
                            Rate_Diff = Item.DiffRate,
                            Excess_Qty = Item.DiffQty,
                            pur_ord_detid = PDetId,
                            balance_qty = Item.balance_qty,
                            CGSTAMt = Item.CGSTAMt,
                            SGSTAMT = Item.SGSTAMT,
                            IGSTAMT = Item.IGSTAMT,
                            CGST = Item.CGST,
                            SGST = Item.SGST,
                            IGST = Item.IGST,
                            HSNCODE = Item.HSNCODE,
                            pur_grn_masid = Item.Pur_grn_masid,


                        });
                    }
                }


                var EInvOrdDetails = new List<Pur_Inv_Ord_det>();
                if (InvEEntry.PurInvOrdDDet != null)
                {
                    foreach (var Ord in InvEEntry.PurInvOrdDDet)
                    {

                        EInvOrdDetails.Add(new Pur_Inv_Ord_det
                        {

                            Pur_Inv_Ord_DetID = Ord.Pur_Inv_Ord_DetID,
                            Pur_invID = Ord.Pur_invID,
                            Pur_Inv_DetID = Ord.Pur_Inv_DetID,
                            Order_No = Ord.Order_No,
                            StyleID = Ord.StyleID,
                            InvoiceQty = Ord.InvoiceQty,

                        });
                    }
                }

                var EInvAccDetails = new List<Pur_Inv_Addless>();
                if (InvEEntry.PurInvAddLess != null)
                {
                    foreach (var Ac in InvEEntry.PurInvAddLess)
                    {


                        if (Ac.company_unitid == 0)
                        {
                            CompUnitId = null;
                        }
                        else
                        {
                            CompUnitId = Ac.company_unitid;
                        }

                        EInvAccDetails.Add(new Pur_Inv_Addless
                        {

                            Pur_Inv_AddlessId = Ac.Pur_Inv_AddlessId,
                            pur_invid = Ac.pur_invid,
                            company_unitid = CompUnitId,
                            addless_id = Ac.addless_id,
                            percentage = Ac.percentage,
                            amount = Ac.amount,
                            aorl = Ac.aorl,

                        });
                    }
                }

                var result = GRep.UpdateDetData(InvMasEdit, EGrnItmList, EItemDetails, EInvOrdDetails, EInvAccDetails, puroInvEditCdrDib);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteInvEntry(PurInvMas InvDEntry)
        {
            int? CurID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? DebId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            int? CompUnitId = 0;
            if (InvDEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = InvDEntry.CurrencyId;
            }
            if (InvDEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = InvDEntry.ledgerid;
            }
            if (InvDEntry.CreditID == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = InvDEntry.CreditID;
            }
            if (InvDEntry.DebitID == 0)
            {
                DebId = null;
            }
            else
            {
                DebId = InvDEntry.DebitID;
            }
            if (InvDEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = InvDEntry.voucherid;
            }

            try
            {



                AxonApparel.Repository.Pur_Inv_Mas InvMasDet = new AxonApparel.Repository.Pur_Inv_Mas
                {

                    invoice_no = InvDEntry.invoice_no,
                    invoice_date = InvDEntry.invoice_date,
                    company_id = (int)InvDEntry.company_id,
                    supplierid = InvDEntry.supplierid,
                    Gross_amount = InvDEntry.Gross_amount,
                    Addless_amount = InvDEntry.Addless_amount,
                    remarks = InvDEntry.remarks,
                    invoice_value = InvDEntry.invoice_value,
                    supp_inv_no = InvDEntry.supp_inv_no,
                    supp_inv_date = InvDEntry.supp_inv_date,
                    CreditID = CreId,
                    DebitID = DebId,
                    DebtRaised = InvDEntry.DebtRaised,
                    Approved = InvDEntry.Approved,
                    AddLessManualOrFormula = InvDEntry.AddLessManualOrFormula,
                    CurrencyId = CurID,
                    ExchangeRate = InvDEntry.ExchangeRate,
                    CreatedBy = InvDEntry.CreatedBy,
                    ledgerid = LegId,
                    voucherid = VocId,
                    pur_invid = InvDEntry.pur_invid,

                };

                AxonApparel.Repository.Pur_Inv_Debit_Credit puroInvDelCdrDib = new AxonApparel.Repository.Pur_Inv_Debit_Credit
                {
                    Pur_Inv_id = InvDEntry.pur_invid,
                    Reason = InvDEntry.DReason,
                    CreditAmount = InvDEntry.CRateDiff,
                    DebitAmount = InvDEntry.DRateDiff,
                    Head = InvDEntry.DHead,

                };
                var DGrnItmList = new List<Pur_Inv_Dc>();

                foreach (var GItem in InvDEntry.PurInvDcDet)
                {

                    DGrnItmList.Add(new Pur_Inv_Dc
                    {
                        pur_grn_masid = GItem.pur_grn_masid,
                        Pur_Inv_DcId = GItem.Pur_Inv_DcId,
                        pur_invid = GItem.pur_invid,

                    });

                }

                var DItemDetails = new List<Pur_Inv_Det>();

                if (InvDEntry.PurInvDDet != null)
                {
                    foreach (var Item in InvDEntry.PurInvDDet)
                    {



                        if (Item.pur_ord_detid == 0)
                        {
                            PDetId = null;
                        }
                        else
                        {
                            PDetId = Item.pur_ord_detid;
                        }

                        DItemDetails.Add(new Pur_Inv_Det
                        {

                            Pur_inv_Detid = Item.Pur_inv_Detid,
                            Pur_inv_id = Item.Pur_inv_id,
                            Pur_grn_detid = Item.Pur_grn_detid,
                            Rate = Item.Rate,
                            InvoiceQty = Item.InvoiceQty,
                            pur_inv_dcid = Item.pur_inv_dcid,
                            closed = Item.closed,
                            Rate_Diff = Item.Rate_Diff,
                            Excess_Qty = Item.Excess_Qty,
                            pur_ord_detid = PDetId,
                            balance_qty = Item.balance_qty,
                            CGSTAMt = Item.CGSTAMt,
                            SGSTAMT = Item.SGSTAMT,
                            IGSTAMT = Item.IGSTAMT,
                            CGST = Item.CGST,
                            SGST = Item.SGST,
                            IGST = Item.IGST,
                            HSNCODE = Item.HSNCODE,
                            pur_grn_masid = Item.Pur_grn_masid,


                        });
                    }
                }


                var DInvOrdDetails = new List<Pur_Inv_Ord_det>();
                if (InvDEntry.PurInvOrdDDet != null)
                {
                    foreach (var Ord in InvDEntry.PurInvOrdDDet)
                    {

                        
                        DInvOrdDetails.Add(new Pur_Inv_Ord_det
                        {

                            Pur_Inv_Ord_DetID = Ord.Pur_Inv_Ord_DetID,
                            Pur_invID = Ord.Pur_invID,
                            Pur_Inv_DetID = Ord.Pur_Inv_DetID,
                            Order_No = Ord.Order_No,
                            StyleID = Ord.StyleID,
                            InvoiceQty = Ord.InvoiceQty,

                        });
                    }
                }

                var DInvAccDetails = new List<Pur_Inv_Addless>();
                if (InvDEntry.PurInvAddLess != null)
                {
                    foreach (var Ac in InvDEntry.PurInvAddLess)
                    {


                        if (Ac.company_unitid == 0)
                        {
                            CompUnitId = null;
                        }
                        else
                        {
                            CompUnitId = Ac.company_unitid;
                        }

                        DInvAccDetails.Add(new Pur_Inv_Addless
                        {

                            Pur_Inv_AddlessId = Ac.Pur_Inv_AddlessId,
                            pur_invid = Ac.pur_invid,
                            company_unitid = CompUnitId,
                            addless_id = Ac.addless_id,
                            percentage = Ac.percentage,
                            amount = Ac.amount,
                            aorl = Ac.aorl,

                        });
                    }
                }

                var result = GRep.DeleteDetData(InvMasDet, DGrnItmList, DItemDetails, DInvOrdDetails, DInvAccDetails, puroInvDelCdrDib);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
