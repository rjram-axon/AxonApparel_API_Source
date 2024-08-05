using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseOrderItemDet
    {
        public int Pur_Ord_DetId { get; set; }
        public int Pur_ord_id { get; set; }
        public int ItemID { get; set; }
        public string Item { get; set; }
        public int SizeID { get; set; }
        public string Size { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; }
        public int UOMId { get; set; }
        public string Uom { get; set; }
        public decimal quantity { get; set; }
        public int ReceivedQty { get; set; }
        public decimal Rate { get; set; }       
        public decimal Amt { get; set; }
        public DateTime Reqdate { get; set; }
        public decimal Sec_Qty { get; set; }
        public int Sec_UOMid { get; set; }
        public int Mfrid { get; set; }
        public decimal Cancel_Qty { get; set; }
        public int Close_Qty { get; set; }
        public string Amend { get; set; }
        public int currencyid { get; set; }
        public string Currency { get; set; }
        public int exchangerate { get; set; }
        public int receivable_qty { get; set; }
        public int Debit_qty { get; set; }
        public int RefConversion { get; set; }
        public int ReturnQty { get; set; }
        public DateTime reqdatefrom { get; set; }
        public DateTime reqdateto { get; set; }
        public decimal CGSTAMt { get; set; }
        public decimal SGSTAMT { get; set; }
        public decimal IGSTAMT { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public string HSNCODE { get; set; }
        public int TOTCGSTAMT { get; set; }
        public int TOTSGSTAMT { get; set; }
        public int TOTIGSTAMT { get; set; }
        public int StateId { get; set; }
        public int CStateId { get; set; }
        public string Unit { get; set; }
        public decimal OrdBal { get; set; }
        public int BaseUnitId { get; set; }
        public string BaseUnit { get; set; }
        public int PurUomId { get; set; }
        public decimal AppRate { get; set; }
        public int StyleRowId { get; set; }
        public int SNo { get; set; }
        public string ItemRemarks { get; set; }
        public int CancelId { get; set; }
        public int CancelDetId { get; set; }
        //////////////Order Details
        public string OrderNo { get; set; }
        public string Refno { get; set; }
        public int StyleId { get; set; }
        public string Style { get; set; }
        public int BuyOrdBomDetId { get; set; }
        public decimal BomQty { get; set; }
        public decimal OrdBalQty { get; set; }
        public int Pur_Ord_BuyJobid { get; set; }
        public string gsttaxcode { get; set; }
        public int IndDetId { get; set; }
        //////////////
        public int? DCurrencyid { get; set; }
    }
}
