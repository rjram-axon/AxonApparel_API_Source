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
    
    public partial class OrderColor
    {
        public OrderColor()
        {
            this.Buy_Ord_Det = new HashSet<Buy_Ord_Det>();
            this.Buy_Ord_Det1 = new HashSet<Buy_Ord_Det>();
            this.Buy_Ord_Det2 = new HashSet<Buy_Ord_Det>();
            this.Buy_Ord_Det_Amend = new HashSet<Buy_Ord_Det_Amend>();
            this.Buy_Ord_Det_Amend1 = new HashSet<Buy_Ord_Det_Amend>();
            this.Buy_Ord_Det_Amend2 = new HashSet<Buy_Ord_Det_Amend>();
            this.Buy_Ord_OrderDet = new HashSet<Buy_Ord_OrderDet>();
            this.Buy_Ord_OrderDet_Amend = new HashSet<Buy_Ord_OrderDet_Amend>();
            this.ComboColor = new HashSet<ComboColor>();
            this.ComboColor1 = new HashSet<ComboColor>();
            this.Job_Ord_BomDet = new HashSet<Job_Ord_BomDet>();
            this.Job_Ord_Color_Amend = new HashSet<Job_Ord_Color_Amend>();
            this.Job_Ord_Color = new HashSet<Job_Ord_Color>();
            this.Job_Ord_Sum = new HashSet<Job_Ord_Sum>();
            this.Ord_styleTempDet = new HashSet<Ord_styleTempDet>();
            this.Program_Summary = new HashSet<Program_Summary>();
            this.Program_Summary_Amend = new HashSet<Program_Summary_Amend>();
            this.Comboitem_Composition = new HashSet<Comboitem_Composition>();
            this.MarkEnqFabric = new HashSet<MarkEnqFabric>();
            this.MarkEnqItemDet = new HashSet<MarkEnqItemDet>();
            this.Courier_Det = new HashSet<Courier_Det>();
        }
    
        public int Colorid { get; set; }
        public string Colorname { get; set; }
        public string Color1 { get; set; }
        public string Lookup { get; set; }
        public string ColorOth { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> ColorGroupID { get; set; }
        public string ColorCode { get; set; }
        public string Pantone { get; set; }
        public string ColorNo { get; set; }
    
        public virtual ICollection<Buy_Ord_Det> Buy_Ord_Det { get; set; }
        public virtual ICollection<Buy_Ord_Det> Buy_Ord_Det1 { get; set; }
        public virtual ICollection<Buy_Ord_Det> Buy_Ord_Det2 { get; set; }
        public virtual ICollection<Buy_Ord_Det_Amend> Buy_Ord_Det_Amend { get; set; }
        public virtual ICollection<Buy_Ord_Det_Amend> Buy_Ord_Det_Amend1 { get; set; }
        public virtual ICollection<Buy_Ord_Det_Amend> Buy_Ord_Det_Amend2 { get; set; }
        public virtual ICollection<Buy_Ord_OrderDet> Buy_Ord_OrderDet { get; set; }
        public virtual ICollection<Buy_Ord_OrderDet_Amend> Buy_Ord_OrderDet_Amend { get; set; }
        public virtual ICollection<ComboColor> ComboColor { get; set; }
        public virtual ICollection<ComboColor> ComboColor1 { get; set; }
        public virtual ICollection<Job_Ord_BomDet> Job_Ord_BomDet { get; set; }
        public virtual ICollection<Job_Ord_Color_Amend> Job_Ord_Color_Amend { get; set; }
        public virtual ICollection<Job_Ord_Color> Job_Ord_Color { get; set; }
        public virtual ICollection<Job_Ord_Sum> Job_Ord_Sum { get; set; }
        public virtual ICollection<Ord_styleTempDet> Ord_styleTempDet { get; set; }
        public virtual ICollection<Program_Summary> Program_Summary { get; set; }
        public virtual ICollection<Program_Summary_Amend> Program_Summary_Amend { get; set; }
        public virtual ICollection<Comboitem_Composition> Comboitem_Composition { get; set; }
        public virtual ICollection<MarkEnqFabric> MarkEnqFabric { get; set; }
        public virtual ICollection<MarkEnqItemDet> MarkEnqItemDet { get; set; }
        public virtual ICollection<Courier_Det> Courier_Det { get; set; }
    }
}
