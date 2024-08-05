using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProdPrgMas
    {
        public int ProdPrgid { get; set; }
        public int ProdPrgdetid { get; set; }
        public string ProdPrgNo { get; set; }
        public Nullable<System.DateTime> ProgDate { get; set; }
        public Nullable<int> ProcessId { get; set; }
       // public string process { get; set; }
        public string Job_ord_no { get; set; }
        public Nullable<int> processvarper { get; set; }
        public Nullable<int> companyunitid { get; set; }
       // public string companyunit { get; set; }
        public Nullable<int> companyid { get; set; }
       // public string company { get; set; }
        public Nullable<System.DateTime> Startdate { get; set; }
        public Nullable<System.DateTime> Enddate { get; set; }
        public string remarks { get; set; }
        public string OrderType { get; set; }
        public string ProgramType { get; set; }
       public int Prog_Seq_No { get; set; }
       // public string Transfer { get; set; }
        public string Closed { get; set; }
        public string IsProportion { get; set; }
       // public Nullable<decimal> Prop_Variance { get; set; }
        public string Amend { get; set; }
        public string Approved { get; set; }
        public string FinalizeAutoPost { get; set; }
       // public string PlanRemarks { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ApprovedBy { get; set; }

        public List<ProdPrgDet> ProdListInputDetails { get; set; }
        public List<ProdPrgDet> ProdListOutputtDetails { get; set; }
        public List<ProdPgmRemarks> ProdRemDetails { get; set; }
    }
}
