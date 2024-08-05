using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IBitCuttingOrderReturnBusiness
    {
        Response<IQueryable<CuttingReturn>> GetCuttingReturnDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string OrderNo, int buyerid, string jobordno, string inorext,int Processid);
        Response<IQueryable<CuttingReturn>> GetCuttingReturnHeadDetails(string JobOrdNo);
        Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnDetDetails(int Issueid);
        Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnOpDetDetails(int Issueid);
        Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnOpDetEditDetails(int IssueId,int RetId);

        Response<IQueryable<Cutting_Wastage_Det>> ListCuttingReturnWastageDetailsEdit(int RetId);

        Response<int> CreateCuttingReturn(Domain.CuttingReturn CuttingReturnAdd);
        Response<IList<Domain.CuttingReturn>> GetMaindt(int Id, string OrderType, string InterExternal, string Fromdate, string Todate, string jobordno, string orderno, string refno, int Supplierid, int employeeid, int Processid);
        Response<IQueryable<CuttingReturn>> ReturnHeaderInformation(int ReturnID, string JobOrdNo, string CuttingRetNo, int CuttIssueId);
        Response<bool> UpdateCuttingOrderReturn(Domain.CuttingReturn CuttingOrderUpd);
        Response<bool> DeleteCuttingOrder(int CuttingReturnId);
    }
}
