using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public interface ITrimsAccessoryBusiness
    {
        Response<Domain.Item> GetUom(int ItemId);
        Response<IQueryable<TrimsAccessory>> GetTrimsDetails(string OrderNo);
        Response<IQueryable<TrimsSizeDetails>> GetTrimsSizeDetails(string OrderNo, int StyleId, int ItemId);
        Response<IList<Domain.TrimsColorDetails>> GetTrimsColorDetails(string OrderNo, int StyleId, int ItemId);
        Response<int> CreateAccessories(decimal Allow, decimal totqty, List<AccessoryReqMas> accreq, List<TrimsAccShipDet> accreqship, List<TrimsColorDetails> ComboColorList, List<TrimsSizeDetails> ComboSizeList, List<TrimsStyleDetails> ComboStyleList, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj);
        Response<IQueryable<AccessoryReqMas>> GetAccReqInfo(AccessoryReqMas objdet);
        Response<IQueryable<AccessoryReqMas>> GetAccReqMasDet(int AccReqid);
        Response<IQueryable<AccessoryReqDet>> GetAccReqColorSizeDet(int AccReqMasid);
        Response<IQueryable<AccessoryReqMas>> Getloadedit(int pid);
        Response<IQueryable<TrimsColorDetails>> GetColor();
        Response<bool> TrimsBOMAppChecking(string Orderno, int styleid, int itemid, int PlanTypeId, string ApplyType);
        Response<IQueryable<TrimsStyleDetails>> GetTrimsStyleDetails(string OrderNo, int StyleId, int ItemId, int AccItemId);
        Response<IQueryable<TrimsItemDetails>> GetAccorPacDet(string OrderNo, int StyleId, int Itemid);
        Response<IList<Domain.TrimsColorDetails>> GetTrimsColorDetailsForEdit(string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanType, string applytype);
        Response<IList<Domain.TrimsSizeDetails>> GetTrimsSizeDetailsForEdit(string OrderNo, int ItemId, int StyleId, int PlanType, int applyid, int StyleItemid);
        Response<IList<Domain.TrimsStyleDetails>> GetTrimsStyleDetailsForEdit(string OrderNo, int ItemId, int StyleId, int StyleItemid);
        Response<int> UpdateAccessories(Domain.AccessoryReqMas accreq);
        Response<IList<Domain.TrimsGenAuto>> GetTrimsGeneralForEdit(string ApplyType, string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanTypeId);
        Response<IList<Domain.TrimsColorDetails>> GetAccShipColorDetails(string Type, string OrderNo, int StyleId, int ItemId);
        Response<IList<Domain.TrimsAccShipDet>> GetAccShipmentDet(string Type, string OrderNo, int ItemId, int StyleId);
        Response<bool> DeleteAccessories(int AccMasID, string orderno, int styleid, List<TrimsColorDetails> ComboColor, List<TrimsSizeDetails> ComboSize, List<TrimsStyleDetails> ComboStyle, int Mode, int PlanId, List<TrimsGenAuto> Genauto, List<TrimsGenAuto> GenManual, List<TrimsGenAuto> GenShip);
        Response<int> CreateStyleTemplateAcc(decimal Allow, decimal totqty, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj);
        Response<IQueryable<TrimsColorDetails>> GetSize();
        Response<IQueryable<TrimsColorDetails>> GetFabSize();
        Response<int> CreateStyleTemplate(string OrderNo, int Styleid, string Stylename);
        Response<IQueryable<AccessoryReqMas>> GetCheckItemDetails(string orderno, int StyleId, int Itemid, int CAItemId, int ApplyID, string AutoOrMan);
        Response<IQueryable<AccessoryReqMas>> GetDataCheckPlanTrimTempDetails(string orderno, int StyleId, int Itemid, int CAItemId);
        Response<int> Loadordtemp(string OrderNo, int StyleId, int Itemid, int Userid, int Stytempid);
    }
}
