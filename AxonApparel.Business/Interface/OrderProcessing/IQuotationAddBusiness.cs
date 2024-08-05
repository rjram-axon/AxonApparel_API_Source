using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IQuotationAddBusiness
    {
        Response<IQueryable<Domain.MarkQuoteMas>> Getquoenqno(int cid);
        Response<IQueryable<Domain.MarkQuoteMas>> Getquoenqdet(string enqno);

        Response<IQueryable<Domain.MarkQuoteProcess>> Getprocess();
        Response<IQueryable<Domain.MarkQuoteAcc>> GetUom(int itemid);
        Response<bool> CreateUnitEntry(Domain.MarkQuoteMas GrnEntry);
        Response<IQueryable<Domain.MarkQuoteMas>> GetMasdet(int qid);
        Response<IQueryable<Domain.MarkQuoteFab>> GetFabdet(int qid);
        Response<IQueryable<Domain.MarkQuoteYarn>> Getyarndet(int qid);
        Response<IQueryable<Domain.MarkQuoteProcess>> Getprocdet(int qid);
        Response<IQueryable<Domain.MarkQuoteAcc>> Getbomdet(int qid);
        Response<IQueryable<Domain.MarkQuoteCMT>> Getcmtdet(int qid);
        Response<IQueryable<Domain.MarkQuoteCommercial>> Getcommdet(int qid);
        Response<bool> Update(Domain.MarkQuoteMas obj);
        Response<bool> Delete(int id);
        Response<IEnumerable<Domain.MarkQuoteMas>> GetQuotationNo();
    }
}
