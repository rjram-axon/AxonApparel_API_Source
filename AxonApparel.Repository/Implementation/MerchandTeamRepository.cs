using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class MerchandTeamRepository:IMerchandTeamRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.MerchandTeamMas> GetDataMainList()
        {
            try
            {
                var query = (from YD in entities.MerchTeamMas
                             select new Domain.MerchandTeamMas
                             {
                                 MerchandMasId = YD.TeamId,
                                 MerchandName = YD.MerchandName
                             }).AsQueryable();
                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteData(int id)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var addl = entities.MerchTeamMas.Where(c => c.TeamId == id).FirstOrDefault();

                    //delete MerchTeamEmployee Many Rows table
                    var merchteamemployee = entities.MerchTeamEmployee.Where(d => d.TeamId == id).ToList<MerchTeamEmployee>();
                    merchteamemployee.ForEach(c => entities.MerchTeamEmployee.Remove(c));
                    entities.SaveChanges();

                    //delete MerchTeamBuyer Many Rows table
                    var merchteambuyer = entities.MerchTeamBuyer.Where(d => d.TeamId == id).ToList<MerchTeamBuyer>();
                    merchteambuyer.ForEach(c => entities.MerchTeamBuyer.Remove(c));
                    entities.SaveChanges();

                    if (addl != null)
                    {
                        entities.MerchTeamMas.Remove(addl);
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
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-DeleteData");
                    return false;
                    throw ex;
                }
            }

        }

        public bool AddData(MerchTeamMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.MerchTeamMas merchteamas = new Repository.MerchTeamMas();
                    if (objAdd != null)
                    {
                        merchteamas.MerchandName = objAdd.MerchandName;                        
                    }

                    var id = entities.MerchTeamMas.Add(merchteamas);
                    entities.SaveChanges();

                    //MerchTeamBuyer Start
                    var MerchBuyer = new List<Repository.MerchTeamBuyer>();

                    foreach (var merchbuy in objAdd.MerchTeamBuyer)
                    {
                        MerchBuyer.Add(new Repository.MerchTeamBuyer
                        {
                            TeamId = id.TeamId,
                            BuyerId = merchbuy.BuyerId,
                        });
                    }

                    var MerTeamBuyerresult = AddMercBuyer(MerchBuyer, "Add");

                    //MerchTeamBuyer End

                    //MerchTeamEmployee Start
                    var MerchEmp = new List<Repository.MerchTeamEmployee>();

                    foreach (var merchemp in objAdd.MerchTeamEmployee)
                    {
                        MerchEmp.Add(new Repository.MerchTeamEmployee
                        {
                            TeamId = id.TeamId,
                            EmployeeId = merchemp.EmployeeId,
                        });
                    }

                    var MerTeamemperresult = AddMercEmployee(MerchEmp, "Add");

                    //MerchTeamEmployee End

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public bool UpdateData(MerchTeamMas objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //var result = false;
                    Repository.MerchTeamMas mercteam = new Repository.MerchTeamMas();

                    var App = entities.MerchTeamMas.Where(c => c.TeamId == objUpd.TeamId).FirstOrDefault();
                    if (App != null)
                    {                        
                        App.MerchandName = objUpd.MerchandName;                        
                    }
                    entities.SaveChanges();

                    //MerchTeamBuyer Start
                    var MerchBuyer = new List<Repository.MerchTeamBuyer>();

                    foreach (var merchbuy in objUpd.MerchTeamBuyer)
                    {
                        MerchBuyer.Add(new Repository.MerchTeamBuyer
                        {
                            TeamId = objUpd.TeamId,
                            BuyerId = merchbuy.BuyerId,
                        });
                    }

                    var MerTeamBuyerresult = AddMercBuyer(MerchBuyer, "Update");

                    //MerchTeamBuyer End

                    //MerchTeamEmployee Start
                    var MerchEmp = new List<Repository.MerchTeamEmployee>();

                    foreach (var merchemp in objUpd.MerchTeamEmployee)
                    {
                        MerchEmp.Add(new Repository.MerchTeamEmployee
                        {
                            TeamId = objUpd.TeamId,
                            EmployeeId = merchemp.EmployeeId,
                        });
                    }

                    var MerTeamemperresult = AddMercEmployee(MerchEmp, "Update");
                    //MerchTeamEmployee End
                    
                    //The Transaction will be completed
                    txscope.Complete();
                    MerTeamemperresult = true;
                    return MerTeamemperresult;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "MerchandTeam-UpdateData");
                    return false;
                    throw ex;
                }
            }

        }

        public bool AddMercBuyer(List<MerchTeamBuyer> objCDet, string Mode)
        {
            try
            {
                int TId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        TId = (int)item.TeamId;
                    }
                    //delete MerchTeamBuyer Many Rows table
                    var deletestyledet = entities.MerchTeamBuyer.Where(d => d.TeamId == TId).ToList<MerchTeamBuyer>();

                    deletestyledet.ForEach(c => entities.MerchTeamBuyer.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.MerchTeamBuyer.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddMercEmployee(List<MerchTeamEmployee> objCDet, string Mode)
        {
            try
            {
                int TId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        TId = (int)item.TeamId;
                    }
                    //delete MerchTeamEmployee Many Rows table
                    var deletestyledet = entities.MerchTeamEmployee.Where(d => d.TeamId == TId).ToList<MerchTeamEmployee>();

                    deletestyledet.ForEach(c => entities.MerchTeamEmployee.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.MerchTeamEmployee.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public MerchTeamMas GetMerchTeamHeaderInfo(int Teamid)
        {
            return entities.MerchTeamMas.Where(c => c.TeamId == Teamid).FirstOrDefault();            
        }
    }
}
