using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITrimsRepository
    {
        IQueryable<TrimsAccessory> GetTrimsDetails(string OrderNo);
        IQueryable<PlanningItem> GetUomName(int ItemId);
        bool AddData(List<Acc_Req_Mas> objAccReqMas, List<TrimsAccShipDet> accreqship, List<TrimsColorDetails> ComboColorList, List<TrimsSizeDetails> ComboSizeList, List<TrimsStyleDetails> ComboStyleList, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj);
        IQueryable<TrimsSizeDetails> GetTrimsSizeDetails(string OrderNo, int ItemId, int StyleId);
        IList<TrimsColorDetails> GetTrimsColorDetails(string OrderNo, int ItemId, int StyleId);
        IQueryable<AccessoryReqMas> GetAccReqId(AccessoryReqMas objdet);
        IQueryable<AccessoryReqMas> GetAccReqMasandDet(int accreqid);
        IQueryable<AccessoryReqDet> GetAccReqColorSizeDet(int accreqmasid);
        IQueryable<AccessoryReqMas> Getloadedit(int pid);
        IQueryable<TrimsColorDetails> GetColor();
        IQueryable<TrimsColorDetails> GetSize();
        IQueryable<TrimsColorDetails> GetFSize();
        bool BOMApprovalChecking(string orderno, int styleid, int itemid, int PlanTypeId, string ApplyType);
        IQueryable<TrimsStyleDetails> GetTrimsStyleDetails(string OrderNo, int ItemId, int StyleId, int AccItemId);
        IList<TrimsColorDetails> GetTrimsColorDetailsForEdit(string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanType, string applytype);
        IList<TrimsSizeDetails> GetTrimsSizeDetailsForEdit(string OrderNo, int ItemId, int StyleId, int PlanType, int applyid,int StyleItemid);
        IList<TrimsStyleDetails> GetTrimsStyleDetailsForEdit(string OrderNo, int ItemId, int StyleId, int StyleItemid);
        IQueryable<TrimsItemDetails> GetAccorPackDet(string OrderNo, int StyleId, int Itemid);
        bool UpdateData(AccessoryReqMas objmas);
        IList<TrimsColorDetails> GetAssignShipColorSize(string Type, string OrderNo, int ItemId, int StyleId);
        IList<TrimsAccShipDet> GetAccShipDet(string Type, string OrderNo, int ItemId, int StyleId);
        IList<TrimsGenAuto> GetTrimsGeneralDetForEdit(string ApplyType, string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanTypeId);
        bool DeleteAccess(int id, string orderno, int styleid, List<TrimsColorDetails> ComboColor, List<TrimsSizeDetails> ComboSize, List<TrimsStyleDetails> ComboStyle, int Mode, int PlanId, List<TrimsGenAuto> Genauto, List<TrimsGenAuto> GenManual, List<TrimsGenAuto> GenShip);
        bool AddStyleTemplateData(string Orderno, DateTime EntryDate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj);
        bool AddStyleTemplateMaster(string OrderNo, int Styleid, string Stylename);
        IQueryable<AccessoryReqMas> GetDataBussCheckItemDetails(string orderno, int StyleId, int Itemid, int CAItemId, int ApplyID, string AutoOrMan);

        IQueryable<AccessoryReqMas> GetDataRepCheckPlanTrimTempDetails(string orderno, int StyleId, int Itemid, int CAItemId);
        bool Loadordtemp(string OrderNo, int StyleId, int Itemid, int Userid, int Stytempid);
    }
}
