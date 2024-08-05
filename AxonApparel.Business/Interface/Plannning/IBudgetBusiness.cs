using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IBudgetBusiness
    {
       Response< IQueryable<Budget>> DisplayBuyerOrderBom(string order_no, int styleid);
       Response<IQueryable<Budget>> GetBuyerOrder_Store_valuesforproc(string type, string order_no, int styleid, int costid,int mode,int strwid);
       Response<IQueryable<Budget>> GetBuyerOrder_Store_valuesforprodtn(string type, string order_no, int styleid, int costid, int mode, int strwid);
       Response<IQueryable<Budget>> GetBuyerOrder_valuess1(string type, string order_no, int styleid, int costid,int mode,int strwid);
       Response<IQueryable<Budget>> GetBuyerOrder_valuess2(string type, string order_no, int styleid, int costid, int mode, int strwid);
        Response< IQueryable<Budget>> GetBudgetDetails(string type, int costid,string orderno,int mode,int styleid);

        Response<IQueryable<Budget>> GetPreProcessdet(int Proessid, int Itemid, int Colorid, int sizeid);

        Response<IQueryable<Budget>> GetBudgetDetailsBomedit(string type, int costid, string orderno, int mode,int styleid);
        Response<IQueryable<Budget>> GetBudgetDetailsMasteredit(string type, int costid, string orderno, int mode, int styleid);
        Response< IQueryable<Budget>> GetBudgetOrderDetails(string orderno, int styleid);
        Response<IQueryable<Budget>> GetShipmentwiserate(int stylerowid);
        Response<int> Add(Cost_Defn_Mas obj);
        Response<bool> Update(Cost_Defn_Mas obj);
        Response<bool> Delete(int id);
        Response<IQueryable<Budget>> GetBOMCopy(string OrderNo, int Styleid);
        Response<IQueryable<ProcessQuote>> GetProcessQuoteDet(int ProcId, string WorkOrdNo);
        Response<IQueryable<Vendor>> GetPurchaseQuoteDet(string OrdNo, int ItemId, int colorId, int SizeId);
       
    }
}
