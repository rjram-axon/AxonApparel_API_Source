using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web.Mvc;

namespace AxonApparel.Repository
{
    public class FollowUpRepository : IFollowupRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        public IQueryable<Followup> GetDataList()
        {
            return entities.Followup.OrderBy(c => c.BuyerId);
        }

        public Followup GetDataById(int id)
        {
            return entities.Followup.Where(c => c.Id == id).FirstOrDefault();
        }

        public int AddData(Followup obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Followup.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "FollowUp-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Followup followobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var followUpd = entities.Followup.Where(c => c.Id == followobj.Id).FirstOrDefault();
                    if (followUpd != null)
                    {
                        followUpd.BuyerId = followobj.BuyerId;
                        followUpd.EntryNo = followobj.EntryNo;
                        followUpd.Enquiryid = followobj.Enquiryid;
                        followUpd.CompanyId = followobj.CompanyId;
                        followUpd.Date = followobj.Date;
                        followUpd.Statusid = followobj.Statusid;
                        followUpd.EmployeeId = followobj.EmployeeId;
                        followUpd.QuotationNo = followobj.QuotationNo;
                        followUpd.QuotationStyle = followobj.QuotationStyle;
                        followUpd.QuoDate = followobj.QuoDate;
                        followUpd.Action = followobj.Action;
                        followUpd.ToContact = followobj.ToContact;
                        followUpd.NextFollowDate = followobj.NextFollowDate;
                        followUpd.Remarks = followobj.Remarks;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "FollowUp-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int followid)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var followDel = entities.Followup.Where(c => c.Id == followid).FirstOrDefault();
                    if (followDel != null)
                    {
                        entities.Followup.Remove(followDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "FollowUp-DeleteData");
                }

            }
            return reserved;
        }
    }
}
