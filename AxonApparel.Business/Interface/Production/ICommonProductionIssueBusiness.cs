using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ICommonProductionIssueBusiness
    {
        Response<IList<CommonProductionIssue>> GetCommonProductionIssueDet(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType, string RefNo, string OrdNo);
        Response<IList<CommonProductionIssueDet>> GetCommonProductionIssueItemStckDet(string NoofPrgId, string InorOut);
        Response<IList<CommonProductionJobOrderDet>> GetCommonProductionJobOrderDet(string ProdPrgId);
        Response<IList<CommonProductionStckDet>> GetCommonProductionJobOrderDet(int CompanyId, string JobOrdNo, int Itemid, int Colorid, int Sizeid,string Programid,int storeid);
        Response<bool> CreateProductionIss(Domain.ProductionIssueMas ProductionIssAdd);
        Response<IList<Domain.ProductionMainGridDetails>> GetMaindt(int CompId, string Fromdate, string Todate, string OrderType, int ProcessId, int UnitId, int IssId, string Refno, string JobOrdNo, string OrdNo, string ProcessorType);
        Response<IQueryable<ProductionIssueMas>> GetCommProdIssHeaderInformation(int ProdIssueId);
        Response<IList<CommonProductionIssueDet>> GetCommProdIssueItemDetforEdit(int ProdIssueId);
        Response<IList<CommonProductionJobOrderDet>> GetCommonProductionJobOrderDet(int ProdIssueId);
        Response<bool> UpdateCommProdIss(Domain.CommonProductionIssue ProductionIssUpdate);
        Response<IList<CommonProductionStckDet>> GetCommonProductionJobOrderDetforEdit(int CompanyId, int ProdIssueId);
        Response<bool> DeleteCommProdIssue(Domain.CommonProductionIssue ProductionIssDelete);
    }
}
