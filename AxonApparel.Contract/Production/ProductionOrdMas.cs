using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionOrdMas
    {
        public int productionordid { get; set; }
        public string productionorder { get; set; }
        public DateTime processordate { get; set; }
        public int processorid { get; set; }
        public int processid { get; set; }
        public string remarks { get; set; }
        public int companyunitid { get; set; }
        public int companyid { get; set; }
        public string ProcessorType { get; set; }
        public string OrderType { get; set; }
        public string Closed { get; set; }
        public string OrderCumIssue { get; set; }
        public DateTime DelidateTime { get; set; }
        public string ComboIds { get; set; }
        public string DispLocType { get; set; }
        public int DispLoc { get; set; }
        public string IssueLocType { get; set; }
        public int IssueLoc { get; set; }
        public int Teamid { get; set; }
        public int StoreUnitId { get; set; }
        public int CreatedBy { get; set; }
        public string Phoneno { get; set; }
        public string contactperson { get; set; }
        public decimal amount { get; set; }
        public decimal taxamount { get; set; }
        public string saccode { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public decimal TotCGST { get; set; }
        public decimal TotSGST { get; set; }
        public decimal TotIGST { get; set; }
        public string moduletype { get; set; }
        public List<ProductionOrdDet> ProdDet { get; set; }
        public List<ProductionOrdJobDet> ProdJobDet { get; set; }
        public List<ProductionOrdStock> ProdStkDet { get; set; }
        public List<ProductionOrdAddLess> ProdAddLess { get; set; }
    }
}
