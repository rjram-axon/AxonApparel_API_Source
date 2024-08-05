using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class JobWorkRepository : IJobWorkRepository
    {

        OrderEntities entities = new OrderEntities();

        int Pid = 0;
        int PStyRowId = 0;

        public IList<JobWorkDetails> GetDataAddJobRepDetails(int? companyid, int? BuyerId, int? StyleId, string OrderNo, string RefNo, string BRefNo)
        {

            var query = (from YD in entities.Proc_Apparel_GetJobWorkAddDetails(companyid == null ? 0 : companyid, BuyerId == null ? 0 : BuyerId, StyleId == null ? 0 : StyleId, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(BRefNo) ? "" : BRefNo)
                         select new JobWorkDetails
                         {
                             OrderNo = (YD.Order_No == null ? "" : YD.Order_No),
                             RefNo = (YD.Ref_No == null ? "" : YD.Ref_No),
                             BRefNo = (YD.Buyer_Ref_No == null ? "" : YD.Buyer_Ref_No),
                             StyleName = (YD.style == null ? "" : YD.style),
                             StyleRowId = YD.styleRowID,
                             companyid = (int)YD.CompanyID,
                             Buyer = (YD.buyer == null ? "" : YD.buyer),
                             Quantity = (decimal)YD.ProductionQty,
                             Balance = (decimal)YD.BalQty,

                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<JobWorkDetails> GetDataJobRepEntryDetails(string OrderNo, int StyleRowId)
        {

            int compid = 0;

            var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrderNo).FirstOrDefault();
            if (OQuery != null)
            {
                compid = (int)OQuery.CompanyId;

            }


            IQueryable<JobWorkDetails> query = (from a in entities.Proc_Apparel_GetJobWorkDetails(OrderNo, StyleRowId)
                                                select new JobWorkDetails
                                              {
                                                  OrderNo = a.Order_No,
                                                  JobOrderNo = a.Job_Ord_No,
                                                  OrderDate = (DateTime)a.Job_Ord_Date,
                                                  Issuedate = (DateTime)a.Issue_Date,
                                                  Job_Order_RefNo = (a.Ref_No == null ? string.Empty : a.Ref_No),
                                                  Rate = a.Rate,
                                                  RateType = a.ratetype,
                                                  Buyer = a.buyer,
                                                  BuyerId = (int)a.buyerid,
                                                  StyleId = a.StyleID,
                                                  StyleName = a.style,
                                                  ProductionQty = (int)(a.ProductionQty == null ? 0 : a.ProductionQty),
                                                  Manager = a.Manager,
                                                  ManagerId = a.ManagerID,
                                                  Merchandiser = a.Merchandiser,
                                                  MerchandiserId = a.MerchandiserID,
                                                  QC = a.Qc,
                                                  QCId = a.QcID,
                                                  Stage = (a.Stage == null ? string.Empty : a.Stage),
                                                  StageId = (int)(a.Stageid == null ? 0 : a.Stageid),
                                                  UnitOrOther = a.Unit_Or_Other,
                                                  CompanyUnit = a.CompanyUnit,
                                                  CompanyUnitId = (int)a.Id,
                                                  SupplierName = (a.Supplier == null ? string.Empty : a.Supplier),
                                                  SupplierId = (int)(a.SupplierID == null ? 0 : a.SupplierID),
                                                  ToApprove = (a.ToApprove == null ? string.Empty : a.ToApprove),
                                                  ToApproveId = (int)(a.ToApproveId == 0 ? 0 : a.ToApproveId),
                                                  ExcessPer = (int)a.ExcessPer,
                                                  Currency = a.Currency,
                                                  CurrencyId = (int)a.Currencyid,
                                                  Exchange = (int)(a.Exchange == null ? 0 : a.Exchange),
                                                  DecimalPlace = (int)(a.DecimalPlace == null ? 0 : a.DecimalPlace),
                                                  Consumption = a.Consumption,
                                                  RateDesc = a.Rate_Desc,
                                                  Remarks = a.remarks,
                                                  JobOrdType = a.jobordtype,
                                                  CompanyUnitAddress = a.Addres,
                                                  companyid = compid,

                                              }).AsQueryable();

            return query;
        }


        public IList<JobOrderShipmentlist> GetDataShipRepDetails(int StyleRowId)
        {
            var query = (from YD in entities.Proc_Apparel_GetJobWorkShipmentDetails(StyleRowId)
                         select new JobOrderShipmentlist
                         {
                             shiprowid = YD.ShipRowID,
                             stylerowid = StyleRowId,
                             buyordship = YD.buy_ord_ship,
                             shipdate = (DateTime)YD.ship_date,
                             Country = YD.Destination,
                             Ordqty = (decimal)YD.ProductionQty,
                             Balance = (decimal)YD.BalQty,
                             jobqty = 0,
                             jobOrdqty = 0,
                             Oldjobqty = 0,
                             deliverydate = (DateTime)YD.ship_date,
                             olddeliverydate = (DateTime)YD.ship_date,
                             ExPer = 0,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<JobOrderItemlist> GetDataItemRepDetails(int StyleRowId, int? ShipRowId)
        {
            var query = (from YD in entities.Proc_Apparel_GetJobWorkItemDetails(StyleRowId, ShipRowId == null ? 0 : ShipRowId)
                         select new JobOrderItemlist
                         {

                             ColorId = YD.colorid,
                             Color = YD.color,
                             SizeId = YD.sizeid,
                             Size = YD.size,
                             ItemId = YD.ItemID,
                             Item = YD.item,
                             //JQuantity = (decimal)YD.BalQty,
                             JobQuantity = (decimal)YD.DetQuantity,
                             ActualJobQuantity = 0,
                             Balance = (decimal)YD.DetBalQty,
                             Rate = (decimal)YD.BalQty,
                             ExQty = 0,
                             StyRowId = StyleRowId,
                             ShipRowId = YD.ShipRowid,
                             BuyOrdDetId = YD.Buy_Ord_DetId,
                             BuyOrdShip = YD.buy_ord_ship,
                             OldJQuantity = 0,
                         }).AsQueryable();



            return query.ToList();
        }


        public bool AddDetData(Job_Ord_Mas objjoEntry, List<Job_Ord_Det> objjoDet, List<Job_Ord_Color> objjoOrd, List<Job_Ord_Sum> objjSOrd, List<Job_Ord_BomDet> objjoBomDet, Job_Ord_BOMMas objjobomEntry)
        {
            bool reserved = false;
            int JBomMasId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var j in objjoDet)
                    {
                        var d = entities.buy_ord_style.Where(c => c.StyleRowid == objjoEntry.Stylerowid).FirstOrDefault();
                        if (d != null)
                        {
                            d.job_qty = d.job_qty + (decimal)j.Quantity;
                        }
                    }
                    entities.SaveChanges();

                    var id = entities.Job_Ord_Mas.Add(objjoEntry);
                    entities.SaveChanges();


                    foreach (var shipitem in objjoDet)
                    {

                        entities.Job_Ord_Det.Add(shipitem);
                        entities.SaveChanges();

                        int Pgc = entities.Proc_Apparel_UpdateJobShipQty(shipitem.Buy_ord_ship, objjoEntry.Stylerowid, shipitem.Quantity);
                        entities.SaveChanges();
                    }

                    foreach (var Yitem in objjoOrd)
                    {
                        if (Yitem.quantity > 0)
                        {

                            entities.Job_Ord_Color.Add(Yitem);
                            entities.SaveChanges();


                            int Pgc = entities.Proc_Apparel_UpdateJobBoDetQty(Yitem.buy_ord_ship, Yitem.ITEMID, Yitem.colorid, Yitem.sizeid, Yitem.quantity);
                            entities.SaveChanges();
                        }

                    }


                    foreach (var Yitemsum in objjSOrd)
                    {
                        if (Yitemsum.quantity > 0)
                        {

                            entities.Job_Ord_Sum.Add(Yitemsum);
                            entities.SaveChanges();

                        }

                    }

                    var Pgy1 = entities.Proc_PGPostJobGarments(objjoEntry.Job_Ord_No, "A");
                    entities.SaveChanges();


                    //JobBomMas 

                    var JobMasid = entities.Job_Ord_BOMMas.Add(objjobomEntry);
                    entities.SaveChanges();
                    JBomMasId = objjobomEntry.Job_Ord_BOMid;


                    foreach (var JobItemitem in objjoBomDet)
                    {
                        if (JobItemitem.BOM_qty > 0)
                        {
                            int Pgc = entities.Proc_UpdateJobYarnFabAccBOMPlan(objjoEntry.Job_Ord_No, objjoEntry.Styleid, JobItemitem.Itemid, JobItemitem.Colorid, JobItemitem.Sizeid, JobItemitem.Prg_qty, JobItemitem.BOM_qty, objjoEntry.Order_No, JBomMasId);
                            entities.SaveChanges();
                        }
                    }
                    //



                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IList<Bom> GetDetList(string orderno, int styleid, string OType, string StageType, string JobOrderNo)
        {
            var query = (from Ec in entities.Proc_Apparel_GetListJobbom(orderno, styleid, "B", StageType, JobOrderNo)
                         select new Bom
                         {
                             Itemgroupid = Ec.Id,
                             Itemgroup = Ec.ItemGroup,
                             Itemid = (int)Ec.itemid,
                             item = Ec.item,
                             color = (Ec.ColorName == null ? "" : Ec.ColorName),
                             Colorid = (int)(Ec.colorid == null ? 0 : Ec.colorid),
                             pgmqty = (decimal)Ec.Prg_Qty,
                             recvdqty = (decimal)Ec.Received_Qty,
                             ItemClosure = Ec.ItemClose,
                             CSP = Ec.CSP,
                             PurFor_Job = Ec.PurFor_Job,
                             styleid = (int)Ec.Styleid,
                             Orderno = Ec.Order_No,
                             Buyordmasid = Ec.Buy_Ord_BOMid,
                             Buyordmasdetid = Ec.Buy_Ord_BOMDetid,
                             BOM_qty = (decimal)Ec.Bom_qty,
                             Category1 = Ec.ColorName,
                             Category2 = Ec.size,
                             Pur_UOMid = (int)Ec.Pur_UOMid,
                             puruom = Ec.puruom,
                             Conv_Mode = Ec.Conv_Mode,
                             uom = Ec.uom,
                             ToPurUOM = Ec.ToPurUOM,
                             Uomid = Ec.uomid,
                             FromUomid = (int)(Ec.FromUomId == null ? 0 : Ec.FromUomId),
                             ToUomid = (int)(Ec.ToUomId == null ? 0 : Ec.ToUomId),
                             Sizeid = (int)(Ec.sizeid == null ? 0 : Ec.sizeid),
                             Baseunit = (int)Ec.Bas_Unit,
                             action = "",
                             JobBomQty = (decimal)(Ec.Job_Ord_BOMDetid == 0 ? 0 : Ec.Bom_qty),//(decimal)Ec.Bom_qty,
                             Jobordmasdetid = Ec.Job_Ord_BOMDetid,
                             Jobordmasid = Ec.Job_Ord_BOMid,
                             SNo=(int)Ec.SNo,

                         })
                //.ToList();
             .AsQueryable();

            return query.ToList();
        }


        public IQueryable<JobWorkDetails> GetDatajobMainRepDetails(int? companyid, int? BuyerId, int? SupplierId, int? StyleId, string OrderNo, string RefNo, string JobOrderNo, string Fdate, string Tdate, string OrderType, string DispatchClosed)
        {

            IQueryable<JobWorkDetails> query = (from cd1 in entities.Proc_Apparel_GetJobOrderLoadMain(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, StyleId == null ? 0 : StyleId, BuyerId == null ? 0 : BuyerId, Fdate == null ? "" : Fdate.ToString(), Tdate == null ? "" : Tdate.ToString(), string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(JobOrderNo) ? "" : JobOrderNo, OrderType, DispatchClosed)
                                                select new JobWorkDetails
                                            {

                                                JobOrderId = cd1.ID,
                                                OrderNo = cd1.order_no,
                                                RefNo = cd1.Ref_no,
                                                OrderDate = (DateTime)cd1.Order_date,
                                                JobOrderNo = cd1.Job_Ord_No,
                                                StyleRowId = cd1.StyleRowid,
                                                companyid = (int)cd1.Companyid,
                                                Buyer = cd1.buyer,
                                                BuyerId = (int)cd1.buyerid,
                                                StyleId = cd1.Styleid,
                                                StyleName = cd1.Style,
                                                ChkJQty = cd1.JRecQty,
                                                ChkBomPurJQty=(decimal)cd1.JBomPOQty,
                                                Buy_Ord_MasId=cd1.Bmasid,
                                                SupplierId=(int)cd1.SupplierID,
                                                SupplierName=cd1.Supplier
                                            }).AsQueryable();
            return query;
        }

        public IQueryable<JobWorkDetails> GetDataRepEditjobDetails(int Id, int StyRowId)
        {
            int compid = 0;
            string JobNo = "";
            var OQuery = entities.Job_Ord_Mas.Where(b => b.ID == Id).FirstOrDefault();
            if (OQuery != null)
            {
                compid = (int)OQuery.Companyid;
                JobNo = OQuery.Job_Ord_No;
            }

            Pid = Id;
            PStyRowId = StyRowId;

            IQueryable<JobWorkDetails> query = (from a in entities.proc_GetJobOrderDetails(Id, StyRowId)
                                                select new JobWorkDetails
                                                {
                                                    OrderNo = a.Order_No,
                                                    JobOrderNo = JobNo,
                                                    OrderDate = (DateTime)a.Job_Ord_Date,
                                                    Issuedate = (DateTime)a.Issue_Date,
                                                    Job_Order_RefNo = (a.Ref_No == null ? string.Empty : a.Ref_No),
                                                    Rate = a.Rate,
                                                    RateType = a.ratetype,
                                                    Buyer = a.buyer,
                                                    BuyerId = (int)a.buyerid,
                                                    StyleId = a.StyleID,
                                                    StyleName = a.style,
                                                    ProductionQty = (int)(a.ProductionQty == null ? 0 : a.ProductionQty),
                                                    Manager = a.Manager,
                                                    ManagerId = (int)a.ManagerID,
                                                    Merchandiser = a.Merchandiser,
                                                    MerchandiserId = (int)a.MerchandiserID,
                                                    QC = (a.Qc == null ? string.Empty : a.Qc),
                                                    QCId = (int)(a.QcID == null ? 0 : a.QcID),
                                                    Stage = (a.Stage == null ? string.Empty : a.Stage),
                                                    StageId = (int)(a.Stageid == null ? 0 : a.Stageid),
                                                    UnitOrOther = a.Unit_Or_Other,
                                                    CompanyUnit = a.CompanyUnit,
                                                    CompanyUnitId = (int)a.id,
                                                    SupplierName = (a.Supplier == null ? string.Empty : a.Supplier),
                                                    SupplierId = (int)(a.SupplierID == null ? 0 : a.SupplierID),
                                                    ToApprove = (a.ToApprove == null ? string.Empty : a.ToApprove),
                                                    ToApproveId = (int)(a.ToApproveId == 0 ? 0 : a.ToApproveId),
                                                    ExcessPer = (int)a.ExcessPer,
                                                    Currency = a.Currency,
                                                    CurrencyId = (int)a.Currencyid,
                                                    Exchange = (int)(a.Exchange == null ? 0 : a.Exchange),
                                                    DecimalPlace = (int)(a.DecimalPlace == null ? 0 : a.DecimalPlace),
                                                    Consumption = a.Consumption,
                                                    RateDesc = a.Rate_Desc,
                                                    Remarks = a.remarks,
                                                    JobOrdType = a.jobordtype,
                                                    RefNo = a.Job_Order_Ref,
                                                    //CompanyUnitAddress = a.a,
                                                    companyid = compid,

                                                }).AsQueryable();

            return query;
        }

        public IList<JobOrderShipmentlist> GetRepEditJobShipLoad(int Id, int StyRowId)
        {
            var query = (from YD in entities.proc_GetJobOrderShipment(Id, StyRowId)
                         select new JobOrderShipmentlist
                         {
                             shiprowid = YD.ShipRowid,
                             stylerowid = StyRowId,
                             buyordship = YD.buy_ord_ship,
                             shipdate = (DateTime)YD.ship_date,
                             Country = YD.Destination,
                             Ordqty = (decimal)YD.ProductionQty,
                             Balance = (decimal)YD.BBalQty + (decimal)YD.jQuantity,
                             jobqty = (decimal)YD.jQuantity,
                             jobOrdqty = (decimal)YD.jQuantity,
                             Oldjobqty = (decimal)YD.jQuantity,
                             deliverydate = (DateTime)YD.ship_date,
                             olddeliverydate = (DateTime)YD.ship_date,
                             ExPer = 0,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<JobOrderItemlist> GetRepEditJobItemLoad(int Id)
        {

            int StyleRowid = 0;
            decimal Rate = 0;
            string JobNo = "";
            var OQuery1 = entities.Job_Ord_Mas.Where(b => b.ID == Id).FirstOrDefault();
            if (OQuery1 != null)
            {
                StyleRowid = (int)OQuery1.Stylerowid;
                Rate = (decimal)OQuery1.Rate;
                JobNo = OQuery1.Job_Ord_No;
            }

            var query = (from YD in entities.Proc_Apparel_GetJobWorkEditShipItemDetails(StyleRowid, JobNo)
                         select new JobOrderItemlist
                         {

                             ColorId = (int)YD.colorid,
                             Color = YD.color,
                             SizeId = (int)YD.sizeid,
                             Size = YD.size,
                             ItemId = (int)YD.ItemID,
                             Item = YD.size,
                             //JQuantity = (decimal)YD.BalQty,
                             JobQuantity = (decimal)YD.DetQuantity,
                             ActualJobQuantity = (decimal)YD.ActualJobQty,
                             Balance = (decimal)YD.DetBalQty + (decimal)YD.ActualJobQty,
                             OldJQuantity = (decimal)YD.ActualJobQty,
                             Rate = (decimal)YD.Rate,
                             ExQty = 0,
                             StyRowId = (int)YD.StyleRowid,
                             ShipRowId = (int)YD.ShipRowid,
                             BuyOrdDetId = YD.Buy_Ord_DetId,
                             BuyOrdShip = YD.buy_ord_ship,

                         }).AsQueryable();



            return query.ToList();
        }


        public IQueryable<JobWorkDetails> GetRepStageList()
        {

            IQueryable<JobWorkDetails> query = (from a in entities.proc_GetStageDetails()
                                                select new JobWorkDetails
                                                {

                                                    Stage = (a.Stage == null ? string.Empty : a.Stage),
                                                    StageId = (int)(a.StageId == null ? 0 : a.StageId),

                                                }).AsQueryable();

            return query;
        }


        public bool UpdateDetData(Job_Ord_Mas objEjoEntry, List<Job_Ord_Det> objEjoDet, List<Job_Ord_Color> objEjoOrd, List<Job_Ord_Sum> objEjsoOrd, List<Job_Ord_BomDet> objEjoBomDet, Job_Ord_BOMMas objEjobomEntry)
        {
            bool reserved = false;
            int JBomId = 0;
            int JBomMasId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    int StyleRowid = 0;
                    decimal Rate = 0;
                    var OQuery1 = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objEjoEntry.Job_Ord_No).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        StyleRowid = (int)OQuery1.Stylerowid;
                        Rate = (decimal)OQuery1.Rate;
                    }


                    //Update the Buyshiptable

                    foreach (var Eshipitem in objEjoDet)
                    {

                        int Pgc = entities.Proc_Apparel_UpdateJobEditShipQty(Eshipitem.Buy_ord_ship, StyleRowid, Eshipitem.Quantity);
                        entities.SaveChanges();

                    }

                    //Update the Buystyletable

                    foreach (var Estyleitem in objEjoDet)
                    {

                        int Pgc = entities.Proc_Apparel_UpdateJobEditStyleQty(Estyleitem.Buy_ord_ship, StyleRowid, Estyleitem.Quantity);
                        entities.SaveChanges();

                    }

                    //Update the Buy_Ord_Det
                    foreach (var EYitem in objEjoOrd)
                    {
                        if (EYitem.quantity > 0)
                        {

                            int Pgc = entities.Proc_Apparel_UpdateEditJobBoDetQty(EYitem.buy_ord_ship, objEjoEntry.Job_Ord_No, EYitem.ITEMID, EYitem.colorid, EYitem.sizeid, EYitem.quantity);
                            entities.SaveChanges();
                        }

                    }

                    //Delete the Tables

                    var Det1 = entities.Job_Ord_Sum.Where(v => v.JobOrdNo == objEjoEntry.Job_Ord_No);
                    foreach (var v in Det1)
                    {
                        entities.Job_Ord_Sum.Remove(v);
                    }

                    var Det2 = entities.Job_Ord_Color.Where(v1 => v1.Job_Ord_No == objEjoEntry.Job_Ord_No);
                    foreach (var v1 in Det2)
                    {
                        entities.Job_Ord_Color.Remove(v1);
                    }

                    var Det3 = entities.Job_Ord_Det.Where(v2 => v2.Job_Ord_No == objEjoEntry.Job_Ord_No);
                    foreach (var v2 in Det3)
                    {
                        entities.Job_Ord_Det.Remove(v2);
                    }



                    var CmDet1 = entities.Program_Summary.Where(w => w.Order_No == objEjoEntry.Job_Ord_No);
                    foreach (var C1 in CmDet1)
                    {
                        entities.Program_Summary.Remove(C1);

                    }
                    //Delete the JobBom Table delete
                    

                    //Update JobBom Table

                    var dy = entities.Job_Ord_BOMMas.Where(c => c.Job_Ord_No == objEjoEntry.Job_Ord_No);

                    foreach (var dbSet in dy)
                    {

                        JBomId = dbSet.Job_Ord_BOMid;

                        foreach (var k in objEjoBomDet)
                        {
                            var e = entities.Job_Ord_BomDet.Where(a => a.Job_Ord_BOMDetid.Equals(k.Job_Ord_BOMDetid)).FirstOrDefault();
                            if (e != null)
                            {

                                e.Job_Ord_BOMDetid = k.Job_Ord_BOMDetid;
                                e.Job_Ord_BOMid = k.Job_Ord_BOMid;
                                e.CSP = k.CSP;
                                e.Prg_qty = k.Prg_qty;
                                e.Received_qty = k.Received_qty;
                                e.ItemClosure = k.ItemClosure;
                                e.PurForJob = k.PurForJob;
                                e.BOM_qty = k.BOM_qty;
                                e.UOMid = (int)k.UOMid;
                                e.Itemid = k.Itemid;
                                e.Colorid = k.Colorid;
                                e.Sizeid = k.Sizeid;
                                e.Pur_UOMid = k.Pur_UOMid;
                                e.Issue_qty = k.Issue_qty;
                                e.ToPurUOM = k.ToPurUOM;
                                e.Conv_Mode = k.Conv_Mode;
                                e.Cancel_Qty = k.Cancel_Qty;
                            }
                        }
                        entities.SaveChanges();
                    }



                    entities.SaveChanges();


                    var App = entities.Job_Ord_Mas.Where(c => c.Job_Ord_No == objEjoEntry.Job_Ord_No).FirstOrDefault();
                    if (App != null)
                    {


                        App.Order_No = objEjoEntry.Order_No;
                        App.Job_Ord_No = objEjoEntry.Job_Ord_No;
                        App.Job_Ord_Date = objEjoEntry.Job_Ord_Date;
                        App.Issue_Date = objEjoEntry.Issue_Date;
                        App.Unit_or_other = objEjoEntry.Unit_or_other;
                        App.Sales_sample = "S";
                        App.Styleid = objEjoEntry.Styleid;
                        App.Supplierid = objEjoEntry.Supplierid;
                        App.Merch_id = objEjoEntry.Merch_id;
                        App.Qc_id = objEjoEntry.Qc_id;
                        App.Job_Order_Ref = objEjoEntry.Job_Order_Ref;
                        App.Programmed = true;
                        App.Quantity = objEjoEntry.Quantity;
                        App.Exchange = objEjoEntry.Exchange;
                        App.Buyerid = objEjoEntry.Buyerid;
                        App.Companyid = objEjoEntry.Companyid;
                        App.Stylerowid = StyleRowid;
                        App.Amend = "N";
                        App.JobOrWork = "J";
                        App.Rate = objEjoEntry.Rate;
                        App.Remarks = "";
                        App.RateType = "PR";
                        App.IsApproved = "N";
                        App.CurrencyID = objEjoEntry.CurrencyID;//JobEnty.CurrencyId,
                        App.JobOrdType = "I";
                        App.CreatedBy = objEjoEntry.CreatedBy;
                        App.ProcessUnitID = objEjoEntry.ProcessUnitID;
                        App.ToApprove = objEjoEntry.ToApprove;
                        App.Despatch_closed = true;
                        App.StageId = objEjoEntry.StageId;
                        App.ExcessPer = objEjoEntry.ExcessPer;

                    }
                    entities.SaveChanges();



                    foreach (var j in objEjoDet)
                    {
                        var d = entities.buy_ord_style.Where(c => c.StyleRowid == StyleRowid).FirstOrDefault();
                        if (d != null)
                        {
                            d.job_qty = d.job_qty + (decimal)j.Quantity;
                        }
                    }
                    entities.SaveChanges();


                    foreach (var shipitem in objEjoDet)
                    {

                        entities.Job_Ord_Det.Add(shipitem);
                        entities.SaveChanges();

                        int Pgc = entities.Proc_Apparel_UpdateJobShipQty(shipitem.Buy_ord_ship, StyleRowid, shipitem.Quantity);
                        entities.SaveChanges();
                    }

                    foreach (var Yitem in objEjoOrd)
                    {
                        if (Yitem.quantity > 0)
                        {

                            entities.Job_Ord_Color.Add(Yitem);
                            entities.SaveChanges();


                            int Pgc = entities.Proc_Apparel_UpdateJobBoDetQty(Yitem.buy_ord_ship, Yitem.ITEMID, Yitem.colorid, Yitem.sizeid, Yitem.quantity);
                            entities.SaveChanges();
                        }

                    }


                    foreach (var Yitemsum in objEjsoOrd)
                    {
                        if (Yitemsum.quantity > 0)
                        {

                            entities.Job_Ord_Sum.Add(Yitemsum);
                            entities.SaveChanges();

                        }

                    }

                    var Pgy1 = entities.Proc_PGPostJobGarments(objEjoEntry.Job_Ord_No, "A");
                    entities.SaveChanges();


                    //JobBomMas 

                    var App1 = entities.Job_Ord_Mas.Where(c => c.Job_Ord_No == objEjoEntry.Job_Ord_No).FirstOrDefault();
                    if (App1 == null)
                    {

                        if (objEjobomEntry.Job_Ord_No == App1.Job_Ord_No)
                        {
                            JBomMasId = objEjobomEntry.Job_Ord_BOMid;
                        }
                        else
                        {
                            var JobMasid = entities.Job_Ord_BOMMas.Add(objEjobomEntry);
                            entities.SaveChanges();
                            JBomMasId = objEjobomEntry.Job_Ord_BOMid;
                        }
                    }
                    else
                    {
                        var OQuery = entities.Job_Ord_BOMMas.Where(b => b.Job_Ord_No == objEjoEntry.Job_Ord_No).FirstOrDefault();
                        if (OQuery != null)
                        {
                            JBomMasId = OQuery.Job_Ord_BOMid;
                        }

                    }
                    
                    foreach (var JobItemitem in objEjoBomDet)
                    {
                        if (JobItemitem.Job_Ord_BOMDetid == 0 && JobItemitem.BOM_qty > 0)
                        {
                            int Pgc = entities.Proc_UpdateJobYarnFabAccBOMPlan(objEjoEntry.Job_Ord_No, objEjoEntry.Styleid, JobItemitem.Itemid, JobItemitem.Colorid, JobItemitem.Sizeid, JobItemitem.Prg_qty, JobItemitem.BOM_qty, objEjoEntry.Order_No, JBomMasId);
                            entities.SaveChanges();
                        }
                    }
                    //
                    //


                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool DeleteDetData(Job_Ord_Mas objDjoEntry, List<Job_Ord_Det> objDjoDet, List<Job_Ord_Color> objDjoOrd, List<Job_Ord_Sum> objDjsoOrd, List<Job_Ord_BomDet> objDjoBomDet, Job_Ord_BOMMas objDjobomEntry)
        {
            bool reserved = false;
            int JBomId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    int StyleRowid = 0;
                    decimal Rate = 0;
                    var OQuery1 = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objDjoEntry.Job_Ord_No).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        StyleRowid = (int)OQuery1.Stylerowid;
                        Rate = (decimal)OQuery1.Rate;
                    }


                    //Update the Buyshiptable

                    foreach (var Eshipitem in objDjoDet)
                    {

                        int Pgc = entities.Proc_Apparel_UpdateJobEditShipQty(Eshipitem.Buy_ord_ship, StyleRowid, Eshipitem.Quantity);
                        entities.SaveChanges();
                    }

                    //Update the Buystyletable

                    foreach (var DEstyleitem in objDjoDet)
                    {

                        int Pgc = entities.Proc_Apparel_UpdateJobEditStyleQty(DEstyleitem.Buy_ord_ship, StyleRowid, DEstyleitem.Quantity);
                        entities.SaveChanges();
                    }

                    //Update the Buy_Ord_Det
                    foreach (var EYitem in objDjoOrd)
                    {
                        if (EYitem.quantity > 0)
                        {

                            int Pgc = entities.Proc_Apparel_UpdateEditJobBoDetQty(EYitem.buy_ord_ship, objDjoEntry.Job_Ord_No, EYitem.ITEMID, EYitem.colorid, EYitem.sizeid, EYitem.quantity);
                            entities.SaveChanges();
                        }

                    }

                    //Delete the Tables




                    var Det1 = entities.Job_Ord_Sum.Where(v => v.JobOrdNo == objDjoEntry.Job_Ord_No);
                    foreach (var v in Det1)
                    {
                        entities.Job_Ord_Sum.Remove(v);
                    }

                    entities.SaveChanges();

                    var Det2 = entities.Job_Ord_Color.Where(v1 => v1.Job_Ord_No == objDjoEntry.Job_Ord_No);
                    foreach (var v1 in Det2)
                    {
                        entities.Job_Ord_Color.Remove(v1);
                    }
                    entities.SaveChanges();
                    var Det3 = entities.Job_Ord_Det.Where(v2 => v2.Job_Ord_No == objDjoEntry.Job_Ord_No);
                    foreach (var v2 in Det3)
                    {
                        entities.Job_Ord_Det.Remove(v2);
                    }

                    entities.SaveChanges();


                    var CmDet1 = entities.Program_Summary.Where(w => w.Order_No == objDjoEntry.Job_Ord_No);
                    foreach (var C1 in CmDet1)
                    {
                        entities.Program_Summary.Remove(C1);

                    }
                    entities.SaveChanges();


                    //Delete JobBom Table
                    var dy = entities.Job_Ord_BOMMas.Where(c => c.Job_Ord_No == objDjoEntry.Job_Ord_No);

                    foreach (var dbSet in dy)
                    {
                        JBomId = dbSet.Job_Ord_BOMid;

                        var Det = entities.Job_Ord_BomDet.Where(u => u.Job_Ord_BOMid == JBomId);

                        foreach (var u in Det)
                        {

                            entities.Job_Ord_BomDet.Remove(u);

                        }
                        entities.Job_Ord_BOMMas.Remove(dbSet);
                    }


                    var CmDet2 = entities.Job_Ord_Mas.Where(w => w.Job_Ord_No == objDjoEntry.Job_Ord_No);
                    foreach (var C2 in CmDet2)
                    {
                        entities.Job_Ord_Mas.Remove(C2);

                    }


                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
