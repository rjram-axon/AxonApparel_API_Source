using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ICuttingOrderReturnRepository
    {
        IQueryable<CuttingReturn> GetCuttingReturnDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string OrderNo, int buyerid, string jobordno, string inorext);
        IQueryable<CuttingReturn> GetCuttingReturnHeaderDetails(string JobOrdNo);
        IQueryable<CuttingReturnDetail> GetCuttingReturnDetDetails(int IssueId);
        IQueryable<Domain.Cutting_Wastage_Det> ListCuttingReturnWastageDetailsEdit(int RetId);
          IQueryable<CuttingReturnDetail> GetCuttingReturnOpDetDetails(int IssueId);
          IQueryable<CuttingReturnDetail> GetCuttingReturnOpDetEditDetails(int IssueId, int RetId);
        int AddData(CuttingReturn objAdd,List<Domain.CuttingReturnDetail>ReturnDet,List<Cutting_Wastage_Det>Wastedet);
        int UpdateData(CuttingReturn objAdd,  List<Cutting_Wastage_Det> Wastedet);
        bool AddCuttingReceiptDet(List<CuttingReturnDetail> objCuttingreturnDet, string Mode);
        bool AddCuttingWastageDet(List<Cutting_Wastage_Det> objCuttingwasteDet, string Mode);
        bool UpdateCuttingReturnTables(string CuttingRetNo, string Mode);
        IList<CuttingReturn> GetMainData(int ID, string OrderType, string InterExternal, string FromDate, string ToDate, string jobordno, string orderno, string RefNo,int Supplierid,int employeeid);
        IQueryable<CuttingReturn> GetCuttingReturnHeaderInfo(int ReturnID, string JobOrdNo, string CuttingRetNo, int CuttIssueId);
        bool UpdateData(CuttingReturn objUpd);
        bool DeleteData(int id);
    }
}
