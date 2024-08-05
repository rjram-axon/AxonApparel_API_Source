using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdInvMas
    {
        public int ProdInvid { get; set; }
        public int Processorid { get; set; }
        public string Processor { get; set; }
        public int  Processid { get; set; }
        public string Process { get; set; }
        public string PrdMasId { get; set; }
        public int Companyid { get; set; }
        public int CompanyUnitId { get; set; }
        public string Company { get; set; }
        public string CompanyUnit { get; set; }
        public int BuyerId { get; set; }
        public int voucherid { get; set; }
        public int ledgerid { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovedBy { get; set; }
        public string OrderType { get; set; }
        public string InvNo { get; set; }
        public string OrdNo { get; set; }
        public int BMasId { get; set; }
        public string OrdRefNo { get; set; }
        public string RefNo { get; set; }
        public string WorkOrder { get; set; }
        public int JobId { get; set; }
        public string Remarks { get; set; }
        public string Paid { get; set; }
        public string Passed { get; set; }
        public string InvoiceType { get; set; }
        public string InternalOrExternal { get; set; }
        public string Approved { get; set; }
        public string Saccode { get; set; }
        public string EWayNo { get; set; }
        public decimal InvAmount { get; set; }
        public decimal PaymentAmt { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public decimal TotCGST { get; set; }
        public decimal TotSGST { get; set; }
        public decimal TotIGST { get; set; }
        public DateTime EWayDate { get; set; }
        public DateTime RefDate { get; set; }
        public DateTime InvDate { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public string GrnNo { get; set; }
        public int GrnId { get; set; }
        public DateTime GrnDate { get; set; }
        public DateTime DcDate { get; set; }
        public string DcNo { get; set; }

        public List<ProdInvDet> ProdInvDDet { get; set; }
        public List<ProdInvJobDet> ProdInvOrdDDet { get; set; }
        public List<ProdInvDc> ProdInvDcDet { get; set; }
        public List<ProdInvAddless> ProdInvAL { get; set; }
        public List<ProdInvRatediff> ProdInvRDiff { get; set; }
    }


}
