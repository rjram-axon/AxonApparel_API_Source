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
    
    public partial class ProductionItemStock
    {
        public ProductionItemStock()
        {
            this.Item_stock_outward = new HashSet<ProductionItem_stock_outward>();
            this.DespatchStock = new HashSet<DespatchStock>();
            this.Production_Ord_Stock = new HashSet<Production_Ord_Stock>();
            this.Cutting_Wastage_Det = new HashSet<Cutting_Wastage_Det>();
            this.Prod_Iss_Stock = new HashSet<Prod_Iss_Stock>();
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
    
        public virtual ICollection<ProductionItem_stock_outward> Item_stock_outward { get; set; }
        public virtual ICollection<DespatchStock> DespatchStock { get; set; }
        public virtual ICollection<Production_Ord_Stock> Production_Ord_Stock { get; set; }
        public virtual ICollection<Cutting_Wastage_Det> Cutting_Wastage_Det { get; set; }
        public virtual ICollection<Prod_Iss_Stock> Prod_Iss_Stock { get; set; }
    }
}