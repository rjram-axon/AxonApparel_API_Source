using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;


namespace AxonApparel.Repository
{
   public class P1EntryRepository:IP1EntryRepository
    {
       AxonApparelEntities entities = new AxonApparelEntities();



       public IQueryable<BuyOrderStyle> GetDescription(int id)
       {
           IQueryable<BuyOrderStyle> query = (from cd1 in entities.Proc_Apparel_GetDescription(id)
                                              select new BuyOrderStyle
                                          {
                                              Description=cd1.Description,
                                              order_no=cd1.order_no
                                             


                                          }).AsQueryable();
           return query;
       }

       public IQueryable<P1Entry> GetDataList()
       {
           return entities.P1Entry.OrderBy(c => c.P1EntryId);
       }

       public P1Entry GetDataById(int id)
       {
           return entities.P1Entry.Where(c => c.P1EntryId == id).FirstOrDefault();
       }

       public int AddData(P1Entry obj)
       {
           int reserved = 0;

           //Define the scope for bundling the transaction
           using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
           {
               try
               {
                   var result = entities.P1Entry.Add(obj);
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

       public bool UpdateData(P1Entry obj)
       {
           bool reserved = false;

           //Define the scope for bundling the transaction
           using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
           {
               try
               {
                   var Upd = entities.P1Entry.Where(c => c.P1EntryId == obj.P1EntryId).FirstOrDefault();
                   if (Upd != null)
                   {
                       Upd.Buy_Ord_MasId = obj.Buy_Ord_MasId;
                       Upd.Description = obj.Description;
                       Upd.Remarks = obj.Remarks;
                       Upd.EntryDate = obj.EntryDate;
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
                   var Del = entities.P1Entry.Where(c => c.P1EntryId == id).FirstOrDefault();
                   if (Del != null)
                   {
                       entities.P1Entry.Remove(Del);
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

       public IList<Domain.P1Entry> GetP1Entry()
       {
           var query = (from cd1 in entities.Proc_Apparel_GetP1Entries()
                                          select new Domain.P1Entry
                                              {
                                                 RefNo=cd1.Ref_No,
                                                 Buy_Ord_MasId=cd1.Buy_Ord_MasId


                                              }).AsQueryable();
           return query.ToList();
       }
    }
}
