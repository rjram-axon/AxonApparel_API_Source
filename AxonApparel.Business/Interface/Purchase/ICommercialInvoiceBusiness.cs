using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface ICommercialInvoiceBusiness
    {
        Response<IQueryable<Domain.commercial_invmas>> GetDataMainList(int? compid, int? suppid, string orderno, int? invid, string fromDate, string todate, string refno, int? styleid);
        Response<IQueryable<Domain.commercial_invmas>> LoadMasedit(int Masid);
        Response<IQueryable<Domain.Commercial_Invdet>> LoadDetedit(int Masid);
        Response<IQueryable<Domain.CommercialInvoice_Addless>> LoadAddlessedit(int Masid);
        Response<IQueryable<Domain.commercial_invmas>> LoadEntryddl();
        Response<IQueryable<Domain.Commercial_Invdet>> LoadAddDet(string Commercial, string Order, string Ref, string Style);
        Response<bool> Add(Domain.commercial_invmas obj);
        Response<bool> Update(Domain.commercial_invmas obj);
        Response<bool> Delete(Domain.commercial_invmas obj);
    }
}
