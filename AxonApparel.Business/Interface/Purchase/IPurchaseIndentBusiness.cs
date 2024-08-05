using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseIndentBusiness
    {
        Response<IList<PurchaseIndentMas>> ListDetails(int? Companyid, int? BuyerId, string OrdNo, string RefNo, string JobNo, string Purchase_Type, string Purchase_itemType);
        Response<IQueryable<PurchaseIndentMas>> GetDataAOrderDetails(int? companyid, string OType);
        Response<IQueryable<PurchaseIndentMas>> GetDataABuyDetails(int? companyid, string OType);
        Response<IQueryable<PurchaseIndentMas>> GetDataAWorkDetails(int? companyid, string OType);

        Response<IList<PurchaseIndentDet>> ListEntryIndItemDetails(string StyleRowId, string Purchase_Type, string Purchase_itemType);
        Response<IList<PurchaseIndentOrder>> ListEntryIndOrderDetails(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string Purchase_Type);
        Response<bool> CreatePIndOrderEntry(PurchaseIndentMas POIEntry);


        Response<IQueryable<PurchaseIndentMas>> GetDataIndMainOrderRefDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentMas>> GetDataIndMainIndEmpDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentMas>> GetDataIndMainStatusDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseIndentMas>> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate);

        Response<IQueryable<PurchaseIndentMas>> GetIndEditDetails(int Id);
        Response<IList<PurchaseIndentDet>> GetEditIndDetDetails(string IndentMasid, string Purchase_Type);
        Response<IList<PurchaseIndentOrder>> GetEditIndOrdDetails(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type);

        Response<bool> UpdatePoIndEntry(PurchaseIndentMas PoEEntry);
        Response<bool> DeletePoIndEntry(PurchaseIndentMas PoDEntry);
    }
}
