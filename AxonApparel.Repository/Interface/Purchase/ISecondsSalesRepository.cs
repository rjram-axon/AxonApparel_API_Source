using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ISecondsSalesRepository
    {
        bool AddDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList);
        bool UpdateDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList);
        bool DeleteDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList);

        IList<Domain.FABRIC_SALES_DET> LoadStockItemDetails(int? CompId, int? unitid, string OrderNo, string Refno, string styleid, int? itemgrpid, string Itemid, string Ordertype);
        IList<Domain.FABRIC_SALES_MAS> GetMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid, string Otype);
        IList<Domain.FABRIC_SALES_MAS> LoadSSentryno();

        Domain.FABRIC_SALES_MAS LoadEditMasDetails(int masid);
        IList<Domain.FABRIC_SALES_DET> LoadEditDetDetails(int masid);
        Domain.FABRIC_SALES_DET LoadStateDetails(int Companyid,int Stateid);
    }
}
