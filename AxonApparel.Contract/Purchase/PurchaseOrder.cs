using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseOrder
    {
        public int pur_ord_id { get; set; }
        public string pur_ord_no { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public int company_unitid { get; set; }
        public DateTime orddate { get; set; }
        public string Purchase_ItemType { get; set; }
        public string Purchase_Type { get; set; }
        public string EType { get; set; }
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public string SupplierEmail { get; set; }
        public string Reference { get; set; }
        public string job_ord_no { get; set; }
        public int JobNoId { get; set; }
        public string Closed { get; set; }
        public string RateMode { get; set; }
        public string Buyer { get; set; }
        public int BuyerId { get; set; }
        public int StyleId { get; set; }
        public string OrderNo { get; set; }
        public int BMasId { get; set; }
        public string RefNo { get; set; }
        public string OType { get; set; }
        public string PType { get; set; }
        public string Style { get; set; }
        public int StyleRowId { get; set; }
        public string remarks { get; set; }
        public string ord_commit { get; set; }
        public bool cancel { get; set; }
        public string Unit_Supplier_Self { get; set; }
        public int Unit_Supplier { get; set; }
        public int Amount { get; set; }
        public bool ord_close { get; set; }
        public int Millid { get; set; }
        //public int styleid { get; set; }
        public string unit_or_other { get; set; }
        public string Amend { get; set; }
        public int currencyid { get; set; }
        public decimal exchange_rate { get; set; }
        public string LocalImport { get; set; }
        public int Paytermid { get; set; }
        public string ReqNo { get; set; }
        public DateTime ReqDate { get; set; }
        public int BillCompany { get; set; }
        public string BillCompType { get; set; }
        public decimal TaxPercent { get; set; }
        public decimal TaxAmount { get; set; }
        public string WITH_ANNEXURE { get; set; }
        public int remainderid { get; set; }
        public string AddLessType { get; set; }
        public string AddLessManualOrFormula { get; set; }
        public string IsApproved { get; set; }
        public int ToApprove { get; set; }
        public int ApprovedBY { get; set; }
        public DateTime ApproveDate { get; set; }
        public int CreatedBy { get; set; }
        public string Potype { get; set; }
        public int TOTCGSTAMT { get; set; }
        public int TOTSGSTAMT { get; set; }
        public int TOTIGSTAMT { get; set; }
        public int StateId { get; set; }
        public int CStateId { get; set; }
        public DateTime FrmDate { get; set; }
        public DateTime ToDate { get; set; }
        public string paymode { get; set; }
        public string chequeno { get; set; }
        public DateTime chequedate { get; set; }
        public decimal advance { get; set; }
        public string CEmpName { get; set; }
        public string CancelNo { get; set; }
        public DateTime CancelDate { get; set; }
        public string MDecType { get; set; }
        public int CancelID { get; set; }
        public string PurIndType { get; set; }
        public string GrnNo { get; set; }
        public int GrnId { get; set; }
        //public int CPDetId { get; set; }
        public decimal CPDetId { get; set; }
        public string GDcNo { get; set; }
        public int IGId { get; set; }
        public int NomItemId { get; set; }

        //Spl Order
        public int SplMasId { get; set; }
        public string SplEntryNo { get; set; }
        public string CheckLoad { get; set; }
        public string GetUser { get; set; }
        //
        public decimal PreRate { get; set; }

        public int chkSGST { get; set; }
        public int chkCGST { get; set; }
        public int chkIGST { get; set; }


        //public int Pur_Ord_PayId { get; set; }
        public List<PurchaseOrderAccount> PurchaseAccounts { get; set; }
        public List<PurchaseOrderItemDet> PurchaseItemDet { get; set; }
        public List<PurchaseOrderDet> PurchaseODet { get; set; }
        public List<TermsCondition> TermsCondDet { get; set; }
    }
}
