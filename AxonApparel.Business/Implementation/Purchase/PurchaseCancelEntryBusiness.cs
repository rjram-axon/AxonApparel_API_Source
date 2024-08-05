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
    public class PurchaseCancelEntryBusiness : IPurchaseCancelEntryBusiness
    {


        IPurchaseCancelEntryRepository GRep = new PurchaseOrderCancelEntryRepository();

        public Response<IQueryable<PurchaseOrder>> ListEntryDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepCanEditDetails(Id);

                return new Response<IQueryable<PurchaseOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseOrderItemDet>> ListEntryCanItemDetails(int Id)
        {
            try
            {
                var CRGList = GRep.GetRepEntryCanEditItemLoad(Id);

                return new Response<IList<PurchaseOrderItemDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseOrderDet>> ListEntryCanOrderDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepCanEditOrderLoad(pur_ord_id, ItemID, ColorID, SizeID, PurUomId);

                return new Response<IList<PurchaseOrderDet>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePOrderCancelEntry(PurchaseOrder POEntry)
        {

            int? IsCrBy = 0;

            if (POEntry.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = POEntry.CreatedBy;
            }


            try
            {

                //var PurCID = GRep.AddData(new AxonApparel.Repository.Pur_Cancel_Mas
                //{

                //    Pur_Ord_Id = POEntry.pur_ord_id,
                //    CancelNo = POEntry.CancelNo,
                //    CancelDate = (DateTime)POEntry.CancelDate,
                //    CancelledBY = POEntry.CEmpName,
                //    Remarks = (POEntry.remarks == null ? string.Empty : POEntry.remarks),

                //});



                AxonApparel.Repository.Pur_Cancel_Mas purordcanInsert = new AxonApparel.Repository.Pur_Cancel_Mas
                {
                    Pur_Ord_Id = POEntry.pur_ord_id,
                    CancelNo = POEntry.CancelNo,
                    CancelDate = (DateTime)POEntry.CancelDate,
                    CancelledBY = POEntry.CEmpName,
                    Remarks = (POEntry.remarks == null ? string.Empty : POEntry.remarks),          
                };

                var ItmList = new List<Pur_Cancel_Det>();

                foreach (var PItem in POEntry.PurchaseItemDet)
                {


                    if (PItem.Cancel_Qty > 0)
                    {

                        ItmList.Add(new Pur_Cancel_Det
                        {

                           // CancelId = PurCID,
                            ItemId = PItem.ItemID,
                            ColorId = PItem.ColorID,
                            SizeId = PItem.SizeID,
                            UomId = PItem.PurUomId,
                            CancelQty = PItem.Cancel_Qty,
                            Pur_Ord_DetId = PItem.Pur_Ord_DetId,


                        });
                    }
                }

                var OrdListDetails = new List<Pur_Cancel_Order>();

                if (POEntry.PurchaseODet != null)
                {
                    foreach (var POrderDetails in POEntry.PurchaseODet)
                    {


                        OrdListDetails.Add(new Pur_Cancel_Order
                        {



                            //CancelId = PurCID,
                            OrderNo = POrderDetails.OrderNo,
                            StyleId = POrderDetails.Styleid,
                            ColorID = POrderDetails.ColorID,
                            SizeID = POrderDetails.SizeID,
                            ItemID = POrderDetails.ItemID,
                            UOMid = POrderDetails.PurUomId,
                            CancelQty = POrderDetails.Cancel_Qty,
                            Pur_Ord_BuyJobid = POrderDetails.Pur_Ord_BuyJobid,

                        });
                    }
                }
                var result = GRep.AddDetData(purordcanInsert, ItmList, OrdListDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> EditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.EditCanLoadRep(Id);

                return new Response<IQueryable<PurchaseOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseOrderItemDet>> EditCanItemEditDetails(int Id)
        {
            try
            {
                var CRGList = GRep.EditCanItemRep(Id);

                return new Response<IList<PurchaseOrderItemDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<IList<PurchaseOrderDet>> EdotOrderDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            try
            {
                var CRGList = GRep.EditCanOrderRep(pur_ord_id, ItemID, ColorID, SizeID, PurUomId);

                return new Response<IList<PurchaseOrderDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePoCancelEntry(PurchaseOrder POEntry)
        {


            try
            {

                //var PurCID = GRep.UpdateData(new AxonApparel.Repository.Pur_Cancel_Mas
                //{

                //    Pur_Ord_Id = POEntry.pur_ord_id,
                //    CancelNo = POEntry.CancelNo,
                //    CancelDate = (DateTime)POEntry.CancelDate,
                //    CancelledBY = POEntry.CEmpName,
                //    Remarks = (POEntry.remarks == null ? string.Empty : POEntry.remarks),

                //});




                AxonApparel.Repository.Pur_Cancel_Mas purcanedit = new AxonApparel.Repository.Pur_Cancel_Mas
                {

                    Pur_Ord_Id = POEntry.pur_ord_id,
                    CancelNo = POEntry.CancelNo,
                    CancelDate = (DateTime)POEntry.CancelDate,
                    CancelledBY = POEntry.CEmpName,
                    Remarks = (POEntry.remarks == null ? string.Empty : POEntry.remarks),

                };

                var ItmList = new List<Pur_Cancel_Det>();

                foreach (var PItem in POEntry.PurchaseItemDet)
                {


                    if (PItem.Cancel_Qty > 0 && PItem.CancelDetId >0)
                    {

                        ItmList.Add(new Pur_Cancel_Det
                        {

                            CancelId = POEntry.CancelID,
                            CancelDetID=PItem.CancelDetId,
                            ItemId = PItem.ItemID,
                            ColorId = PItem.ColorID,
                            SizeId = PItem.SizeID,
                            UomId = PItem.PurUomId,
                            CancelQty = PItem.Cancel_Qty,
                            Pur_Ord_DetId = PItem.Pur_Ord_DetId,


                        });
                    }
                }

                var OrdListDetails = new List<Pur_Cancel_Order>();

                if (POEntry.PurchaseODet != null)
                {
                    foreach (var POrderDetails in POEntry.PurchaseODet)
                    {


                        OrdListDetails.Add(new Pur_Cancel_Order
                        {



                            CancelId = POEntry.CancelID,
                            CancelOrdID=POrderDetails.CancelOrdId,
                            CancelDetID=POrderDetails.CancelDetId,
                            OrderNo = POrderDetails.OrderNo,
                            StyleId = POrderDetails.Styleid,
                            ColorID = POrderDetails.ColorID,
                            SizeID = POrderDetails.SizeID,
                            ItemID = POrderDetails.ItemID,
                            UOMid = POrderDetails.PurUomId,
                            CancelQty = POrderDetails.Cancel_Qty,
                            Pur_Ord_BuyJobid = POrderDetails.Pur_Ord_BuyJobid,

                        });
                    }
                }
                var result = GRep.UpdateDetData(purcanedit,ItmList, OrdListDetails);

                ////Edit
                //var EItmList = new List<Pur_Cancel_Det>();

                //foreach (var PItem in POEntry.PurchaseItemDet)
                //{


                //    if (PItem.Cancel_Qty > 0 && PItem.CancelDetId == 0)
                //    {

                //        EItmList.Add(new Pur_Cancel_Det
                //        {


                //            CancelId = POEntry.CancelID,                  
                //            CancelDetID = PItem.CancelDetId,
                //            ItemId = PItem.ItemID,
                //            ColorId = PItem.ColorID,
                //            SizeId = PItem.SizeID,
                //            UomId = PItem.PurUomId,
                //            CancelQty = PItem.Cancel_Qty,
                //            Pur_Ord_DetId = PItem.Pur_Ord_DetId,


                //        });
                //    }
                //}

                //var EOrdListDetails = new List<Pur_Cancel_Order>();

                //if (POEntry.PurchaseODet != null)
                //{
                //    foreach (var POrderDetails in POEntry.PurchaseODet)
                //    {
                //        if (POrderDetails.Cancel_Qty > 0 && POrderDetails.CancelOrdId == 0)
                //        {

                //            EOrdListDetails.Add(new Pur_Cancel_Order
                //            {


                //                CancelId = POEntry.CancelID,
                //                CancelOrdID = POrderDetails.CancelOrdId,
                //                CancelDetID = POrderDetails.CancelDetId,
                //                OrderNo = POrderDetails.OrderNo,
                //                StyleId = POrderDetails.Styleid,
                //                ColorID = POrderDetails.ColorID,
                //                SizeID = POrderDetails.SizeID,
                //                ItemID = POrderDetails.ItemID,
                //                UOMid = POrderDetails.PurUomId,
                //                CancelQty = POrderDetails.Cancel_Qty,
                //                Pur_Ord_BuyJobid = POrderDetails.Pur_Ord_BuyJobid,

                //            });
                //        }
                //    }
                //}
                //var result2 = GRep.AddDetData(purcanedit,EItmList, EOrdListDetails);

                //




                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteCanPurchase(PurchaseOrder PoDEntry)
        {
            try
            {
                var detailOrderListEdit = new List<Pur_Cancel_Order>();
                if (PoDEntry.PurchaseODet != null)
                {
                    foreach (var Order in PoDEntry.PurchaseODet)
                    {



                        detailOrderListEdit.Add(new Pur_Cancel_Order
                        {


                            CancelId = PoDEntry.CancelID,
                            CancelOrdID = Order.CancelOrdId,
                            CancelDetID = Order.CancelDetId,
                            OrderNo = Order.OrderNo,
                            StyleId = Order.Styleid,
                            ColorID = Order.ColorID,
                            SizeID = Order.SizeID,
                            ItemID = Order.ItemID,
                            UOMid = Order.PurUomId,
                            CancelQty = Order.Cancel_Qty,
                            Pur_Ord_BuyJobid = Order.Pur_Ord_BuyJobid,
                        });
                    }
                }

                var result1 = GRep.DeleteData(detailOrderListEdit, PoDEntry.CancelID);

                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
