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
    public class PrecostingTargetRepository : IPrecostingTargetRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<Precosting_Target_mas> GetPrecostTargetDetails(int? Targetmasid)
        {
            return entities.Precosting_Target_mas.OrderBy(c => c.Targetmasid == Targetmasid);
        }
        public IQueryable<Domain.Precosting_Target_mas> GetPrecostTargetListDetails(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string TargetNo)
        {
            IQueryable<Domain.Precosting_Target_mas> query = (from a in entities.Proc_Apparel_GetTargetMainDetails(CmpId, Order_No, Ref_No, BuyId, frmDate, ToDate, TargetNo)
                                                              select new Domain.Precosting_Target_mas
                                                           {
                                                               Targetmasid = a.Targetmasid,
                                                               TargetNo = a.TargetNo,
                                                               EntryDate = (DateTime)a.EntryDate,
                                                               BMasid=a.BMasid
                                                             
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsAddDetails(string Id)
        {
            IQueryable<Domain.PrecostingTrim_det> query = (from a in entities.Proc_Apparel_GetPrecostTrimsTargetEditload(Id)
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
                                                               Rate = a.Rate,
                                                               Target=a.Rate,
                                                               Approved=a.Approved
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostingTrim_det> GetPrecostrateTrimsEditDetails(string Id)
        {
            IQueryable<Domain.PrecostingTrim_det> query = (from a in entities.Proc_Apparel_GetPrecostTrimsTargetEditload(Id)
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
                                                               Rate = a.Rate,
                                                               Target=a.Target,
                                                               Approved = a.Approved
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
                                                                 Grammage = 0
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
        public IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentAddDetails(string Id)
        {
            IQueryable<Domain.PreCostingEmbellishment_Det> query = (from a in entities.Proc_Apparel_GetPrecostEmbellishmentTargetEditload(Id)
                                                                    select new Domain.PreCostingEmbellishment_Det
                                                                    {
                                                                        PrecostEmbellishmentmasid = a.PrecostEmbellishmentmasid,
                                                                        Processid = a.ProcessId,
                                                                        Process = a.Process,
                                                                        GItemid = a.GItemid,
                                                                        GItem = a.GItem,
                                                                        Rate = a.Rate,
                                                                        Target = a.Rate,
                                                                        Approved = a.Approved
                                                                    }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PreCostingEmbellishment_Det> GetPrecostrateEmblishmentEditDetails(string Id)
        {
            IQueryable<Domain.PreCostingEmbellishment_Det> query = (from a in entities.Proc_Apparel_GetPrecostEmbellishmentTargetEditload(Id)
                                                                    select new Domain.PreCostingEmbellishment_Det
                                                                    {
                                                                        PrecostEmbellishmentmasid = a.PrecostEmbellishmentmasid,
                                                                        Processid = a.ProcessId,
                                                                        Process = a.Process,
                                                                        GItemid = a.GItemid,
                                                                        GItem = a.GItem,
                                                                        Rate = a.Rate,
                                                                        Target = a.Target,
                                                                        Approved = a.Approved
                                                                    }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessAddDetails(string Id)
        {

            IQueryable<Domain.PrecostFabDept_Process> query = (from a in entities.Proc_Apparel_GetPrecostingTargetEditProcessLoad(Id)
                                                               select new Domain.PrecostFabDept_Process
                                                               {
                                                                   PreCostFabDeptProcmasid = a.PreCostFabDeptProcmasid,
                                                                   PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                                   Fabricid = a.Fabricid,
                                                                   Processid = a.Processid,
                                                                   Process = a.Process,
                                                                   LossPercentage = a.LossPercentage,
                                                                   Rate = a.Rate,
                                                                   Fabric = a.Fabric,
                                                                   FabricColor = a.FabricColor,
                                                                   Target = a.Rate,
                                                                   Approved = a.Approved
                                                               }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Process> GetPrecostrateprocessEditDetails(string Id)
        {
            IQueryable<Domain.PrecostFabDept_Process> query = (from a in entities.Proc_Apparel_GetPrecostingTargetEditProcessLoad(Id)
                                                               select new Domain.PrecostFabDept_Process
                                                               {
                                                                   PreCostFabDeptProcmasid = a.PreCostFabDeptProcmasid,
                                                                   PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                                   Fabricid = a.Fabricid,
                                                                   Processid = a.Processid,
                                                                   Process = a.Process,
                                                                   LossPercentage = a.LossPercentage,
                                                                   Rate = a.Rate,
                                                                   Fabric = a.Fabric,
                                                                   FabricColor = a.FabricColor,
                                                                   Target = a.Target,
                                                                   Approved = a.Approved
                                                               }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnAddDetails(string Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingTargetEditFabricyarnLoad(Id)
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
                                                               Size = a.Size,
                                                               Target=a.Rate,
                                                               Approved = a.Approved
                                                           }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostrateFabricYarnEditDetails(string Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingTargetEditFabricyarnLoad(Id)
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
                                                               Size = a.Size,
                                                               Target = a.Target,
                                                               Approved = a.Approved
                                                           }).AsQueryable();

            return query;
        }
        public bool UpdateDetData(Precosting_Target_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet)
        {
            // int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.Targetmasid == 0)
                    {
                        entities.Precosting_Target_mas.Add(PrecostmasEntry);
                        entities.SaveChanges();

                        foreach (var trims in trimsDet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Target = trims.Target;
                                trim.Approved = trims.Approved;
                            }

                        }
                        entities.SaveChanges();



                        foreach (var emb in embDet)
                        {
                            var emblish = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == emb.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (emblish != null)
                            {
                                emblish.Target = emb.Target;
                                emblish.Approved = emb.Approved;
                            }

                        }
                        entities.SaveChanges();

                        foreach (var prefab in precostfabric)
                        {
                            var prefabric = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == prefab.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (prefabric != null)
                            {
                                prefabric.Target = prefab.Target;
                                prefabric.Approved = prefab.Approved;
                            }

                        }
                        entities.SaveChanges();
                        foreach (var yarn in Yarndet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Target = yarn.Target;
                                yarnlist.Approved = yarn.Approved;
                            }

                        }
                        entities.SaveChanges();

                        foreach (var proc in ProcessDet)
                        {
                            var processlist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == proc.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (processlist != null)
                            {
                                processlist.LossPercentage = proc.LossPercentage;
                                processlist.Target = proc.Target;
                                processlist.Approved = proc.Approved;
                            }

                        }
                        entities.SaveChanges();
                    }

                    if (PrecostmasEntry.Targetmasid > 0)
                    {
                        var App = entities.Precosting_Target_mas.Where(c => c.Targetmasid == PrecostmasEntry.Targetmasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.EntryDate = PrecostmasEntry.EntryDate;
                        }
                        entities.SaveChanges();

                        foreach (var trims in trimsDet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Target = trims.Target;
                                trim.Approved = trims.Approved;
                            }

                        }
                        entities.SaveChanges();

                        

                        foreach (var emb in embDet)
                        {
                            var emblish = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == emb.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (emblish != null)
                            {
                                emblish.Target = emb.Target;
                                emblish.Approved = emb.Approved;
                            }

                        }
                        entities.SaveChanges();

                        foreach (var prefab in precostfabric)
                        {
                            var prefabric = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == prefab.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (prefabric != null)
                            {
                                prefabric.Target = prefab.Target;
                                prefabric.Approved = prefab.Approved;
                            }

                        }
                        entities.SaveChanges();
                        foreach (var yarn in Yarndet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Target = yarn.Target;
                                yarnlist.Approved = yarn.Approved;
                            }

                        }
                        entities.SaveChanges();

                        foreach (var proc in ProcessDet)
                        {
                            var processlist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == proc.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (processlist != null)
                            {
                                processlist.LossPercentage = proc.LossPercentage;
                                processlist.Target = proc.Target;
                                processlist.Approved = proc.Approved;
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


        public bool DeleteDetData(Precosting_Target_mas PrecostmasEntry, List<PreCostingTrim_Det> trimsDet, List<PreCostingEmbellishment_Det> embDet, List<PrecostFabDept_Fab> precostfabric, List<PrecostFabDept_Yarn> Yarndet, List<PrecostFabDept_Process> ProcessDet)
        {
            // int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (PrecostmasEntry.Targetmasid > 0)
                    {
                        

                        var CDet = entities.Precosting_Target_mas.Where(u => u.Targetmasid == PrecostmasEntry.Targetmasid);

                        foreach (var v in CDet)
                        {
                            entities.Precosting_Target_mas.Remove(v);
                        }
                        entities.SaveChanges();


                        foreach (var trims in trimsDet)
                        {
                            var trim = entities.PreCostingTrim_Det.Where(c => c.PrecostTrimmasid == trims.PrecostTrimmasid).FirstOrDefault();
                            if (trim != null)
                            {
                                trim.Target = 0;
                                trim.Approved = "N";
                            }

                        }
                        entities.SaveChanges();



                        foreach (var emb in embDet)
                        {
                            var emblish = entities.PreCostingEmbellishment_Det.Where(c => c.PrecostEmbellishmentmasid == emb.PrecostEmbellishmentmasid).FirstOrDefault();
                            if (emblish != null)
                            {
                                emblish.Target = 0;
                                emblish.Approved = "N";
                            }

                        }
                        entities.SaveChanges();

                        foreach (var prefab in precostfabric)
                        {
                            var prefabric = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == prefab.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (prefabric != null)
                            {
                                prefabric.Target = 0;
                                prefabric.Approved = "N";
                            }

                        }
                        entities.SaveChanges();
                        foreach (var yarn in Yarndet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Target = 0;
                                yarnlist.Approved = "N";
                            }

                        }
                        entities.SaveChanges();

                        foreach (var proc in ProcessDet)
                        {
                            var processlist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == proc.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (processlist != null)
                            {
                                processlist.Target = 0;
                                processlist.Approved = "N";
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
