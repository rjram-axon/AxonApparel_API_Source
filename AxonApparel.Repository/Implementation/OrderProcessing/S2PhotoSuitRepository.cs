using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{ 
    public class S2PhotoSuitRepository : IS2PhotoSuitRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<S2PhotoSuit> GetDataList()
        {
            return entities.S2PhotoSuit.OrderBy(c => c.S2EntryId);
        }

        public S2PhotoSuit GetDataById(int id)
        {
            return entities.S2PhotoSuit.Where(c => c.S2EntryId == id).FirstOrDefault();            
        }

        public int AddData(S2PhotoSuit obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.S2PhotoSuit.Add(obj);
                    entities.SaveChanges();

                    reserved = 1;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (DbEntityValidationException ex)
                {
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "S1SamplePhotoEntry-AddData");
                }
            }
            return reserved;
        }

        public bool UpdateData(S2PhotoSuit obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.S2PhotoSuit.Where(c => c.S2EntryId == obj.S2EntryId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Buy_Ord_MasId = obj.Buy_Ord_MasId;
                        cou.Fabric = obj.Fabric;
                        cou.Elastic = obj.Elastic;
                        cou.PhotoSuitSmpleSew = obj.PhotoSuitSmpleSew;
                        cou.PhotoSuitSmpleSubmit = obj.PhotoSuitSmpleSubmit;                        
                        cou.Remarks = obj.Remarks;
                    }
                    entities.SaveChanges();
                    reserved = true;

                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TestingTypeMaster-UpdateData");
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
                    var cou = entities.S2PhotoSuit.Where(c => c.S2EntryId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.S2PhotoSuit.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TestingTypeMaster-Delete Data");
                }
            }
            return reserved;
        }

        public IList<Domain.S2PhotoSuit> GetS2Entry()
        {
            var query = (from cd1 in entities.Buy_Ord_Mas
                         join d in entities.S2PhotoSuit on cd1.Buy_Ord_MasId equals d.Buy_Ord_MasId
                         select new Domain.S2PhotoSuit
                         {
                             RefNo = cd1.Ref_No,
                             Buy_Ord_MasId = cd1.Buy_Ord_MasId
                         }).AsQueryable();
            return query.ToList();
        }
        
    }
}
