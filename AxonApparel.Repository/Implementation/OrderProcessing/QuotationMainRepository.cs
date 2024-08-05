using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class QuotationMainRepository : IQuotationMainRepository
    {
        OrderEntities entities = new OrderEntities();


        public IQueryable<Domain.MarkQuoteMas> GetDataMainList(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate,string RefNo)
        {
            var query = (from LADD in entities.Proc_Apparel_QuotationLoadMainGrid(companyId, buyerid, quotetype, quoteno, enqno, styleid, fromDate, todate, RefNo)
                         select new Domain.MarkQuoteMas
                         {
                            Companyid=LADD.companyid,
                            company=LADD.company,
                            QuoteDate=(DateTime)LADD.QuoteDate,
                            buyer=LADD.Buyer,
                            BuyerId=LADD.buyerid,
                            QuoteID=LADD.QuoteID,
                            QuoteNo=LADD.QuoteNo,
                            QuoteType=LADD.QuoteType,
                            Remarks=LADD.Remarks,
                            EnquiryId=LADD.EnquiryID,
                            enquiryno=LADD.EnquiryNo,
                            style=LADD.Style,
                            StyleId=LADD.styleid,
                            RefNo=LADD.RefNo,


                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.MarkQuoteMas> GetRepDetRecNo(int id)
        {
            string Qutno = "";

            var OQuery = entities.MarkQuoteMas.Where(b => b.QuoteID == id).FirstOrDefault();
            if (OQuery != null)
            {
                Qutno = OQuery.QuoteNo;
            }


            var query = (from a in entities.Proc_Apparel_GetQuoteMainRevNumber(Qutno)
                         select new Domain.MarkQuoteMas
                         {
                             RecID = a.RecId,
                             RecQuoteNo = a.RevQName,
                             QuoteID = a.QuoteID,                            
                         }).AsQueryable();

            return query;
        }
    }
}
