using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface ICSPReceiptBusiness
    {
        Response<IQueryable<Domain.CSPReceiptDet>> GetAddlist(string ordno, int styleid, int cmpid);
        Response<bool> CreateUnitEntry(Domain.CSPReceiptMas MasEntry);
        Response<IQueryable<Domain.CSPReceiptMas>> LoadMaingrid(int cmpid,int buyerid,int masid,string refno,string ordno,int styleid,string recptno,string fromdate,string todate);
        Response<IQueryable<Domain.CSPReceiptDet>> GetEditlist(int masid);
        Response<bool> UpdateData(Domain.CSPReceiptMas objupd);
        Response<bool> DeleteDet(Domain.CSPReceiptMas Entry);
        Response<IQueryable<Domain.CSPReceiptMas>> GetQltyAddlist(int masid);
        Response<IQueryable<Domain.CSPReceiptDet>> GetQltyAdddetlist(int masid);
        Response<bool> CreateUnitQlty(Domain.CSPReceiptMas MasEntry);
        Response<bool> UpdateQlty(Domain.CSPReceiptMas MasEntry);
        Response<bool> DeleteQlty(Domain.CSPReceiptMas MasEntry);
    }
}
