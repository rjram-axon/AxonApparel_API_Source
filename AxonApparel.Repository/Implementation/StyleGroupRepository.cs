using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class StyleGroupRepository : IStyleGroupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Style_Group> GetDataList()
        {
            return entities.Style_Group.OrderBy(c => c.StyleGroup);
        }

        public Style_Group GetDataById(int id)
        {
            return entities.Style_Group.Where(c => c.StyleGroupID == id).FirstOrDefault();
        }

        public int AddData(Style_Group obj)
        {

            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Style_Group.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StyleGroup-AddData");
                }

            }
            return reserved;

        }

        public bool UpdateData(Style_Group obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var newoBJ = entities.Style_Group.Where(c => c.StyleGroupID == obj.StyleGroupID).FirstOrDefault();
                    newoBJ.StyleGroup = obj.StyleGroup;
                    newoBJ.IsActive = obj.IsActive;
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StyleGroup-UpdateData");
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
                    var newoBJ = entities.Style_Group.Where(c => c.StyleGroupID == id).FirstOrDefault();
                    entities.Style_Group.Remove(newoBJ);
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StyleGroup-DeleteData");
                }

            }
            return reserved;
        }


    }
}
