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
    public class BulkOrderShipmentBusiness : IBulkOrderShipmentBusiness
    {
        IBulkOrderShipmentRepository bulkordshipRep = new BulkOrderShipmentRepository();



        public Response<bool> CreateBulkShipmentEntry(BuyOrdShipment BShipEnty, Domain.ProductionWorkOrder WorkOrderAdd)
        {
            try
            {

                var detailList = new List<Buy_Ord_Ship>();

                foreach (var item in BShipEnty.BuyOrdShipItem)
                {
                    detailList.Add(new Buy_Ord_Ship
                    {
                        ShipRowId = item.ShipRowId,
                        Buy_Ord_Ship1 = item.Buy_Ord_Ship,
                        Order_No = item.Order_No,
                        //Buy_Ord_MasId = item.Buy_Ord_MasId,
                        StyleId = item.StyleId,
                        Ship_Date = item.Ship_Date,
                        ItemMode = item.ItemMode,
                        Dest_Code = item.Dest_Code,
                        Quantity = item.Quantity,
                        //Job_Qty = item.Job_Qty,
                        //Finish_Qty = item.Finish_Qty,
                        StyleRowid = item.StyleRowid,
                        Lotno = item.Lotno,
                        ProductionQty = item.ProductionQty,
                        //Despatch_Qty = item.Despatch_Qty,
                        PortOfLoadingId = item.PortOfLoadingId,
                        ShipAmend = "N",
                        DelDate = item.DelDate,
                        AllowancePer = item.AllowancePer,
                        SlNo = item.SLNo,
                        PA = BShipEnty.PA
                        //Despatch_Closed = item.Despatch_Closed,
                        //CreatedBy = item.CreatedBy,
                    });
                }

                var PackList = new List<Buy_Ord_OrderDet>();
                if (BShipEnty.BuyOrdShipquan != null)
                {
                    foreach (var PItem in BShipEnty.BuyOrdShipquan)
                    {
                        int? IID = 0;

                        if (PItem.ItemId == 0)
                        {
                            IID = null;
                        }
                        else
                        {
                            IID = PItem.ItemId;
                        }
                        PackList.Add(new Buy_Ord_OrderDet
                        {
                            ItemId = IID,
                            AllowPer = PItem.AllowQty,
                            ProdQty = PItem.PQty,
                            Buy_Ord_Ship = PItem.Buy_Ord_Ship,//"SH!00001",
                            SizeId = PItem.SizeId,
                            Ratio = PItem.Ratio,
                            Quantity = PItem.Quantity,
                            Job_Qty = PItem.Job_Qty,
                            Finish_Qty = PItem.Finish_Qty,
                            StyleRow = PItem.StyleRow,
                            ShipRow = PItem.ShipRow,
                            SizeRow = PItem.SizeRow,
                            Order_No = PItem.Order_no,
                            Rate = PItem.Rate,
                            ComboId = PItem.ComboId,
                            Despatch_Qty = PItem.Despatch_Qty,
                            ComboRow = PItem.ComboRow,
                            Packed_Qty = 0,
                            SlNo = PItem.SSNO,
                        });
                    }
                }

                var DetPackList = new List<Buy_Ord_OrderDet>();
                if (BShipEnty.BuyOrdShipratio != null)
                {
                    foreach (var PItem in BShipEnty.BuyOrdShipratio)
                    {
                        DetPackList.Add(new Buy_Ord_OrderDet
                        {
                            ItemId = PItem.ItemId,
                            AllowPer = PItem.AllowQty,
                            ProdQty = PItem.PQty,
                            Buy_Ord_Ship = PItem.Buy_Ord_Ship,//"SH!00001",
                            SizeId = PItem.SizeId,
                            Ratio = PItem.Ratio,
                            Quantity = PItem.Quantity,
                            Job_Qty = PItem.Job_Qty,
                            Finish_Qty = PItem.Finish_Qty,
                            StyleRow = PItem.StyleRow,
                            ShipRow = PItem.ShipRow,
                            SizeRow = PItem.SizeRow,
                            Order_No = PItem.Order_no,
                            Rate = PItem.Rate,
                            ComboId = PItem.ComboId,
                            Despatch_Qty = PItem.Despatch_Qty,
                            ComboRow = PItem.ComboRow,
                            Packed_Qty = 0,
                            SlNo = PItem.SSNO,
                        });
                    }
                }

                var result = bulkordshipRep.AddPackData(detailList, PackList, DetPackList, WorkOrderAdd, BShipEnty);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }







        public Response<bool> UpdateBulkShipmentEntry(BuyOrdShipment BShipEnty, Domain.ProductionWorkOrder WorkOrderUpd)
        {
            try
            {
                bool EditinNew = false;

                var detailshipmasList = new List<Buy_Ord_Ship>();

                foreach (var Ship in BShipEnty.BuyOrdShipItem)
                {
                    detailshipmasList.Add(new Buy_Ord_Ship
                    {
                        ShipRowId = Ship.ShipRowId,
                        Buy_Ord_Ship1 = Ship.Buy_Ord_Ship,
                        Order_No = BShipEnty.Order_No,
                        StyleId = BShipEnty.StyleId,
                        Ship_Date = (DateTime)Ship.Ship_Date,
                        ItemMode = Ship.ItemMode,
                        Dest_Code = Ship.Dest_Code,
                        Quantity = Ship.Quantity,
                        StyleRowid = BShipEnty.StyleRowid,
                        Lotno = Ship.Lotno,
                        ProductionQty = Ship.ProductionQty,
                        PortOfLoadingId = Ship.PortOfLoadingId,
                        ShipAmend = "N",
                        AllowancePer = Ship.AllowancePer,
                        SlNo = Ship.SLNo,
                        DelDate=Ship.DelDate,
                        PA = BShipEnty.PA
                    });
                }
                //var result1 = bulkordshipRep.UpdateMasData(detailshipmasList);

                var detShipsepOrddetList = new List<Buy_Ord_OrderDet>();
                if (BShipEnty.BuyOrdShipquan != null)
                {
                    foreach (var Ord in BShipEnty.BuyOrdShipquan)
                    {

                        if (Ord.ShipRow > 0 && Ord.Buy_Ord_OrderDetId > 0)
                        {

                            detShipsepOrddetList.Add(new Buy_Ord_OrderDet
                            {
                                ItemId = Ord.ItemId,
                                AllowPer = Ord.AllowQty,
                                ProdQty = Ord.PQty,
                                Buy_Ord_Ship = Ord.Buy_Ord_Ship,//"SH!00001",
                                SizeId = Ord.SizeId,
                                Ratio = Ord.Ratio,
                                Quantity = Ord.Quantity,
                                Job_Qty = Ord.Job_Qty,
                                Finish_Qty = Ord.Finish_Qty,
                                StyleRow = Ord.StyleRow,
                                ShipRow = Ord.ShipRow,
                                SizeRow = Ord.SizeRow,
                                Order_No = Ord.Order_no,
                                Rate = Ord.Rate,
                                ComboId = Ord.ComboId,
                                Despatch_Qty = Ord.Despatch_Qty,
                                ComboRow = Ord.ComboRow,
                                Packed_Qty = 0,
                                SlNo = Ord.SSNO,
                                Buy_Ord_OrderDetId = Ord.Buy_Ord_OrderDetId,

                            });
                        }
                    }
                }

                var detailShipOrddetList = new List<Buy_Ord_Det>();
                if (BShipEnty.BuyOrdShipratio != null)
                {
                    foreach (var Ord in BShipEnty.BuyOrdShipratio)
                    {
                        if (Ord.ShipRow > 0 && Ord.Buy_Ord_DetId > 0)
                        {

                            detailShipOrddetList.Add(new Buy_Ord_Det
                            {
                                ITEMID = Ord.ItemId,
                                AllowanceQty = Ord.AllowQty,
                                ProductionQty = Ord.PQty,
                                Buy_Ord_Ship = Ord.Buy_Ord_Ship,//"SH!00001",
                                SizeId = Ord.SizeId,
                                ColorId=Ord.ColorId,
                                Quantity = Ord.Quantity,
                                Job_Qty = Ord.Job_Qty,
                                Finish_Qty = Ord.Finish_Qty,
                                StyleRowId = Ord.StyleRow,
                                ShipRow = Ord.ShipRow,
                                SizeRow = Ord.SizeRow,
                                Order_No = Ord.Order_no,
                                Rate = Ord.Rate,
                                ComboColorId = Ord.ComboId,
                                Despatch_Qty = Ord.Despatch_Qty,
                                Packed_Qty = 0,
                                Buy_Ord_DetId = Ord.Buy_Ord_DetId,


                            });
                        }
                    }
                }


                //var result = bulkordshipRep.UpdateDetData(detailshipmasList, detShipsepOrddetList, detailShipOrddetList, WorkOrderUpd);

                //edit add


                var detailList = new List<Buy_Ord_Ship>();

                foreach (var item in BShipEnty.BuyOrdShipItem)
                {
                    if (item.ShipRowId == 0)
                    {
                        EditinNew = true;

                        detailList.Add(new Buy_Ord_Ship
                        {
                            //ShipRowId = item.ShipRowId,
                            //Buy_Ord_Ship1 = item.Buy_Ord_Ship,
                            //Order_No = item.Order_No,
                            Buy_Ord_Ship1 = BShipEnty.Buy_Ord_Ship,
                            Order_No = BShipEnty.Order_No,
                            StyleId = BShipEnty.StyleId,
                            //Buy_Ord_MasId = item.Buy_Ord_MasId,
                            //StyleId = item.StyleId,
                            Ship_Date = item.Ship_Date,
                            ItemMode = item.ItemMode,
                            Dest_Code = item.Dest_Code,
                            Quantity = item.Quantity,
                            //Job_Qty = item.Job_Qty,
                            //Finish_Qty = item.Finish_Qty,
                            StyleRowid = BShipEnty.StyleRowid,
                            Lotno = item.Lotno,
                            ProductionQty = item.ProductionQty,
                            //Despatch_Qty = item.Despatch_Qty,
                            PortOfLoadingId = item.PortOfLoadingId,
                            ShipAmend = "N",
                            AllowancePer = item.AllowancePer,
                            SlNo = item.SLNo,
                            DelDate = item.DelDate,
                            //Despatch_Closed = item.Despatch_Closed,
                            //CreatedBy = item.CreatedBy,
                        });
                    }
                }

                var detShipOrddetList = new List<Buy_Ord_OrderDet>();
                if (BShipEnty.BuyOrdShipquan != null)
                {
                    foreach (var Ord in BShipEnty.BuyOrdShipquan)
                    {
                        if (Ord.Buy_Ord_OrderDetId == 0)
                        {

                            int? IID = 0;

                            if (Ord.ItemId == 0)
                            {
                                IID = null;
                            }
                            else
                            {
                                IID = Ord.ItemId;
                            }
                            detShipOrddetList.Add(new Buy_Ord_OrderDet
                            {
                                ItemId = IID,//Ord.ItemId,
                                AllowPer = Ord.AllowQty,
                                ProdQty = Ord.PQty,
                                Buy_Ord_Ship = Ord.Buy_Ord_Ship,//"SH!00001",
                                SizeId = Ord.SizeId,
                                Ratio = Ord.Ratio,
                                Quantity = Ord.Quantity,
                                Job_Qty = Ord.Job_Qty,
                                Finish_Qty = Ord.Finish_Qty,
                                StyleRow = Ord.StyleRow,
                                ShipRow = Ord.ShipRow,
                                SizeRow = Ord.SizeRow,
                                Order_No = Ord.Order_no,
                                Rate = Ord.Rate,
                                ComboId = Ord.ComboId,
                                Despatch_Qty = Ord.Despatch_Qty,
                                ComboRow = Ord.ComboRow,
                                Packed_Qty = 0,
                                SlNo = Ord.SSNO,
                                Buy_Ord_OrderDetId = Ord.Buy_Ord_OrderDetId,

                            });
                        }
                    }
                }

                var PackList = new List<Buy_Ord_Det>();
                if (BShipEnty.BuyOrdShipratio != null)
                {

                    foreach (var PItem in BShipEnty.BuyOrdShipratio)
                    {
                        if (PItem.Buy_Ord_DetId == 0)
                        {
                            PackList.Add(new Buy_Ord_Det
                            {
                                ITEMID = PItem.ItemId,
                                AllowanceQty = PItem.AllowQty,
                                ProductionQty = PItem.PQty,
                                Buy_Ord_Ship = PItem.Buy_Ord_Ship,
                                SizeId = PItem.SizeId,
                                Quantity = PItem.Quantity,
                                Job_Qty = PItem.Job_Qty,
                                Finish_Qty = PItem.Finish_Qty,
                                StyleRowId = PItem.StyleRow,
                                ShipRow = PItem.ShipRow,
                                SizeRow = PItem.SizeRow,
                                Order_No = PItem.Order_no,
                                Rate = PItem.Rate,
                                ComboColorId = PItem.ComboId,
                                Despatch_Qty = PItem.Despatch_Qty,
                                Packed_Qty = 0,

                            });
                        }
                    }
                }

                //if (EditinNew)
                //{
                //var result1 = bulkordshipRep.AddPackData(detailList, detShipOrddetList, PackList, WorkOrderUpd, BShipEnty);


                var result = bulkordshipRep.UpdateDetData(detailshipmasList, detShipsepOrddetList, detailShipOrddetList, WorkOrderUpd, detailList, detShipOrddetList, PackList, WorkOrderUpd, BShipEnty);
                //}

                EditinNew = false;
                return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");

                //return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteBulkShipmentEntry(int BulkShipId)
        {
            throw new NotImplementedException();
        }

        public Response<IQueryable<BuyOrdShipment>> GetShipDetDetails(int StyleRowId)
        {
            try
            {
                var CurDetList = bulkordshipRep.GetDataDetList(StyleRowId);

                return new Response<IQueryable<BuyOrdShipment>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<BuyOrdShipment>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BuyOrdShipPack>> GetPackType(int SNo, string PackType, int StyleRowId)
        {
            try
            {
                var CurList = bulkordshipRep.GetDataList(SNo, PackType, StyleRowId);

                return new Response<IList<BuyOrdShipPack>>(CurList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<IList<BuyOrdShipment>> ShipEditDetails(int StyleRowId)
        {
            try
            {
                var shipDetList = bulkordshipRep.GetRepShipDetList(StyleRowId);

                return new Response<IList<BuyOrdShipment>>(shipDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipment>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BuyOrdShipPack>> GetListPackLoadEditDetails(int StyleRowId)
        {
            try
            {
                var shipDetList = bulkordshipRep.GetRepPackLoadDetList(StyleRowId);

                return new Response<IList<BuyOrdShipPack>>(shipDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<BuyOrdShipPack>> GetListPackEditDetails(int ShiprowID, int StyleRowID, int SSNo)
        {
            try
            {
                var CurPacDetList = bulkordshipRep.GetRepPackDetList(ShiprowID, StyleRowID, SSNo);

                return new Response<IList<BuyOrdShipPack>>(CurPacDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> DeleteShip(int PID)
        {
            return new Response<bool>(bulkordshipRep.DeleteData(PID), Status.SUCCESS, "Deleted Successfully");
        }






        public Response<IList<BuyOrdShipPack>> GetPackSepType(int SNo, string PackType, int StyleRowId)
        {

            try
            {
                var CurList = bulkordshipRep.GetDataSepList(SNo, PackType, StyleRowId);

                return new Response<IList<BuyOrdShipPack>>(CurList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BuyOrdShipPack>> GetRepShipSepDetList(int StyleRowId)
        {
            try
            {
                var CurList = bulkordshipRep.GetRepShipSepDetList(StyleRowId);

                return new Response<IList<BuyOrdShipPack>>(CurList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<BuyOrdShipPack>> GetItemPackDetList(int StyleRowID, string orderno)
        {
            try
            {
                var CurList = bulkordshipRep.GetItemPackDetList(StyleRowID, orderno);

                return new Response<IList<BuyOrdShipPack>>(CurList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BuyOrdShipPack>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProductionWorkOrder>> GetDataCheckPlanWorkDetails(string Workorder)
        {
            try
            {
                var ProdutWO = bulkordshipRep.GetDataRepCheckPlanWorkDetails(Workorder);

                return new Response<IQueryable<ProductionWorkOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionWorkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
