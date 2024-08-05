using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionReturnAddDetail
    {
        public int ProdIssueId {get;set;}
        public string ProdIssueNo { get; set; }
        public DateTime ProdIssueDate { get; set; }
        public string OrderNo { get; set; }
        public string Style { get; set; }
        public int Styleid { get; set; }
        public string Processor { get; set; }
        public int Processorid { get; set; }
        public decimal OrderQty { get; set; }
        public decimal IssueQty { get; set; }
        public decimal BalQty { get; set; }
    }
}
