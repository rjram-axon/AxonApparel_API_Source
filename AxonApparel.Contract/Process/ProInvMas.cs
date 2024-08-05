using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProInvMas
    {
        public int Process_Invid { get; set; }
        public int ledgerid { get; set; }
        public int SupplierId { get; set; }
        public string Unit { get; set; }
        public string Supplier { get; set; }
        public string Process { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public int ProcessId { get; set; }
        public int UnitId { get; set; }
        public int voucherid { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovedBy { get; set; }
        public string OrderType { get; set; }
        public string Inv_No { get; set; }
        public string Entry_No { get; set; }
        public string Remarks { get; set; }
        public string DebitCredit { get; set; }
        public string DebtRaised { get; set; }
        public string Approved { get; set; }
        public string InternalOrExternal { get; set; }
        public string MultiFlag { get; set; }
        public string EWayNo { get; set; }
        public DateTime Inv_Date { get; set; }
        public DateTime Entry_Date { get; set; }
        public DateTime EWayDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal Inv_Amount { get; set; }
        public decimal Payment_Amt { get; set; }
        public decimal TotSGST { get; set; }
        public decimal TotIGST { get; set; }
        public decimal TotCGST { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }     
        public bool Paid { get; set; }
        public bool Passed { get; set; }
        public int PrnMasId { get; set; }
        public string PrnNo { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public int BillId { get; set; }
        public string BOrdType { get; set; }
        public string BPurType { get; set; }
        public string SubBillNo { get; set; }

        public List<ProInvDet> ProInvDDet { get; set; }
        public List<ProInvJobDet> ProInvOrdDDet { get; set; }
        public List<ProInvDc> ProInvDcDet { get; set; }
        public List<ProInvAddLess> ProInvAL { get; set; }
        public List<ProInvRateDiff> ProInvRDiff { get; set; }

    }

}
