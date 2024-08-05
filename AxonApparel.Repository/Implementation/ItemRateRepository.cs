using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;


namespace AxonApparel.Repository
{
    public class ItemRateRepository : IItemRateRepository
    {

        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public bool AddData(List<Item_Rate> objPoAddDet)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //
                    foreach (var Pay in objPoAddDet)
                    {
                        if (Pay.RateId == 0)
                        {
                            entities.Item_Rate.Add(Pay);
                        }
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


        public IQueryable<ItemRate> GetDataMainList()
        {
            //var query = (from YD in entities.Proc_Apparel_GetMainLoadItemRate
            //             select new Domain.ItemRate
            //             {
            //                 BuyerId = (int)YD.Buyerid,
            //                 BuyerName = entities.Buyer.Where(e => e.BuyerId == YD.Buyerid).Select(i => i.Buyer1).Distinct().FirstOrDefault(),
            //             }).AsQueryable();
            //return query;
            IQueryable<ItemRate> query = (from a in entities.Proc_Apparel_GetMainLoadItemRate()
                                          select new ItemRate
                                               {
                                                   BuyerId = (int)a.Buyerid,
                                                  BuyerName=a.Buyer,

                                               }).AsQueryable();

            return query;
        }


        public IList<ItemRate> GetRepItemRate(int id)
        {

            int Rateid = 0;
            try
            {
                //IQueryable<ItemRate> query = (from T in entities.Proc_Apparel_GetItemRateDetEdit(id, Rateid)
                //                                      select new Item_Rate
                //                                      {
                //                                          RateId = T.Rateid,
                //                                          Itemid = T.ItemId,
                //                                          Supplier = T.Supplier,
                //                                          ColorId = T.ColorId,
                //                                          Color = T.Color,
                //                                          SizeId = T.SizeId,                                                        
                //                                          Rate = T.Rate,
                //                                          //Item=T.Item,
                //                                          Item = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                //                                          Buyer=T.Buyer,
                //                                          Buyerid=T.BuyerId,                                                                  
                //                                          SupplierId = (int)T.SupplierId,     
                                
                                                    
                //                                      }).AsQueryable();
                //return query;

                var query = (from T in entities.Proc_Apparel_GetItemRateDetEdit(id, Rateid)
                             select new ItemRate
                             {
                                 RateId = T.Rateid,
                                 ItemId = T.ItemId,
                                 SupplierName = T.Supplier,
                                 ColorId = T.ColorId,
                                 Color = T.Color,
                                 SizeId = T.SizeId,
                                 Rate = T.Rate,
                                 Size=T.size,
                                 Item=T.Item,
                                 //Item = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                 BuyerName = T.Buyer,
                                 BuyerId = T.BuyerId,
                                 SupplierId = (int)T.SupplierId,     
                                
                             }).AsQueryable();

                return query.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            } throw new NotImplementedException();
        }


        public bool UpdateDetData(List<Item_Rate> objPoEADet)
        {
            bool reserved = false;

            
            //var result = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    
                    //Update ItemRate

                    foreach (var j in objPoEADet)
                    {
                        var d = entities.Item_Rate.Where(a => a.RateId.Equals(j.RateId)).FirstOrDefault();
                        if (d != null)
                        {
                            d.Itemid = j.Itemid;
                            d.ColorId = j.ColorId;
                            d.SizeId = j.SizeId;
                            d.Rate = j.Rate;
                            d.SupplierId = j.SupplierId;
                            d.Buyerid = j.Buyerid;
                        }
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

        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Item_Rate.Where(c => c.Buyerid == id).ToList();
                    if (cou != null)
                    {
                    
                        cou.ForEach(c => entities.Item_Rate.Remove(c));
                    }
                    entities.SaveChanges();
                                     
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-DeleteData");
                }

            }
            return reserved;
        }


        public bool DeleteDataInv(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Item_Rate.Where(c => c.RateId == id).ToList();
                    if (cou != null)
                    {

                        cou.ForEach(c => entities.Item_Rate.Remove(c));
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-DeleteData");
                }

            }
            return reserved;
        }
    }
}
