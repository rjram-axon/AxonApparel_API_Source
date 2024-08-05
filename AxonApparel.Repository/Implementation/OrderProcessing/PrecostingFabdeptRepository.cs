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
    public class PrecostingFabdeptRepository : IPrecostingFabdeptRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<Domain.PreCostFabDept_mas> GetPrecostingmasDetails(int Id)
        {
            IQueryable<Domain.PreCostFabDept_mas> query = (from a in entities.Proc_Apparel_GetPrecostingFabMasEntryLoad(Id)
                                                           select new Domain.PreCostFabDept_mas
                                                              {
                                                                  PreCostFabDeptmasid = a.PreCostFabDeptmasid,
                                                                  Buyerid = a.BuyerId,
                                                                  Buyer = a.buyer,
                                                                  Styleid = a.Styleid,
                                                                  Style = a.Style,
                                                                  Stylerowid = a.StyleRowid,
                                                                  Entrydate = (DateTime)a.Entrydate,
                                                                  Order_date = (DateTime)a.Order_date,
                                                                  Bmasid = a.Buy_Ord_MasId,
                                                                  order_no = a.order_no,
                                                                  Ref_no = a.Ref_no,
                                                                  Quantity = (int)a.Quantity
                                                              }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostingAddfabric(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingAddFabLoad(Id)
                                                           select new Domain.PrecostFabDept_Fab
                                                           {
                                                              
                                                               Fabricid = a.Fabricid,
                                                               Fabric = a.Fabric,
                                                               GreyColorid = a.GreyColorid,
                                                               GreyColor = a.GreyColor,
                                                               FabricColorid = a.FabricColorid,
                                                               FabricColor = a.FabricColor,
                                                               PurchaseType = a.PurchaseType,
                                                               FabSlno = (int)a.FabSlno,
                                                               GSM=a.GSM
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.PrecostFabDept_Fab> GetPrecostingEditfabric(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Fab> query = (from a in entities.Proc_Apparel_GetPrecostingEditFabLoad(Id)
                                                           select new Domain.PrecostFabDept_Fab
                                                           {
                                                               PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                               Fabricid = a.Fabricid,
                                                               Fabric = a.Fabric,
                                                               GreyColorid = a.GreyColorid,
                                                               GreyColor = a.GreyColor,
                                                               FabricColorid = a.FabricColorid,
                                                               FabricColor = a.FabricColor,
                                                               PurchaseType = a.PurchaseType,
                                                               FabSlno = (int)a.FabSlno,
                                                               GSM = a.GSM
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.PrecostFabDept_Yarn> GetPrecostingEditYarn(int Id)
        {
            IQueryable<Domain.PrecostFabDept_Yarn> query = (from a in entities.Proc_Apparel_GetPrecostingEditYarnLoad(Id)
                                                            select new Domain.PrecostFabDept_Yarn
                                                           {
                                                               PreCostFabDeptYarnmasid = a.PreCostFabDeptYarnmasid,
                                                               PreCostFabDeptFabmasid = a.PreCostFabDeptFabmasid,
                                                               Fabricid = a.Fabricid,
                                                               Yarnid = a.Yarnid,
                                                               Yarn = a.Yarn,
                                                               Countid = a.Countid,
                                                               Count = a.Count,
                                                               Colorid = a.Colorid,
                                                               Color = a.Color,
                                                               Percentage = a.Percentage,
                                                                FabSlno = (int)a.FabSlno
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.PrecostFabDept_Process> GetPrecostingEditprocess(int Id)
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
                                                                FabSlno = (int)a.FabSlno
                                                            }).AsQueryable();

            return query;
        }

        public bool AddDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> YarnDet, List<PrecostFabDept_Process> ProcessDet)
        {
            int PrecostMasid = 0;
            int PreCostFabMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PreCostFabDeptmasid == 0)
                    {

                        entities.PreCostFabDept_mas.Add(PrecostmasEntry);
                        entities.SaveChanges();
                        PrecostMasid = PrecostmasEntry.PreCostFabDeptmasid;
                        foreach (var fabric in FabDet)
                        {
                            fabric.PreCostFabDeptmasid = PrecostMasid;
                            entities.PrecostFabDept_Fab.Add(fabric);
                            entities.SaveChanges();
                            PreCostFabMasid = fabric.PreCostFabDeptFabmasid;
                            foreach (var yarn in YarnDet)
                            {
                                if (yarn.Slno == fabric.Slno)
                                {
                                    yarn.PreCostFabDeptmasid = PrecostMasid;
                                    yarn.PreCostFabDeptFabmasid = PreCostFabMasid;
                                    entities.PrecostFabDept_Yarn.Add(yarn);
                                }
                            }
                            entities.SaveChanges();
                            foreach (var proclist in ProcessDet)
                            {
                                if (proclist.Slno == fabric.Slno)
                                {
                                    proclist.PreCostFabDeptmasid = PrecostMasid;
                                    proclist.PreCostFabDeptFabmasid = PreCostFabMasid;                                  
                                    entities.PrecostFabDept_Process.Add(proclist);
                                }
                            }
                            entities.SaveChanges();
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

        public bool UpdateDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> YarnDet, List<PrecostFabDept_Process> ProcessDet)
        {
            int PrecostMasid = 0;
            // int PreCostFabMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (PrecostmasEntry.PreCostFabDeptmasid != 0)
                    {
                        var App = entities.PreCostFabDept_mas.Where(c => c.PreCostFabDeptmasid == PrecostmasEntry.PreCostFabDeptmasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.Entrydate = PrecostmasEntry.Entrydate;
                        }
                        entities.SaveChanges();
                        PrecostMasid = PrecostmasEntry.PreCostFabDeptmasid;
                        foreach (var Fabric in FabDet)
                        {
                            var fabs = entities.PrecostFabDept_Fab.Where(c => c.PreCostFabDeptFabmasid == Fabric.PreCostFabDeptFabmasid).FirstOrDefault();
                            if (fabs != null)
                            {
                                fabs.Fabricid = Fabric.Fabricid;
                                fabs.GreyColorid = Fabric.GreyColorid;
                                fabs.FabricColorid = Fabric.FabricColorid;
                                fabs.PurchaseType = Fabric.PurchaseType;
                                fabs.GSM = Fabric.GSM;
                                fabs.Slno = Fabric.Slno;
                            }
                            else
                            {
                                Fabric.PreCostFabDeptmasid = PrecostMasid;
                                entities.PrecostFabDept_Fab.Add(Fabric);

                            }
                        }
                        entities.SaveChanges();

                        foreach (var yarn in YarnDet)
                        {
                            var yarnlist = entities.PrecostFabDept_Yarn.Where(c => c.PreCostFabDeptYarnmasid == yarn.PreCostFabDeptYarnmasid).FirstOrDefault();
                            if (yarnlist != null)
                            {
                                yarnlist.Yarnid = yarn.Yarnid;
                                yarnlist.Countid = yarn.Countid;
                                yarnlist.Colorid = yarn.Colorid;
                                yarnlist.Percentage = yarn.Percentage;
                            }
                            else if (yarn.PreCostFabDeptYarnmasid == 0)
                            {
                                yarn.PreCostFabDeptmasid = PrecostMasid;
                                yarn.PreCostFabDeptFabmasid = yarn.PreCostFabDeptFabmasid;
                                entities.PrecostFabDept_Yarn.Add(yarn);

                            }

                        }
                        entities.SaveChanges();

                        foreach (var Proces in ProcessDet)
                        {
                            var proclist = entities.PrecostFabDept_Process.Where(c => c.PreCostFabDeptProcmasid == Proces.PreCostFabDeptProcmasid).FirstOrDefault();
                            if (proclist != null)
                            {
                                proclist.Processid = Proces.Processid;
                                proclist.LossPercentage = Proces.LossPercentage;

                            }
                            else if (Proces.PreCostFabDeptProcmasid == 0)
                            {
                                Proces.PreCostFabDeptmasid = PrecostMasid;
                                Proces.PreCostFabDeptFabmasid = Proces.PreCostFabDeptFabmasid;
                                entities.PrecostFabDept_Process.Add(Proces);

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

        public bool DeleteDetData(PreCostFabDept_mas PrecostmasEntry, List<PrecostFabDept_Fab> FabDet, List<PrecostFabDept_Yarn> YarnDet, List<PrecostFabDept_Process> ProcessDet)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var PDet = entities.PrecostFabDept_Process.Where(u => u.PreCostFabDeptmasid == PrecostmasEntry.PreCostFabDeptmasid);

                    foreach (var p in PDet)
                    {
                        entities.PrecostFabDept_Process.Remove(p);
                    }
                    entities.SaveChanges();

                    var YDet = entities.PrecostFabDept_Yarn.Where(u => u.PreCostFabDeptmasid == PrecostmasEntry.PreCostFabDeptmasid);

                    foreach (var y in YDet)
                    {
                        entities.PrecostFabDept_Yarn.Remove(y);
                    }
                    entities.SaveChanges();

                    var FDet = entities.PrecostFabDept_Fab.Where(u => u.PreCostFabDeptmasid == PrecostmasEntry.PreCostFabDeptmasid);

                    foreach (var f in FDet)
                    {
                        entities.PrecostFabDept_Fab.Remove(f);
                    }
                    entities.SaveChanges();

                    var MDet = entities.PreCostFabDept_mas.Where(u => u.PreCostFabDeptmasid == PrecostmasEntry.PreCostFabDeptmasid);

                    foreach (var m in MDet)
                    {
                        entities.PreCostFabDept_mas.Remove(m);
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
