using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IOpenInvoiceBusiness
    {
       Response<bool> CreateUnitEntry(Domain.OpenInvoiceMas Entry);
       Response<IQueryable<Domain.OpenInvoiceMas>> GetDataMainList(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate, string IorE, string refno);
       Response<IQueryable<Domain.OpenInvoiceMas>> GetDataMainListddl(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate);
       Response<IQueryable<Domain.OpenInvoiceMas>> Getheaderdet(int invid);
       Response<IQueryable<Domain.OpenInvoiceDet>> GetItmeditdet(int invid);
       Response<bool> Update(Domain.OpenInvoiceMas obj);
       Response<IQueryable<Domain.OpenInvoiceAddless>> Getaddlesdet(int invid);
       Response<bool> Delete(int id);
    }
}
