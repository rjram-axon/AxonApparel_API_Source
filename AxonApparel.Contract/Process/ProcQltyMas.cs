using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcQltyMas
    {
        public int Proc_qlty_Masid { get; set; }
        public string Proc_Qlty_no { get; set; }
        public DateTime Proc_qlty_date { get; set; }
        public string Proc_Recpt_no { get; set; }
        public int Proc_Recpt_Masid { get; set; }
        public string Remarks { get; set; }
        public string Process { get; set; }
        public string Supplier { get; set; }
        public string Unit { get; set; }
        public string DcNo { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<decimal> GrossAmount { get; set; }
        public string DebtRaised { get; set; }

        public List<ProcQltyDet> ProdDet { get; set; }
        public List<ProcQltyJobDet> ProdJobDet { get; set; }        
        public List<ProcQltyStock> ProdStock { get; set; }
        public List<ProcQltyDrCr> ProdDrcr { get; set; }
    }
}
