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
    
    public partial class Report_Footer_Email
    {
        public int Rpt_Setupid { get; set; }
        public int Rpt_EmpId { get; set; }
        public int Employeeid { get; set; }
    
        public virtual Report_Footer_Setup Report_Footer_Setup { get; set; }
    }
}
