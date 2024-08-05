using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurInvMas
    {

        public int pur_invid { get; set; }
        public string invoice_no { get; set; }
        public DateTime invoice_date { get; set; }
        public int company_id { get; set; }
        public string Company { get; set; }
        public int company_unitid { get; set; }
        public int supplierid { get; set; }
        public string Supplier { get; set; }
        public decimal Gross_amount { get; set; }
        public decimal Addless_amount { get; set; }
        public decimal invoice_value { get; set; }
        public string supp_inv_no { get; set; }
        public DateTime supp_inv_date { get; set; }
        public string remarks { get; set; }
        public string ThroughDcInv { get; set; }
        public string commitcancel { get; set; }
        public int CreditID { get; set; }
        public int DebitID { get; set; }
        public decimal Payment_Amt { get; set; }
        public bool Paid { get; set; }
        public bool Passed { get; set; }
        public int PIPassed { get; set; }
        public string DebtRaised { get; set; }
        public string Approved { get; set; }
        public int ledgerid { get; set; }
        public int voucherid { get; set; }
        public string AddLessManualOrFormula { get; set; }
        public int CurrencyId { get; set; }
        public decimal ExchangeRate { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovedBy { get; set; }
        public string EWayNo { get; set; }
        public DateTime EWayDate { get; set; }
        public int BMasId { get; set; }
        public string OrdNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public int StyleId { get; set; }
        public int GrnMasId { get; set; }
        public string GrnNn { get; set; }
        public string GrnDcNo { get; set; }
        public int PMasId { get; set; }
        public string PoNo { get; set; }
        public string OType { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string DHead { get; set; }
        public string DReason { get; set; }
        public decimal DRateDiff { get; set; }
        public decimal CRateDiff { get; set; }
        public int DebCreId { get; set; }
        public List<PurInvDet> PurInvDDet { get; set; }
        public List<PurInvOrdDet> PurInvOrdDDet { get; set; }
        public List<PurInvDc> PurInvDcDet { get; set; }
        public List<PurInvAddless> PurInvAddLess { get; set; }

    }


}
