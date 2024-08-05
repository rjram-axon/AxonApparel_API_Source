using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ICommonProductionReturnBusiness
    {
        Response<IList<CommonProdReturn>> GetCommonProductionIssueDet(string InterorExter, int CompanyId, int Processorid, string OrderType, int OrdNo, int RefNo, int SupplierId, int StyleId, int IssueId);
        Response<IList<CommonProdReturn>> GetCommonProductionReceiptDet(string ProdIssueId);
        Response<bool> CreateProductionReturn(Domain.ProductionReturnMas ProductionReturnAdd);
        Response<IList<Domain.ProductionReturnMainDetail>> GetMaindt(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string OrderNo, int ProcessId, string RefNo, int ReturnId, string PrgNo,string OType);
        Response<IQueryable<ProductionReturnMas>> GetCommProdReturnHeaderInformation(int ProdReturnId);
        Response<IList<CommonProdReturn>> GetCommonProdRecptDetforEdit(int ReturnId);
        Response<bool> UpdateProductionReturn(Domain.ProductionReturnMas ProductionReturnAdd);        
        Response<bool> DeleteCommProdReturn(int ProdReturnid, List<ProductionReturnDet> returndetail);

        Response<IList<Prod_Return_Reason>> GetCommonProdRetReasonEditMode(int ReturnId);
    }
}
