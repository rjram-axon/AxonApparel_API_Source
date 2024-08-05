using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseGrnMas 
    {
        public int PurOrdId { get; set; }
        public int Grn_MasId { get; set; }
        public string receipt_no { get; set; }
        public DateTime receipt_date { get; set; }
        public int companyid { get; set; }
        public string Company { get; set; }
        public int company_unitid { get; set; }
        public int supplierid { get; set; }
        public string Dc_no { get; set; }
        public DateTime Dc_date { get; set; }
        public DateTime SuppInvdate { get; set; }
        public string Remarks { get; set; }
        public bool grncommit { get; set; }
        public bool grncancel { get; set; }
        public bool grnclose { get; set; }
        public string pur_type { get; set; }
        public string job_ord_no { get; set; }
        public string Amend { get; set; }
        public string Qlty_No { get; set; }
        public DateTime Qlty_date { get; set; }
        public string QltyRemarks { get; set; }
        public string Inward_No { get; set; }
        public string Pur_ItemType { get; set; }
        public string DebtRaised { get; set; }
        public int StoreUnitID { get; set; }
        public string StoreName { get; set; }
        public int CreatedBy { get; set; }
        public string Supp_Inv_No { get; set; }
        public string QCReport_No { get; set; }
        public bool ExcludeInv { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string PurOrdNo { get; set; }
        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public DateTime OrdDate { get; set; }
        public decimal Amount { get; set; }
        public string Supplier { get; set; }
        public string LorI { get; set; }
        public string MEntryType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string IsApproved { get; set; }
        public string PurIndType { get; set; }
        public List<PurchaseGrnAccount> PurchaseGrnAccounts { get; set; }
        public List<PurchaseGrnItemDet> PurchaseGrnItemDet { get; set; }
        public List<PurchaseGrnOrder> PurchaseGrnODet { get; set; }
        public List<PurQltyDet> PurQDet { get; set; }
        public List<PurQltyOrder> PurQOrdDet { get; set; }

        //public string orderno { get; set; }
        //public string refno { get; set; }
        public string style{get;set;}
        public string transno { get; set; }
        public string processord { get; set; }
        public string CheckLoad { get; set; }
        public int ChkAccPos { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal Quantity { get; set; }
        public decimal StockQty { get; set; }
        public string Uom { get; set; }
        public string IssueNo { get; set; }
        public string IssueDate { get; set; }
        public decimal IssueQty { get; set; }
    }
}
