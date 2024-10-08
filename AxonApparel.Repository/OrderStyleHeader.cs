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
    
    public partial class OrderStyleHeader
    {
        public OrderStyleHeader()
        {
            this.Buy_Ord_Ship = new HashSet<Buy_Ord_Ship>();
            this.Buy_Ord_Ship_Amend = new HashSet<Buy_Ord_Ship_Amend>();
            this.buy_ord_style = new HashSet<buy_ord_style>();
            this.Job_Ord_BOMMas = new HashSet<Job_Ord_BOMMas>();
            this.Program_Summary = new HashSet<Program_Summary>();
            this.Program_Summary_Amend = new HashSet<Program_Summary_Amend>();
            this.Ord_styleTempMas = new HashSet<Ord_styleTempMas>();
            this.Planning_Mas = new HashSet<OrderPlanning_Mas>();
            this.buyordapptitle = new HashSet<buyordapptitle>();
            this.Job_Ord_Mas = new HashSet<Job_Ord_Mas>();
            this.MarkEnqStyle = new HashSet<MarkEnqStyle>();
        }
    
        public int StyleId { get; set; }
        public string Style { get; set; }
        public string ArticleNo { get; set; }
        public string Season { get; set; }
        public string DesignName { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> Itemid { get; set; }
    
        public virtual ICollection<Buy_Ord_Ship> Buy_Ord_Ship { get; set; }
        public virtual ICollection<Buy_Ord_Ship_Amend> Buy_Ord_Ship_Amend { get; set; }
        public virtual ICollection<buy_ord_style> buy_ord_style { get; set; }
        public virtual ICollection<Job_Ord_BOMMas> Job_Ord_BOMMas { get; set; }
        public virtual ICollection<Program_Summary> Program_Summary { get; set; }
        public virtual ICollection<Program_Summary_Amend> Program_Summary_Amend { get; set; }
        public virtual ICollection<Ord_styleTempMas> Ord_styleTempMas { get; set; }
        public virtual ICollection<OrderPlanning_Mas> Planning_Mas { get; set; }
        public virtual ICollection<buyordapptitle> buyordapptitle { get; set; }
        public virtual ICollection<Job_Ord_Mas> Job_Ord_Mas { get; set; }
        public virtual ICollection<MarkEnqStyle> MarkEnqStyle { get; set; }
    }
}
