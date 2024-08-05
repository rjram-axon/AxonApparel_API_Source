using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class LotSplitUp
    {
        public int LotSplitMasId { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public string TransNo { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string RefNo { get; set; }
        public string SplitType { get; set; }
        public int CreatedBy { get; set; }
        public string OrderType { get; set; }
        public string StockType { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }
        public int TransId { get; set; }        
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public decimal Quantity { get; set; }
        public string EType { get; set; }
        public string OrderNo { get; set; }
        public string OrderRefNo { get; set; }
        public string TransType { get; set; }
        public string MLotNo { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public List<LotSplitUpItem> LotSplitUpDet { get; set; }
        public List<LotSplitUpQty> LotSpUpQty { get; set; }
       
    }
    
}
