using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseIndentApprovalRepository
    {


        IQueryable<PurchaseIndentApprovalMas> GetDataIndMoRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentApprovalMas> GetDataIndMIRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentApprovalMas> GetDataIndMSRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentApprovalMas> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate, string AppType);
        IQueryable<PurchaseIndentApprovalMas> GetDataRepEditIndDetails(int Id);


        IList<PurchaseIndentApprovalDet> GetRepEntryEditIndItemLoad(string IndentMasid, string Purchase_Type);
        IList<PurchaseIndentApprovalOrder> GetRepEntryEditIndOrderLoad(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type);

        bool ApprovalDetData(Indent_Mas objPoEEntry);
        bool RevertData(Indent_Mas objPoREntry);

    }
}
