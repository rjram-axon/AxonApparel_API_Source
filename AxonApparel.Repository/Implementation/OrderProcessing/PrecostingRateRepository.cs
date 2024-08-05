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
    public class PrecostingRateRepository : IPrecostingRateRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsAddDetails(int Id)
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
                                                               Consumption = a.Consumption,
                                                               Rate=0
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsEditDetails(int Id)
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
                                                               Consumption = a.Consumption,
                                                               Rate=a.Rate
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricAddDetails(int Id)
        {
            IQueryable<Domain.PrecostingFabric_det> query = (from a in entities.Proc_Apparel_GetPrecostFabricEditload(Id)
                                                             select new Domain.PrecostingFabric_det
                                                             {
                                                                 PrecostFabricmasid = a.PrecostFabricmasid,
                                                                 GItemid = a.GItemid,
                                                                 GItem = a.GItem,
                                                                 Componentid = a.componentid,
                                                                 Component = a.component,
                                                                 Fabricid = a.Fabricid,
                                                                 Fabric = a.Fabric,
                                                                 Greycolorid = a.Greycolorid,
                                                                 Greycolor = a.Greycolor,
                                                                 Finishcolorid = a.Finishcolorid,
                                                                 Finishcolor = a.Finishcolor,
                                                                 Printcolorid = a.Printcolorid,
                                                                 Printcolor = a.Printcolor,
                                                                 GSM = a.GSM,
                                                                 Grammage=0
                                                             }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingFabric_det> GetPrecostrateFabricEditDetails(int Id)
        {
            IQueryable<Domain.PrecostingFabric_det> query = (from a in entities.Proc_Apparel_GetPrecostFabricEditload(Id)
                                                             select new Domain.PrecostingFabric_det
                                                             {
                                                                 PrecostFabricmasid = a.PrecostFabricmasid,
                                                                 GItemid = a.GItemid,
                                                                 GItem = a.GItem,
                                                                 Componentid = a.componentid,
                                                                 Component = a.component,
                                                                 Fabricid = a.Fabricid,
                                                                 Fabric = a.Fabric,
                                                                 Greycolorid = a.Greycolorid,
                                                                 Greycolor = a.Greycolor,
                                                                 Finishcolorid = a.Finishcolorid,
                                                                 Finishcolor = a.Finishcolor,
                                                                 Printcolorid = a.Printcolorid,
                                                                 Printcolor = a.Printcolor,
                                                                 GSM = a.GSM,
                                                                 Grammage = a.Grammage
                                                             }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentAddDetails(int Id)
        {
            IQueryable<Domain.PreCostingEmbellishment_Det> query = (from a in entities.Proc_Apparel_GetPrecostEmbellishmentEditload(Id)
                                                                    select new Domain.PreCostingEmbellishment_Det
                                                                    {
                                                                        PrecostEmbellishmentmasid = a.PrecostEmbellishmentmasid,
                                                                        Processid = a.ProcessId,
                                                                        Process = a.Process,
                                                                        GItemid = a.GItemid,
                                                                        GItem = a.GItem,
                                                                        Rate=0
                                                                    }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentEditDetails(int Id)
        {
            IQueryable<Domain.PreCostingEmbellishment_Det> query = (from a in entities.Proc_Apparel_GetPrecostEmbellishmentEditload(Id)
                                                                    select new Domain.PreCostingEmbellishment_Det
                                                                    {
                                                                        PrecostEmbellishmentmasid = a.PrecostEmbellishmentmasid,
                                                                        Processid = a.ProcessId,
                                                                        Process = a.Process,
                                                                        GItemid = a.GItemid,
                                                                        GItem = a.GItem,
                                                                        Rate = a.Rate
                                                                    }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessAddDetails(int Id)
        {
           
                IQueryable<Domain.PrecostFabDept_Process> query = (from a in entities.Proc_Apparel_GetPrecostingEditProcessLoad(Id)
                                                                   select new Domain.PrecostFabDept_Process
                                                                   {
                                                                       PreCostFabDeptProcmasid = a.PreCostFabDeptProcmasid,
                                                                       PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                                       Fabricid = a.Fabricid,
                                                                       Processid = a.Processid,
                                                                       Process = a.Process,
                                                                       LossPercentage = a.LossPercentage,
                                                                       Rate = 0,
                                                                       Fabric = a.Fabric,
                                                                       FabricColor = a.FabricColor
                                                                   }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessEditDetails(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Process> query = (from a in entities.Proc_Apparel_GetPrecostingEditProcessLoad(Id)
                                                               select new Domain.PrecostFabDept_Process
                                                               {
                                                                   PreCostFabDeptProcmasid = a.PreCostFabDeptProcmasid,
                                                                   PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                                   Fabricid = a.Fabricid,
                                                                   Processid = a.Processid,
                                                                   Process = a.Process,
                                                                   LossPercentage = a.LossPercentage,
                                                                   Rate = a.Rate,
                                                                   Fabric=a.Fabric,
                                                                   FabricColor=a.FabricColor
                                                               }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnAddDetails(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingEditFabricyarnLoad(Id)
                                                           select new Domain.PrecostFabDept_Fab
                                                           {
                                                               PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                               Fabricid = a.Fabricid,
                                                               Fabric = a.Fabric,
                                                               FabricColorid = a.FabricColorid,
                                                               FabricColor = a.FabricColor,
                                                               Type = a.Type,
                                                               PreCostFabDeptYarnmasid = a.PreCostFabDeptYarnmasid,
                                                               Rate=0,
                                                               Sizeid=a.Sizeid,
                                                               Size=a.Size
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnEditDetails(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingEditFabricyarnLoad(Id)
                                                           select new Domain.PrecostFabDept_Fab
                                                           {
                                                               PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                               Fabricid = a.Fabricid,
                                                               Fabric = a.Fabric,
                                                               FabricColorid = a.FabricColorid,
                                                               FabricColor = a.FabricColor,
                                                               Type = a.Type,
                                                               PreCostFabDeptYarnmasid = a.PreCostFabDeptYarnmasid,
                                                               Rate = a.Rate,
                                                               Sizeid = a.Sizeid,
                                                               Size = a.Size
                                                           }).AsQueryable();

            return query;
        }
        public bool UpdateDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet)
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
                            App.RateEntrydate = PrecostmasEntry.RateEntrydate;
                        }
                        entities.SaveChanges();

                        foreach (var trims in trimsDet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Rate = trims.Rate;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var fab in fabDet)
                        {
                            var fabric = entities.PreCostingFabric_Det.Where(c => c.PrecostFabricmasid == fab.PrecostFabricmasid).FirstOrDefault();
                            if (fabric != null)
                            {
                                fabric.Grammage = fab.Grammage;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var emb in embDet)
                        {
                            var emblish = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == emb.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (emblish != null)
                            {
                                emblish.Rate = emb.Rate;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var prefab in precostfabric)
                        {
                            var prefabric = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == prefab.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (prefabric != null)
                            {
                                prefabric.Rate = prefab.Rate;

                            }

                        }
                        entities.SaveChanges();
                        foreach (var yarn in Yarndet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Rate = yarn.Rate;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var proc in ProcessDet)
                        {
                            var processlist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == proc.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (processlist != null)
                            {
                                processlist.Rate = proc.Rate;

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

        public bool DeleteDetData(PreCostingFabTrim_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingFabric_Det> fabDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet)
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
                            App.RateEntrydate = null;
                        }
                        entities.SaveChanges();

                        foreach (var trims in trimsDet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Rate = 0;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var fab in fabDet)
                        {
                            var fabric = entities.PreCostingFabric_Det.Where(c => c.PrecostFabricmasid == fab.PrecostFabricmasid).FirstOrDefault();
                            if (fabric != null)
                            {
                                fabric.Grammage = 0;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var emb in embDet)
                        {
                            var emblish = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == emb.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (emblish != null)
                            {
                                emblish.Rate = 0;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var prefab in precostfabric)
                        {
                            var prefabric = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == prefab.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (prefabric != null)
                            {
                                prefabric.Rate = 0;

                            }

                        }
                        entities.SaveChanges();
                        foreach (var yarn in Yarndet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Rate = 0;

                            }

                        }
                        entities.SaveChanges();

                        foreach (var proc in ProcessDet)
                        {
                            var processlist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == proc.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (processlist != null)
                            {
                                processlist.Rate = 0;

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
