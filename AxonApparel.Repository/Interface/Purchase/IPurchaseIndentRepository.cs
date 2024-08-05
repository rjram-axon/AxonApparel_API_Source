using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseIndentRepository
    {
        IList<PurchaseIndentMas> GetRepLoad(int? Companyid, int? BuyerId, string OrdNo, string RefNo, string JobNo, string Purchase_Type, string Purchase_itemType);
        IQueryable<PurchaseIndentMas> GetDataOrderRepDetails(int? CompId, string OType);
        IQueryable<PurchaseIndentMas> GetDataBuyRepDetails(int? CompId, string OType);
        IQueryable<PurchaseIndentMas> GetDataWorkRepDetails(int? CompId, string OType);

        IList<PurchaseIndentDet> GetRepEntryIndItemLoad(string StyleRowId, string Purchase_Type, string Purchase_itemType);
        IList<PurchaseIndentOrder> GetRepEntryIndOrderLoad(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string Purchase_Type);

        bool AddDetData(Indent_Mas objPoIEntry, List<Indent_Det> objPoIDet, List<Indent_BuyJob> objPoIOrd);

        IQueryable<PurchaseIndentMas> GetDataIndMoRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentMas> GetDataIndMIRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentMas> GetDataIndMSRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentMas> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate);
        IQueryable<PurchaseIndentMas> GetDataRepEditIndDetails(int Id);


        IList<PurchaseIndentDet> GetRepEntryEditIndItemLoad(string IndentMasid, string Purchase_Type);
        IList<PurchaseIndentOrder> GetRepEntryEditIndOrderLoad(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type);

        bool UpdateDetData(Indent_Mas objPoEEntry, List<Indent_Det> objPoEDet, List<Indent_BuyJob> objPoEOrd);
        bool DeleteData(List<Indent_BuyJob> objPoEOrd,int IndMasId,string OrdType);

    }
}
