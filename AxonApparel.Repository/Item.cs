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
    
    public partial class Item
    {
        public Item()
        {
            this.FabricMaster = new HashSet<FabricMaster>();
            this.FabricYarn = new HashSet<FabricYarn>();
            this.Item_Rate = new HashSet<Item_Rate>();
            this.StyleTempMas = new HashSet<StyleTempMas>();
            this.Style = new HashSet<Style>();
            this.StyleDetail = new HashSet<StyleDetail>();
            this.StyleTempDet = new HashSet<StyleTempDet>();
        }
    
        public int ItemId { get; set; }
        public string Item1 { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> ItemGroupId { get; set; }
        public Nullable<int> Bas_Unit { get; set; }
        public Nullable<int> Pur_Unit { get; set; }
        public Nullable<int> Sec_Unit { get; set; }
        public string ItemType { get; set; }
        public string Descript { get; set; }
        public Nullable<decimal> CGST { get; set; }
        public Nullable<decimal> SGST { get; set; }
        public Nullable<decimal> IGST { get; set; }
        public string HSNCODE { get; set; }
        public Nullable<decimal> Itemrate { get; set; }
        public string Item_Cat { get; set; }
        public string lookup { get; set; }
        public string ColorOth { get; set; }
        public Nullable<decimal> conv_factor { get; set; }
        public string Percentage { get; set; }
        public Nullable<decimal> Allow_Value { get; set; }
        public string ColorNo { get; set; }
        public string GSTTaxCode { get; set; }
        public string IGSTTaxCode { get; set; }
        public string MajComp { get; set; }
        public Nullable<decimal> MinQty { get; set; }
        public Nullable<decimal> MaxQty { get; set; }
    
        public virtual ICollection<FabricMaster> FabricMaster { get; set; }
        public virtual ICollection<FabricYarn> FabricYarn { get; set; }
        public virtual ICollection<Item_Rate> Item_Rate { get; set; }
        public virtual ICollection<StyleTempMas> StyleTempMas { get; set; }
        public virtual ItemGroup ItemGroup { get; set; }
        public virtual ICollection<Style> Style { get; set; }
        public virtual ICollection<StyleDetail> StyleDetail { get; set; }
        public virtual ICollection<StyleTempDet> StyleTempDet { get; set; }
        public virtual Unit_of_measurement Unit_of_measurement { get; set; }
        public virtual Unit_of_measurement Unit_of_measurement1 { get; set; }
        public virtual Unit_of_measurement Unit_of_measurement2 { get; set; }
    }
}
