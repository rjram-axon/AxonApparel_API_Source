using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiProcess
    {
        public int processordid { get; set; }
        public String Closed { get; set; }
        public string ProcessorType { get; set; }
        public string type { get; set; }
        public string processorder { get; set; }
        public DateTime ProcessOrdate { get; set; }
        public DateTime DelidateTime { get; set; }
        public string Process { get; set; }
        public int Processid { get; set; }
        public string Company{ get; set; }
        public string CompanyName { get; set; }
        public int Companyid { get; set; }
        public int Id { get; set; }
        public string CompanyUnit { get; set; }
        public string Ordertype { get; set; }
        public string Processor { get; set; }
        public int ProcessorId { get; set; }
        public string remarks { get; set; }
        public string Knitloc { get; set; }
        public string Yarnloc { get; set; }
        public string SubProcess { get; set; }
        public int ApprovedBy { get; set; }
        public string FinalProcess { get; set; }
        public int StoreUnitId { get; set; }
        public string DispLocType { get; set; }
        public int DispLoc { get; set; }
        public string Vehicleno { get; set; }
        public string Approved { get; set; }
        public int StyleId { get; set; }
 
   

    }
    public class ApiProcessJob
    {

        public string ProdPrgNo { get; set; }
        public string Jobordno { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public decimal progopqty { get; set; }
        public decimal rate { get; set; }
        





    }
    public class ApparelProcOrdEditOutItemDet
    {
        public string processorder { get; set; }

        public string ProdPrgNo { get; set; }
        public string Job_ord_no { get; set; }
        public int itemid { get; set; }
        public string item{ get; set; }
        public int ColorId { get; set; }
        public string color { get; set; }
        public int SizeId { get; set; }
        public bool IsDecimal { get; set; }
        public bool SecIsDecimal { get; set; }
        public string size { get; set; }
        public decimal prog_op_qty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal Bal { get; set; }
        public string InorOut { get; set; }
        public int ProcessOrdDetId { get; set; }
        public decimal rate { get; set; }
        public string DispLoc { get; set; }
        public string DispLocType { get; set; }
        public string IssueLoc { get; set; }
        public string IssueLocType { get; set; }
        public string LoopLen { get; set; }
        public string Gauge { get; set; }
        public decimal OrdSecQty { get; set; }
        public int PlanSizeId { get; set; }
        public string PlanSize { get; set; }
        public decimal TaxAppVal { get; set; }
        public int FinDiaId { get; set; }
        public string FinDiaSize { get; set; }
        public decimal FinGsm { get; set; }
        public decimal AppRate { get; set; }
        public string Approved { get; set; }

    }

}
