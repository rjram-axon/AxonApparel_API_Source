using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IBuyOrderStyleRepository
    {
        buy_ord_style GetDataById(int id, string styletype = "");
        IQueryable<buy_ord_style> GetDataList();
        Buy_Ord_Mas GetOrderRefNo(int Orderid);
        IQueryable<MarkEnqMas> GetEnquiryNo();
        IQueryable<OrderItem> GetItemByStyle(int Styleid);
        bool GetShipmentChecking(int id);
        bool AddSizeDetData(List<Combosize> objCDet, string Mode);
        bool AddColorDetData(List<ComboColor> objCDet, string Mode);
        bool AddItemDetData(List<ComboItem> objCDet, string Mode);
        bool AddItemCompsitionDetData(List<Comboitem_Composition> objCDet, string Mode);
        IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid);
        IQueryable<BuyOrderStyle> GetTargetDataRepList(string buyormasid);
        IQueryable<BuyOrderStyle> GetOrderno(int BMasId);
        bool AddData(buy_ord_style objAdd);
        bool UpdateData(buy_ord_style objUpd);
        bool DeleteData(int id);
        IQueryable<BuyOrderStyle> GetDataRepCheckShipPlanDetails(string OrdNo,int Styleid);
        IQueryable<BuyOrderStyle> GetStylerowidDetails(string OrdNo, int Styleid);
        buy_ord_style CheckRepStyle(int Styleid, string OrdNo);
        OrderStyleHeader StyleHeaderInfo(int Styleid);
        IQueryable<Domain.Style> GetStyleNo(string orderno);
        IQueryable<Domain.BuyOrdImg> GetStlyeImglist();
        IQueryable<Domain.BuyOrdImg> GetStlyeImgdet(string Style, string Orderno);
        IQueryable<Domain.BuyOrderStyle> GetStlyeImgOrder(string Style);
    }
}
