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
    public class PurchaseGrnEntryBusiness : IPurchaseGrnEntryBusiness
    {
        IPurchaseGrnEntryRepository GRep = new PurchaseGrnEntryRepository();

        public Response<IList<PurchaseGrnItemDet>> ListGrnItemDetails(string PoId, int? CompId, int? SuppId,string pur_type)
        {
            try
            {
                var CurRGList = GRep.GetRepGrnItemLoad(PoId, CompId, SuppId, pur_type);

                return new Response<IList<PurchaseGrnItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseGrnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseGrnOrder>> ListEntryOrderDetails(string MPurId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string pur_type)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEntryGrnOrderLoad(MPurId, Itemid, ColorId, Sizeid, Uomid, quantity, pur_type);

                return new Response<IList<PurchaseGrnOrder>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseGrnOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePGrnEntry(PurchaseGrnMas POGEntry)
        {
            int? CunitId = 0;
            int? StoId = 0;
            int? EmpId = 0;
            int? supId = 0;
            if (POGEntry.company_unitid == 0)
            {
                CunitId = null;
            }
            else
            {
                CunitId = POGEntry.company_unitid;
            }

            if (POGEntry.StoreUnitID == 0)
            {
                StoId = null;
            }
            else
            {
                StoId = POGEntry.StoreUnitID;
            }
            if (POGEntry.CreatedBy == 0)
            {
                EmpId = null;
            }
            else
            {
                EmpId = POGEntry.CreatedBy;
            }


            try
            {

                //var PurGrnID = GRep.AddData(new AxonApparel.Repository.Pur_Grn_Mas
                //{

                //    receipt_no = POGEntry.receipt_no,
                //    companyid = POGEntry.companyid,
                //    company_unitid = CunitId,
                //    receipt_date = POGEntry.receipt_date,
                //    supplierid = POGEntry.supplierid,
                //    Dc_date = POGEntry.Dc_date,
                //    Dc_no = POGEntry.Dc_no,
                //    remarks = POGEntry.Remarks,
                //    grncommit = false,
                //    grncancel = false,
                //    grnclose = false,
                //    pur_type = POGEntry.pur_type,
                //    Amend = POGEntry.Amend,
                //    Inward_No = POGEntry.Inward_No,
                //    //Pur_ItemType = POGEntry.Pur_ItemType,
                //    Pur_ItemType = (POGEntry.Pur_ItemType == null ? "" : POGEntry.Pur_ItemType),
                //    DebtRaised = "N",
                //    StoreUnitID = StoId,
                //    CreatedBy = POGEntry.CreatedBy,
                //    Supp_Inv_No = POGEntry.Supp_Inv_No,
                //    ExcludeInv = false,


                //});


                //
                AxonApparel.Repository.Pur_Grn_Mas purgrnInsert = new AxonApparel.Repository.Pur_Grn_Mas
                {
                    receipt_no = POGEntry.receipt_no,
                    companyid = POGEntry.companyid,
                    company_unitid = CunitId,
                    receipt_date = POGEntry.receipt_date,
                    supplierid = POGEntry.supplierid,
                    Dc_date = POGEntry.Dc_date,
                    Dc_no = POGEntry.Dc_no,
                    remarks = POGEntry.Remarks,
                    grncommit = false,
                    grncancel = false,
                    grnclose = false,
                    pur_type = POGEntry.pur_type,
                    Amend = POGEntry.Amend,
                    Inward_No = POGEntry.Inward_No,
                    //Pur_ItemType = POGEntry.Pur_ItemType,
                    Pur_ItemType = (POGEntry.Pur_ItemType == null ? "" : POGEntry.Pur_ItemType),
                    DebtRaised = "N",
                    StoreUnitID = StoId,
                    CreatedBy = POGEntry.CreatedBy,
                    Supp_Inv_No = POGEntry.Supp_Inv_No,
                    ExcludeInv = false,
                    SuppInvDate = POGEntry.SuppInvdate
                    

                };
                
                //


                var ItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in POGEntry.PurchaseGrnItemDet)
                {


                    if (PItem.received_qty > 0)
                    {
                        ItmList.Add(new Pur_Grn_Det
                        {
                            Grn_MasId = PItem.Grn_MasId,
                            itemid = PItem.itemid,
                            sizeid = PItem.sizeid,
                            colorid = PItem.colorid,
                            received_qty = PItem.received_qty,
                            uomId = PItem.uomId,
                            rate = PItem.rate,
                            balance = PItem.balance,
                            invoiced_qty = 0,
                            debit_id = PItem.debit_id,
                            excess_qty = PItem.excess_qty,
                            debit_rate = PItem.debit_rate,
                            MfrId = EmpId,
                            Sec_Qty = PItem.Sec_Qty,
                            Excess_Stockid = PItem.Excess_Stockid,
                            rejected_qty = PItem.rejected_qty,
                            shortage_qty = PItem.shortage_qty,
                            accepted_qty = PItem.accepted_qty,
                            return_qty = PItem.return_qty,
                            debit_qty = PItem.debit_qty,
                            receivable_qty = PItem.receivable_qty,
                            Qlty_Excess = PItem.Qlty_Excess,
                            Excess_return = PItem.Excess_return,
                            itemremarks = PItem.itemremarks,
                            Closed = false,
                            Short_stkid = PItem.Short_stkid,
                            Reject_stkid = PItem.Reject_stkid,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            ReturnQty = PItem.ReturnQty,
                            Grn_RtnId = PItem.Grn_RtnId,

                        });
                    }
                }

                var OrdListDetails = new List<Pur_Grn_Order>();

                if (POGEntry.PurchaseGrnODet != null)
                {
                    foreach (var POrderDetails in POGEntry.PurchaseGrnODet)
                    {
                        if (POrderDetails.actual_mfrid == 0)
                        {
                            supId = null;
                        }
                        else
                        {
                            supId = POrderDetails.actual_mfrid;
                        }

                        OrdListDetails.Add(new Pur_Grn_Order
                        {


                            pur_ord_detid = POrderDetails.pur_ord_detid,
                            actual_mfrid = supId,//POrderDetails.actual_mfrid,
                            quantity = POrderDetails.quantity,
                            Rate = POrderDetails.Rate,
                            Invoiced_Qty = POrderDetails.Invoiced_Qty,
                            Rate_Diff = POrderDetails.Rate_Diff,
                            Excess_Qty = POrderDetails.Excess_Qty,
                            ItemID = POrderDetails.OItemid,
                            ColorID = POrderDetails.OColorid,
                            SizeID = POrderDetails.OSizeid,
                            UOMId = POrderDetails.OUomid,

                        });
                    }
                }



                var result = GRep.AddDetData(purgrnInsert, ItmList, OrdListDetails);





                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataPurGrnEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepGrnEditDetails(Id);

                return new Response<IQueryable<PurchaseGrnMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseGrnItemDet>> GetItemGrnEditDetails(int Id, int SupId, int CompId, string pur_type)
        {
            try
            {
                var CRGList = GRep.GetRepGrnEntryEditItemLoad(Id, SupId, CompId, pur_type);

                return new Response<IList<PurchaseGrnItemDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseGrnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseGrnOrder>> ListGetEditGrnOrderDetails(string GrnMasID, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, int SupId, int CompId, string pur_type)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepGrnEditOrderLoad(GrnMasID, Itemid, ColorId, Sizeid, Uomid, quantity, SupId, CompId, pur_type);

                return new Response<IList<PurchaseGrnOrder>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseGrnOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateGrnEntry(PurchaseGrnMas PEDGEntry)
        {
            int? CunitId = 0;
            int? StoId = 0;
            int? EmpId = 0;
            int? supId = 0;
            if (PEDGEntry.company_unitid == 0)
            {
                CunitId = null;
            }
            else
            {
                CunitId = PEDGEntry.company_unitid;
            }

            if (PEDGEntry.StoreUnitID == 0)
            {
                StoId = null;
            }
            else
            {
                StoId = PEDGEntry.StoreUnitID;
            }
            if (PEDGEntry.CreatedBy == 0)
            {
                EmpId = null;
            }
            else
            {
                EmpId = PEDGEntry.CreatedBy;
            }


            try
            {

                //var PurGrnID = GRep.UpdateData(new AxonApparel.Repository.Pur_Grn_Mas
                //{

                //    Grn_MasId = PEDGEntry.Grn_MasId,
                //    receipt_no = PEDGEntry.receipt_no,
                //    companyid = PEDGEntry.companyid,
                //    company_unitid = CunitId,
                //    receipt_date = PEDGEntry.receipt_date,
                //    supplierid = PEDGEntry.supplierid,
                //    Dc_date = PEDGEntry.Dc_date,
                //    Dc_no = PEDGEntry.Dc_no,
                //    remarks = PEDGEntry.Remarks,
                //    grncommit = false,
                //    grncancel = false,
                //    grnclose = false,
                //    pur_type = PEDGEntry.pur_type,
                //    Amend = PEDGEntry.Amend,
                //    Inward_No = PEDGEntry.Inward_No,
                //    //Pur_ItemType = POGEntry.Pur_ItemType,
                //    Pur_ItemType = (PEDGEntry.Pur_ItemType == null ? "" : PEDGEntry.Pur_ItemType),
                //    DebtRaised = "N",
                //    StoreUnitID = StoId,
                //    CreatedBy = PEDGEntry.CreatedBy,
                //    Supp_Inv_No = PEDGEntry.Supp_Inv_No,
                //    ExcludeInv = false,


                //});

                //

                
                AxonApparel.Repository.Pur_Grn_Mas purgrnupdate = new AxonApparel.Repository.Pur_Grn_Mas
                {
                    Grn_MasId = PEDGEntry.Grn_MasId,
                    receipt_no = PEDGEntry.receipt_no,
                    companyid = PEDGEntry.companyid,
                    company_unitid = CunitId,
                    receipt_date = PEDGEntry.receipt_date,
                    supplierid = PEDGEntry.supplierid,
                    Dc_date = PEDGEntry.Dc_date,
                    Dc_no = PEDGEntry.Dc_no,
                    remarks = PEDGEntry.Remarks,
                    grncommit = false,
                    grncancel = false,
                    grnclose = false,
                    pur_type = PEDGEntry.pur_type,
                    Amend = PEDGEntry.Amend,
                    Inward_No = PEDGEntry.Inward_No,
                    //Pur_ItemType = POGEntry.Pur_ItemType,
                    Pur_ItemType = (PEDGEntry.Pur_ItemType == null ? "" : PEDGEntry.Pur_ItemType),
                    DebtRaised = "N",
                    StoreUnitID = StoId,
                    CreatedBy = PEDGEntry.CreatedBy,
                    Supp_Inv_No = PEDGEntry.Supp_Inv_No,
                    ExcludeInv = false,
                    SuppInvDate = PEDGEntry.SuppInvdate,

                };

                //

                var ItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in PEDGEntry.PurchaseGrnItemDet)
                {


                    if (PItem.received_qty > 0)
                    {
                        ItmList.Add(new Pur_Grn_Det
                        {
                            Grn_MasId = PItem.Grn_MasId,
                            Grn_DetId = PItem.Grn_DetId,
                            itemid = PItem.itemid,
                            sizeid = PItem.sizeid,
                            colorid = PItem.colorid,
                            received_qty = PItem.received_qty,
                            uomId = PItem.uomId,
                            rate = PItem.rate,
                            balance = PItem.balance,
                            invoiced_qty = 0,
                            debit_id = PItem.debit_id,
                            excess_qty = PItem.excess_qty,
                            debit_rate = PItem.debit_rate,
                            MfrId = EmpId,
                            Sec_Qty = PItem.Sec_Qty,
                            Excess_Stockid = PItem.Excess_Stockid,
                            rejected_qty = PItem.rejected_qty,
                            shortage_qty = PItem.shortage_qty,
                            accepted_qty = PItem.accepted_qty,
                            return_qty = PItem.return_qty,
                            debit_qty = PItem.debit_qty,
                            receivable_qty = PItem.receivable_qty,
                            Qlty_Excess = PItem.Qlty_Excess,
                            Excess_return = PItem.Excess_return,
                            itemremarks = PItem.itemremarks,
                            Closed = false,
                            Short_stkid = PItem.Short_stkid,
                            Reject_stkid = PItem.Reject_stkid,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            ReturnQty = PItem.ReturnQty,
                            Grn_RtnId = PItem.Grn_RtnId,

                        });
                    }
                }

                var OrdListDetails = new List<Pur_Grn_Order>();

                if (PEDGEntry.PurchaseGrnODet != null)
                {
                    foreach (var POrderDetails in PEDGEntry.PurchaseGrnODet)
                    {
                        if (POrderDetails.actual_mfrid == 0)
                        {
                            supId = null;
                        }
                        else
                        {
                            supId = POrderDetails.actual_mfrid;
                        }

                        OrdListDetails.Add(new Pur_Grn_Order
                        {


                            pur_ord_detid = POrderDetails.pur_ord_detid,
                            actual_mfrid = supId,//POrderDetails.actual_mfrid,
                            quantity = POrderDetails.quantity,
                            Rate = POrderDetails.Rate,
                            Invoiced_Qty = POrderDetails.Invoiced_Qty,
                            Rate_Diff = POrderDetails.Rate_Diff,
                            Excess_Qty = POrderDetails.Excess_Qty,
                            ItemID = POrderDetails.OItemid,
                            ColorID = POrderDetails.OColorid,
                            SizeID = POrderDetails.OSizeid,
                            UOMId = POrderDetails.OUomid,
                            grn_detid = POrderDetails.grn_detid,
                            Grn_DetOrdId = POrderDetails.Grn_DetOrdId,

                        });
                    }
                }
                var result = GRep.UpdateDetData(purgrnupdate,ItmList, OrdListDetails);


                var EItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in PEDGEntry.PurchaseGrnItemDet)
                {


                    if (PItem.received_qty > 0 && PItem.Grn_DetId == 0)
                    {
                        EItmList.Add(new Pur_Grn_Det
                        {
                            Grn_MasId = PEDGEntry.Grn_MasId,
                            itemid = PItem.itemid,
                            sizeid = PItem.sizeid,
                            colorid = PItem.colorid,
                            received_qty = PItem.received_qty,
                            uomId = PItem.uomId,
                            rate = PItem.rate,
                            balance = PItem.balance,
                            invoiced_qty = 0,
                            debit_id = PItem.debit_id,
                            excess_qty = PItem.excess_qty,
                            debit_rate = PItem.debit_rate,
                            MfrId = EmpId,
                            Sec_Qty = PItem.Sec_Qty,
                            Excess_Stockid = PItem.Excess_Stockid,
                            rejected_qty = PItem.rejected_qty,
                            shortage_qty = PItem.shortage_qty,
                            accepted_qty = PItem.accepted_qty,
                            return_qty = PItem.return_qty,
                            debit_qty = PItem.debit_qty,
                            receivable_qty = PItem.receivable_qty,
                            Qlty_Excess = PItem.Qlty_Excess,
                            Excess_return = PItem.Excess_return,
                            itemremarks = PItem.itemremarks,
                            Closed = false,
                            Short_stkid = PItem.Short_stkid,
                            Reject_stkid = PItem.Reject_stkid,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            ReturnQty = PItem.ReturnQty,
                            Grn_RtnId = PItem.Grn_RtnId,

                        });
                    }
                }

                var EOrdListDetails = new List<Pur_Grn_Order>();

                if (PEDGEntry.PurchaseGrnODet != null)
                {
                    foreach (var POrderDetails in PEDGEntry.PurchaseGrnODet)
                    {
                        if (POrderDetails.actual_mfrid == 0)
                        {
                            supId = null;
                        }
                        else
                        {
                            supId = POrderDetails.actual_mfrid;
                        }
                        if ( POrderDetails.Grn_DetOrdId == 0)
                        {
                            EOrdListDetails.Add(new Pur_Grn_Order
                            {


                                pur_ord_detid = POrderDetails.pur_ord_detid,
                                actual_mfrid = supId,//POrderDetails.actual_mfrid,
                                quantity = POrderDetails.quantity,
                                Rate = POrderDetails.Rate,
                                Invoiced_Qty = POrderDetails.Invoiced_Qty,
                                Rate_Diff = POrderDetails.Rate_Diff,
                                Excess_Qty = POrderDetails.Excess_Qty,
                                ItemID = POrderDetails.OItemid,
                                ColorID = POrderDetails.OColorid,
                                SizeID = POrderDetails.OSizeid,
                                UOMId = POrderDetails.OUomid,

                            });
                        }
                    }
                }
                var result1 = GRep.AddDetData(purgrnupdate,EItmList, EOrdListDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<bool> DeleteGrnPurchase(PurchaseGrnMas PoDEntry)
        {
            try
            {
                var detailOrderListEdit = new List<Pur_Grn_Order>();
                if (PoDEntry.PurchaseGrnODet != null)
                {
                    foreach (var Order in PoDEntry.PurchaseGrnODet)
                    {



                        detailOrderListEdit.Add(new Pur_Grn_Order
                        {                                              

                            pur_ord_detid = Order.pur_ord_detid,
                            actual_mfrid = Order.actual_mfrid,
                            quantity = Order.quantity,
                            Rate = Order.Rate,
                            Invoiced_Qty = Order.Invoiced_Qty,
                            Rate_Diff = Order.Rate_Diff,
                            Excess_Qty = Order.Excess_Qty,
                            ItemID = Order.OItemid,
                            ColorID = Order.OColorid,
                            SizeID = Order.OSizeid,
                            UOMId = Order.OUomid,
                            Grn_DetOrdId=Order.Grn_DetOrdId,
                            grn_detid=Order.grn_detid,
                        });
                    }
                }

                var result1 = GRep.DeleteData(detailOrderListEdit, PoDEntry.Grn_MasId);

                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        
        }


        public Response<IQueryable<PurchaseGrnMas>> GetGrnNoList()
        {
            try
            {
                var OrdList = GRep.GetDataList();
                return new Response<IQueryable<PurchaseGrnMas>>(OrdList.Select(m => new PurchaseGrnMas
                {
                    Grn_MasId = m.Grn_MasId,
                    receipt_no = m.receipt_no
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<PurchaseGrnMas> GetDataByRef(string DCNo, int supplierid, string CurrYear)
        {
            try
            {
                var buo = GRep.CheckRefRep(DCNo, supplierid, CurrYear);


                return new Response<Domain.PurchaseGrnMas>(new Domain.PurchaseGrnMas
                {

                   Grn_MasId=buo.Grn_MasId,
                   Dc_no=buo.Dc_no

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.PurchaseGrnMas>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseGrnItemDet>> GetPurchaseItemRemarks(int Detid, string Type)
        {
            try
            {
                var CurRGList = GRep.GetPurchaseItemRemarks(Detid, Type);

                return new Response<IList<PurchaseGrnItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseGrnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
