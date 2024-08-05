using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BomRepository : IBomRepository
    {

        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.Bom> GetItemList()
        {
            IQueryable<Bom> query = (from cd in entities.Proc_Apparel_GetBomDet()
                                     select new Bom
                                     {

                                         Buyordmasid = cd.Buy_Ord_BOMid,
                                         Colorid = cd.colorid,
                                         Conv_Mode = cd.Conv_Mode,
                                         color = cd.ColorName,
                                         CSP = cd.CSP,
                                         ItemClosure = cd.ItemClose,
                                         Itemid = cd.itemid,
                                         item = cd.item,
                                         Sizeid = cd.sizeid,
                                         Pur_UOMid = (int)cd.Pur_UOMid,
                                         pgmqty = (int)cd.Prg_Qty,
                                         puruom = cd.puruom,
                                         recvdqty = (decimal)cd.Received_Qty,
                                         PurFor_Job = cd.PurForJob,
                                         head_office = (int)(cd.Head_Office == null ? 0 : cd.Head_Office),// (int)cd.Head_Office,
                                         Itemgroupid = cd.Id,
                                         BOM_qty = (decimal)cd.Bom_qty,
                                         Category1 = cd.Category1,
                                         Category2 = cd.Category2

                                     })
                                                     .ToList()
                                                     .AsQueryable();
            return query;
        }

        public IQueryable<Bom> Getitemgrouplist()
        {

            IQueryable<Bom> query = (from cd in entities.Proc_Apparel_GetItemList()
                                     select new Bom
                                     {
                                         Itemgroupid = cd.Id,
                                         Itemgroup = cd.ItemGroup


                                     })
                                                     .ToList()
                                                     .AsQueryable();
            return query;
        }







        public IList<Bom> GetDetList(string orderno, int styleid, string OType, string IGId)
        {

            string BMId = "";
            if (IGId != "")
            {
                BMId = IGId;
            }
            else
            {
                BMId = "";
            }


            var query = (from Ec in entities.Proc_Apparel_GetListbom(orderno, styleid, OType, string.IsNullOrEmpty(BMId) ? "" : BMId)
                         select new Bom
                         {
                             Itemgroupid = Ec.Id,
                             Itemgroup = Ec.ItemGroup,
                             Itemid = Ec.itemid,
                             item = Ec.item,
                             color = (Ec.ColorName == null ? "" : Ec.ColorName),
                             Colorid = (int)(Ec.colorid == null ? 0 : Ec.colorid),
                             pgmqty = (decimal)Ec.Prg_Qty,
                             AllowVal = Ec.Allow_Value > 0 ? (decimal)(Ec.Prg_Qty + Ec.Allow_Value) : (decimal)(((decimal)(Convert.ToDecimal(Ec.Percentage) * Ec.Prg_Qty) / 100) + Ec.Prg_Qty),
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
                             ToUomid = (int)(Ec.Touomid == null ? 0 : Ec.Touomid),
                             Sizeid = (int)(Ec.sizeid == null ? 0 : Ec.sizeid),
                             Baseunit = (int)Ec.Bas_Unit,
                             action = "",
                             JobBomQty = (decimal)Ec.Bom_qty,

                         })
                //.ToList();
                         .AsQueryable();

            return query.ToList();


        }


        public bool UpdateData(IList<Buy_Ord_BOMDet> objAd, int StyRowId, string OType)
        {


            string OrdNo = "";
            string JobNo = "";
            int StyId = 0;
            int BomMasId = 0;
            int FColorId = 0;
            int Unitid = 0;
            int Colorid = 0;
            int Sizeid = 0;
            int Itemid = 0;
            int Uomid = 0;
            decimal FPurQty = 0;
            decimal TIn = 0;
            decimal TOut = 0;
            int ComId = 0;
            bool reserved = false;
            string DateTime = "";
            int CompId = 0;
            int CompUnitId = 0;
            string OrdType = "";
            ////////////////////////////////Update Bom Table
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (OType == "B" || OType=="S")
                    {

                        var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyRowId).FirstOrDefault();
                        if (OQuery != null)
                        {
                            OrdNo = OQuery.order_no;
                            StyId = OQuery.Styleid;

                        }
                        entities.SaveChanges();

                        var dy = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == OrdNo && c.Styleid == StyId);

                        foreach (var dbSet in dy)
                        {
                            var bom = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == dbSet.Buy_Ord_BOMid).ToList();

                            //BomMasId = dbSet.Buy_Ord_BOMid;
                            //foreach (var item in objAd)
                            //{
                            //    var PgBomDet = entities.Proc_Apparel_UpdateBomDetTable(BomMasId, item.Buy_Ord_BOMDetid, item.UOMid, item.BOM_qty, item.ToPurUOM, item.Conv_Mode, item.CSP, item.ItemClosure, item.PurForJob);
                            //    entities.SaveChanges();
                            //}
                            if (bom != null)
                            {
                                foreach (var itm in objAd)
                                {

                                    foreach (var det in bom)
                                    {
                                        if (det.Buy_Ord_BOMid == itm.Buy_Ord_BOMid && det.Buy_Ord_BOMDetid == itm.Buy_Ord_BOMDetid )
                                            //&& det.BOM_qty != itm.BOM_qty)
                                        {
                                            det.Pur_UOMid = itm.Pur_UOMid;
                                            det.BOM_qty = itm.BOM_qty;
                                            det.ToPurUOM = itm.ToPurUOM;
                                            det.Conv_Mode = itm.Conv_Mode;
                                            det.CSP = itm.CSP;
                                            det.ItemClosure = itm.ItemClosure;
                                            det.PurForJob = itm.PurForJob;
                                            //det.UOMid = itm.UOMid;

                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                            
                        }

                        //if (dy != null)
                        //{
                        //    var bom = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == dy.Buy_Ord_BOMid).ToList();
                        //    if (bom != null)
                        //    {
                        //        foreach (var itm in objAd)
                        //        {

                        //            foreach (var det in bom)
                        //            {
                        //                if (det.Buy_Ord_BOMid == itm.Buy_Ord_BOMid && det.Buy_Ord_BOMDetid == itm.Buy_Ord_BOMDetid && det.BOM_qty!=itm.BOM_qty)
                        //                {
                        //                    det.Pur_UOMid = itm.UOMid;
                        //                    det.BOM_qty = itm.BOM_qty;
                        //                    det.ToPurUOM = itm.ToPurUOM;
                        //                    det.Conv_Mode = itm.Conv_Mode;
                        //                    det.CSP = itm.CSP;
                        //                    det.ItemClosure = itm.ItemClosure;
                        //                    det.PurForJob = itm.PurForJob;
                        //                    det.UOMid = itm.UOMid;

                        //                }
                        //                entities.SaveChanges();
                        //            }
                        //        }
                        //    }
                        //}
                        //BudgetUpd
                        var Cost = entities.Cost_Defn_Mas.Where(c => c.Order_No == OrdNo && c.styleid == StyId).FirstOrDefault(); 

                        if (Cost != null)
                        {
                            var bom = entities.Cost_Defn_BOM.Where(c => c.Cost_Defn_id == Cost.Cost_Defn_id && c.Processid==null).ToList();
                            if (bom != null)
                            {
                                foreach (var mas in objAd)
                                {
                                   
                                    foreach (var det in bom)
                                    {
                                        if (det.Itemid == mas.Itemid && det.Sizeid == mas.Sizeid && det.Colorid == mas.Colorid)
                                        {
                                            det.Quantity = mas.BOM_qty;
                                            
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                    }
                    else
                    {

                        var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyRowId).FirstOrDefault();
                        if (OQuery != null)
                        {
                            OrdNo = OQuery.order_no;
                            StyId = OQuery.Styleid;
                            JobNo = OQuery.WORKORDER;
                            CompUnitId = (int)OQuery.Company_Unitid;

                        }
                        entities.SaveChanges();

                        var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                        if (OQuery1 != null)
                        {
                            CompId = (int)OQuery1.CompanyId;
                            OrdType = OQuery1.OrdType;
                        }
                        entities.SaveChanges();

                        var dy = entities.Sample_Ord_PlanMas.Where(c => c.Order_No == OrdNo && c.Sample_Job_No == JobNo);

                        foreach (var dbSet in dy)
                        {
                            BomMasId = dbSet.SPlanId;
                            ComId = (int)dbSet.Companyid;

                            var FbbomDet = entities.Sample_Ord_PlanDet.Where(u => u.SPlanid == BomMasId);
                            //Delete the SAmplplanorddet table 
                            foreach (var Bom in FbbomDet)
                            {
                                entities.Sample_Ord_PlanDet.Remove(Bom);
                            }
                            entities.SaveChanges();

                            foreach (var BomDet in objAd)
                            {
                                int Pgc = entities.Proc_UpdateSampleEditBOMUpdateInsPlan(BomMasId, BomDet.Itemid, BomDet.Colorid, BomDet.Sizeid, BomDet.UOMid, BomDet.BOM_qty, BomDet.Pur_UOMid, BomDet.ToPurUOM, JobNo, CompId, CompUnitId, BomDet.Conv_Mode, "N", "N", TIn, TOut, OrdType);
                                entities.SaveChanges();
                            }
                        }



                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bom-UpdateData");
                }

            }
            return reserved;
        }


        public IQueryable<Bom> GetUCList(int uomid)
        {
            IQueryable<Bom> query = (from cd in entities.Proc_Apparel_GetUMListConv()
                                     select new Bom
                                     {
                                         FromUomid = cd.FromUomId,
                                         ToUomid = cd.ToUomId,
                                         ToUom = cd.ToUom,
                                         FromUom = cd.FromUom,
                                         Conversion = cd.Conversion,
                                         Mode = cd.ConvMode,
                                         //Buyordmasdetid=14


                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Bom> GetUomList(string baseunit)
        {
            IQueryable<Bom> query = (from cd in entities.Proc_Apparel_GetBomloaduom(baseunit)
                                     select new Bom
                                     {
                                         Uomid = cd.uomid,
                                         uom = cd.uom,
                                         Baseunit = cd.basunit


                                     }).AsQueryable();
            return query;
        }
    }
}
