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
using System.Data.Entity.Validation;

namespace AxonApparel.Repository
{
    public class PrefixEntryRepository:IPrefixEntryRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
      

        public IList<PrefixEntry> GetRepPrefixLoad(int? PrefixId)
        {
            var query = (from YD in entities.Proc_Apparel_GetPrefixDetails(PrefixId == null ? 0 : PrefixId)
                         select new PrefixEntry
                         {
                             DocID = YD.DocID,
                             Document_Name = YD.Document_Name,
                             Prefix = YD.Prefix,


                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(List<Prefix> objPEID)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var k in objPEID)
                    {
                        var e = entities.Prefix.Where(a => a.DocID.Equals(k.DocID)).FirstOrDefault();
                        if (e != null)
                        {
                            e.DocID = k.DocID;
                            e.Document_Name = k.Document_Name;
                            e.Prefix1 = k.Prefix1;
                        }
                    }
                    entities.SaveChanges();
                    
                    reserved = true;
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
            }
            return reserved;
        }
    }
}
