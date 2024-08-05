using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ColorRepository : IColorRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Color> GetDataList()
        {
            return entities.Color.OrderBy(c => c.Color1);
        }

        public Color GetDataById(int id)
        {
            return entities.Color.Where(c => c.Colorid == id).FirstOrDefault();
        }

        public int AddData(Color obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Color.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Color obj)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var s = entities.Color.Where(c => c.Colorid == obj.Colorid).FirstOrDefault();
                    if (s != null)
                    {
                        s.Color1 = obj.Colorname;
                        s.IsActive = obj.IsActive;
                        s.ColorGroupID = obj.ColorGroupID;
                        s.Colorname = obj.Colorname;
                        s.ColorNo = obj.ColorNo;
                        s.ColorOth = obj.ColorOth;
                        s.Pantone = obj.Pantone;
                        s.Lookup = obj.Lookup;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-UpdateData");
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
                    var s = entities.Color.Where(c => c.Colorid == id).FirstOrDefault();
                    if (s != null)
                    {
                        entities.Color.Remove(s);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-DeleteData");
                }

            }
            return reserved;
        }

        public IList<Domain.Color> GetRepColorCheckItemDetails(int colorid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetColorMasterCheck(colorid)
                         select new Domain.Color
                         {
                             CountColorId = YD1.ChkSizeId,
                             ColorName = YD1.Color,


                         }).AsQueryable();

            return query.ToList();
        }
    }
}
