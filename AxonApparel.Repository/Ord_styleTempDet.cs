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
    
    public partial class Ord_styleTempDet
    {
        public int TempDetId { get; set; }
        public int TemplateId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int SupplierId { get; set; }
        public int ConvertTypeId { get; set; }
        public string ConvertTypeName { get; set; }
        public decimal Qty { get; set; }
        public decimal Rate { get; set; }
        public Nullable<int> GColorid { get; set; }
        public Nullable<int> GSizeid { get; set; }
        public string Type { get; set; }
    
        public virtual OrderItem Item { get; set; }
        public virtual OrderSize Size { get; set; }
        public virtual Ord_styleTempMas Ord_styleTempMas { get; set; }
        public virtual OrderColor Color { get; set; }
        public virtual OrderSupplier Supplier { get; set; }
    }
}
