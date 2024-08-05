using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IBudgetRepository
    {
        IQueryable<Budget> DisplayBuyerOrderBom(string order_no ,int styleid);
        IQueryable<Budget> GetBuyerOrder_Store_valuesforproc(string type,string order_no, int styleid,int costid,int mode,int strwid);
        IQueryable<Budget> GetBuyerOrder_Store_valuesforprodtn(string type, string order_no, int styleid, int costid, int mode, int strwid);
        IQueryable<Budget> GetBuyerOrder_valuess1(string type, string order_no, int styleid, int costid,int mode,int strwid);
        IQueryable<Budget> GetBuyerOrder_valuess2(string type, string order_no, int styleid, int costid, int mode, int strwid);
        IQueryable<Budget> GetPreProcessdet(int Proessid, int Itemid, int Colorid, int sizeid);

        IQueryable<Budget> GetBudgetDetailscommdet(string type, int costid, string orderno, int mode,int styleid);
        IQueryable<Budget> GetBudgetDetailsBomedit(string type, int costid, string orderno, int mode,int styleid);
        IQueryable<Budget> GetBudgetDetailsmasteredit(string type, int costid, string orderno, int mode, int styleid);
        IQueryable<Budget> GetBudgetOrderDetails(string orderno, int styleid);
        IQueryable<Budget> GetShipmentwiserate(int stylerowid);
   
        bool AddDetData(Cost_Defn_Mas objAd,List<Cost_Defn_BOM> objCDet,List<Cost_Defn_Com> objcom, string Mode, int ProdId = 0);
        bool UpdateData(Cost_Defn_Mas objupd, List<Cost_Defn_BOM> objCDet, List<Cost_Defn_Com> objcom, string Mode, int ProdId = 0);
        bool AmendData(Cost_Defn_Mas objAd, List<Cost_Defn_BOM> objCDet, List<Cost_Defn_Com> objcom, string Mode);
        bool DeleteData(int id);
        IQueryable<Budget> GetBOMCopy(string OrderNo, int Styleid);
        IQueryable<ProcessQuote> GetProcQuoteDet(int ProcId, string WorkOrdno);
        IQueryable<Vendor> GetPurchaseQuoteDet(string OrdNo, int ItemId, int colorId, int SizeId);
         
    }
}
