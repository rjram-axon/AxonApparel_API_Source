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
   public class PurchaseDebitBusiness:IPurchaseDebitBusiness
    {
            
       IPurchaseDebitRepository PuDb = new PurchaseDebitRepository();

        public Response<IList<PurDebitMas>> ListDebAddDetails(int? companyid, int? SuppId, string DocType, string EntryType)
        {
            try
            {
                var CurGList = PuDb.GetRepAddDebLoad(companyid, SuppId, DocType, EntryType);

                return new Response<IList<PurDebitMas>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurDebitMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurDebitItemdet>> ListDebItemDetails(int? InvId, string DocType, string EntryType)
        {
            try
            {
                var CurGList = PuDb.GetRepItemDebLoad(InvId, DocType, EntryType);

                return new Response<IList<PurDebitItemdet>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurDebitItemdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<DebitOrdDetails>> ListDebOrderDetails(int? GdetId, string Mode, string EType)
        {
            try
            {
                var CurGList = PuDb.GetRepOrdDebLoad(GdetId, Mode, EType);

                return new Response<IList<DebitOrdDetails>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<DebitOrdDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurDebitOthers>> ListDebRateDetails(int? InvId, string EType,string Stype)
        {
            try
            {
                var CurGList = PuDb.GetRepRateDebLoad(InvId, EType, Stype);

                return new Response<IList<PurDebitOthers>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurDebitOthers>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePDebInvEntry(PurDebitMas PIEntry)
        {

         
            int? LegId = 0;
            int? VocId = 0;
          
            if (PIEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PIEntry.ledgerid;
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

                AxonApparel.Repository.Pur_Debit_Mas purInvDebInsert = new AxonApparel.Repository.Pur_Debit_Mas
                {
                    ledgerid = LegId,
                    voucherid = VocId,
                    companyid = (int)PIEntry.companyid,
                    supplierid = PIEntry.supplierid,
                    Debit_id = PIEntry.Debit_id,
                    Debit_no = PIEntry.Debit_no,
                    Debit_date = PIEntry.Debit_date,
                    company_unitid = PIEntry.company_unitid,                
                    remarks = PIEntry.remarks,
                    debitcommit = PIEntry.debitcommit,
                    DocuID = PIEntry.InvMasId,
                    DocumentNo = PIEntry.DocumentNo,
                    DocType = PIEntry.DocType,
                    DocPrefix = PIEntry.DocPrefix,
                    EntryType = PIEntry.EntryType,             
                    CreatedBy = PIEntry.CreatedBy,                  

                };

              
                var ItmList = new List<Pur_Debit_ItemDet>();

                foreach (var Item in PIEntry.PurDebItemDet)
                {

                    ItmList.Add(new Pur_Debit_ItemDet
                    {
                        Debit_detid = Item.Debit_detid,
                        Debit_id = Item.Debit_id,
                        Itemid = Item.Itemid,
                        colorid = Item.colorid,
                        Sizeid = Item.Sizeid,
                        uomid = Item.uomid,
                        ReturnQty=Item.ReturnQty,
                        dQty=Item.dQty,
                        Qty=Item.Qty,
                        Rate=Item.Rate,
                        dRate=Item.dRate,
                        Amount=Item.Amount,
                        grn_detid=Item.grn_detid,
                        DocType=Item.DocType,
                        Excess_qty=Item.Excess_qty,

                    });

                }

                var ODetails = new List<DebitOrderDetail>();

                if (PIEntry.PurDebOrd != null)
                {
                    foreach (var OItem in PIEntry.PurDebOrd)
                    {

                        ODetails.Add(new DebitOrderDetail
                        {

                            Debit_Orddetid = OItem.Debit_Orddetid,
                            Debit_detid = OItem.Debit_detid,
                            Debit_id = OItem.Debit_id,
                            Rate = OItem.Rate,
                            Amount = OItem.Amount,
                            OrderNo = OItem.OrderNo,
                            Styleid = OItem.Styleid,
                            DebitQty = OItem.DebitQty,       
                            ItemID=OItem.OItemid,
                            ColorID=OItem.OColorid,
                            SizeID=OItem.OSizeid,
                            UOMId=OItem.OUomid,


                        });
                    }
                }


                var RateDetails = new List<Pur_Debit_Others>();
                if (PIEntry.PurDebOthers != null)
                {
                    foreach (var Rate in PIEntry.PurDebOthers)
                    {

                        RateDetails.Add(new Pur_Debit_Others
                        {

                            Debit_detotherid = Rate.Debit_othersid,
                            Debit_id = Rate.Debit_id,
                            sDesc = Rate.sDesc,
                            Reason = Rate.Reason,
                            Amount = Rate.CAmount,                           

                        });
                    }
                }


                var result = PuDb.AddDetData(purInvDebInsert, ItmList, ODetails, RateDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurDebitMas>> GetDataInvDebMainDetails(int? companyid, int? supplierid, string DocType, string EntryType, string DocumentNo, string FromDate, string ToDate)
        {
            try
            {
                var PWO = PuDb.GetDataMainDebRepDetails(companyid, supplierid, DocType, EntryType, DocumentNo, FromDate, ToDate);

                return new Response<IQueryable<PurDebitMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurDebitMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurDebitMas>> GetDataMainEntDropDetails(int? companyid, int? supplierid, string DocType, string EntryType, string FromDate, string ToDate)
        {
            try
            {
                var PWO = PuDb.GetDataMainDebEntryRepDetails(companyid, supplierid, DocType, EntryType, FromDate, ToDate);

                return new Response<IQueryable<PurDebitMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurDebitMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurDebitMas>> LoadMailDetails(int Id)
        {
            try
            {
                var ProdutWO = PuDb.LoadMailDetails(Id);

                return new Response<IQueryable<PurDebitMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurDebitMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurDebitMas>> GetDebEditDetails(int Id)
        {
            try
            {
                var ProdutWO = PuDb.GetDataRepEditDebDetails(Id);

                return new Response<IQueryable<PurDebitMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurDebitMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurDebitItemdet>> ListDebEditItemDetails(int? InvId)
        {
            try
            {
                var CurGList = PuDb.GetRepEditItemDebLoad(InvId);

                return new Response<IList<PurDebitItemdet>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurDebitItemdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<DebitOrdDetails>> ListDebEditOrderDetails(int? Debit_id, int? GrnDetId, string Mode)
        {
            try
            {
                var CurGList = PuDb.GetRepEditOrdDebLoad(Debit_id, GrnDetId, Mode);

                return new Response<IList<DebitOrdDetails>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<DebitOrdDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePDebInvEntry(PurDebitMas PIUEntry)
        {
            int? LegId = 0;
            int? VocId = 0;

            if (PIUEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PIUEntry.ledgerid;
            }

            if (PIUEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PIUEntry.voucherid;
            }

            try
            {

                AxonApparel.Repository.Pur_Debit_Mas purInvDebUpdate = new AxonApparel.Repository.Pur_Debit_Mas
                {
                    ledgerid = LegId,
                    voucherid = VocId,
                    companyid = (int)PIUEntry.companyid,
                    supplierid = PIUEntry.supplierid,
                    Debit_id = PIUEntry.Debit_id,
                    Debit_no = PIUEntry.Debit_no,
                    Debit_date = PIUEntry.Debit_date,
                    company_unitid = PIUEntry.company_unitid,
                    remarks = PIUEntry.remarks,
                    debitcommit = PIUEntry.debitcommit,
                    DocuID = PIUEntry.InvMasId,
                    DocumentNo = PIUEntry.DocumentNo,
                    DocType = PIUEntry.DocType,
                    DocPrefix = PIUEntry.DocPrefix,
                    EntryType = PIUEntry.EntryType,
                    CreatedBy = PIUEntry.CreatedBy,

                };


                var EItmList = new List<Pur_Debit_ItemDet>();

                foreach (var Item in PIUEntry.PurDebItemDet)
                {

                    EItmList.Add(new Pur_Debit_ItemDet
                    {
                        Debit_detid = Item.Debit_detid,
                        Debit_id = Item.Debit_id,
                        Itemid = Item.Itemid,
                        colorid = Item.colorid,
                        Sizeid = Item.Sizeid,
                        uomid = Item.uomid,
                        ReturnQty = Item.ReturnQty,
                        dQty = Item.dQty,
                        Qty = Item.Qty,
                        Rate = Item.Rate,
                        dRate = Item.dRate,
                        Amount = Item.Amount,
                        grn_detid = Item.grn_detid,
                        DocType = Item.DocType,
                        Excess_qty = Item.Excess_qty,

                    });

                }

                var EODetails = new List<DebitOrderDetail>();

                if (PIUEntry.PurDebOrd != null)
                {
                    foreach (var OItem in PIUEntry.PurDebOrd)
                    {

                        EODetails.Add(new DebitOrderDetail
                        {

                            Debit_Orddetid = OItem.Debit_Orddetid,
                            Debit_detid = OItem.Debit_detid,
                            Debit_id = OItem.Debit_id,
                            Rate = OItem.Rate,
                            Amount = OItem.Amount,
                            OrderNo = OItem.OrderNo,
                            Styleid = OItem.Styleid,
                            DebitQty = OItem.DebitQty,
                            ItemID = OItem.OItemid,
                            ColorID = OItem.OColorid,
                            SizeID = OItem.OSizeid,
                            UOMId = OItem.OUomid,

                        });
                    }
                }


                var ERateDetails = new List<Pur_Debit_Others>();
                if (PIUEntry.PurDebOthers != null)
                {
                    foreach (var Rate in PIUEntry.PurDebOthers)
                    {

                        ERateDetails.Add(new Pur_Debit_Others
                        {

                            Debit_detotherid = Rate.Debit_othersid,
                            Debit_id = Rate.Debit_id,
                            sDesc = Rate.sDesc,
                            Reason = Rate.Reason,
                            Amount = Rate.CAmount,

                        });
                    }
                }


                var result = PuDb.UpdateDetData(purInvDebUpdate, EItmList, EODetails, ERateDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeletePDebInvEntry(PurDebitMas PIDEntry)
        {
            int? LegId = 0;
            int? VocId = 0;

            if (PIDEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PIDEntry.ledgerid;
            }

            if (PIDEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PIDEntry.voucherid;
            }

            try
            {

                AxonApparel.Repository.Pur_Debit_Mas purInvDebDelete = new AxonApparel.Repository.Pur_Debit_Mas
                {
                    ledgerid = LegId,
                    voucherid = VocId,
                    companyid = (int)PIDEntry.companyid,
                    supplierid = PIDEntry.supplierid,
                    Debit_id = PIDEntry.Debit_id,
                    Debit_no = PIDEntry.Debit_no,
                    Debit_date = PIDEntry.Debit_date,
                    company_unitid = PIDEntry.company_unitid,
                    remarks = PIDEntry.remarks,
                    debitcommit = PIDEntry.debitcommit,
                    DocuID = PIDEntry.InvMasId,
                    DocumentNo = PIDEntry.DocumentNo,
                    DocType = PIDEntry.DocType,
                    DocPrefix = PIDEntry.DocPrefix,
                    EntryType = PIDEntry.EntryType,
                    CreatedBy = PIDEntry.CreatedBy,

                };


                var DItmList = new List<Pur_Debit_ItemDet>();

                foreach (var Item in PIDEntry.PurDebItemDet)
                {

                    DItmList.Add(new Pur_Debit_ItemDet
                    {
                        Debit_detid = Item.Debit_detid,
                        Debit_id = Item.Debit_id,
                        Itemid = Item.Itemid,
                        colorid = Item.colorid,
                        Sizeid = Item.Sizeid,
                        uomid = Item.uomid,
                        ReturnQty = Item.ReturnQty,
                        dQty = Item.dQty,
                        Qty = Item.Qty,
                        Rate = Item.Rate,
                        dRate = Item.dRate,
                        Amount = Item.Amount,
                        grn_detid = Item.grn_detid,
                        DocType = Item.DocType,
                        Excess_qty = Item.Excess_qty,

                    });

                }

                var DODetails = new List<DebitOrderDetail>();

                if (PIDEntry.PurDebOrd != null)
                {
                    foreach (var OItem in PIDEntry.PurDebOrd)
                    {

                        DODetails.Add(new DebitOrderDetail
                        {

                            Debit_Orddetid = OItem.Debit_Orddetid,
                            Debit_detid = OItem.Debit_detid,
                            Debit_id = OItem.Debit_id,
                            Rate = OItem.Rate,
                            Amount = OItem.Amount,
                            OrderNo = OItem.OrderNo,
                            Styleid = OItem.Styleid,
                            DebitQty = OItem.DebitQty,
                            ItemID = OItem.OItemid,
                            ColorID = OItem.OColorid,
                            SizeID = OItem.OSizeid,
                            UOMId = OItem.OUomid,

                        });
                    }
                }


                var DRateDetails = new List<Pur_Debit_Others>();
                if (PIDEntry.PurDebOthers != null)
                {
                    foreach (var Rate in PIDEntry.PurDebOthers)
                    {

                        DRateDetails.Add(new Pur_Debit_Others
                        {

                            Debit_detotherid = Rate.Debit_othersid,
                            Debit_id = Rate.Debit_id,
                            sDesc = Rate.sDesc,
                            Reason = Rate.Reason,
                            Amount = Rate.CAmount,

                        });
                    }
                }


                var result = PuDb.DeleteDetData(purInvDebDelete, DItmList, DODetails, DRateDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
