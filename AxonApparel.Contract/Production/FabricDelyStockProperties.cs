using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FabricDelyStockProperties
    {
        public int FabDelyIssueId { get; set; }
        public int FabDelyIssueDetId { get; set; }
        public int FabDelyIssueStockId { get; set; }

        public string LotNo { get; set; }
        public string TransNo { get; set; }
        public string Document { get; set; }
        public DateTime TransDate { get; set; }
        public string Process { get; set; }
        public int Processid { get; set; }
        public string Supplier { get; set; }
        public int Supplierid { get; set; }
        public decimal BalQty { get; set; }
        public decimal Rate { get; set; }
        public decimal MRate { get; set; }
        public int itemstckid { get; set; }
        public int IssStkid { get; set; }
        public int Stockid { get; set; }
        public decimal StockQty { get; set; }
        public decimal IssueQty { get; set; }
        public decimal AllotedQty { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int CuttingIssueDetId { get; set; }

        public decimal receivedqty { get; set; }
        public decimal ReturnQty { get; set; }
    }
}
