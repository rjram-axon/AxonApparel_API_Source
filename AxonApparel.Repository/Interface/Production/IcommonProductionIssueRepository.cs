using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IcommonProductionIssueRepository
    {
        IQueryable<CommonProductionIssue> GetCommonProductionIssueCompDetails(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType, string RefNo, string OrdNo);
        IQueryable<CommonProductionIssueDet> GetCommonProductionIssueDetails(string NoofPrgId, string InorOut);
        IQueryable<CommonProductionJobOrderDet> GetCommonProductionJobOrdDetails(string ProdPrgId);
        IQueryable<CommonProductionStckDet> GetCommonProductionStckDet(int CompanyId, string JobOrdNo, int Itemid, int Colorid, int Sizeid,string Programid,int storeid);
        bool AddProductionIssue(ProductionIssueMas objAdd);
        bool AddProductionIssueDet(List<ProductionIssueDet> objProdIssDet, string Mode, ProductionIssueMas ProdIssueMas);
        bool AddProductionIssueJobDet(List<ProductionIssueJobDet> objProdIssJobDet, string Mode);
        bool AddProductionIssueStck(List<ProductionIssueStock> objProdIssStck, string Mode);
        IList<ProductionMainGridDetails> GetMainData(int ID, string FromDate, string ToDate, string OrderType, int ProcessId, int UnitId, int IssId, string Refno, string JobOrdNo, string OrdNo, string ProcessorType);
        IQueryable<ProductionIssueMas> GetCommProdIssueHeaderInfo(int ProdIssId);
        IQueryable<CommonProductionIssueDet> GetCommProdIssItemDetailsforEdit(int ProdIssueId);
        IQueryable<CommonProductionJobOrderDet> GetCommProdJobOrdDetailsforEdit(int ProdIssueId);
        bool UpdateData(Prod_iss_mas objUpd, List<Prod_iss_det> objdet, List<Prod_iss_JobDet> objobdet, List<Prod_Iss_Stock> objstk, List<CommonProductionStckDet> ProdIssueStck);
        IQueryable<CommonProductionStckDet> GetCommonProductionStckDetforEdit(int CompanyId, int ProdIssueId);
        bool DeleteCPIssue(Prod_iss_mas objDpd, List<Prod_iss_det> objDdet, List<Prod_iss_JobDet> objDobdet, List<Prod_Iss_Stock> objDstk);
    }
}
