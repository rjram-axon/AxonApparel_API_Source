using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockAudit
    {
        public int Audit_MasId { get; set; }
        public string Entry_No { get; set; }
        public DateTime Entry_Date { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public int Supplierid { get; set; }
        public string Supplier { get; set; }
        public int item_Groupid { get; set; }
        public int buyerid { get; set; }
        public string Buyer { get; set; }
        public string Buy_Ord_no { get; set; }
        public string RefNo { get; set; }
        public int BMasId { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public string Job_Ord_no { get; set; }
        public int JobId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
        public bool General { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }
        public string OType { get; set; }
        public string StockType { get; set; }
        public string SupType { get; set; }
        public int Itemid { get; set; }
        public int StoreId { get; set; }
        public DateTime FDate { get; set; }
        public DateTime TDate { get; set; }
        public List<StockAuditDet> StockAdDet { get; set; }
    }

    
}
