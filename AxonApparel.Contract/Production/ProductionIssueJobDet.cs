using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionIssueJobDet
    {
        public int ProdIssueJobId { get; set; }
        public int ProdIssueDetId { get; set; }
        public int ProdIssueId { get; set; }
        public string JobOrdNo { get; set; }
        public string ProdPrgNo { get; set; }
        public int LastProcessId { get; set; }
        public decimal IssQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal SecQty { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
    }
}
