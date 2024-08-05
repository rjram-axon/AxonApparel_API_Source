using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Communication
    {
        public int CommunicationId { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public int BuyerId { get; set; }
        public string BuyerName { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int AgentId { get; set; }
        public string AgentName { get; set; }
        public string Others { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public string EnquiryNo { get; set; }
        public string OrderNo { get; set; }
        public string OrderRefNo { get; set; }
        public string MiscRefNo { get; set; }
        public string CompanyType { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int ComModeTypeId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public string Inward { get; set; }
        public string Remarks { get; set; }


    }
}
