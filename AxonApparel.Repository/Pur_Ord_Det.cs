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
    
    public partial class Pur_Ord_Det
    {
        public Pur_Ord_Det()
        {
            this.Pur_Cancel_Det = new HashSet<Pur_Cancel_Det>();
            this.Pur_Grn_Order = new HashSet<Pur_Grn_Order>();
            this.pur_grn_qlty_det = new HashSet<pur_grn_qlty_det>();
            this.Pur_Inv_Det = new HashSet<Pur_Inv_Det>();
            this.Pur_Ord_BuyJob = new HashSet<Pur_Ord_BuyJob>();
        }
    
        public int Pur_Ord_DetId { get; set; }
        public int Pur_ord_id { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> SizeID { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> UOMId { get; set; }
        public decimal quantity { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal Rate { get; set; }
        public Nullable<System.DateTime> Reqdate { get; set; }
        public string ItemRemark { get; set; }
        public decimal Sec_Qty { get; set; }
        public Nullable<int> Sec_UOMid { get; set; }
        public Nullable<short> Mfrid { get; set; }
        public decimal Cancel_Qty { get; set; }
        public decimal Close_Qty { get; set; }
        public string Amend { get; set; }
        public Nullable<int> currencyid { get; set; }
        public decimal exchangerate { get; set; }
        public decimal receivable_qty { get; set; }
        public decimal Debit_qty { get; set; }
        public Nullable<decimal> RefConversion { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public string reqdatefrom { get; set; }
        public string reqdatto { get; set; }
        public string reqdateto { get; set; }
        public Nullable<decimal> CGSTAMt { get; set; }
        public Nullable<decimal> SGSTAMT { get; set; }
        public Nullable<decimal> IGSTAMT { get; set; }
        public Nullable<decimal> CGST { get; set; }
        public Nullable<decimal> SGST { get; set; }
        public Nullable<decimal> IGST { get; set; }
        public string HSNCODE { get; set; }
        public Nullable<decimal> TOTCGSTAMT { get; set; }
        public Nullable<decimal> TOTSGSTAMT { get; set; }
        public Nullable<decimal> TOTIGSTAMT { get; set; }
        public string GSTtaxcode { get; set; }
        public Nullable<int> IndDetId { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual ICollection<Pur_Cancel_Det> Pur_Cancel_Det { get; set; }
        public virtual ICollection<Pur_Grn_Order> Pur_Grn_Order { get; set; }
        public virtual ICollection<pur_grn_qlty_det> pur_grn_qlty_det { get; set; }
        public virtual ICollection<Pur_Inv_Det> Pur_Inv_Det { get; set; }
        public virtual ICollection<Pur_Ord_BuyJob> Pur_Ord_BuyJob { get; set; }
        public virtual Pur_Ord_Mas Pur_Ord_Mas { get; set; }
        public virtual PurchaseSize Size { get; set; }
    }
}
