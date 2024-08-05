using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface ISecondsSalesBusiness
    {
        Response<bool> Add(Domain.FABRIC_SALES_MAS Det);
        Response<bool> Update(Domain.FABRIC_SALES_MAS Det);
        Response<bool> Delete(Domain.FABRIC_SALES_MAS Det);
        Response<IList<Domain.FABRIC_SALES_DET>> LoadStockItemDetails(int? CompId, int? unitid, string OrderNo, string Refno, string styleid, int? itemgrpid, string Itemid, string Ordertype);
        Response<IList<Domain.FABRIC_SALES_MAS>> GetMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid, string Otype);
       Response<Domain.FABRIC_SALES_MAS> LoadEditMasDetails(int masid);
        Response<IList<Domain.FABRIC_SALES_DET>> LoadEditDetDetails(int masid);
        Response<Domain.FABRIC_SALES_DET> LoadStateDetails(int Companyid,int Supplierid);
        Response<IList<Domain.FABRIC_SALES_MAS>> LoadSSentryno();
    }
}
