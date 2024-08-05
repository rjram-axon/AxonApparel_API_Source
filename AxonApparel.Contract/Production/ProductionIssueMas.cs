using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionIssueMas
    {
        public int ProdIssueId { get; set; }
        public int ProcessorId { get; set; }
        public string ProdIssueNo { get; set; }
        public DateTime ProdIssueDate { get; set; }
        public int ProdOrdId { get; set; }
        public string Remarks { get; set; }
        public string GatePassVehicle { get; set; }
        public int IssueStoreId { get; set; }
        public int Createdby { get; set; }
        public int? LastProcessId { get; set; }
        public int ProcessId { get; set; }
        public string InterExter { get; set; }
        public string Processor { get; set; }
        public int CompanyUnitId { get; set; }
        public string OrderType { get; set; }
        public int CompanyId { get; set; }


        public List<ProductionIssueDet> ProdIssueDet { get; set; }
        public List<ProductionIssueJobDet> ProdIssueJobOrdDet { get; set; }
        public List<ProductionIssueStock> ProdIssueStck { get; set; }        
    }
}
