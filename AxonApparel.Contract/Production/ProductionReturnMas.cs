using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionReturnMas
    {
        public int ReturnId { get; set; }
        public string ReturnNo { get; set; }
        public DateTime ReturnDate { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public int CompanyId { get; set; }
        public int ProcessId { get; set; }
        public int WorkDivId { get; set; }
        public string Remarks { get; set; }
        public string Processor { get; set; }
        public string InterExter { get; set; }
        public int? StoreUnitId { get; set; }
        public int CreatedBy { get; set; }
        public string IssueType { get; set; }
        public string OrdType { get; set; }
    

        public List<ProductionReturnDet> ProdReturnDet { get; set; }
        public List<Prod_Return_Reason> Prodretreason { get; set; }

    }
}
