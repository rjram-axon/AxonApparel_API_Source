using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ColorCodeRepository : IColorCodeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<ColorCode> GetDataList()
        {
            return entities.ColorCode.OrderBy(c => c.ColorCode1);
        }

        public ColorCode GetDataById(int id)
        {
            return entities.ColorCode.Where(c => c.ColorCodeId == id).FirstOrDefault();
        }

        public int AddData(ColorCode obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.ColorCode.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorCode-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(ColorCode obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.ColorCode.Where(c => c.ColorCodeId == obj.ColorCodeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.ColorCodeId = obj.ColorCodeId;
                        cou.ColorCode1 = obj.ColorCode1;
                        cou.ColorId = obj.ColorId;
                        cou.ColorShade = obj.ColorShade;
                        cou.SupplierId = obj.SupplierId;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorCode-UpdateData");
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
                    var cou = entities.ColorCode.Where(c => c.ColorCodeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.ColorCode.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ColorCode-DeleteData");
                }

            }
            return reserved;
        }
    }
}
