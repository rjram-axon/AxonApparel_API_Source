using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionMainGridDetails
    {
        public int CompanyId { get; set; }
        public int CompanyUnitId { get; set; }        
        public int WorkdivisionId { get; set; }
        public int ProdOrderId { get; set; }
        public int ProdIssueId { get; set; }
        public int SupplierId { get; set; }
        public string Company { get; set; }
        public string CompanyUnit { get; set; }
        public string ProdIssueNo { get; set; }
        public DateTime ProdIssueDate { get; set; }
        public int ProcessId { get; set; }
        public string ProcessorType { get; set; }
        public string Process { get; set; }
        public string OrderType { get; set; }
        public string WorkDivision { get; set; }
        public string ProcessOrder { get; set; }
        public string Supplier { get; set; }
        public string RefNo { get; set; }
        public string JobOrdNo { get; set; }
        public string OrdNo { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
    }
}
