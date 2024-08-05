using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CompPrgMas
    {
        public int ProdPrgid { get; set; }
        public string Prodprgno { get; set; }
        public DateTime ProgDate { get; set; }
        public int ProcessId { get; set; }
        public string Job_ordno { get; set; }
        public int companyunitid { get; set; }
        public int companyid { get; set; }
        public string remarks { get; set; }
        public string OrderType { get; set; }
        public string ProgramType { get; set; }
        public int Prog_Seq_No { get; set; }
        public string Closed { get; set; }
        public string Amend { get; set; }
        public int CreatedBy { get; set; }
        public string Approved { get; set; }

        public List<Domain.CompPrgDet> CompListDet { get; set; }
    }
}
