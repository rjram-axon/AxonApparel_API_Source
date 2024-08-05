using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProductionIssue
    {
        public int CompanyId { get; set; }
        public int ProductionId { get; set; }                        
        public string ProdOrder { get; set; }
        public int ProcessId { get; set; }
        public int ProcessorId { get; set; }
        public string Process { get; set; }
        public string Buyer { get; set; }
        public string Remarks { get; set; }
        public DateTime ProcessorDate { get; set; }
        public decimal Quantity { get; set; }
        public decimal IssuedQuantity { get; set; }
        public decimal BalQuantity { get; set; }

        public int ProdPrgId { get; set; }
        public int CompUnitId { get; set; }
        public string CompanyUnit { get; set; }
        public string JobOrdNo { get; set; }
        public string ProdPrgramNo { get; set; }
        public DateTime ProdProgramDate { get; set; }
        public string OdNo { get; set; }
        public string RNo { get; set; }
        public string GatePassVehicle { get; set; }

        public List<CommonProductionIssueDet> ProdIssueDet { get; set; }
        public List<CommonProductionJobOrderDet> ProdIssueJobOrdDet { get; set; }
        public List<CommonProductionStckDet> ProdIssueStck { get; set; }     

    }
}
