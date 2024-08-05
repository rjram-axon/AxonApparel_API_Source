using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionIssueDet
    {
        public int ProdIssueDetId { get; set; }
        public int ProdIssueId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal Rate { get; set; }
        public string UOM { get; set; }
        public int UomId { get; set; }
        public decimal OutputValue{ get; set; }
        public decimal IPMarkupRate { get; set; }
    }
}
