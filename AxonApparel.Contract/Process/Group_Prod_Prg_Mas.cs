using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Group_Prod_Prg_Mas
    {
        public int GrpProdPrgid { get; set; }
        public string GrpProdPrgNo { get; set; }
        public Nullable<System.DateTime> GrpProgDate { get; set; }
        public Nullable<int> Companyid { get; set; }
        public Nullable<int> Styleid { get; set; }
        public string Job_ord_no { get; set; }
        public Nullable<int> Buy_Ord_MasId { get; set; }
        public int GrpProcessid { get; set; }
        public string GrpProcess { get; set; }
        public string ProdPrgNo { get; set; }
        public int ProdPrgid { get; set; }
        public int Prog_Seq_No { get; set; }
        public string Amend { get; set; }
        public string Approved { get; set; }
        public string FinalizeAutoPost { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovedBy { get; set; }
        public string Order_No { get; set; }
        public string Ref_No { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public int Jobid { get; set; }
        public int chkprc { get; set; }
        public IList<Group_Prod_Prg_Det> IpGrpdet { get; set; }
        public IList<Group_Prod_Prg_Det> OpGrpdet { get; set; }
        public List<Group_Prod_Prg_Det> ProdListInputDetails { get; set; }
        public List<Group_Prod_Prg_Det> ProdListOutputtDetails { get; set; }
    }
}
