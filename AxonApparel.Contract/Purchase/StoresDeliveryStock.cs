using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDeliveryStock
    {
        public int IssueStockID { get; set; }
        public int IssueDetId { get; set; }
        public int ItemStockId { get; set; }
        public int IssueOrdId { get; set; }
        public decimal quantity { get; set; }
        public decimal StockQty { get; set; }
        public decimal Sec_qty { get; set; }
        public string TransNo { get; set; }
        public decimal MarkRate { get; set; }
        public int SItemid { get; set; }
        public int SColorid { get; set; }
        public int SSizeid { get; set; }
        public int SUomid { get; set; }
        public int ONo { get; set; }
        public int SNo { get; set; }
        public int jmasid { get; set; }

        public int Plansizeid { get; set; }
        public string Plansize { get; set; }
    }
}