using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ICommercialInvoiceRepository
    {
        IQueryable<Domain.Commercial_Invdet> LoadAddDet(string Commercial, string Order, string Ref, string Style);
        IQueryable<Domain.commercial_invmas> GetDataMainList(int? compid, int? suppid, string orderno, int? invid, string fromDate, string todate, string refno, int? styleid);
        IQueryable<Domain.commercial_invmas> LoadMasedit(int Masid);
        IQueryable<Domain.Commercial_Invdet> LoadDetedit(int Masid);
        IQueryable<Domain.CommercialInvoice_Addless> LoadAddlessedit(int Masid);
        IQueryable<Domain.commercial_invmas> LoadEntryddl();

        bool AddDetData(Repository.Commercial_Invmas Mas, List<Repository.Commercial_Invdet> itmdet, List<Repository.CommercialInvoice_Addless> Addlessdet, string Mode);
        bool UpdateDetData(Repository.Commercial_Invmas Mas, List<Repository.Commercial_Invdet> itmdet, List<Repository.CommercialInvoice_Addless> Addlessdet, string Mode);
        bool DeleteDetData(Repository.Commercial_Invmas Mas, List<Repository.Commercial_Invdet> itmdet, List<Repository.CommercialInvoice_Addless> Addlessdet, string Mode);

    }
}
