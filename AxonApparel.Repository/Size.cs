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
    
    public partial class Size
    {
        public Size()
        {
            this.FabricYarn = new HashSet<FabricYarn>();
            this.Item_Rate = new HashSet<Item_Rate>();
            this.StyleTempDet = new HashSet<StyleTempDet>();
        }
    
        public int SizeId { get; set; }
        public string size1 { get; set; }
        public string Item_Type { get; set; }
        public string lookup { get; set; }
        public decimal ActualSize { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> SeqNo { get; set; }
    
        public virtual ICollection<FabricYarn> FabricYarn { get; set; }
        public virtual ICollection<Item_Rate> Item_Rate { get; set; }
        public virtual ICollection<StyleTempDet> StyleTempDet { get; set; }
    }
}
