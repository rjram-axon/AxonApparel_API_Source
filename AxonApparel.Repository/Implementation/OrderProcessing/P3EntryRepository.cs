using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class P3EntryRepository:IP3EntryRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();


        public IQueryable<P3Entry> GetDataList()
        {
            return entities.P3Entry.OrderBy(c => c.P3EntryId);
        }

        public P3Entry GetDataById(int id)
        {
            return entities.P3Entry.Where(c => c.P3EntryId == id).FirstOrDefault();
        }

        public int AddData(P3Entry obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.P3Entry.Add(obj);
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

        public bool UpdateData(P3Entry obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.P3Entry.Where(c => c.P3EntryId == obj.P3EntryId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Buy_Ord_MasId = obj.Buy_Ord_MasId;
                        Upd.Yarn_PO = obj.Yarn_PO;
                        Upd.Remarks = obj.Remarks;
                        Upd.Yarn_IH = obj.Yarn_IH;
                        Upd.Fab_IH = obj.Fab_IH;
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
                    var Del = entities.P3Entry.Where(c => c.P3EntryId == id).FirstOrDefault();
                    if (Del != null)
                    {
                        entities.P3Entry.Remove(Del);
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

        public IList<Domain.P3Entry> GetP3Entry()
        {
            var query = (from cd1 in entities.Proc_Apparel_GetP3Entries()
                         select new Domain.P3Entry
                         {
                             RefNo = cd1.Ref_No,
                             Buy_Ord_MasId = cd1.Buy_Ord_MasId


                         }).AsQueryable();
            return query.ToList();
        }
    }
}
