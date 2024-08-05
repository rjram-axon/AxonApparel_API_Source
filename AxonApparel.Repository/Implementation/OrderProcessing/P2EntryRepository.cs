using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class P2EntryRepository:IP2EntryRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<P2Entry> GetDataList()
        {
            return entities.P2Entry.OrderBy(c => c.P2EntryId);
        }

        public P2Entry GetDataById(int id)
        {
            return entities.P2Entry.Where(c => c.P2EntryId == id).FirstOrDefault();
        }

        public int AddData(P2Entry obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.P2Entry.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

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

        public bool UpdateData(P2Entry obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.P2Entry.Where(c => c.P2EntryId == obj.P2EntryId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Buy_Ord_MasId = obj.Buy_Ord_MasId;
                        Upd.Description = obj.Description;
                        Upd.Remarks = obj.Remarks;
                        Upd.P1Date = obj.P1Date;
                        Upd.P2Date = obj.P2Date;
                        Upd.IsActive = obj.IsActive;

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
                    var Del = entities.P2Entry.Where(c => c.P2EntryId == id).FirstOrDefault();
                    if (Del != null)
                    {
                        entities.P2Entry.Remove(Del);
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

        public IList<Domain.P2Entry> GetP2Entry()
        {
            var query = (from cd1 in entities.Proc_Apparel_GetP2Entries()
                         select new Domain.P2Entry
                         {
                             RefNo = cd1.Ref_No,
                             Buy_Ord_MasId = cd1.Buy_Ord_MasId


                         }).AsQueryable();
            return query.ToList();
        }
    }
}
