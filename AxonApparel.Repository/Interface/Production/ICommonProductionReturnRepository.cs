using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ICommonProductionReturnRepository
    {
        IQueryable<CommonProdReturn> GetCommonProductionMultipleIssueDet(string InterorExter, int CompanyId, int Processorid, string OrderType, int OrdNo, int RefNo, int SupplierId, int StyleId, int IssueId);
        IQueryable<CommonProdReturn> GetCommonProductionReceiptDet(string ProdIssueId);
        IQueryable<Domain.Prod_Return_Reason> GetCommonProdRetReasonEditMode(int ProdIssueId);

        bool AddProductionReturn(ProductionReturnMas objAdd);
        IList<ProductionReturnMainDetail> GetMainData(int ID, string FromDate, string ToDate, string InterExter, string OrderNo, int ProcessId, string RefNo, int ReturnId, string PrgNo, string OType);
        IQueryable<ProductionReturnMas> GetCommonProductionHeaderInfo(int ReturnId);
        IQueryable<CommonProdReturn> GetCommonProdRecptDetEditMode(int ReturnId);
        bool UpdateProductionReturn(ProductionReturnMas objAdd);        
        bool DeleteReturn(int id, List<ProductionReturnDet> returndetail);
    }
}
