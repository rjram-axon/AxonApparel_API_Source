using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Followup
    {
        public int FollowId { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string EntryNo { get; set; }
        public DateTime FollowDate { get; set; }
        public int BuyerId { get; set; }
        public string BuyerName { get; set; }
        public int EnquiryId { get; set; }
        public int Statusid { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string QuotationNo { get; set; }
        public string QuotationStyle { get; set; }
        public DateTime QuoDate { get; set; }
        public string Action { get; set; }
        public string ToContact { get; set; }
        public DateTime NextFollowDate { get; set; }
        public string Remarks { get; set; }
    }
}
