using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Transactions;

namespace AxonApparel.Repository
{
    class ProgramSumm
    {
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Itemid { get; set; }
        public int Qty { get; set; }

        //public ProgramSumm(string Type, string BuyJobWork, int UOMId, int Colorid, int Sizeid, int Itemid, int Qty, int Styleid)
        public ProgramSumm(int Colorid, int Sizeid, int Itemid, int Qty)
        {
            this.Colorid = Colorid;
            this.Sizeid = Sizeid;
            this.Itemid = Itemid;
            this.Qty = Qty;
        }
    }

    class ProgramSummEdit
    {
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Itemid { get; set; }
        public decimal PQty { get; set; }

        public ProgramSummEdit(int Colorid, int Sizeid, int Itemid, decimal PQty)
        {
            this.Colorid = Colorid;
            this.Sizeid = Sizeid;
            this.Itemid = Itemid;
            this.PQty = PQty;
        }
    }

    public class WorkOrderRepository : IWorkOrderRepository
    {
        OrderEntities entities = new OrderEntities();

        public IQueryable<ProductionWorkOrder> GetDataByOrder(int StyleRowId)
        {
            string OrderNo = null;
            string Jobno = null;
            int Allowance = 0;
            int CmpId = 0;
            int ProcUnitId = 0;
            var OrdernoQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyleRowId).FirstOrDefault();
            if (OrdernoQuery != null)
            {
                OrderNo = OrdernoQuery.order_no;
                Allowance = (int)(OrdernoQuery.AllowancePer == null ? 0 : OrdernoQuery.AllowancePer);
            }

            var comp = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrderNo).FirstOrDefault();
            if (comp != null)
            {
                CmpId = (int)comp.CompanyId;
            }

            var JobNo = entities.Job_Ord_Mas.Where(b => b.Stylerowid == StyleRowId).FirstOrDefault();
            if (JobNo != null)
            {
                Jobno = JobNo.Job_Ord_No;
                ProcUnitId = (int)JobNo.ProcessUnitID;
            }

            //var query = (from bs in entities.buy_ord_style
            //             join bm in entities.Buy_Ord_Mas
            //                 on bs.order_no equals bm.Order_No
            //             join sh in entities.StyleHeaders
            //                 on bs.Styleid equals sh.StyleId
            //             join bu in entities.Buyers
            //                 on bm.BuyerId equals bu.BuyerId
            //             join gu in entities.Garment_UOM
            //                 on bm.GuomId equals gu.GUOMid
            //             where bs.order_no.Contains(OrderNo)
            //             select new ProductionWorkOrder
            //             {
            //                 OrderNo=bs.order_no,
            //                 RefNo=bm.Ref_No,
            //                 Style=sh.Style,
            //                 Quantity=(decimal)bs.quantity,
            //                 Shipmentdate=(DateTime)bs.styleentdate,
            //                 Buyer=bu.Buyer1,
            //                 Guom=gu.GUOM
            //             });

            //query=query.Where(v=>v.OrderNo== "" + OrderNo + "" );

            var query = (from a in entities.Proc_Apparel_GetWorkOrderInfo(OrderNo, StyleRowId)
                         select new ProductionWorkOrder
                         {
                             OrderNo = a.order_no,
                             RefNo = a.Ref_No,
                             StyleId = a.Styleid,
                             Style = a.Style,
                             Quantity = (decimal)a.quantity,
                             Shipmentdate = (DateTime)a.shipdate,
                             BuyerId = a.BuyerId == null ? 0 : a.BuyerId,
                             Buyer = a.Buyer == null ? "" : a.Buyer,
                             Guom = a.GUOM,
                             Conv = (int)a.Conv,
                             Stylerowid = a.StyleRowid,
                             CompanyId = CmpId,
                             WorkOrder = Jobno,
                             ProcessUnitId = ProcUnitId,
                             AllowancePer = Convert.ToInt16(a.AllowancePer),
                             BMasId = a.BmasId
                         }).AsQueryable();

            return query;
        }

        public IList<ProductionItemWOEntry> GetProdItemWO(int StyleRowId)
        {
            string OrderNo = null;           
            int BuyOrdDetId = 0;
            string Mode="";

            var OrdernoQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyleRowId).FirstOrDefault();
            if (OrdernoQuery != null)
            {
                OrderNo = OrdernoQuery.order_no;
            }


            var OrderDetQuery = entities.Buy_Ord_Det.Where(b => b.StyleRowId == StyleRowId && b.Order_No == OrderNo).FirstOrDefault();
            if (OrderDetQuery != null)
            {
                BuyOrdDetId = OrderDetQuery.Buy_Ord_DetId;
                Mode = "D";
            }
            else
            {
                Mode = "A";
            }

            var query = (from a in entities.Proc_Apparel_GetProductionItemWOInfo(OrderNo, StyleRowId,Mode)
                         select new ProductionItemWOEntry
                         {
                             ItemId = (int)a.ItemId,
                             ItemSeq = (int)a.ItemSeq,
                             Item = a.Item,
                             Buy_Ord_Ship = a.Buy_Ord_Ship,
                             BaseUnit = (int)(a.Bas_Unit == null ? 0 : a.Bas_Unit),
                             Color = a.Color,
                             Colorid = a.Colorid,
                             Size = a.Size,
                             StyleRowId = (int)a.StyleRow,
                             SizeRow = (int)a.SizeRow,
                             SizeId = a.Sizeid,
                             ShipRow = (int)a.ShipRow,
                             Allowance = (decimal)a.Allowance,
                             OrderQty = (decimal)a.Ordqty,
                             ProdQty = (decimal)a.Prodnqty
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProductionShipWOEntry> GetProdShipWO(int StyleRowId)
        {
            string OrderNo = null;
            int Styleid = 0;

            var OrdernoQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyleRowId).FirstOrDefault();
            if (OrdernoQuery != null)
            {
                OrderNo = OrdernoQuery.order_no;
                Styleid = OrdernoQuery.Styleid;
            }

            var query = (from a in entities.Proc_Apparel_GetProductionShipWOInfo(OrderNo, Styleid, StyleRowId)
                         select new ProductionShipWOEntry
                         {
                             Buy_Ord_Ship = a.buy_ord_Ship,
                             ShiprowID = a.ShipRowID,
                             ItemMode = a.Itemmode,
                             JobQty = (int)a.OQty,
                             Lotno = a.LotNo,
                             //fguom = a.fguom,
                             //sguom=a.sguom,
                             ShipDate = Convert.ToDateTime(DateTime.Now.ToShortDateString()),//(DateTime)a.Ship_Date,
                             Destination = a.Country,
                             DestinationId = a.dest_code,
                             PortofLoading = a.PortofLoading,
                             PortofLoadingId = a.PortofLoadingId,
                             Qty = (int)(a.Quantity + ((a.Quantity * a.AllowancePer) / 100)),
                             AllowancePer = a.AllowancePer,
                             DeliveryDate = Convert.ToDateTime(DateTime.Now.ToShortDateString()),//a.Delivery_Date
                         }).AsQueryable();

            return query.ToList();
        }

        public int AddData(ProductionWorkOrder objAdd)
        {

            var OType = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Job_Ord_Mas jom = new Job_Ord_Mas();
                    ////jom = objAdd;
                    //jom.Buyerid = objAdd.BuyerId;
                    //jom.Order_No = objAdd.OrderNo;
                    //jom.Job_Ord_Date = objAdd.Orderdate;

                    //var id = entities.Job_Ord_Mas.Add(jom);
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_AxonApparel_JobOrdMasInsert(objAdd.Stylerowid, objAdd.Orderdate, objAdd.OrderNo, objAdd.WorkOrder, objAdd.CompanyId,
                                                                        objAdd.BuyerId, objAdd.StyleId, Convert.ToInt16(objAdd.Quantity),
                                                                        objAdd.Remarks, objAdd.WorkOrder, objAdd.ProcessUnitId, objAdd.ProductionQty, objAdd.AllowancePer,
                                                                        objAdd.EmployeeID, OType,objParam,"NA");
                    entities.SaveChanges();


                    //Update compUnit in BuyerOrdStyle table
                    var bostyle = entities.buy_ord_style.Where(c => c.StyleRowid == objAdd.Stylerowid && c.Styleid == objAdd.StyleId && c.order_no==objAdd.OrderNo).FirstOrDefault();
                    if (bostyle != null)
                    {
                        bostyle.Company_Unitid = objAdd.ProdUnitId;
                   
                    }
                    entities.SaveChanges();

                    var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.StyleRowid == objAdd.Stylerowid && c.StyleId == objAdd.StyleId).ToList<Buy_Ord_Ship>();
                    if (BuyOrdShip != null)
                    {
                        foreach (var item in BuyOrdShip)
                        {
                            item.ProductionQty = objAdd.ProductionQty;
                            item.AllowancePer = objAdd.AllowancePer;
                        }
                    }
                    entities.SaveChanges();

                    //Insert into Job_Ord_Det
                    var shipList = new List<Domain.ProductionShipWOEntry>();

                    if (objAdd.lstprodShipwo.Count > 0)
                    {
                        foreach (var item in objAdd.lstprodShipwo)
                        {
                            shipList.Add(new Domain.ProductionShipWOEntry
                            {
                                JobOrderNo = objAdd.WorkOrder,
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                DeliveryDate = Convert.ToDateTime("2011-07-01"),//Convert.ToDateTime(item.DeliveryDate),
                                Qty = item.Qty
                            });
                        }
                    }
                    var ASWD = AddShipWoData(shipList, "Add");
                    //var shipresult = strrep.AddShipWoData(shipList, "Add");

                    //Insert into Buy_Ord_Det
                    var itemList = new List<Domain.ProductionItemWOEntry>();

                    if (objAdd.lstprodItemwo.Count > 0)
                    {
                        foreach (var item in objAdd.lstprodItemwo)
                        {
                            itemList.Add(new Domain.ProductionItemWOEntry
                            {
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                StyleRowId = objAdd.Stylerowid,
                                OrdNo = objAdd.OrderNo,
                                Colorid = item.Colorid,
                                SizeId = item.SizeId,
                                OrderNo = objAdd.WorkOrder,
                                Allowance = item.Allowance,
                                ShipRow = item.ShipRow,
                                ProdQty = item.ProdQty,
                                OrderQty = item.OrderQty,
                                ItemId = item.ItemId,
                            });
                        }
                    }

                    //var itemresult = strrep.AddItemWoData(itemList, "Add");
                    var itemresult = AddItemWoData(itemList, "Add");

                    //Insert into Job_Ord_Color
                    var colorList = new List<Domain.ProductionColorWOEntry>();

                    if (objAdd.lstprodItemwo.Count > 0)
                    {
                        foreach (var item in objAdd.lstprodItemwo)
                        {
                            colorList.Add(new Domain.ProductionColorWOEntry
                            {
                                JobOrderNo = objAdd.WorkOrder,
                                Buy_Ord_Ship = item.Buy_Ord_Ship,
                                Colorid = item.Colorid,
                                SizeId = item.SizeId,
                                ItemId = item.ItemId,
                                OrderQty = (decimal)item.OrderQty,
                                Rate = 0,
                                SizerowId = item.SizeRow,
                                //JobOrderNo = item.OrderNo,                        
                            });
                        }
                    }

                    //var resultitemcolor = strrep.AddColorWoData(colorList, "Add");
                    var resultitemcolor = AddColorWoData(colorList, "Add");

                    //Insert into Program_Summary
                    var programsummaryList = new List<Domain.ProgramSummary>();

                    if (objAdd.lstprodItemwo.Count > 0)
                    {
                        foreach (var item in objAdd.lstprodItemwo)
                        {
                            programsummaryList.Add(new Domain.ProgramSummary
                            {
                                OrderNo = objAdd.WorkOrder,
                                Type = "GN",
                                BuyJobWork = "W",
                                Colorid = item.Colorid,
                                Sizeid = item.SizeId,
                                Itemid = item.ItemId,
                                Styleid = objAdd.StyleId,
                                Qty = (int)item.ProdQty,
                            });
                        }
                    }

                    //var resultprgsumm = strrep.AddProgramSummary(programsummaryList, "Add");
                    var resultprgsumm = AddProgramSummary(programsummaryList, "Add");

                    //The Transaction will be completed
                    txscope.Complete();
                    return id;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    throw ex;
                }
            }
        }

        public bool GetPlanningMasChecking(int id)
        {
            var buyship = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();
            bool flag = false;

            if (buyship != null)
            {
                var planningmas = entities.Planning_Mas.Where(c => c.Order_No == buyship.order_no).FirstOrDefault();
                if (planningmas != null)
                {
                    flag = true;
                }
                else
                {
                    flag = false;
                }
            }
            return flag;
        }

        public bool UpdateData(Domain.ProductionWorkOrder obj)
        {
            var result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Update Buy_Ord_Ship
                    var boship = entities.Buy_Ord_Ship.Where(c => c.StyleRowid == obj.Stylerowid && c.StyleId == obj.StyleId).ToList<Buy_Ord_Ship>();
                    if (boship != null)
                    {
                        foreach (var item in boship)
                        {
                            item.ProductionQty = obj.ProductionQty;
                            item.AllowancePer = obj.AllowancePer;
                        }
                    }
                    entities.SaveChanges();

                    //Update buy_ord_style
                    var bostyle = entities.buy_ord_style.Where(c => c.StyleRowid == obj.Stylerowid).FirstOrDefault();
                    if (bostyle != null)
                    {
                        bostyle.ProductionQty = obj.ProductionQty;
                        bostyle.WORKORDER = obj.WorkOrder;
                        bostyle.AllowancePer = obj.AllowancePer;
                        bostyle.Company_Unitid = obj.ProdUnitId;
                    }
                    entities.SaveChanges();

                    //Update Buy_ord_Det
                    if (obj.lstprodItemwo != null && obj.lstprodItemwo.Count > 0)
                    {
                        foreach (var item in obj.lstprodItemwo)
                        {
                            var BuyOrdDet = entities.Buy_Ord_Det.Where(c => c.Buy_Ord_Ship == item.Buy_Ord_Ship && c.StyleRowId == item.StyleRowId && c.ITEMID == item.ItemId && c.ColorId == item.Colorid && c.SizeId == item.SizeId).FirstOrDefault();
                            if (BuyOrdDet != null)
                            {
                                BuyOrdDet.AllowanceQty = item.Allowance;
                                BuyOrdDet.ProductionQty = item.ProdQty;
                            }
                        }
                    }
                    entities.SaveChanges();

                    //Update Program_Summary
                    if (obj.lstprodItemwo != null && obj.lstprodItemwo.Count > 0)
                    {
                        foreach (var item in obj.lstprodItemwo)
                        {
                            var BuyOrdDet = entities.Program_Summary.Where(c => c.Order_No == item.OrderNo && c.Itemid == item.ItemId && c.Colorid == item.Colorid && c.Sizeid == item.SizeId).FirstOrDefault();
                            if (BuyOrdDet != null)
                            {
                                BuyOrdDet.Quantity = item.ProdQty;
                            }
                        }
                    }
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteData(int id)
        {
            var result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
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

                    //The Transaction will be completed
                    txscope.Complete();

                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return result;
                    throw ex;
                }
            }
        }

        public IQueryable<ProductionWorkOrder> GetDataList()
        {
            throw new NotImplementedException();
        }

        public ProductionWorkOrder GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public bool AddShipWoData(List<ProductionShipWOEntry> objShipDet, string Mode)
        {
            try
            {
                //int styleid = 0;

                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

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

                foreach (var shiplst in shipList)
                {
                    entities.Job_Ord_Det.Add(shiplst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddItemWoData(List<ProductionItemWOEntry> objItemDet, string Mode)
        {

            int MasId = 0;
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var itemList = new List<Buy_Ord_Det>();

                foreach (var item in objItemDet)
                {
                    var OrdernoQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == item.OrdNo).FirstOrDefault();
                    if (OrdernoQuery != null)
                    {
                        MasId = OrdernoQuery.Buy_Ord_MasId;
                    }

                    //entities.Job_Ord_Det.Add(item);
                    itemList.Add(new Repository.Buy_Ord_Det
                    {
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
                    });
                }

                foreach (var itemlst in itemList)
                {
                    entities.Buy_Ord_Det.Add(itemlst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddColorWoData(List<ProductionColorWOEntry> objItemDet, string Mode)
        {

          
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var itemList = new List<Job_Ord_Color>();

                foreach (var clor in objItemDet)
                {
                    //var OrdernoQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == item.OrdNo).FirstOrDefault();
                    //if (OrdernoQuery != null)
                    //{
                    //    MasId = OrdernoQuery.Buy_Ord_MasId;
                    //}

                    //entities.Job_Ord_Det.Add(item);

                    itemList.Add(new Repository.Job_Ord_Color
                    {
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

                foreach (var itemlst in itemList)
                {
                    entities.Job_Ord_Color.Add(itemlst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddProgramSummary(List<ProgramSummary> objItemDet, string Mode)
        {
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var itemList = new List<Program_Summary>();

                var list_collapsed = objItemDet
                                                .GroupBy(p => new { ItemId = p.Itemid, Colorid = p.Colorid, SizeId = p.Sizeid })
                                                .Select(g => new ProgramSumm(
                                                    g.Key.Colorid,
                                                    g.Key.SizeId,
                                                    g.Key.ItemId,
                                                    g.Sum(p => p.Qty)))
                                                .ToList();

                foreach (var clor in list_collapsed)
                {
                    var Orderinfo = objItemDet.Where(b => b.Itemid == clor.Itemid && b.Sizeid == clor.Sizeid && b.Colorid == clor.Colorid).FirstOrDefault();

                    var uomid = entities.Item.Where(i => i.ItemId == clor.Itemid).FirstOrDefault();

                    itemList.Add(new Repository.Program_Summary
                    {
                        Type = Orderinfo.Type,
                        BuyJobWork = Orderinfo.BuyJobWork,
                        UOMId = uomid.Bas_Unit,
                        Order_No = Orderinfo.OrderNo,
                        Colorid = clor.Colorid,
                        Sizeid = clor.Sizeid,
                        Itemid = clor.Itemid,
                        Quantity = clor.Qty,
                        Styleid = Orderinfo.Styleid
                    });
                }
                //foreach (var clor in objItemDet)
                //{
                //    //var OrdernoQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == item.OrdNo).FirstOrDefault();
                //    //if (OrdernoQuery != null)
                //    //{
                //    //    MasId = OrdernoQuery.Buy_Ord_MasId;
                //    //}

                //    var uomid = entities.Items.Where(i => i.ItemId == clor.Itemid).FirstOrDefault();

                //    //entities.Job_Ord_Det.Add(item);
                //    itemList.Add(new Repository.Program_Summary
                //    {
                //        Type = clor.Type,
                //        BuyJobWork = clor.BuyJobWork,
                //        UOMId = uomid.Bas_Unit,
                //        Order_No = clor.OrderNo,
                //        Colorid = clor.Colorid,
                //        Sizeid = clor.Sizeid,
                //        Itemid = clor.Itemid,
                //        Quantity = clor.Qty,
                //        Styleid = clor.Styleid
                //    });
                //}

                foreach (var itemlst in itemList)
                {
                    entities.Program_Summary.Add(itemlst);
                }

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        IQueryable<Job_Ord_Mas> IWorkOrderRepository.GetDataList()
        {
            return entities.Job_Ord_Mas.OrderBy(c => c.ID);
        }
    }
}
