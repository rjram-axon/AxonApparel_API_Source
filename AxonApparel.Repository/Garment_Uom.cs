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
    
    public partial class Garment_Uom
    {
        public int GUomId { get; set; }
        public string GUom { get; set; }
        public string GUom_Lookup { get; set; }
        public Nullable<byte> To_BUom { get; set; }
        public bool IsActive { get; set; }
    }
}