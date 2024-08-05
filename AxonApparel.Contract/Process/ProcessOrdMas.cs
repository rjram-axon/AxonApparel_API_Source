using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessOrdMas
    {
        public int processordid { get; set; }
        public string processorder { get; set; }
        public DateTime processordate { get; set; }
        public int processorid { get; set; }
        public int processid { get; set; }
        public string process { get; set; }
        public string remarks { get; set; }
        public int companyunitid { get; set; }
        public int companyid { get; set; }
        public string ProcessorType { get; set; }
        public string OrderType { get; set; }
        public string AppType { get; set; }
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

       //InvAddLoad
        public int ProcRecId { get; set; }
        public string ProcRecNo { get; set; }
        public DateTime ProcGrnDate { get; set; }
        public int ProcIssId { get; set; }
        public string ProIssNo { get; set; }
        public string ProcDcNo { get; set; }
        public DateTime ProcDcDate { get; set; }
        public string OrdNo { get; set; }
        public string RefNo { get; set; }
        public DateTime FDate { get; set; }
        public DateTime DDate { get; set; }
        public string YarnLoc { get; set; }
        public string KnitLoc { get; set; }
        public string subtype { get; set; }
        public string fintype { get; set; }
        public string CheckType { get; set; }
        public string Vehicleno { get; set; }
       //

        public List<ProcessOrdDet> ProdDet { get; set; }
        public List<ProcessOrdJobdet> ProdJobDet { get; set; }
        //public List<ProductionOrdStock> ProdStkDet { get; set; }
        public List<ProcessOrdAddLess> ProdAddLess { get; set; }


        public List<ProcessIssueMas> ProcissMas { get; set; }
        public List<ProcessIssueDet> ProcissDet { get; set; }
        public List<ProcessIssueJobdet> ProcissJobDet { get; set; }
        public List<ProcessIssueStock> Procissstk { get; set; }
    }
}
