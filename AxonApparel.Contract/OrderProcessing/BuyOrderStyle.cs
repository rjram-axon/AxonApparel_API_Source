using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BuyOrderStyle
    {
        public int ItemCount { get; set; }
        public int GCount { get; set; }
        public int GItem_Id { get; set; }
        public string Template1 { get; set; }
        public int Template_Id { get; set; }
        public int StyleRowid { get; set; }
        public string order_no { get; set; }
        public string Ref_No { get; set; }
        public int Styleid { get; set; }
        public string styleName { get; set; }
        public int categoryid { get; set; }
        public decimal quantity { get; set; }
        public decimal OrderQuantity { get; set; }
        public decimal StyQty { get; set; }
        public decimal BalStyQty { get; set; }
        public int BShipNo { get; set; }
        public float price { get; set; }
        public float value { get; set; }
        public float job_qty { get; set; }
        public string LongDesc { get; set; }
        public bool cost_estimated { get; set; }
        public DateTime styleentdate { get; set; }
        public float AllowancePer { get; set; }
        public float ProductionQty { get; set; }
        public string packplan_thru { get; set; }
        public string Amend { get; set; }
        public string Yarn_Amend { get; set; }
        public int Buyerid { get; set; }
        public string BuyerName { get; set; }
        public string Acc_Amend { get; set; }
        public string Pack_Amend { get; set; }
        public string Despatch_Closed { get; set; }
        public float despatch_qty { get; set; }
        public string Unit_Type { get; set; }
        public string cutG_Amend { get; set; }
        public int Grouped_StyleID { get; set; }
        public bool Grouped { get; set; }
        public string WORKORDER { get; set; }
        public int Company_Unitid { get; set; }
        public string TransferredTo { get; set; }
        public string Transfer { get; set; }
        public int Base_Unit { get; set; }
        public int Enquiryid { get; set; }
        public string BuyerArt { get; set; }
        public DateTime OrderDate { get; set; }
        public string buyerItem { get; set; }
        public string OpenPrgAmend { get; set; }
        public int SampleStyleId { get; set; }
        public DateTime shipentdate { get; set; }
        public int SeasonId { get; set; }
        public int GuomId { get; set; }
        public int GuomConversion { get; set; }
        public int GarmentGsm { get; set; }
        public int ProcessUnitID { get; set; }
        public int CreatedBy { get; set; }
        public bool IsSeQPrgmLock { get; set; }
        public float prs_loss { get; set; }
        public int mis_tmArchive { get; set; }
        public int mis_type { get; set; }
        public int Cancel { get; set; }
        public int ColorSeqofComboColor { get; set; }
        public decimal CADWeight { get; set; }
        public decimal CADPercentage { get; set; }
        public string PA { get; set; }
        public string Description { get; set; }

        public string Type { get; set; }
        //public int OrderId { get; set; }
        public int buyormasid { get; set; }
        public int JobcountId { get; set; }
        public int StyleAmend { get; set; }
        public int CurrencyId { get; set; }
        public decimal ExRate { get; set; }
        public int CheckBom { get; set; }
        public int CheckShip { get; set; }
        public int StyApp { get; set; }
        public int ShipApp { get; set; }
        public int MeasCount { get; set; }
        public int PrecostingCount { get; set; }
        public int PrecostingfabCount { get; set; }
        public int Trimsconsumption { get; set; }
        public int chkrate { get; set; }
        public int AppCount { get; set; }
        public List<Domain.ComboSize> ComboSize { get; set; }
        public List<Domain.ComboColor> ComboColor { get; set; }
        public List<Domain.ComboItem> ComboStyleItem { get; set; }
        public List<Domain.ComboItemComposition> ComboItemComposition { get; set; }
        public List<Domain.BuyOrdImg> Buyordimg { get; set; }
        public int OrderItemCount { get; set; }

        public string Currency { get; set; }
        public string FabricDet { get; set; }
        public string Company { get; set; }
    }
}
