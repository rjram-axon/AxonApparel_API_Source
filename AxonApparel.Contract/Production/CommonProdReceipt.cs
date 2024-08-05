using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProdReceipt
    {
        public int ProdIssueId { get; set; }
        public int ProdPrgId { get; set; }
        public int ProcessId { get; set; }
        public string ProdIssueNo { get; set; }
        public string ProdprgNo { get; set; }
        public string JobOrdNo { get; set; }
        public string Process { get; set; }
        public string CompanyUnit { get; set; }
        public DateTime ProgDate { get; set; }
        public string RefNo { get; set; }
        public string OType { get; set; }
        public int ReceiptId { get; set; }
        public int ProdPrgDetId { get; set; }
        public int ReceptDetId { get; set; }
        public string OrdNo { get; set; }
        public decimal Balance { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal RejectionQty { get; set; }
        public decimal Rate { get; set; }
        public decimal AppRate { get; set; }
        public string Uom { get; set; }
        public int UomId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int IssueId { get; set; }
        public int SizeId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int StyId { get; set; }
        public int CompId { get; set; }
        public string CheckLoad { get; set; }

        public Nullable<decimal> AcceptQty { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }
    }
}
