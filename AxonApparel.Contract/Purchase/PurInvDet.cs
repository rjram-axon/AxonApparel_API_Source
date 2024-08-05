using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurInvDet
    {
        public int Pur_inv_Detid { get; set; }
        public int Pur_inv_id { get; set; }
        public int Pur_grn_detid { get; set; }
        public int Pur_grn_masid { get; set; }
        public decimal Rate { get; set; }
        public decimal InvoiceQty { get; set; }
        public decimal InvRate { get; set; }
        public decimal InvAmt { get; set; }
        public decimal DiffRate { get; set; }
        public decimal DiffAmt { get; set; }
        public decimal DiffQtyAmt { get; set; }
        public decimal DiffQty { get; set; }
        public int pur_inv_dcid { get; set; }
        public string closed { get; set; }
        public decimal Rate_Diff { get; set; }
        public decimal Excess_Qty { get; set; }
        public int pur_ord_detid { get; set; }
        public decimal balance_qty { get; set; }
        public decimal CGSTAMt { get; set; }
        public decimal SGSTAMT { get; set; }
        public decimal IGSTAMT { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public string HSNCODE { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int UomId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
        public int SNo { get; set; }
        public string CAbb { get; set; }
        public decimal EXRate { get; set; }
        public int CurrId { get; set; }
        public decimal AppRate { get; set; }
        public decimal DecimalPlace { get; set; }
        public string GrnNo { get; set; }
        public decimal received_qty { get; set; }
    }


}
