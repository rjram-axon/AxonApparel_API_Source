using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProductionIssueDet
    {
        public int ProductionDetId { get; set; }
        public int ProductionId { get; set; }
        public int Sno { get; set; }  
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public decimal OrderedQty { get; set; }
        public decimal BalanceQty { get; set; }
        public decimal IssueQty { get; set; }
        public int UomId { get; set; }
        public string UOM { get; set; }
        public int OutUomId { get; set; }
        public string OutUOM { get; set; }
        public int ProdProgDetId { get; set; }
        public decimal ProdPrgQty { get; set; }
        public decimal Rate { get; set; }
        public decimal AppRate { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string ProdPrgNo { get; set; }
    }
}
