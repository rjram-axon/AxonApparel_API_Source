using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IQuotationAddRepository
    {
        IQueryable<Domain.MarkQuoteMas> Getenqno(int cid);
        IQueryable<Domain.MarkQuoteMas> Getenqnodet(string enqno);
        IQueryable<Domain.MarkQuoteProcess> Getprocess();
        IQueryable<Domain.MarkQuoteAcc> Getuom(int itemid);
        int AddData(MarkQuoteMas objEntry, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0);
        bool AddDetData(int quoteid, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0);
        IQueryable<Domain.MarkQuoteMas> Getmasdet(int qid);
        IQueryable<Domain.MarkQuoteFab> Getfabdet(int qid);
        IQueryable<Domain.MarkQuoteYarn> Getyarndet(int qid);
        IQueryable<Domain.MarkQuoteProcess> Getprocdet(int qid);
        IQueryable<Domain.MarkQuoteAcc> Getbomdet(int qid);
        IQueryable<Domain.MarkQuoteCMT> Getcmtdet(int qid);
        IQueryable<Domain.MarkQuoteCommercial> Getcommdet(int qid);
        bool UpdateData(MarkQuoteMas objupd, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0);
        bool DeleteData(int id);
        IEnumerable<Domain.MarkQuoteMas> GetQuotationNo();
   
   }
}
