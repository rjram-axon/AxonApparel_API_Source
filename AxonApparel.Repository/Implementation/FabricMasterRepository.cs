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
    public class FabricMasterRepository : IFabricMasterRepository
    {
        MasterEntities entities = new MasterEntities();
        public IQueryable<Domain.FabricMaster> GetFabricmasDetails(int Id)
        {
            IQueryable<Domain.FabricMaster> query = (from a in entities.Proc_Apparel_GetFabricMasterEditDet(Id,0)
                                                     select new Domain.FabricMaster
                                                              {
                                                                  Fabricmasid = a.FabricMasid,
                                                                  Fabricid = a.Fabricid,
                                                                  Fabric = a.Fabric,
                                                                  FromGSM=a.FromGSM,
                                                                  ToGSM=a.ToGSM,
                                                              }).AsQueryable();
            return query;
        }
        public IQueryable<Domain.FabricMaster> GetFabricEditDetails(int Id)
        {
            IQueryable<Domain.FabricMaster> query = (from a in entities.Proc_Apparel_GetFabricMasterEditDet(0,Id)
                                                     select new Domain.FabricMaster
                                                     {
                                                         Fabricmasid = a.FabricMasid,
                                                         Fabricid = a.Fabricid,
                                                         Fabric = a.Fabric,
                                                         FromGSM = a.FromGSM,
                                                         ToGSM = a.ToGSM,
                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.FabricMaster> GetFabricdetfromyarn(int itemid, int colorid, int sizeid)
        {
            IQueryable<Domain.FabricMaster> query = (from a in entities.Proc_Apparel_GetYarnwiseFabricDet(itemid, colorid, sizeid)
                                                     select new Domain.FabricMaster
                                                     {
                                                         Fabricid = a.Fabricid,
                                                         Fabric = a.Fabric,
                                                     }).AsQueryable();
            return query;
        }




        public IQueryable<Domain.FabricYarn> GetFabricyarnEditDetails(int Id)
        {
            IQueryable<Domain.FabricYarn> query = (from a in entities.Proc_Apparel_GetFabricYarnEditDet(Id)
                                                   select new Domain.FabricYarn
                                                     {
                                                         FabricYarnmasid = a.FabricYarnmasid,
                                                         Fabricmasid = a.Fabricmasid,
                                                         Yarnid = a.Yarnid,
                                                         Yarn = a.Yarn,
                                                         Countid = a.Countid,
                                                         Count = a.Count,
                                                         Colorid = a.Colorid,
                                                         Color = a.Color,
                                                         Percentage = a.Percentage,

                                                     }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.FabricProcess> GetFabricprocessEditDetails(int Id)
        {
            IQueryable<Domain.FabricProcess> query = (from a in entities.Proc_Apparel_GetFabricProcessEditDet(Id)
                                                      select new Domain.FabricProcess
                                                   {
                                                       FabricProcessmasid = a.FabricProcessmasid,
                                                       Fabricmasid =(int)a.Fabricmasid,
                                                       Processid = a.Processid,
                                                       Process = a.Process,
                                                       LossPercentage = a.LossPercentage,
                                                       Rate = a.Rate,
                                                   }).AsQueryable();
            return query;
        }
        public IQueryable<Domain.FabricMaster> GetFabricMainDetails()
        {
            IQueryable<Domain.FabricMaster> query = (from a in entities.Proc_Apparel_GetFabricMasterEditDet(0,0)
                                                     select new Domain.FabricMaster
                                                      {
                                                          Fabricmasid = a.FabricMasid,
                                                          Fabricid = a.Fabricid,
                                                          Fabric = a.Fabric,
                                                          FromGSM = a.FromGSM,
                                                          ToGSM = a.ToGSM,
                                                      }).AsQueryable();
            return query;
        }

        public bool AddDetData(FabricMaster FabricMaster, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess)
        {
            int FabricMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (FabricMaster.Fabricmasid == 0)
                    {

                        entities.FabricMaster.Add(FabricMaster);
                        entities.SaveChanges();
                        FabricMasid = FabricMaster.Fabricmasid;
                        foreach (var trims in FabricYarn)
                        {
                            trims.Fabricmasid = FabricMasid;
                            entities.FabricYarn.Add(trims);

                        }
                        entities.SaveChanges();
                        foreach (var fablist in FabricProcess)
                        {
                            fablist.Fabricmasid = FabricMasid;
                            entities.FabricProcess.Add(fablist);

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

        public bool UpdateDetData(FabricMaster FabricMaster, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess)
        {
            int FabricMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (FabricMaster.Fabricmasid != 0)
                    {


                        FabricMasid = FabricMaster.Fabricmasid;

                        var mas = entities.FabricMaster.Where(c => c.Fabricmasid == FabricMaster.Fabricmasid);
                        foreach (var m in mas)
                        {
                            m.FromGSM = FabricMaster.FromGSM;
                            m.ToGSM = FabricMaster.ToGSM;
                        }
                        entities.SaveChanges();

                        var TDet = entities.FabricYarn.Where(u => u.Fabricmasid == FabricMaster.Fabricmasid);

                        foreach (var t in TDet)
                        {
                            entities.FabricYarn.Remove(t);
                        }
                        entities.SaveChanges();

                        var PDet = entities.FabricProcess.Where(u => u.Fabricmasid == FabricMaster.Fabricmasid);

                        foreach (var p in PDet)
                        {
                            entities.FabricProcess.Remove(p);
                        }
                        entities.SaveChanges();

                        foreach (var trims in FabricYarn)
                        {
                            trims.Fabricmasid = FabricMasid;
                            entities.FabricYarn.Add(trims);

                        }
                        entities.SaveChanges();
                        foreach (var fablist in FabricProcess)
                        {
                            fablist.Fabricmasid = FabricMasid;
                            entities.FabricProcess.Add(fablist);

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

        public bool DeleteDetData(FabricMaster FabricMaster, List<FabricYarn> FabricYarn, List<FabricProcess> FabricProcess)
        {
            int FabricMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (FabricMaster.Fabricmasid != 0)
                    {
                        FabricMasid = FabricMaster.Fabricmasid;

                        var TDet = entities.FabricYarn.Where(u => u.Fabricmasid == FabricMaster.Fabricmasid);

                        foreach (var t in TDet)
                        {
                            entities.FabricYarn.Remove(t);
                        }
                        entities.SaveChanges();

                        var PDet = entities.FabricProcess.Where(u => u.Fabricmasid == FabricMaster.Fabricmasid);

                        foreach (var p in PDet)
                        {
                            entities.FabricProcess.Remove(p);
                        }
                        entities.SaveChanges();

                        var FDet = entities.FabricMaster.Where(u => u.Fabricmasid == FabricMaster.Fabricmasid);

                        foreach (var f in FDet)
                        {
                            entities.FabricMaster.Remove(f);
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
