using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;

namespace AxonApparel.Repository
{
   public class ProcessQuoteRepository:IProcessQuoteRepository
    {

       PlanningEntities entities = new PlanningEntities();

        public IQueryable<ProcessQuote> GetDataMainList(int? companyId, string orderNo, string RefNo, string EntryNo, int? SupId, string fromDate, string toDate, string OType)
        {
            IQueryable<ProcessQuote> query = (from Pq in entities.Proc_Apparel_GetProcessQuoteMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, SupId == null ? 0 : SupId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType)
                                              select new ProcessQuote
                                        {


                                            Process_Quoteid = Pq.PQMasID,
                                            Process_QuoteNo = Pq.QuoteNo,
                                            Process_QuoteDate = (DateTime)Pq.Process_QuoteDate,                                   
                                            Supplier = Pq.Supplier,
                                            BuyOrdGeneral = Pq.Type,
                                            RefNo=Pq.QuoteRefNo,




                                        }).AsQueryable();
            return query;
        }

        public IQueryable<Process_Quote> GetDataList()
        {
            return entities.Process_Quote.OrderBy(c => c.Process_QuoteNo);
        }

        public bool DeleteData(int Id)
        {
            var result = false;
            var Det = entities.Process_Quote_Det.Where(u => u.Process_Quoteid == Id);

            foreach (var u in Det)
            {
                entities.Process_Quote_Det.Remove(u);
            }


            var ProcDet = entities.Process_QuotePro.Where(u => u.Process_Quoteid == Id);

            foreach (var v in ProcDet)
            {
                entities.Process_QuotePro.Remove(v);
            }


            var Mas = entities.Process_Quote.Where(c => c.Process_Quoteid == Id).FirstOrDefault();
            if (Mas != null)
            {
                entities.Process_Quote.Remove(Mas);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
    }
}
