using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ColorGroupRepository : IColorGroupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<ColorGroup> GetDataList()
        {
            return entities.ColorGroup.OrderBy(c => c.ColorGroup1);
        }

        public ColorGroup GetDataById(int id)
        {
            return entities.ColorGroup.Where(c => c.ColorGroupID == id).FirstOrDefault();
        }

        public int AddData(ColorGroup obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.ColorGroup.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorGroup-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(ColorGroup obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.ColorGroup.Where(c => c.ColorGroupID == obj.ColorGroupID).FirstOrDefault();
                    if (s != null)
                    {
                        s.ColorGroup1 = obj.ColorGroup1;
                        s.IsActive = obj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorGroup-UpdateData");
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
                    var s = entities.ColorGroup.Where(c => c.ColorGroupID == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.ColorGroup.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorGroup-DeleteData");
                }

            }
            return reserved;
        }
    }
}
