using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IOpenInvoiceRepository
    {
        int AddData(OpenInvoice_Mas objEntry);
        bool AddDetData(OpenInvoice_Mas obj,List<OpenInvoice_Det> objdet, List<OpenInvoice_Addless> objaddls, string Mode, int unitmId = 0);
        bool UpdDetData(OpenInvoice_Mas obj, List<OpenInvoice_Det> objdet, List<OpenInvoice_Addless> objaddls, string Mode, int unitmId = 0);
        IQueryable<Domain.OpenInvoiceMas> GetDataMainList(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate, string IorE, string refno);
        IQueryable<Domain.OpenInvoiceMas> GetDataMainListddl(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate);
        IQueryable<Domain.OpenInvoiceMas> Getheaderdet(int invid);
        IQueryable<Domain.OpenInvoiceDet> GetItmeditdet(int invid);
        IQueryable<Domain.OpenInvoiceAddless> Getaddlesdet(int invid);
        bool UpdateData(OpenInvoice_Mas objUpd);
        bool DeleteData(int id);
    }
}
