using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Vendor
    {
        public int Quoteid { get; set; }
        public string QuoteNo { get; set; }
        public DateTime QuoteDate { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string AutoManual { get; set; }
        public int Supplierid { get; set; }
        public string Supplier { get; set; }
        public string BuyOrdGeneral { get; set; }
        public string Buy_ord_no { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string Remarks { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public string Commit_Cancel { get; set; }
        public int CurrencyId { get; set; }
        public string Currency { get; set; }
        public int CreatedBy { get; set; }
        public int Exchangerate { get; set; }
        public DateTime ActiveFrom { get; set; }
        public DateTime APPROVALDATE { get; set; }
        public int APPROVEDBY { get; set; }
        public string ApprovedStatus { get; set; }
        public string Ref_No { get; set; }
        public string SAdd1 { get; set; }
        public string SAdd2 { get; set; }
        public string SAdd3 { get; set; }
        public string Buyer { get; set; }
        public int Quantity { get; set; }
        public int BuyerId { get; set; }
        public int MinQty { get; set; }
        public int MaxQty { get; set; }
        public int Rate { get; set; }

        public List<VendorEntry> VendorDet { get; set; }
    }
}
