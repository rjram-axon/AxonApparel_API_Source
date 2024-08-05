using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseIndentApprovalBusiness
    {

        Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainOrderRefDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainIndEmpDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainStatusDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentApprovalMas>> GetDataPurIndMainAppDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate, string AppType);

        Response<IQueryable<PurchaseIndentApprovalMas>> GetIndEditDetails(int Id);
        Response<IList<PurchaseIndentApprovalDet>> GetEditIndDetDetails(string IndentMasid, string Purchase_Type);
        Response<IList<PurchaseIndentApprovalOrder>> GetEditIndOrdDetails(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type);

        Response<bool> AppPoIndEntry(PurchaseIndentApprovalMas PoEEntry);
        Response<bool> RevPoIndEntry(PurchaseIndentApprovalMas PoDEntry);
    }
}
