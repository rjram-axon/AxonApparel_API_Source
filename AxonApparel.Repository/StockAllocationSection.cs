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
    
    public partial class StockAllocationSection
    {
        public int StockAllocationSectionID { get; set; }
        public int AllocationId { get; set; }
        public int AllocationDetID { get; set; }
        public int SectionID { get; set; }
        public decimal AllocationQty { get; set; }
        public Nullable<int> NewStockID { get; set; }
        public Nullable<int> OldStockID { get; set; }
    
        public virtual StockAllocationDet StockAllocationDet { get; set; }
        public virtual StockAllocationMas StockAllocationMas { get; set; }
        public virtual ItemStock ItemStock { get; set; }
        public virtual ItemStock ItemStock1 { get; set; }
    }
}
