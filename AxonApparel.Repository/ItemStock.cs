//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AxonApparel.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class ItemStock
    {
        public ItemStock()
        {
            this.Item_stock_outward = new HashSet<Item_stock_outward>();
            this.StockAllocationSection = new HashSet<StockAllocationSection>();
            this.ItemTransDet = new HashSet<ItemTransDet>();
            this.ItemTransDet1 = new HashSet<ItemTransDet>();
            this.LotSplitDet = new HashSet<LotSplitDet>();
            this.Pur_Return_Det = new HashSet<Pur_Return_Det>();
            this.StockAllocationDet = new HashSet<StockAllocationDet>();
            this.StockAllocationSection1 = new HashSet<StockAllocationSection>();
            this.Stock_Audit_Det = new HashSet<Stock_Audit_Det>();
            this.StockTranStock = new HashSet<StockTranStock>();
            this.StockTranStock1 = new HashSet<StockTranStock>();
            this.Stores_Issue_ReturnDet = new HashSet<Stores_Issue_ReturnDet>();
            this.Stores_Issue_Stock = new HashSet<Stores_Issue_Stock>();
            this.FABRIC_SALES_DET = new HashSet<FABRIC_SALES_DET>();
            this.StockTransfer_Approval = new HashSet<StockTransfer_Approval>();
        }
    
        public int StockId { get; set; }
        public Nullable<int> UnitId { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public decimal qty { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public string joborderNo { get; set; }
        public string TransType { get; set; }
        public string Transno { get; set; }
        public Nullable<decimal> alloted { get; set; }
        public string ItemCat { get; set; }
        public Nullable<int> processId { get; set; }
        public Nullable<decimal> sQty { get; set; }
        public string lotNo { get; set; }
        public Nullable<decimal> balQty { get; set; }
        public string purorprod { get; set; }
        public Nullable<System.DateTime> transdate { get; set; }
        public Nullable<int> companyid { get; set; }
        public Nullable<int> supplierid { get; set; }
        public Nullable<decimal> return_qty { get; set; }
        public Nullable<int> uomid { get; set; }
        public Nullable<int> MfrId { get; set; }
        public Nullable<int> Styleid { get; set; }
        public string unit_or_other { get; set; }
        public string ReProg { get; set; }
        public string StockType { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> Markup_Rate { get; set; }
        public string CatType { get; set; }
        public Nullable<int> GuomId { get; set; }
        public string ItemCode { get; set; }
        public string BundleNo { get; set; }
        public string OrderIdent { get; set; }
        public string FabricGSM { get; set; }
        public Nullable<int> StoreUnitID { get; set; }
        public Nullable<int> SectionID { get; set; }
        public Nullable<System.DateTime> StockDate { get; set; }
        public Nullable<int> ShipRowId { get; set; }
        public string BARCODE { get; set; }
        public string slno { get; set; }
        public string Buy_ord_Ship { get; set; }
        public Nullable<decimal> GSM { get; set; }
        public string BatchNo { get; set; }
        public string RollNo { get; set; }
        public string SkuNo { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual ICollection<Item_stock_outward> Item_stock_outward { get; set; }
        public virtual ICollection<StockAllocationSection> StockAllocationSection { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual ICollection<ItemTransDet> ItemTransDet { get; set; }
        public virtual ICollection<ItemTransDet> ItemTransDet1 { get; set; }
        public virtual ICollection<LotSplitDet> LotSplitDet { get; set; }
        public virtual ICollection<Pur_Return_Det> Pur_Return_Det { get; set; }
        public virtual ICollection<StockAllocationDet> StockAllocationDet { get; set; }
        public virtual ICollection<StockAllocationSection> StockAllocationSection1 { get; set; }
        public virtual ICollection<Stock_Audit_Det> Stock_Audit_Det { get; set; }
        public virtual ICollection<StockTranStock> StockTranStock { get; set; }
        public virtual ICollection<StockTranStock> StockTranStock1 { get; set; }
        public virtual ICollection<Stores_Issue_ReturnDet> Stores_Issue_ReturnDet { get; set; }
        public virtual ICollection<Stores_Issue_Stock> Stores_Issue_Stock { get; set; }
        public virtual ICollection<FABRIC_SALES_DET> FABRIC_SALES_DET { get; set; }
        public virtual ICollection<StockTransfer_Approval> StockTransfer_Approval { get; set; }
    }
}
