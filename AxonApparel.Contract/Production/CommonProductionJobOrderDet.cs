using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProductionJobOrderDet
    {
        public int Sno { get; set; }
        public int ProcessJobDetId { get; set; }
        public int ProcessIssId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int ProdDetId { get; set; }
        public string ProdPrgNo { get; set; }
        public string JobOrdNo { get; set; }
        public decimal BalQty { get; set; }
        public decimal IssQty { get; set; }
        public decimal SecQty { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
    }
}
