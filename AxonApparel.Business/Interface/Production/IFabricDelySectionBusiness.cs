using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IFabricDelySectionBusiness
    {
        Response<IQueryable<FabricDelySection>> GetFaricDelySectionOrderList(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid);
        Response<IList<Domain.FabricDelySection>> GetInputOutDet(int Prodprgid, string JobOrdNo, string Ordertype);
        Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId);
        Response<IQueryable<FabricDelyStockProperties>> GetFabricInputItemStockInfoEditMode(int FabDelyIssueId, int ItemID, int ColorID, int SizeID);        

        Response<IEnumerable<Domain.FabricDelySection>> GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string FabDelyNo, string jobordno, string FromDate, string ToDate, int supplierid);
        
        Response<IQueryable<FabricDelySection>> GetFabricHeaderInformation(int FabricDelyIssueId);
        Response<IList<Domain.FabricDelySection>> GetInputOutDetEdit(int FabricDelyIssueId, int Prodprgid);

        Response<bool> CreateFabricDelySection(Domain.FabricDelySection_Mas MasEntry);
        Response<bool> UpdateDetData(Domain.FabricDelySection_Mas FabDelySecAdd);
        Response<bool> Delete(int Id, string FabDelyIssueNo);

        Response<bool> UpdateReceipt(Domain.FabricDelySection_Mas FabDelySecAdd);
        Response<bool> DeleteReceipt(Domain.FabricDelySection_Mas FabDelySecAdd);       
    }
}
