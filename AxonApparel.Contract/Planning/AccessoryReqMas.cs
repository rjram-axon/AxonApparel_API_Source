using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class AccessoryReqMas
    {
        public int AccReqID { get; set; }
        public int AccColorID { get; set; }
        public int AccSizeID { get; set; }
        public int Mode { get; set; }
        public string Apply { get; set; }
        public int ApplyID { get; set; }
        public int AccReqMasID { get; set; }
        public int itemrowseq { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int Unitid { get; set; }
        public string UOM { get; set; }
        public decimal Allowance { get; set; }
        public decimal quantity { get; set; }
        public string PlanType { get; set; }
        public int Type { get; set; }
        public string DivMul { get; set; }
        public string AutoOrMan { get; set; }
        public string ProdOrOrd { get; set; }
        public string ItemRemarks { get; set; }
        public DateTime AddDate { get; set; }
        public string LockRow { get; set; }
        public int ShopRowId { get; set; }
        public string GenPlanType { get; set; }
        public string Amend { get; set; }
        public int CreatedBy { get; set; }
        public string IsApproved { get; set; }
        public string AppDate { get; set; }
        public string OrderNo { get; set; }
        public int BuyOrdMasId { get; set; }
        public int StyleId { get; set; }
        public int CompanyId { get; set; }
        public DateTime EntryDate { get; set; }
        public int PlanId { get; set; }
        public int StyleTemplateId { get; set; }
        public decimal ProdQty { get; set; }
        public int CAItemId { get; set; }
        public int ChkCountAccReqNo { get; set; }
        public int ChkCountOrderTemp { get; set; }
       
        public List<AccessoryReqMas> AccReqMas { get; set; }
        public List<AccessoryReqDet> AccRedDet { get; set; }
        public List<TrimsSizeDetails> ComboSizeList { get; set; }
        public List<TrimsAccShipDet> ComboShipList { get; set; }
        public List<TrimsColorDetails> ComboColorList { get; set; }
        public List<TrimsStyleDetails> ComboStyleList { get; set; }
        public List<TrimsGenAuto> GenAutoList { get; set; }
        public List<TrimsGenAuto> GenManualList { get; set; }
        public List<TrimsGenAuto> GenShipmentList { get; set; }
    }
}
