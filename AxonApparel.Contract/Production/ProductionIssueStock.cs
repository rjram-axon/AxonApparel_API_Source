using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionIssueStock
    {
        public int ProdIssueId { get; set; }
        public int ProdIssuestckId { get; set; }
        public int ProdIssueJobId { get; set; }
        public int StockId { get; set; }
        public decimal Issues { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public string JobOrdNo { get; set; }
        public decimal Markuprate { get; set; }
        public string ProdPrgNo { get; set; }
    }
}
