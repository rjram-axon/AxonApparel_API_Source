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
    public class PrecostingRepository : IPrecostingRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<Domain.PrecostingFabTrim_mas> GetPrecostingDetails(int Id)
        {
            IQueryable<Domain.PrecostingFabTrim_mas> query = (from a in entities.Proc_Apparel_GetPrecostingMasEntryLoad(Id)
                                                              select new Domain.PrecostingFabTrim_mas
                                                      {
                                                         PrecostFabTrimmasid =a.PrecostFabTrimmasid,
                                                         Buyerid =a.BuyerId,
                                                         Buyer =a.buyer,
                                                         Styleid =a.Styleid,
                                                         Style =a.Style,
                                                         Stylerowid =a.StyleRowid,
                                                         Entrydate = (DateTime)a.Entrydate,
                                                         Orderdate = (DateTime)a.Order_date,
                                                         Bmasid =a.Buy_Ord_MasId,
                                                         Orderno =a.order_no,
                                                         RefNo =a.Ref_no,
                                                         Quantity =(int)a.Quantity,
                                                         PreCostFabDeptmasid=a.PreCostFabDeptmasid,
                                                         ConsumptionEntrydate = (DateTime)a.ConsumptionEntrydate,
                                                         RateEntrydate = (DateTime)a.RateEntrydate
                                                      }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingTrim_det> GetPrecostTrimsEditDetails(int Id)
        {
            IQueryable<Domain.PrecostingTrim_det> query = (from a in entities.Proc_Apparel_GetPrecostTrimsEditload(Id)
                                                           select new Domain.PrecostingTrim_det
                                                              {
                                                                 PrecostTrimmasid =a.PrecostTrimmasid,                                                            
                                                                 Itemid =a.ItemId,
                                                                 Item =a.Item,
                                                                 Colorid =a.Colorid,
                                                                 Color =a.Color,
                                                                 Sizeid =a.Sizeid,
                                                                 Size =a.Size,
                                                                 UOMid =a.UOMid,
                                                                 UOM =a.UOM,
                                                                 GItemid =a.GItemid,
                                                                 GItem =a.GItem,
                                                                 Consumption = a.Consumption
                                                              }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingTrim_det> GetPrecostTrimsAddDetails(int Id)
        {
            IQueryable<Domain.PrecostingTrim_det> query = (from a in entities.Proc_Apparel_GetPrecostTrimsEditload(Id)
                                                           select new Domain.PrecostingTrim_det
                                                           {
                                                               PrecostTrimmasid = a.PrecostTrimmasid,
                                                               Itemid = a.ItemId,
                                                               Item = a.Item,
                                                               Colorid = a.Colorid,
                                                               Color = a.Color,
                                                               Sizeid = a.Sizeid,
                                                               Size = a.Size,
                                                               UOMid = a.UOMid,
                                                               UOM = a.UOM,
                                                               GItemid = a.GItemid,
                                                               GItem = a.GItem,
                                                               Consumption= 0
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingFabric_det> GetPrecostfabricEditDetails(int Id)
        {
            IQueryable<Domain.PrecostingFabric_det> query = (from a in entities.Proc_Apparel_GetPrecostFabricEditload(Id)
                                                             select new Domain.PrecostingFabric_det
                                                           {
                                                                PrecostFabricmasid =a.PrecostFabricmasid,
                                                                GItemid =a.GItemid,
                                                                GItem =a.GItem,
                                                                Componentid =a.componentid,
                                                                Component =a.component,
                                                                Fabricid =a.Fabricid,
                                                                Fabric =a.Fabric,
                                                                Greycolorid =a.Greycolorid,
                                                                Greycolor =a.Greycolor,
                                                                Finishcolorid =a.Finishcolorid,
                                                                Finishcolor =a.Finishcolor,
                                                                Printcolorid =a.Printcolorid,
                                                                Printcolor =a.Printcolor,
                                                                GSM =a.GSM
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostEmblishmentEditDetails(int Id)
        {
            IQueryable<Domain.PreCostingEmbellishment_Det> query = (from a in entities.Proc_Apparel_GetPrecostEmbellishmentEditload(Id)
                                                                    select new Domain.PreCostingEmbellishment_Det
                                                             {
                                                                   PrecostEmbellishmentmasid =a.PrecostEmbellishmentmasid,                                                                  
                                                                   Processid =a.ProcessId,
                                                                   Process =a.Process,
                                                                   GItemid =a.GItemid,
                                                                   GItem =a.GItem
                                                             }).AsQueryable();

            return query;
        }

        public bool AddDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsdet, List<PreCostingFabric_Det> Fabdet, List<PreCostingEmbellishment_Det> Embellishmentdet)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PrecostFabTrimmasid == 0)
                    {

                        entities.PreCostingFabTrim_mas.Add(PrecostmasEntry);
                        entities.SaveChanges();
                        PrecostMasid = PrecostmasEntry.PrecostFabTrimmasid;
                        foreach (var trims in trimsdet)
                        {
                            trims.PrecostFabTrimmasid = PrecostMasid;
                            entities.PreCostingTrim_Det.Add(trims);
                            
                        }
                        entities.SaveChanges();
                        foreach (var fablist in Fabdet)
                        {
                            fablist.PrecostFabTrimmasid = PrecostMasid;
                            entities.PreCostingFabric_Det.Add(fablist);
                           
                        }
                        entities.SaveChanges();
                        foreach (var emblist in Embellishmentdet)
                        {
                            emblist.PrecostFabTrimmasid = PrecostMasid;
                            entities.PreCostingEmbellishment_Det.Add(emblist);
                            
                        }
                        entities.SaveChanges();
                    }
                   


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

        public bool UpdateDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsdet, List<PreCostingFabric_Det> Fabdet, List<PreCostingEmbellishment_Det> Embellishmentdet)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PrecostFabTrimmasid != 0)
                    {
                        var App = entities.PreCostingFabTrim_mas.Where(c => c.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.Entrydate = PrecostmasEntry.Entrydate;
                        }
                        entities.SaveChanges();
                        PrecostMasid = PrecostmasEntry.PrecostFabTrimmasid;
                        //List<PreCostingTrim_Det> trimtot= new List<PreCostingTrim_Det>
                       List<PreCostingTrim_Det> trimtot = entities.PreCostingTrim_Det.Where(c => c.PrecostFabTrimmasid == PrecostMasid).ToList();
                       trimtot.Where(a => !trimsdet.Any(b => a.PrecostTrimmasid == b.PrecostTrimmasid ));
                       // var diff = trimtot.Where(b => trimsdet.Any(a => a.PrecostTrimmasid != b.PrecostTrimmasid));

                       foreach (var delete in trimtot)
                       {
                           if (delete != null)
                           {


                           }

                       }

                        foreach (var trims in trimsdet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Itemid = trims.Itemid;
                                trim.GItemid = trims.GItemid;
                                trim.Colorid = trims.Colorid;
                                trim.Sizeid = trims.Sizeid;
                                trim.UOMid = trims.UOMid;
                            }
                            else if (trims.PrecostTrimmasid == 0)
                            {
                                trims.PrecostFabTrimmasid = PrecostMasid;
                                entities.PreCostingTrim_Det.Add(trims);
                            
                            }
                           
                        }
                        entities.SaveChanges();                   
                        foreach (var fabs in Fabdet)
                        {
                            var fabric = entities.PreCostingFabric_Det.Where(c => c.PrecostFabricmasid == fabs.PrecostFabricmasid).FirstOrDefault();
                            if (fabric != null)
                            {
                                fabric.GItemid = fabs.GItemid;
                                fabric.Componentid = fabs.Componentid;
                                fabric.Fabricid = fabs.Fabricid;
                                fabric.Greycolorid = fabs.Greycolorid;
                                fabric.Finishcolorid = fabs.Finishcolorid;
                                fabric.Printcolorid = fabs.Printcolorid;
                                fabric.GSM = fabs.GSM;
                            }
                            else if (fabs.PrecostFabricmasid == 0)
                            {
                                fabs.PrecostFabTrimmasid = PrecostMasid;
                                entities.PreCostingFabric_Det.Add(fabs);

                            }
                           
                        }
                        entities.SaveChanges();

                        foreach (var Emblish in Embellishmentdet)
                        {
                            var Embl = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == Emblish.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (Embl != null)
                            {
                                Embl.GItemid = Emblish.GItemid;
                                Embl.Processid = Emblish.Processid;                               
                            }
                            else if (Emblish.PrecostEmbellishmentmasid == 0)
                            {
                                Emblish.PrecostFabTrimmasid = PrecostMasid;
                                entities.PreCostingEmbellishment_Det.Add(Emblish);

                            }

                        }
                        entities.SaveChanges();
                    }
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

        public bool DeleteDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsdet, List<PreCostingFabric_Det> Fabdet, List<PreCostingEmbellishment_Det> Embellishmentdet)
        {
          
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var CDet = entities.PreCostingEmbellishment_Det.Where(u => u.PrecostFabTrimmasid ==PrecostmasEntry.PrecostFabTrimmasid);

                    foreach (var v in CDet)
                    {
                        entities.PreCostingEmbellishment_Det.Remove(v);
                    }
                    entities.SaveChanges();

                    var FDet = entities.PreCostingFabric_Det.Where(u => u.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid);

                    foreach (var f in FDet)
                    {
                        entities.PreCostingFabric_Det.Remove(f);
                    }
                    entities.SaveChanges();

                    var TDet = entities.PreCostingTrim_Det.Where(u => u.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid);

                    foreach (var t in TDet)
                    {
                        entities.PreCostingTrim_Det.Remove(t);
                    }
                    entities.SaveChanges();

                    var MDet = entities.PreCostingFabTrim_mas.Where(u => u.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid);

                    foreach (var m in MDet)
                    {
                        entities.PreCostingFabTrim_mas.Remove(m);
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

        public bool AddTrimsDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsdet)
        {
           // int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PrecostFabTrimmasid > 0)
                    {
                        var App = entities.PreCostingFabTrim_mas.Where(c => c.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.ConsumptionEntrydate = PrecostmasEntry.ConsumptionEntrydate;
                        }
                        entities.SaveChanges();

                        foreach (var trims in trimsdet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Consumption = trims.Consumption;
                             
                            }           

                        }
                        entities.SaveChanges();
                    }



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

        public bool DeleteTrimsDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsdet)
        {
            // int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PrecostFabTrimmasid > 0)
                    {
                        var App = entities.PreCostingFabTrim_mas.Where(c => c.PrecostFabTrimmasid == PrecostmasEntry.PrecostFabTrimmasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.ConsumptionEntrydate = null;
                        }
                        entities.SaveChanges();

                        foreach (var trims in trimsdet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Consumption = 0;

                            }

                        }
                        entities.SaveChanges();
                    }



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
