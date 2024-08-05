using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseIndentDet
    {
        public int Indentdetid { get; set; }
        public int Indentmasid { get; set; }
        public string ItemRemark { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string UOM { get; set; }
        public string SecUOM { get; set; }
        public string BaseUnit { get; set; }
        public string Unit { get; set; }
        public int PurUomid { get; set; }
        public int BaseUomid { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int UOMid { get; set; }
        public int Sec_UOMid { get; set; }
        public int Mfrid { get; set; }
        public int MachineID { get; set; }
        public int Quoteid { get; set; }     
        public string Item_Purpose { get; set; }
        public string AppRejRemarks { get; set; }      
        public decimal Quantity { get; set; }
        public decimal PurOrderQty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal Sec_Qty { get; set; }
        public decimal Cancel_Qty { get; set; }
        public decimal Close_Qty { get; set; }
        public decimal RefConversion { get; set; }
        public decimal AppQty { get; set; }
        public decimal BalanceQty { get; set; }
        public decimal ActualAppQty { get; set; }
        public decimal Rate { get; set; }
        public decimal AppRate { get; set; }
        public decimal PurcancelQty { get; set; }
        public DateTime Quotedate { get; set; }
        public DateTime Reqdate { get; set; }
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
        public decimal Amt { get; set; }
        public int SNo { get; set; }
    }
}
