using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Data.Objects;
namespace AxonApparel.Repository
{
    public class BulkOrderShipmentRepository : IBulkOrderShipmentRepository
    {

        OrderEntities entities = new OrderEntities();
        OrderEntities Finyearentities = new OrderEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public int Sno = 0;
        public int CSSno = 0;
        public int SSNo = 0;
        public int ShID = 0;
        public int ShipNo = 0;
        public string ShipOrdNo = "";

        public decimal Rate = 0;
        public decimal StyRate = 0;

        public bool AddPackData(List<Buy_Ord_Ship> objCDet, List<Buy_Ord_OrderDet> SepobjPDet, List<Buy_Ord_OrderDet> objPDet, ProductionWorkOrder objProdWOAdd, BuyOrdShipment BShipEnty)
        {
            bool reserved = false;
            var id = 0;
            var OType = "";
            var OrdType = "";
            int? BuyId = 0;
            int BMasId = 0;
            int StyRowId = 0;
            var OrdNo = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //insert jon_ord_mas table
                    var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == objProdWOAdd.OrderNo).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OType = OQuery.OrdType;
                    }

                    if (OType == "B")
                    {
                        OrdType = "W";
                    }
                    else
                    {
                        OrdType = OType;
                    }


                    if (objProdWOAdd.BuyerId == 0)
                    {
                        BuyId = null;
                    }
                    else
                    {
                        BuyId = objProdWOAdd.BuyerId;
                    }
                    BMasId = OQuery.Buy_Ord_MasId;
                    OrdNo = OQuery.Order_No;

                    Job_Ord_Mas jom = new Job_Ord_Mas();

                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));
                    var jobordmas = entities.Job_Ord_Mas.Where(c => c.Order_No == objProdWOAdd.OrderNo && c.Styleid == objProdWOAdd.StyleId && c.Job_Ord_No == objProdWOAdd.WorkOrder).FirstOrDefault();
                    if (jobordmas == null)
                    {
                        id = entities.Proc_AxonApparel_JobOrdMasInsert(objProdWOAdd.Stylerowid, objProdWOAdd.Orderdate, objProdWOAdd.OrderNo, objProdWOAdd.WorkOrder, objProdWOAdd.CompanyId,
                            BuyId, objProdWOAdd.StyleId, Convert.ToInt32(objProdWOAdd.Quantity),
                                                                            objProdWOAdd.Remarks, objProdWOAdd.WorkOrder, objProdWOAdd.ProcessUnitId, objProdWOAdd.ProductionQty, 0,
                                                                            objProdWOAdd.EmployeeID, OrdType, objParam, "NA");
                        entities.SaveChanges();



                    }

                    var bostyle = entities.buy_ord_style.Where(c => c.StyleRowid == objProdWOAdd.Stylerowid && c.Styleid == objProdWOAdd.StyleId && c.order_no == objProdWOAdd.OrderNo).FirstOrDefault();
                    if (bostyle != null)
                    {
                        bostyle.Company_Unitid = objProdWOAdd.ProdUnitId;
                        bostyle.ProductionQty = objProdWOAdd.ProductionQty;
                    }
                    entities.SaveChanges();




                    foreach (var item in objCDet)
                    {

                        string strShipNoSeq = "";
                        string Finyearcode = "";
                        string Finyearnumber = "";
                        string tblname = "Buy_Ord_Ship";
                        string ColName = "Buy_Ord_Ship";

                        var App1 = Finyearentities.Finyear.Where(c => 1 == 1).FirstOrDefault();

                        if (App1 != null)
                        {
                            Finyearnumber = App1.Description;
                        }

                        var App = Finyearentities.Finyear.Where(c => c.Description == Finyearnumber).FirstOrDefault();

                        if (App != null)
                        {
                            Finyearcode = App.YearCode;
                        }

                        var Px = this.entities.Database.SqlQuery<int>("exec Proc_Apparel_ShipNoGen {0}, {1}, {2} ", tblname, ColName, Finyearcode).FirstOrDefault();

                        if (Px != 0)
                        {
                            string N;
                            N = String.Format("{0:00000}", Convert.ToInt32(Px.ToString()));
                            strShipNoSeq = "SH" + Finyearcode + N;
                        }
                        else
                        {
                            strShipNoSeq = "SH" + Finyearcode + "00001";
                        }

                        if (item.ShipRowId == 0)
                        {
                            item.Buy_Ord_Ship1 = strShipNoSeq;
                            entities.Buy_Ord_Ship.Add(item);
                            entities.SaveChanges();
                            ShID = item.ShipRowId;
                            ShipOrdNo = item.Buy_Ord_Ship1;

                            //insert into JobDet
                            var Pg4 = entities.Proc_Apparel_ShipmentInsertJobDetTable(objProdWOAdd.WorkOrder, ShipOrdNo, item.DelDate, item.ProductionQty);
                            entities.SaveChanges();
                            //
                        }


                        foreach (var detItem in SepobjPDet)
                        {
                            Sno = (int)detItem.SlNo;

                            var App2 = entities.buy_ord_style.Where(c => c.order_no == detItem.Order_No && c.StyleRowid == detItem.StyleRow).FirstOrDefault();

                            if (App2 != null)
                            {
                                StyRate = (decimal)App2.price;
                                StyRowId = App2.StyleRowid;
                            }
                            if (Sno == item.SlNo && detItem.Buy_Ord_OrderDetId == 0)
                            {
                                detItem.ShipRow = ShID;
                                detItem.Buy_Ord_Ship = ShipOrdNo;
                                detItem.Rate = detItem.Rate;
                                var Pgbod = entities.Proc_Apparel_ShipmentInsertBuyOrderDetTable(ShipOrdNo, detItem.SizeId, detItem.Ratio, detItem.Quantity, StyRowId, detItem.ShipRow, OrdNo, detItem.Rate, detItem.ComboId, detItem.ComboRow, detItem.SlNo);
                                entities.SaveChanges();
                            }
                        }

                        foreach (var CSItem in BShipEnty.BuyOrdShipratio)
                        {
                            CSSno = (int)CSItem.SSNO;

                            if (CSSno == item.SlNo)
                            {

                                CSItem.Buy_Ord_Ship = ShipOrdNo;
                                CSItem.ShipRow = ShID;
                                CSItem.Order_no = objProdWOAdd.OrderNo;
                                //insert into BuyOrdDet
                                var Pgbd = entities.Proc_Apparel_ShipmentInsertBuyOrdDetTable(ShipOrdNo, CSItem.ColorId, CSItem.SizeId, CSItem.Quantity, objProdWOAdd.Stylerowid, CSItem.ShipRow, BMasId, OrdNo, CSItem.AllowQty, CSItem.PQty, CSItem.ItemId, CSItem.ColorId, CSItem.ComboId);
                                entities.SaveChanges();
                                //
                                //insert into JobOrdColor
                                var Pg5 = entities.Proc_Apparel_ShipmentInsertJobColorTable(objProdWOAdd.WorkOrder, ShipOrdNo, CSItem.ColorId, CSItem.SizeId, CSItem.PQty, CSItem.ItemId);
                                entities.SaveChanges();
                            }

                        }

                    }



                    //insert into ProgSumm
                    var Pgm = entities.Proc_Apparel_ShipmentInsertProgSummTable(OrdNo, objProdWOAdd.WorkOrder, StyRowId);
                    entities.SaveChanges();
                    //




                    //var res = AmendData(objCDet, SepobjPDet, objPDet, objProdWOAdd, BShipEnty, "Amnd");
                    //entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrderShipment-AddPackData");
                }

            }
            return reserved;
        }
        public int AddWorkOrderAmndData(List<Buy_Ord_Ship> objCDet, ProductionWorkOrder objAdd, BuyOrdShipment BShipEnty)
        {
            //using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            //{
            var id = 0;
            var OType = "";
            var OrdType = "";
            int? BuyId = 0;
            int? Jmasid = 0;
            var JordNo = "";
            try
            {


                var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == objAdd.OrderNo).FirstOrDefault();
                if (OQuery != null)
                {
                    OType = OQuery.OrdType;
                }

                if (OType == "B")
                {
                    OrdType = "W";
                }
                else
                {
                    OrdType = OType;
                }


                if (objAdd.BuyerId == 0)
                {
                    BuyId = null;
                }
                else
                {
                    BuyId = objAdd.BuyerId;
                }


                Job_Ord_Mas_Amend jom = new Job_Ord_Mas_Amend();

                //var id = entities.Job_Ord_Mas.Add(jom);
                ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));
                //var jobordmas = entities.Job_Ord_Mas_Amend.Where(c => c.Order_No == objAdd.OrderNo && c.Styleid == objAdd.StyleId && c.Job_Ord_No == objAdd.WorkOrder).FirstOrDefault();
                ////if (jobordmas == null)
                ////{
                //id = entities.Proc_AxonApparel_JobOrdMasInsert(objAdd.Stylerowid, objAdd.Orderdate, objAdd.OrderNo, objAdd.WorkOrder, objAdd.CompanyId,
                //    BuyId, objAdd.StyleId, Convert.ToInt32(objAdd.Quantity),
                //                                                    objAdd.Remarks, objAdd.WorkOrder, objAdd.ProcessUnitId, objAdd.ProductionQty, 0,
                //                                                    objAdd.EmployeeID, OrdType, objParam, "AA");
                //entities.SaveChanges();
                //}

                var jmas = entities.Job_Ord_Mas.Where(c => c.Order_No == objAdd.OrderNo && c.Styleid == objAdd.StyleId && c.Job_Ord_No == objAdd.WorkOrder).FirstOrDefault();
                if (jmas != null)
                {
                    Jmasid = jmas.ID;
                    JordNo = jmas.Job_Ord_No;
                }
                //                Job_Ord_No,Job_Ord_Date,Order_No,Sales_sample,Styleid,supplierid,unit_or_other,                           
                // merch_id,Qc_id,Programmed,quantity,buyerid,Companyid,stylerowid,JobOrWork,Remarks,ProcessUnitID,FinYear)                          
                //values
                //    (@JobOrderNo,@OrderDate,@OrderNo,'S',@StyleId,@ProcessUnitID,'P',@Qc_id,@Qc_id,0,@Quantity,@BuyerId,@CompanyId,                          
                //@StyleRowId,@OType,@Remarks,@ProcessUnitID,'1617'

                Repository.Job_Ord_Mas_Amend masamd = new Repository.Job_Ord_Mas_Amend();
                if (objAdd != null)
                {
                    masamd.ID = Jmasid;
                    masamd.Job_Ord_No = JordNo;
                    masamd.Amend = "N";
                    masamd.RateType = "PR";
                    masamd.Stylerowid = objAdd.Stylerowid;
                    masamd.Order_No = objAdd.OrderNo;
                    masamd.Sales_sample = "S";
                    masamd.Styleid = objAdd.StyleId;
                    masamd.Supplierid = objAdd.ProcessUnitId;
                    masamd.Unit_or_other = "P";
                    masamd.Merch_id = objAdd.EmployeeID;
                    masamd.Qc_id = objAdd.EmployeeID;
                    masamd.Programmed = false;
                    masamd.Quantity = objAdd.Quantity;
                    masamd.Buyerid = objAdd.BuyerId;
                    masamd.Companyid = objAdd.CompanyId;
                    masamd.JobOrWork = OrdType;
                    masamd.Remarks = objAdd.Remarks;
                    masamd.ProcessUnitID = objAdd.ProcessUnitId;


                    //if (Mode == "Add")
                    //{
                    //masamd.Job_Ord_Date = objAdd.Job_Ord_Date;
                    //}
                    //if (Mode == "Upd")
                    //{
                    //    masamd.Job_Ord_Date = DateTime.Now;
                    //}



                }
                entities.Job_Ord_Mas_Amend.Add(masamd);
                entities.SaveChanges();

                //Update compUnit in BuyerOrdStyle table
                var bostyle = entities.buy_ord_style.Where(c => c.StyleRowid == objAdd.Stylerowid && c.Styleid == objAdd.StyleId && c.order_no == objAdd.OrderNo).FirstOrDefault();
                if (bostyle != null)
                {
                    bostyle.Company_Unitid = objAdd.ProdUnitId;
                    bostyle.ProductionQty = objAdd.ProductionQty;
                }
                entities.SaveChanges();


                //Insert into Job_Ord_Det
                var shipList = new List<Domain.ProductionShipWOEntry>();

                //if (objAdd.lstprodShipwo.Count > 0)
                if (BShipEnty.BuyOrdShipItem.Count > 0)
                {
                    //foreach (var item in objAdd.lstprodShipwo)
                    foreach (var item in BShipEnty.BuyOrdShipItem)
                    {
                        if (item.ShipRowId == 0)
                        {
                            shipList.Add(new Domain.ProductionShipWOEntry
                            {
                                JobOrderNo = objAdd.WorkOrder,
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                DeliveryDate = Convert.ToDateTime("2011-07-01"),//Convert.ToDateTime(item.DeliveryDate),
                                Qty = item.Quantity
                            });
                        }
                    }
                }

                if (shipList.Count > 0)
                {
                    var ASWD = AddShipWoAmndData(shipList, "Add");
                    //var shipresult = strrep.AddShipWoData(shipList, "Add");
                }

                //Insert into Buy_Ord_Det
                var itemList = new List<Domain.ProductionItemWOEntry>();

                //if (objAdd.lstprodItemwo.Count > 0)
                if (BShipEnty.BuyOrdShipratio.Count > 0)
                {
                    //foreach (var item in objAdd.lstprodItemwo)
                    foreach (var item in BShipEnty.BuyOrdShipratio)
                    {
                        if (item.ShipRow == 0 || item.Buy_Ord_DetId == 0)
                        {
                            itemList.Add(new Domain.ProductionItemWOEntry
                            {
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                StyleRowId = objAdd.Stylerowid,
                                OrdNo = objAdd.OrderNo,
                                Colorid = item.ColorId,
                                SizeId = item.SizeId,
                                OrderNo = objAdd.WorkOrder,
                                Allowance = item.AllowQty,
                                ShipRow = item.ShipRow,
                                ProdQty = item.PQty,
                                OrderQty = item.Quantity,
                                ItemId = item.ItemId,
                                SSNO = item.SSNO,
                                ComboId = item.ComboId,
                            });
                        }
                    }
                }

                foreach (var item in itemList)
                {

                    foreach (var objdet in objCDet)
                    {
                        if (item.StyleRowId == objdet.StyleRowid && item.SSNO == objdet.SlNo)
                        {
                            item.ShipRow = objdet.ShipRowId;
                        }
                    }
                }

                if (itemList.Count > 0)
                {
                    //var itemresult = strrep.AddItemWoData(itemList, "Add");
                    var itemresult = AddItemWoAmndData(itemList, "Add");
                }

                //Insert into Job_Ord_Color
                var colorList = new List<Domain.ProductionColorWOEntry>();

                //if (objAdd.lstprodItemwo.Count > 0)
                if (BShipEnty.BuyOrdShipratio.Count > 0)
                {
                    //foreach (var item in objAdd.lstprodItemwo)
                    foreach (var item in BShipEnty.BuyOrdShipratio)
                    {
                        if (item.ShipRow == 0 || item.Buy_Ord_DetId == 0)
                        {
                            colorList.Add(new Domain.ProductionColorWOEntry
                            {
                                JobOrderNo = objAdd.WorkOrder,
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                Colorid = item.ColorId,
                                SizeId = item.SizeId,
                                ItemId = item.ItemId,
                                OrderQty = (decimal)item.Quantity,
                                Rate = 0,
                                SizerowId = item.SizeRow,

                                //JobOrderNo = item.OrderNo,                        
                            });
                        }
                    }
                }

                if (colorList.Count > 0)
                {
                    //var resultitemcolor = strrep.AddColorWoData(colorList, "Add");
                    var resultitemcolor = AddColorWoAmndData(colorList, "Add");
                }

                //Insert into Program_Summary
                var programsummaryList = new List<Domain.ProgramSummary>();

                //if (objAdd.lstprodItemwo.Count > 0)
                if (BShipEnty.BuyOrdShipratio.Count > 0)
                {
                    //foreach (var item in objAdd.lstprodItemwo)
                    foreach (var item in BShipEnty.BuyOrdShipratio)
                    {
                        if (item.ShipRow == 0 || item.Buy_Ord_DetId == 0)
                        {
                            programsummaryList.Add(new Domain.ProgramSummary
                            {
                                OrderNo = objAdd.WorkOrder,
                                Type = "GN",
                                BuyJobWork = OType,
                                Colorid = item.ColorId,
                                Sizeid = item.SizeId,
                                Itemid = item.ItemId,
                                Styleid = objAdd.StyleId,
                                Qty = (int)item.PQty,
                            });
                        }
                    }
                }

                if (programsummaryList.Count > 0)
                {
                    //var resultprgsumm = strrep.AddProgramSummary(programsummaryList, "Add");
                    //var resultprgsumm = AddProgramSummary(programsummaryList, "Add");
                }

                ////The Transaction will be completed
                //txscope.Complete();
                return id;
            }
            catch (DbEntityValidationException ex)
            {
                //txscope.Dispose();
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception ex)
            {
                //txscope.Dispose();
                throw ex;
            }
            //}
        }



        public bool AddShipWoAmndData(List<ProductionShipWOEntry> objShipDet, string Mode)
        {
            try
            {
                //int styleid = 0;



                var shipList = new List<Job_Ord_Det>();

                foreach (var item in objShipDet)
                {
                    //entities.Job_Ord_Det.Add(item);
                    shipList.Add(new Repository.Job_Ord_Det
                    {
                        Job_Ord_No = item.JobOrderNo,
                        Buy_ord_ship = item.Buy_Ord_Ship,
                        Quantity = item.Qty,

                        //Finish_qty=0,
                        //Despatch_qty=0,
                        //WorkOrd_Qty=0,
                        //Style_qty=0,
                        //Sty_despQty=0,
                        //Sty_FinQty=0,
                        Delivery_date = item.DeliveryDate,
                    });
                }

                var List = new List<Repository.Job_Ord_Det_Amend>();
                foreach (var ad in objShipDet)
                {
                    List.Add(new Repository.Job_Ord_Det_Amend
                    {
                        Job_Ord_No = ad.JobOrderNo,
                        Buy_ord_ship = ad.Buy_Ord_Ship,
                        Quantity = ad.Quantity,
                        //Finish_qty=ad.f
                        //Despatch_qty
                        Delivery_date = ad.DeliveryDate
                        //WorkOrd_Qty
                        //Style_qty
                        //Sty_FinQty
                        //Sty_despQty
                        //Ck_date
                    });
                }


                foreach (var shiplst in List)
                {
                    entities.Job_Ord_Det_Amend.Add(shiplst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (DbEntityValidationException ex)
            {
                //txscope.Dispose();
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool AddItemWoAmndData(List<ProductionItemWOEntry> objItemDet, string Mode)
        {

            int MasId = 0;
            try
            {


                var itemList = new List<Buy_Ord_Det_Amend>();

                foreach (var item in objItemDet)
                {
                    var OrdernoQuery = entities.Buy_Ord_Mas_Amend.Where(b => b.Order_No == item.OrdNo).FirstOrDefault();
                    if (OrdernoQuery != null)
                    {
                        MasId = (int)OrdernoQuery.Buy_Ord_MasId;
                    }

                    //entities.Job_Ord_Det.Add(item);
                    itemList.Add(new Repository.Buy_Ord_Det_Amend
                    {
                        Buy_Ord_DetId = item.Buy_Ord_DetId,
                        Order_No = item.OrdNo,
                        Buy_Ord_Ship = item.Buy_Ord_Ship,
                        Quantity = item.OrderQty,
                        StyleRowId = item.StyleRowId,
                        AllowanceQty = item.Allowance,
                        ProductionQty = item.ProdQty,
                        ColorId = item.Colorid,
                        SizeId = item.SizeId,
                        ITEMID = item.ItemId,
                        Buy_Ord_MasId = MasId,
                        OrderColorId = item.Colorid,
                        Despatch_Qty = 0,
                        ShipRow = item.ShipRow,
                        ColorRow = 0,
                        SizeRow = 0,
                        ItemRow = 0,
                        Rate = 0,
                        Job_Qty = 0,
                        RateUpdated = true,
                        ProdAmend = "N",
                        Finish_Qty = 0,
                        Packed_Qty = 0,
                        ComboColorId = item.ComboId,
                    });
                }

                foreach (var itemlst in itemList)
                {
                    entities.Buy_Ord_Det_Amend.Add(itemlst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (DbEntityValidationException ex)
            {
                //txscope.Dispose();
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public bool AddColorWoAmndData(List<ProductionColorWOEntry> objItemDet, string Mode)
        {

            int MasId = 0;
            try
            {


                var itemList = new List<Job_Ord_Color_Amend>();
                foreach (var clor in objItemDet)
                {
                    var ClDet = entities.Job_Ord_Color.Where(d => d.buy_ord_ship == clor.Buy_Ord_Ship && d.Job_Ord_No == clor.JobOrderNo && d.ITEMID == clor.ItemId && d.colorid == clor.Colorid && d.sizeid == clor.SizeId).ToList();

                    int jclrid = 0;
                    if (ClDet != null)
                    {
                        jclrid = ClDet[0].Job_Ord_ColorId;
                    }

                    itemList.Add(new Repository.Job_Ord_Color_Amend
                    {
                        Job_Ord_ColorId = jclrid,
                        Job_Ord_No = clor.JobOrderNo,
                        buy_ord_ship = clor.Buy_Ord_Ship,
                        colorid = clor.Colorid,
                        sizeid = clor.SizeId,
                        ITEMID = clor.ItemId,
                        quantity = clor.OrderQty,
                        finish_qty = 0,
                        despatch_qty = 0,
                        Rate = 0
                    });
                }


                //foreach (var clor in objItemDet)
                //{

                //    itemList.Add(new Repository.Job_Ord_Color_Amend
                //    {
                //        Job_Ord_No = clor.JobOrderNo,
                //        buy_ord_ship = clor.Buy_Ord_Ship,
                //        colorid = clor.Colorid,
                //        sizeid = clor.SizeId,
                //        ITEMID = clor.ItemId,
                //        quantity = clor.OrderQty,
                //        finish_qty = 0,
                //        despatch_qty = 0,
                //        Rate = 0
                //    });
                //}

                foreach (var itemlst in itemList)
                {
                    entities.Job_Ord_Color_Amend.Add(itemlst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (DbEntityValidationException ex)
            {
                //txscope.Dispose();
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public IList<BuyOrdShipPack> GetDataList(int SNo, string PackType, int StyleRowId)
        {
            var query = (from d in entities.Proc_Apparel_GetOrderAddPackItemList(StyleRowId)
                         select new BuyOrdShipPack
                         {
                             Item = d.Item,
                             ItemId = (int)d.ItemID,
                             Color = d.Color,
                             snumb = (long)d.Snumb,
                             ColorId = (int)d.Colorid,
                             ComboId = (int)d.ComboColorId,
                             Size = d.size,
                             SizeId = d.SizeId,
                             StyleRow = (int)d.StyleRowId,
                             Quantity = 0,
                             PQty = 0,
                             AllowQty = 0,
                             SSNO = SNo,
                             ComboRow = (int)d.ComboSeq,
                             Ratio = 0,
                             ItemRatio = (int)d.ItemRatio,

                         }).AsQueryable();

            return query.ToList();
        }



        public IQueryable<BuyOrdShipment> GetDataDetList(int StyRowID)
        {
            IQueryable<BuyOrdShipment> query = from cd in entities.Buy_Ord_Ship
                                               join i in entities.PortofLoading on cd.PortOfLoadingId equals i.PortOfLoadingId
                                               join c in entities.City on cd.Dest_Code equals c.Id
                                               join e in entities.Buy_Ord_Mas on cd.Order_No equals e.Order_No
                                               join s in entities.Unit_of_measurement on e.GuomId equals s.UomId
                                               where cd.StyleRowid == StyRowID
                                               select new BuyOrdShipment
                                               {


                                                   Dest = c.City1,
                                                   Dest_Code = cd.Dest_Code,
                                                   PortOfLoading = i.PortOfLoading1,
                                                   PortOfLoadingId = (int)cd.PortOfLoadingId,
                                                   UOM = s.Uom,
                                                   UomID = (int)e.GuomId,
                                                   Quantity = (int)cd.Quantity,
                                                   //Ship_Date=cd.Ship_Date,
                                                   ShipRowId = cd.ShipRowId,
                                                   Lotno = cd.Lotno,
                                                   ItemMode = cd.ItemMode,
                                                   //ItemModeType=
                                                   ItemModeType = cd.ItemMode == "A" ? "COLOR/SIZE" :
                                                       //cd.ItemMode == "C" ? "COLOR" :
                                                       //cd.ItemMode == "S" ? "SIZE" :
                                                                  cd.ItemMode == "M" ? "SOLID" : "-"


                                               };
            return query;
        }


        public IList<BuyOrdShipment> GetRepShipDetList(int StyleRowId)
        {
            var query = (from spi in entities.Proc_Apparel_GetOrderShipEditItemList(StyleRowId)
                         select new BuyOrdShipment
                         {
                             Buy_Ord_MasId = spi.Buy_Ord_MasId,
                             Dest = spi.country,
                             Dest_Code = spi.Dest_Code,
                             UOM = spi.GUom,
                             DelDate = (DateTime)spi.DelDate,
                             AllowancePer = Convert.ToInt32(spi.Allowance),
                             ProductionQty = Convert.ToInt32(spi.ProdQty),
                             UomID = (int)spi.GuomId,
                             ItemMode = spi.ItemMode,
                             ItemModeType = spi.ItemModeType,
                             Lotno = spi.Lotno,
                             Order_No = spi.Order_No,
                             PortOfLoading = spi.PortOfLoading,
                             PortOfLoadingId = (int)spi.PortOfLoadingId,
                             Quantity = (int)spi.Quantity,
                             Ship_Date = (DateTime)spi.Ship_Date,
                             ShipRowId = spi.ShipRowId,
                             SLNo = (int)spi.SlNo,
                             Buy_Ord_Ship = spi.ShipNo

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<BuyOrdShipPack> GetRepPackDetList(int ShiprowID, int StyleRowID, int SSNo)
        {

            int ShipID = 0;

            if (ShiprowID == 0)
            {

                var SDQuery = entities.Buy_Ord_OrderDet.Where(b => b.StyleRow == StyleRowID).FirstOrDefault();
                if (SDQuery != null)
                {
                    ShipID = (int)SDQuery.ShipRow;
                }

            }
            else
            {
                ShipID = ShiprowID;
            }

            var query = (from Epcn in entities.Proc_Apparel_GetOrderEditPackItemList(ShipID, StyleRowID, SSNo)
                         select new BuyOrdShipPack
                         {
                             ItemId = (int)Epcn.itemid,
                             Item = Epcn.Item,
                             AllowQty = (int)Epcn.AllowQty,
                             PQty = (int)Epcn.PQty,
                             Color = Epcn.Color,
                             ColorId = Epcn.colorId,
                             ComboId = Epcn.colorId,
                             Size = Epcn.Size,
                             SizeId = Epcn.SizeId,
                             StyleRow = Epcn.StyleRow,
                             Quantity = (int)Epcn.Quantity,
                             SSNO = Epcn.SlNo,
                             Buy_Ord_OrderDetId = Epcn.Buy_Ord_OrderDetId,
                             ShipRow = Epcn.ShipRow,
                             ComboRow = Epcn.ComboRow,
                             snumb = (long)Epcn.Snumb,
                             Ratio = Epcn.Ratio,
                             Buy_Ord_Ship = Epcn.ShipNo


                         }).AsQueryable();

            return query.ToList();
        }

        public IList<BuyOrdShipPack> GetRepPackLoadDetList(int StyleRowID)
        {
            var query = (from Epcn in entities.Proc_Apparel_GetOrderLoadEditPackItemList(StyleRowID)
                         select new BuyOrdShipPack
                         {
                             ItemId = (int)Epcn.itemid,
                             Item = Epcn.Item,
                             AllowQty = Convert.ToInt16(Epcn.AllowQty),
                             PQty = Convert.ToInt16(Epcn.PQty),
                             Color = Epcn.Color,
                             ColorId = Epcn.colorId,
                             ComboId = Epcn.colorId,
                             Size = Epcn.Size,
                             SizeId = Epcn.SizeId,
                             StyleRow = Epcn.StyleRow,
                             Quantity = (int)Epcn.Quantity,
                             SSNO = Epcn.SlNo,
                             Buy_Ord_OrderDetId = Epcn.Buy_Ord_OrderDetId,
                             ShipRow = Epcn.ShipRow,
                             ComboRow = Epcn.ComboRow,
                             snumb = (long)Epcn.Snumb,
                             Ratio = Epcn.Ratio,
                             itemmode = Epcn.ItemMode,
                         }).AsQueryable();

            return query.ToList();
        }
        public bool DeleteData(int Id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var d = entities.Buy_Ord_Ship.Where(c => c.StyleRowid == Id);

                    foreach (var dbSet in d)
                    {

                        var Det = entities.Buy_Ord_OrderDet.Where(u => u.StyleRow == Id);

                        foreach (var u in Det)
                        {

                            var Det1 = entities.Buy_Ord_OrderDet.Where(v => v.StyleRow == Id);

                            entities.Buy_Ord_OrderDet.Remove(u);

                        }
                        entities.Buy_Ord_Ship.Remove(dbSet);
                    }

                    entities.SaveChanges();

                    //Delete WorkOrder Details
                    reserved = DeleteWorkOrderData(Id);

                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrderShipment-DeleteData");
                }
            }
            return reserved;
        }

        public bool DeleteWorkOrderData(int id)
        {
            var result = false;
            //using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            //{
            try
            {
                var jmasrst = entities.Job_Ord_Mas.Where(c => c.Stylerowid == id).FirstOrDefault();

                if (jmasrst != null)
                {
                    //Revrse Update process in Buy_Ord_Style table
                    var BuyOrdStyl = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();
                    if (BuyOrdStyl != null)
                    {
                        BuyOrdStyl.ProductionQty = 0;
                        BuyOrdStyl.WORKORDER = null;
                    }
                    entities.SaveChanges();

                    //Revrse Update process in Buy_Ord_Ship table
                    var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.StyleRowid == id).ToList<Buy_Ord_Ship>();
                    if (BuyOrdShip != null)
                    {
                        foreach (var item in BuyOrdShip)
                        {
                            item.ProductionQty = 0;
                            item.AllowancePer = 0;
                        }
                    }
                    entities.SaveChanges();

                    //delete Job_Ord_Color Many Rows table
                    var deleteJobOrdColor = entities.Job_Ord_Color.Where(d => d.Job_Ord_No == jmasrst.Job_Ord_No).ToList<Job_Ord_Color>();
                    deleteJobOrdColor.ForEach(c => entities.Job_Ord_Color.Remove(c));
                    entities.SaveChanges();

                    //delete Buy_ord_Det Many Rows table
                    var deleteBuyOrdDet = entities.Buy_Ord_Det.Where(d => d.StyleRowId == id).ToList<Buy_Ord_Det>();
                    deleteBuyOrdDet.ForEach(c => entities.Buy_Ord_Det.Remove(c));
                    entities.SaveChanges();

                    //delete Job_Ord_Det Many Rows table
                    var deleteJobOrdDet = entities.Job_Ord_Det.Where(d => d.Job_Ord_No == jmasrst.Job_Ord_No).ToList<Job_Ord_Det>();
                    deleteJobOrdDet.ForEach(c => entities.Job_Ord_Det.Remove(c));
                    entities.SaveChanges();

                    //delete Program_Summary Many Rows table
                    var deleteBuyPrgSum = entities.Program_Summary.Where(d => d.Order_No == jmasrst.Job_Ord_No && d.Type == "GN").ToList<Program_Summary>();
                    deleteBuyPrgSum.ForEach(c => entities.Program_Summary.Remove(c));
                    entities.SaveChanges();

                    //delete Job_Ord_Mas Many Rows table
                    var deleteJobOrdMas = entities.Job_Ord_Mas.Where(d => d.Stylerowid == id).ToList<Job_Ord_Mas>();
                    deleteJobOrdMas.ForEach(c => entities.Job_Ord_Mas.Remove(c));
                    entities.SaveChanges();

                    //result = true;
                    //return result;
                }

                ////The Transaction will be completed
                //txscope.Complete();

                result = true;
                return result;
            }
            catch (Exception ex)
            {
                //txscope.Dispose();
                return result;
                throw ex;
            }
            //}
        }

        public bool UpdateWorkOrderAmendData(Domain.ProductionWorkOrder obj, List<Buy_Ord_Det> objAdDet)
        {
            var result = false;
            string OrdNo = "";
            int CompId = 0;
            //using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            //{
            try
            {
                var App2 = entities.Job_Ord_Mas.Where(c => c.Stylerowid == obj.Stylerowid).FirstOrDefault();

                if (App2 != null)
                {
                    CompId = (int)App2.Companyid;
                }


                ////var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == obj.Stylerowid).FirstOrDefault();
                var OQuery = entities.Job_Ord_Mas.Where(b => b.Stylerowid == obj.Stylerowid).FirstOrDefault();
                if (OQuery != null)
                {
                    Repository.Job_Ord_Mas_Amend masamd = new Repository.Job_Ord_Mas_Amend();
                    if (OQuery != null)
                    {
                        masamd.ID = OQuery.ID;
                        masamd.Job_Ord_No = OQuery.Job_Ord_No;
                        masamd.Amend = "N";
                        masamd.RateType = "PR";
                        masamd.Stylerowid = OQuery.Stylerowid;
                        masamd.Order_No = OQuery.Order_No;
                        masamd.Sales_sample = "S";
                        masamd.Styleid = OQuery.Styleid;
                        masamd.Supplierid = OQuery.ProcessUnitID;
                        masamd.Unit_or_other = "P";
                        masamd.Merch_id = OQuery.Merch_id;
                        masamd.Qc_id = OQuery.Qc_id;
                        masamd.Programmed = false;
                        masamd.Quantity = OQuery.Quantity;
                        masamd.Buyerid = OQuery.Buyerid;
                        masamd.Companyid = CompId;//OQuery.Companyid;
                        masamd.JobOrWork = OQuery.JobOrWork;
                        masamd.Remarks = OQuery.Remarks;
                        masamd.ProcessUnitID = OQuery.ProcessUnitID;
                    }
                    entities.Job_Ord_Mas_Amend.Add(masamd);
                    entities.SaveChanges();

                }



                //Update Job_Ord_Det
                var detList = new List<Job_Ord_Det_Amend>();

                foreach (var item in obj.lstprodShipwo)
                {
                    var BuyOrdDet = entities.Job_Ord_Det.Where(c => c.Buy_ord_ship == item.Buy_Ord_Ship).FirstOrDefault();


                    if (BuyOrdDet != null)
                    {
                        detList.Add(new Repository.Job_Ord_Det_Amend
                            {
                                Job_Ord_No = BuyOrdDet.Job_Ord_No,
                                Buy_ord_ship = BuyOrdDet.Buy_ord_ship,
                                Quantity = BuyOrdDet.Quantity,
                                //Finish_qty=ad.f
                                //Despatch_qty
                                Delivery_date = BuyOrdDet.Delivery_date
                                //WorkOrd_Qty
                                //Style_qty
                                //Sty_FinQty
                                //Sty_despQty
                                //Ck_date
                            });

                    }

                }


                foreach (var shiplst in detList)
                {
                    entities.Job_Ord_Det_Amend.Add(shiplst);
                }
                entities.SaveChanges();

                var itemList = new List<Job_Ord_Color_Amend>();
                foreach (var clor in objAdDet)
                {
                    var ClDet = entities.Job_Ord_Color.Where(d => d.buy_ord_ship == clor.Buy_Ord_Ship && d.ITEMID == clor.ITEMID && d.colorid == clor.ColorId && d.sizeid == clor.SizeId).ToList();

                    int jclrid = 0;
                    if (ClDet != null)
                    {
                        jclrid = ClDet[0].Job_Ord_ColorId;
                    }

                    itemList.Add(new Repository.Job_Ord_Color_Amend
                    {
                        Job_Ord_ColorId = jclrid,
                        Job_Ord_No = ClDet[0].Job_Ord_No,
                        buy_ord_ship = clor.Buy_Ord_Ship,
                        colorid = ClDet[0].colorid,
                        sizeid = clor.SizeId,
                        ITEMID = ClDet[0].ITEMID,
                        quantity = ClDet[0].quantity,
                        finish_qty = 0,
                        despatch_qty = 0,
                        Rate = 0
                    });
                }


                foreach (var itemlst in itemList)
                {
                    entities.Job_Ord_Color_Amend.Add(itemlst);
                }

                entities.SaveChanges();
                //Update Program_Summary

                var list_collapsed = obj.lstprodItemwo
                                                .GroupBy(p => new { ItemId = p.ItemId, Colorid = p.Colorid, SizeId = p.SizeId })
                                                .Select(g => new ProgramSummEdit(
                                                    g.Key.Colorid,
                                                    g.Key.SizeId,
                                                    g.Key.ItemId,
                                                    g.Sum(p => p.PQty)))
                                                .ToList();

                if (obj.lstprodItemwo != null && obj.lstprodItemwo.Count > 0)
                //if (objAdDet != null && objAdDet.Count > 0)
                {
                    //foreach (var item in obj.lstprodItemwo)
                    foreach (var item in list_collapsed)
                    //foreach (var item in objAdDet)
                    {
                        var BuyOrdDet = entities.Program_Summary.Where(c => c.Order_No == OrdNo && c.Colorid == item.Colorid && c.Itemid == item.Itemid && c.Sizeid == item.Sizeid).FirstOrDefault();
                        if (BuyOrdDet != null)
                        {
                            BuyOrdDet.Quantity = item.PQty;
                        }
                    }
                }
                entities.SaveChanges();


                result = true;
                return result;
            }
            catch (Exception ex)
            {
                //txscope.Dispose();
                return false;
                throw ex;
            }
            //}
        }

        public bool UpdateWorkOrderData(Domain.ProductionWorkOrder obj, List<Buy_Ord_Det> objAdDet)
        {
            var result = false;
            string OrdNo = "";
            //using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            //{
            try
            {

                //var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == obj.Stylerowid).FirstOrDefault();
                var OQuery = entities.Job_Ord_Mas.Where(b => b.Stylerowid == obj.Stylerowid).FirstOrDefault();
                if (OQuery != null)
                {
                    OrdNo = OQuery.Job_Ord_No;
                    OQuery.Modify_Date = DateTime.Now;

                }


                //Update buy_ord_style
                var bostyle = entities.buy_ord_style.Where(c => c.StyleRowid == obj.Stylerowid).FirstOrDefault();
                if (bostyle != null)
                {

                    bostyle.Company_Unitid = obj.ProdUnitId;
                    bostyle.WORKORDER = obj.WorkOrder;
                    bostyle.ProductionQty = obj.ProductionQty;

                }
                entities.SaveChanges();


                //Update Job_Ord_Det
                if (obj.lstprodShipwo != null && obj.lstprodShipwo.Count > 0)
                //if (objAdDet != null && objAdDet.Count > 0)
                {
                    foreach (var item in obj.lstprodShipwo)
                    //foreach (var item in objAdDet)
                    {
                        var BuyOrdDet = entities.Job_Ord_Det.Where(c => c.Buy_ord_ship == item.Buy_Ord_Ship).FirstOrDefault();
                        if (BuyOrdDet != null)
                        {
                            BuyOrdDet.Quantity = item.Quantity;
                        }
                    }
                }
                entities.SaveChanges();

                //Update Job_Ord_Color
                if (objAdDet != null && objAdDet.Count > 0)
                {
                    foreach (var item in objAdDet)
                    {
                        var JobOrdColor = entities.Job_Ord_Color.Where(c => c.buy_ord_ship == item.Buy_Ord_Ship && c.ITEMID == item.ITEMID && c.colorid == item.ComboColorId && c.sizeid == item.SizeId).FirstOrDefault();

                        if (JobOrdColor != null)
                        {
                            JobOrdColor.quantity = item.Quantity;
                        }
                    }
                }
                entities.SaveChanges();


                //Update Program_Summary

                var list_collapsed = obj.lstprodItemwo
                                                .GroupBy(p => new { ItemId = p.ItemId, Colorid = p.Colorid, SizeId = p.SizeId })
                                                .Select(g => new ProgramSummEdit(
                                                    g.Key.Colorid,
                                                    g.Key.SizeId,
                                                    g.Key.ItemId,
                                                    g.Sum(p => p.PQty)))
                                                .ToList();

                if (obj.lstprodItemwo != null && obj.lstprodItemwo.Count > 0)
                //if (objAdDet != null && objAdDet.Count > 0)
                {
                    //foreach (var item in obj.lstprodItemwo)
                    foreach (var item in list_collapsed)
                    //foreach (var item in objAdDet)
                    {
                        var BuyOrdDet = entities.Program_Summary.Where(c => c.Order_No == OrdNo && c.Colorid == item.Colorid && c.Itemid == item.Itemid && c.Sizeid == item.Sizeid).FirstOrDefault();
                        if (BuyOrdDet != null)
                        {
                            BuyOrdDet.Quantity = item.PQty;
                        }
                    }
                }
                entities.SaveChanges();


                result = true;
                return result;
            }
            catch (Exception ex)
            {
                //txscope.Dispose();
                return false;
                throw ex;
            }
            //}
        }

        public IList<BuyOrdShipPack> GetDataSepList(int SNo, string PackType, int StyleRowId)
        {
            var query = (from d in entities.Proc_Apparel_GetOrderAddPackSepItemList(StyleRowId)
                         select new BuyOrdShipPack
                         {
                             Color = d.Color,
                             snumb = (long)d.Snumb,
                             ComboId = (int)d.Colorid,
                             Size = d.size,
                             SizeId = d.SizeId,
                             StyleRow = (int)d.StyleRowId,
                             Quantity = 0,
                             PQty = 0,
                             AllowQty = 0,
                             Rate = (decimal)d.price,
                             SSNO = SNo,
                             ComboRow = (int)d.ComboSeq,
                             Ratio = 0
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<BuyOrdShipPack> GetRepShipSepDetList(int StyleRowId)
        {
            var query = (from d in entities.Proc_Apparel_GetOrderEditSepPackItemList(StyleRowId)
                         select new BuyOrdShipPack
                         {

                             Color = d.Color,
                             snumb = (long)d.Snumb,
                             ColorId = (int)d.colorId,
                             ComboId = (int)d.comboid,
                             Size = d.Size,
                             SizeId = d.SizeId,
                             StyleRow = (int)d.StyleRow,
                             Quantity = (int)d.Quantity,
                             SSNO = (int)d.SlNo,
                             ComboRow = (int)d.ComboRow,
                             Ratio = d.Ratio,
                             Rate = (decimal)d.price,
                             Buy_Ord_OrderDetId = d.Buy_Ord_OrderDetId,
                             Buy_Ord_Ship = d.Buy_Ord_Ship,
                             ShipRow = d.ShipRow,
                             itemmode = d.ItemMode

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<BuyOrdShipPack> GetItemPackDetList(int StyleRowID, string orderno)
        {
            var query = (from d in entities.Proc_Apparel_GetOrdEditPacktotItemList(StyleRowID, orderno)
                         select new BuyOrdShipPack
                         {
                             Item = d.Item,
                             ItemId = (int)d.ItemId,
                             Color = d.Color,
                             snumb = (long)d.Snumb,
                             Buy_Ord_Ship = d.Buy_Ord_Ship,
                             ColorId = (int)d.Colorid,
                             ComboId = (int)d.ComboId,
                             Size = d.Size,
                             SizeId = d.Sizeid,
                             StyleRow = (int)d.StyleRow,
                             Quantity = (int)d.Ordqty,
                             PQty = (int)d.Prodnqty,
                             AllowQty = (int)d.Allowance,
                             SSNO = (int)d.ShipSNo,
                             ComboRow = 0,
                             Ratio = (decimal)d.Ratio,
                             itemmode = d.ItemMode,
                             Buy_Ord_DetId = (int)d.Buy_Ord_DetId,
                             ShipRow = (int)d.ShipRow,
                             ItemRatio = (int)d.ItemRatio
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(List<Buy_Ord_Ship> objAdMas, List<Buy_Ord_OrderDet> objAdsepDet, List<Buy_Ord_Det> objAdDet, ProductionWorkOrder WorkOrderUpd, List<Buy_Ord_Ship> objECDet, List<Buy_Ord_OrderDet> SepobjEPDet, List<Buy_Ord_Det> objEPDet, ProductionWorkOrder objEAdd, BuyOrdShipment EBShipEnty)
        {
            bool reserved = false;
            decimal StyRate = 0;
            int StyRowId = 0;
            int BMasId = 0;
            var OrderNo = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var j in objAdMas)
                    {

                        if (j.ShipRowId > 0)
                        {
                            var d = entities.Buy_Ord_Ship.Where(a => a.ShipRowId.Equals(j.ShipRowId)).FirstOrDefault();
                            if (d != null)
                            {
                                d.AllowancePer = j.AllowancePer;
                                d.ProductionQty = j.ProductionQty;
                                d.Buy_Ord_MasId = j.Buy_Ord_MasId;
                                d.Dest_Code = j.Dest_Code;
                                d.ItemMode = j.ItemMode;
                                d.Lotno = j.Lotno;
                                d.PortOfLoadingId = (int)j.PortOfLoadingId;
                                d.Quantity = (int)j.Quantity;
                                d.Ship_Date = (DateTime)j.Ship_Date;
                                d.ShipRowId = j.ShipRowId;
                                d.SlNo = (int)j.SlNo;
                                d.StyleRowid = j.StyleRowid;
                                d.Order_No = j.Order_No;
                                d.StyleId = j.StyleId;
                                d.DelDate = j.DelDate;
                                d.ModifyBy = j.CreatedBy;
                                d.Modify_Date = DateTime.Now;
                                d.PA = j.PA;
                            }
                        }
                        var dj = entities.Job_Ord_Det.Where(a => a.Buy_ord_ship.Equals(j.Buy_Ord_Ship1)).FirstOrDefault();
                        if (dj != null)
                        {
                            dj.Quantity = j.ProductionQty;
                            dj.Delivery_date = j.DelDate;
                        }
                    }
                    entities.SaveChanges();

                    foreach (var k in objAdsepDet)
                    {
                        var App2 = entities.buy_ord_style.Where(c => c.order_no == k.Order_No && c.StyleRowid == k.StyleRow).FirstOrDefault();

                        if (App2 != null)
                        {
                            StyRate = (decimal)App2.price;
                            StyRowId = App2.StyleRowid;
                            OrderNo = App2.order_no;
                        }

                        var e = entities.Buy_Ord_OrderDet.Where(a => a.Buy_Ord_OrderDetId.Equals(k.Buy_Ord_OrderDetId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.AllowPer = k.AllowPer;
                            e.ProdQty = k.ProdQty;
                            e.ShipRow = k.ShipRow;
                            e.SizeId = k.SizeId;
                            e.ComboId = k.ComboId;
                            e.Quantity = k.Quantity;
                            e.Buy_Ord_OrderDetId = k.Buy_Ord_OrderDetId;
                            e.StyleRow = k.StyleRow;
                            e.SlNo = k.SlNo;
                            e.Ratio = k.Ratio;
                            e.Order_No = k.Order_No;
                            e.ShipRow = k.ShipRow;
                            e.StyleRow = k.StyleRow;
                            e.ComboRow = k.ComboRow;
                            e.Rate = k.Rate;// StyRate;
                        }
                    }
                    entities.SaveChanges();


                    foreach (var J2 in objAdDet)
                    {
                        var e = entities.Buy_Ord_Det.Where(a => a.Buy_Ord_DetId.Equals(J2.Buy_Ord_DetId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.AllowanceQty = J2.AllowanceQty;
                            e.ProductionQty = J2.ProductionQty;
                            e.Quantity = J2.Quantity;
                            e.Buy_Ord_DetId = J2.Buy_Ord_DetId;
                            e.StyleRowId = J2.StyleRowId;

                        }
                        entities.SaveChanges();
                        // var ej = entities.Job_Ord_Color.Where(a => a.buy_ord_ship.Equals(J2.Buy_Ord_Ship) && a.sizeid.Equals(J2.SizeId) && a.colorid.Equals(J2.ColorId) && a.ITEMID.Equals(J2.ITEMID)).FirstOrDefault();
                        var ej = entities.Job_Ord_Color.Where(b => b.buy_ord_ship == J2.Buy_Ord_Ship && b.ITEMID == J2.ITEMID && b.colorid == J2.ColorId && b.sizeid == J2.SizeId).FirstOrDefault();
                        if (ej != null)
                        {
                            ej.quantity = J2.ProductionQty;

                        }
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();




                    //reserved = UpdateWorkOrderData(WorkOrderUpd, objAdDet);

                    //Add
                    //if (SepobjEPDet.Count > 0)
                    //{



                    //    foreach (var detItem in SepobjEPDet)
                    //    {


                    //        Sno = (int)detItem.SlNo;

                    //        if (detItem.ShipRow == 0)
                    //        {

                    //            foreach (var item in objECDet)
                    //            {


                    //                //
                    //                string strShipNoSeq = "";
                    //                string Finyearcode = "";
                    //                string Finyearnumber = "";
                    //                string tblname = "Buy_Ord_Ship";
                    //                string ColName = "Buy_Ord_Ship";


                    //                var App1 = Finyearentities.Finyear.Where(c => 1 == 1).FirstOrDefault();

                    //                if (App1 != null)
                    //                {
                    //                    Finyearnumber = App1.Description;
                    //                }

                    //                var App = Finyearentities.Finyear.Where(c => c.Description == Finyearnumber).FirstOrDefault();

                    //                if (App != null)
                    //                {
                    //                    Finyearcode = App.YearCode;
                    //                }

                    //                var Px = this.entities.Database.SqlQuery<int>("exec Proc_Apparel_ShipNoGen {0}, {1}, {2} ", tblname, ColName, Finyearcode).FirstOrDefault();

                    //                if (Px != 0)
                    //                {
                    //                    string N;
                    //                    N = String.Format("{0:00000}", Convert.ToInt32(Px.ToString()));
                    //                    strShipNoSeq = "SH" + Finyearcode + N;
                    //                }
                    //                else
                    //                {
                    //                    strShipNoSeq = "SH" + Finyearcode + "00001";
                    //                }

                    //                if (Sno == item.SlNo && item.ShipRowId == 0)
                    //                {
                    //                    item.Buy_Ord_Ship1 = strShipNoSeq;
                    //                    entities.Buy_Ord_Ship.Add(item);
                    //                    entities.SaveChanges();
                    //                    ShID = item.ShipRowId;
                    //                    ShipOrdNo = item.Buy_Ord_Ship1;
                    //                }

                    //                //var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.Buy_Ord_Ship1 == strShipNoSeq && c.Order_No == item.Order_No).FirstOrDefault();
                    //                //if (BuyOrdShip != null)
                    //                //{
                    //                //    BuyOrdShip.AllowancePer = item.AllowancePer;
                    //                //    BuyOrdShip.ProductionQty = item.ProductionQty;

                    //                //    entities.SaveChanges();
                    //                //}

                    //                //foreach (var woobj in objProdWOAdd.lstprodShipwo)
                    //                //{
                    //                //    if (Sno == woobj.SLNo && woobj.ShiprowID == 0)
                    //                //    {
                    //                //        woobj.BuyOrdShip = strShipNoSeq;
                    //                //    }
                    //                //}
                    //            }
                    //            detItem.ShipRow = ShID;
                    //            detItem.Buy_Ord_Ship = ShipOrdNo;
                    //            entities.Buy_Ord_OrderDet.Add(detItem);
                    //            entities.SaveChanges();
                    //        }
                    //        else
                    //        {
                    //            entities.Buy_Ord_OrderDet.Add(detItem);
                    //            entities.SaveChanges();
                    //        }
                    //    }

                    //    //Update Buy_ord_ship in Main Grid Begin
                    //    foreach (var item in objECDet)
                    //    {
                    //        //Sno = (int)item.snum;
                    //        SSNo = (int)item.SlNo;

                    //        //foreach (var woobj in objProdWOAdd.lstprodShipwo)
                    //        foreach (var woobj in EBShipEnty.BuyOrdShipItem)
                    //        {
                    //            if (SSNo == woobj.SLNo && woobj.ShipRowId == 0)
                    //            {
                    //                woobj.Buy_Ord_Ship = item.Buy_Ord_Ship1;
                    //            }
                    //        }
                    //    }

                    //    foreach (var item in SepobjEPDet)
                    //    {
                    //        SSNo = (int)item.SlNo;

                    //        foreach (var woobjdet in EBShipEnty.BuyOrdShipratio)
                    //        {
                    //            if (SSNo == woobjdet.SSNO && woobjdet.ShipRow == 0)
                    //            {
                    //                woobjdet.Buy_Ord_Ship = item.Buy_Ord_Ship;
                    //            }
                    //        }
                    //    }
                    //    //Update Buy_ord_ship in Main Grid End

                    //    //foreach (var item in objCDet)
                    //    foreach (var item in EBShipEnty.BuyOrdShipItem)
                    //    {
                    //        //Sno = (int)item.snum;
                    //        SSNo = (int)item.SLNo;

                    //        //foreach (var woobj in objProdWOAdd.lstprodShipwo)
                    //        foreach (var woobj in EBShipEnty.BuyOrdShipItem)
                    //        {
                    //            if (SSNo == woobj.SLNo && woobj.ShipRowId == 0)
                    //            {
                    //                woobj.Buy_Ord_Ship = item.Buy_Ord_Ship;
                    //            }
                    //        }
                    //    }

                    //    //foreach (var item in objPDet)
                    //    foreach (var item in EBShipEnty.BuyOrdShipratio)
                    //    {
                    //        Sno = (int)item.snumb;
                    //        SSNo = (int)item.SSNO;

                    //        //foreach (var woobjdet in objProdWOAdd.lstprodItemwo)
                    //        foreach (var woobjdet in EBShipEnty.BuyOrdShipratio)
                    //        {
                    //            if (Sno == woobjdet.snumb && SSNo == woobjdet.SSNO && woobjdet.ShipRow == 0)
                    //            {
                    //                woobjdet.Buy_Ord_Ship = item.Buy_Ord_Ship;
                    //                woobjdet.ColorId = (int)item.ColorId;
                    //                woobjdet.AllowQty = (int)item.AllowQty;
                    //                woobjdet.PQty = (int)item.PQty;
                    //                woobjdet.ShipRow = (int)item.ShipRow;
                    //                woobjdet.Buy_Ord_OrderDetId = (int)item.Buy_Ord_OrderDetId;
                    //                woobjdet.Buy_Ord_DetId = (int)item.Buy_Ord_DetId;
                    //                woobjdet.ComboId = (int)item.ComboId;
                    //                woobjdet.ItemId = (int)item.ItemId;
                    //                woobjdet.Quantity = (int)item.Quantity;

                    //            }
                    //        }
                    //    }


                    //    var objWO = AddWorkOrderData(objECDet, objEAdd, EBShipEnty);


                    //}//////////////

                    //Bala Add




                    //foreach (var item in objECDet)

                    foreach (var item in objAdMas)
                    {
                        if (item.ShipRowId == 0)
                        {
                            string strShipNoSeq = "";
                            string Finyearcode = "";
                            string Finyearnumber = "";
                            string tblname = "Buy_Ord_Ship";
                            string ColName = "Buy_Ord_Ship";

                            var App1 = Finyearentities.Finyear.Where(c => 1 == 1).FirstOrDefault();

                            if (App1 != null)
                            {
                                Finyearnumber = App1.Description;
                            }

                            var App = Finyearentities.Finyear.Where(c => c.Description == Finyearnumber).FirstOrDefault();

                            if (App != null)
                            {
                                Finyearcode = App.YearCode;
                            }

                            var Px = this.entities.Database.SqlQuery<int>("exec Proc_Apparel_ShipNoGen {0}, {1}, {2} ", tblname, ColName, Finyearcode).FirstOrDefault();

                            if (Px != 0)
                            {
                                string N;
                                N = String.Format("{0:00000}", Convert.ToInt32(Px.ToString()));
                                strShipNoSeq = "SH" + Finyearcode + N;
                            }
                            else
                            {
                                strShipNoSeq = "SH" + Finyearcode + "00001";
                            }

                            if (item.ShipRowId == 0)
                            {
                                item.Buy_Ord_Ship1 = strShipNoSeq;
                                entities.Buy_Ord_Ship.Add(item);
                                entities.SaveChanges();
                                ShID = item.ShipRowId;
                                ShipOrdNo = item.Buy_Ord_Ship1;

                                //insert into JobDet
                                var Pg4 = entities.Proc_Apparel_ShipmentInsertJobDetTable(objEAdd.WorkOrder, ShipOrdNo, item.DelDate, item.ProductionQty);
                                entities.SaveChanges();
                                //
                            }


                            foreach (var detItem in SepobjEPDet)
                            {
                                Sno = (int)detItem.SlNo;

                                var App2 = entities.buy_ord_style.Where(c => c.order_no == detItem.Order_No && c.StyleRowid == detItem.StyleRow).FirstOrDefault();

                                if (App2 != null)
                                {
                                    StyRate = (decimal)App2.price;
                                    StyRowId = App2.StyleRowid;
                                }
                                var App3 = entities.Buy_Ord_Mas.Where(c => c.Order_No == detItem.Order_No).FirstOrDefault();

                                if (App3 != null)
                                {
                                    OrderNo = App3.Order_No;
                                    BMasId = App3.Buy_Ord_MasId;
                                }
                                if (Sno == item.SlNo && detItem.Buy_Ord_OrderDetId == 0)
                                {

                                    if (ShID == 0)
                                    {
                                        ShID = item.ShipRowId;
                                    }
                                    if (ShipOrdNo == "")
                                    {
                                        ShipOrdNo = item.Buy_Ord_Ship1;
                                    }

                                    detItem.ShipRow = ShID;
                                    detItem.Buy_Ord_Ship = ShipOrdNo;
                                    detItem.Rate = detItem.Rate;
                                    var Pgbod = entities.Proc_Apparel_ShipmentInsertBuyOrderDetTable(ShipOrdNo, detItem.SizeId, detItem.Ratio, detItem.Quantity, StyRowId, detItem.ShipRow, OrderNo, detItem.Rate, detItem.ComboId, detItem.ComboRow, detItem.SlNo);
                                    entities.SaveChanges();
                                }
                            }

                            foreach (var CSItem in EBShipEnty.BuyOrdShipratio)
                            {
                                CSSno = (int)CSItem.SSNO;

                                if (CSSno == item.SlNo && CSItem.Buy_Ord_DetId == 0)
                                {

                                    //CSItem.Buy_Ord_Ship = ShipOrdNo;
                                    //CSItem.ShipRow = ShID;

                                    if (CSItem.ShipRow == 0)
                                    {
                                        CSItem.ShipRow = item.ShipRowId;
                                    }
                                    if (ShipOrdNo == "")
                                    {
                                        CSItem.Buy_Ord_Ship = item.Buy_Ord_Ship1;
                                    }

                                    CSItem.Order_no = objEAdd.OrderNo;
                                    //insert into BuyOrdDet
                                    var Pgbd = entities.Proc_Apparel_ShipmentInsertBuyOrdDetTable(ShipOrdNo, CSItem.ColorId, CSItem.SizeId, CSItem.Quantity, objEAdd.Stylerowid, CSItem.ShipRow, BMasId, OrderNo, CSItem.AllowQty, CSItem.PQty, CSItem.ItemId, CSItem.ColorId, CSItem.ComboId);
                                    entities.SaveChanges();
                                    //
                                    //insert into JobOrdColor
                                    var Pg5 = entities.Proc_Apparel_ShipmentInsertJobColorTable(objEAdd.WorkOrder, ShipOrdNo, CSItem.ColorId, CSItem.SizeId, CSItem.PQty, CSItem.ItemId);
                                    entities.SaveChanges();
                                }

                            }
                            

                        }
                        else
                        {

                            foreach (var detItem in SepobjEPDet)
                            {
                                Sno = (int)detItem.SlNo;

                                var App2 = entities.buy_ord_style.Where(c => c.order_no == detItem.Order_No && c.StyleRowid == detItem.StyleRow).FirstOrDefault();

                                if (App2 != null)
                                {
                                    StyRate = (decimal)App2.price;
                                    StyRowId = App2.StyleRowid;
                                }
                                var App3 = entities.Buy_Ord_Mas.Where(c => c.Order_No == detItem.Order_No).FirstOrDefault();

                                if (App3 != null)
                                {
                                    OrderNo = App3.Order_No;
                                    BMasId = App3.Buy_Ord_MasId;
                                }
                                if (Sno == item.SlNo && detItem.Buy_Ord_OrderDetId == 0)
                                {
                                    detItem.ShipRow = detItem.ShipRow;
                                    detItem.Buy_Ord_Ship = detItem.Buy_Ord_Ship;
                                    detItem.Rate = detItem.Rate;
                                    var Pgbod = entities.Proc_Apparel_ShipmentInsertBuyOrderDetTable(detItem.Buy_Ord_Ship, detItem.SizeId, detItem.Ratio, detItem.Quantity, StyRowId, detItem.ShipRow, OrderNo, detItem.Rate, detItem.ComboId, detItem.ComboRow, detItem.SlNo);
                                    entities.SaveChanges();
                                }
                            }

                            foreach (var CSItem in EBShipEnty.BuyOrdShipratio)
                            {
                                CSSno = (int)CSItem.SSNO;

                                if (CSSno == item.SlNo && CSItem.Buy_Ord_DetId == 0)
                                {
                                    
                                    CSItem.ShipRow = CSItem.ShipRow;
                                    CSItem.Buy_Ord_Ship = CSItem.Buy_Ord_Ship;
                                    CSItem.Order_no = objEAdd.OrderNo;
                                    //insert into BuyOrdDet
                                    var Pgbd = entities.Proc_Apparel_ShipmentInsertBuyOrdDetTable(CSItem.Buy_Ord_Ship, CSItem.ColorId, CSItem.SizeId, CSItem.Quantity, objEAdd.Stylerowid, CSItem.ShipRow, BMasId, OrderNo, CSItem.AllowQty, CSItem.PQty, CSItem.ItemId, CSItem.ColorId, CSItem.ComboId);
                                    entities.SaveChanges();
                                    //
                                    //insert into JobOrdColor
                                    var Pg5 = entities.Proc_Apparel_ShipmentInsertJobColorTable(objEAdd.WorkOrder, CSItem.Buy_Ord_Ship, CSItem.ColorId, CSItem.SizeId, CSItem.PQty, CSItem.ItemId);
                                    entities.SaveChanges();
                                }

                            }
                        }
                        //
                    }

                    //insert into ProgSumm
                    var Pgm = entities.Proc_Apparel_ShipmentInsertProgSummTable(OrderNo, objEAdd.WorkOrder, StyRowId);
                    entities.SaveChanges();

                    //var res = AmendData(objAdMas, objAdsepDet, objAdsepDet, WorkOrderUpd, EBShipEnty, "AmendUpd");
                    //var res1 = UpdateWorkOrderAmendData(WorkOrderUpd, objAdDet);

                    //The Transaction will be completed
                    txscope.Complete();
                    return reserved;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrderShipment-UpdateDetData");
                }

            }
            return reserved;
        }


        public IQueryable<ProductionWorkOrder> GetDataRepCheckPlanWorkDetails(string Workorder)
        {
            string ordNo = "";
            int styid = 0;

            var OQuery = entities.buy_ord_style.Where(b => b.WORKORDER == Workorder).FirstOrDefault();
            if (OQuery != null)
            {
                ordNo = OQuery.order_no;
                styid = OQuery.Styleid;
            }

            IQueryable<ProductionWorkOrder> query = (from a in entities.Proc_Apparel_GetWorkOrderCheckPlan(ordNo, styid)
                                                     select new ProductionWorkOrder
                                           {

                                               PlanBom = (int)a.CheckPlan,
                                               PlanProg = (int)a.CheckPrg,


                                           }).AsQueryable();

            return query;
        }


        public bool AmendData(List<Buy_Ord_Ship> objCDet, List<Buy_Ord_OrderDet> SepobjPDet, List<Buy_Ord_OrderDet> objPDet, ProductionWorkOrder objProdWOAdd, BuyOrdShipment BShipEnty, string Mode)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction

            try
            {
                var MasList = new List<Repository.Buy_Ord_Ship_Amend>();
                foreach (var ad in objCDet)
                {
                    MasList.Add(new Repository.Buy_Ord_Ship_Amend
                    {
                        ShipRowId = ad.ShipRowId,
                        Buy_Ord_Ship = ad.Buy_Ord_Ship1,
                        Order_No = ad.Order_No,
                        Buy_Ord_MasId = ad.Buy_Ord_MasId,
                        StyleId = ad.StyleId,
                        Ship_Date = ad.Ship_Date,
                        ItemMode = ad.ItemMode,
                        Dest_Code = ad.Dest_Code,
                        Quantity = ad.Quantity,
                        Job_Qty = ad.Job_Qty,
                        Finish_Qty = ad.Finish_Qty,
                        StyleRowid = ad.StyleRowid,
                        Lotno = ad.Lotno,
                        ProductionQty = ad.ProductionQty,
                        Despatch_Qty = ad.Despatch_Qty,
                        PortOfLoadingId = ad.PortOfLoadingId,
                        ShipAmend = ad.ShipAmend,
                        AllowancePer = ad.AllowancePer,
                        Despatch_Closed = ad.Despatch_Closed,
                        CreatedBy = ad.CreatedBy,
                        SlNo = ad.SlNo,
                        DelDate = ad.DelDate,
                        PA = ad.PA
                    });
                }

                var DetList = new List<Repository.Buy_Ord_OrderDet_Amend>();
                foreach (var ad in SepobjPDet)
                {
                    DetList.Add(new Repository.Buy_Ord_OrderDet_Amend
                    {
                        Buy_Ord_OrderDetId = ad.Buy_Ord_OrderDetId,
                        Buy_Ord_Ship = ad.Buy_Ord_Ship,
                        SizeId = ad.SizeId,
                        Ratio = ad.Ratio,
                        Quantity = ad.Quantity,
                        Job_Qty = ad.Job_Qty,
                        Finish_Qty = ad.Finish_Qty,
                        StyleRow = ad.StyleRow,
                        ShipRow = ad.ShipRow,
                        SizeRow = ad.SizeRow,
                        Order_No = ad.Order_No,
                        Rate = ad.Rate,
                        ComboId = ad.ComboId,
                        Despatch_Qty = ad.Despatch_Qty,
                        ComboRow = ad.ComboRow,
                        Packed_Qty = ad.Packed_Qty,
                        SlNo = ad.SlNo,
                        AllowPer = ad.AllowPer,
                        ProdQty = ad.ProdQty,
                        ItemId = ad.ItemId == 0 ? null : ad.ItemId
                    });
                }


                foreach (var item in MasList)
                {
                    entities.Buy_Ord_Ship_Amend.Add(item);
                    entities.SaveChanges();
                }

                foreach (var detItem in DetList)
                {
                    entities.Buy_Ord_OrderDet_Amend.Add(detItem);
                    entities.SaveChanges();
                }
                //foreach (var detItem in DetList)
                //{
                //    Sno = (int)detItem.SlNo;

                //    foreach (var item in MasList)
                //    {

                //        if (Sno == item.SlNo && item.ShipRowId==0)
                //        {

                //            entities.Buy_Ord_Ship_Amend.Add(item);
                //            entities.SaveChanges();
                //            ShID = (int)item.ShipRowId;
                //            ShipOrdNo = item.Buy_Ord_Ship;
                //        }


                //    }


                //    var App2 = entities.buy_ord_style.Where(c => c.order_no == detItem.Order_No && c.StyleRowid == detItem.StyleRow).FirstOrDefault();

                //    if (App2 != null)
                //    {
                //        StyRate = (decimal)App2.price;
                //    }

                //    detItem.ShipRow = ShID;
                //    detItem.Buy_Ord_Ship = ShipOrdNo;
                //    detItem.Rate = detItem.Rate;// StyRate;
                //    entities.Buy_Ord_OrderDet_Amend.Add(detItem);
                //    entities.SaveChanges();
                //}

                //Update Buy_ord_ship in Main Grid Begin
                foreach (var item in objCDet)
                {
                    //Sno = (int)item.snum;
                    SSNo = (int)item.SlNo;

                    //foreach (var woobj in objProdWOAdd.lstprodShipwo)
                    foreach (var woobj in BShipEnty.BuyOrdShipItem)
                    {
                        if (SSNo == woobj.SLNo && woobj.ShipRowId == 0)
                        {
                            woobj.Buy_Ord_Ship = item.Buy_Ord_Ship1;
                        }
                    }
                }

                foreach (var item in SepobjPDet)
                {
                    SSNo = (int)item.SlNo;

                    foreach (var woobjdet in BShipEnty.BuyOrdShipratio)
                    {
                        if (SSNo == woobjdet.SSNO && woobjdet.ShipRow == 0)
                        {
                            woobjdet.Buy_Ord_Ship = item.Buy_Ord_Ship;
                        }
                    }
                }
                //Update Buy_ord_ship in Main Grid End

                //foreach (var item in objCDet)
                foreach (var item in BShipEnty.BuyOrdShipItem)
                {
                    //Sno = (int)item.snum;
                    SSNo = (int)item.SLNo;

                    //foreach (var woobj in objProdWOAdd.lstprodShipwo)
                    foreach (var woobj in BShipEnty.BuyOrdShipItem)
                    {
                        if (SSNo == woobj.SLNo && woobj.ShipRowId == 0)
                        {
                            woobj.Buy_Ord_Ship = item.Buy_Ord_Ship;
                        }
                    }
                }

                //foreach (var item in objPDet)
                foreach (var item in BShipEnty.BuyOrdShipratio)
                {
                    Sno = (int)item.snumb;
                    SSNo = (int)item.SSNO;

                    //foreach (var woobjdet in objProdWOAdd.lstprodItemwo)
                    foreach (var woobjdet in BShipEnty.BuyOrdShipratio)
                    {
                        if (Sno == woobjdet.snumb && SSNo == woobjdet.SSNO && woobjdet.ShipRow == 0)
                        {
                            woobjdet.Buy_Ord_Ship = item.Buy_Ord_Ship;
                            woobjdet.ColorId = (int)item.ColorId;
                            woobjdet.AllowQty = (int)item.AllowQty;
                            woobjdet.PQty = (int)item.PQty;
                            woobjdet.ComboId = (int)item.ComboId;
                            woobjdet.ItemId = (int)item.ItemId;
                            woobjdet.Quantity = (int)item.Quantity;
                        }
                    }
                }


                //Update rate in buy_ord_orderder 

                //var dy = entities.buy_ord_style.Where(c => c.order_no == BShipEnty.Order_No && c.Styleid == BShipEnty.StyleId);

                //foreach (var dbSet in dy)
                //{
                //    Rate = (decimal)dbSet.price;
                //    foreach (var item in objAd)
                //    {
                //        var PgBomDet = entities.Proc_Apparel_UpdateBomDetTable(BomMasId, item.Buy_Ord_BOMDetid, item.UOMid, item.BOM_qty, item.ToPurUOM, item.Conv_Mode, item.CSP, item.ItemClosure, item.PurForJob);
                //        entities.SaveChanges();
                //    }
                //}

                if (Mode != "AmendUpd")
                {
                    var objWO = AddWorkOrderAmndData(objCDet, objProdWOAdd, BShipEnty);
                }


                entities.SaveChanges();
                reserved = true;

            }

            catch (Exception ex)
            {

                exceplogg.SendExcepToDB(ex, "BulkOrderShipment-AddPackData");
            }


            return reserved;
        }
    }
}
