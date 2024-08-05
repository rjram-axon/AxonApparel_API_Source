using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoreTransferDet
    {
        public int DetID { get; set; }
        public int MasID { get; set; }
        public int IssueStockID { get; set; }
        public Nullable<decimal> TransferQty { get; set; }
        public Nullable<decimal> ReceivedQty { get; set; }
        public Nullable<decimal> RejectedQty { get; set; }
        public Nullable<int> RecptStockID { get; set; }
        public Nullable<int> RejectedStockID { get; set; }
        public string QltyItemRemarks { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<decimal> CGST { get; set; }
        public Nullable<decimal> SGST { get; set; }
        public Nullable<decimal> IGST { get; set; }
        public Nullable<decimal> CGSTAMT { get; set; }
        public Nullable<decimal> SGSTAMT { get; set; }
        public Nullable<decimal> IGSTAMT { get; set; }

        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int UomId { get; set; }
        public string Item { get; set; } 
        public string Color { get; set; }
        public string Size { get; set; }
        public string Lotno { get; set; }
        public string UOM { get; set; }
        public string HSNcode { get; set; }
        public decimal StockQty { get; set; }
        public decimal ProgramQty { get; set; }

        public string OrderNo { get; set; }
        public string JobordNo { get; set; }
        public string RefNo { get; set; }

        public int Styleid { get; set; }
        public string Style { get; set; }

        public int IssueStoreid { get; set; }
        public string IssueStore { get; set; }

        public int FrmCompID { get; set; }
        public int ToCompID { get; set; }
        public int ToUnitID { get; set; }
        public int RecptStoreID { get; set; }
        public int BmasID { get; set; }
        public int JmasID { get; set; }

        public string TransNo { get; set; }
        public string TransDate { get; set; }
        public string OrderType { get; set; }
        public string StoreType { get; set; }
        public int ParentUnitid { get; set; }
        public string Remarks { get; set; }
        public string Vehicle_No { get; set; }

        public string QualityNo { get; set; }
        public string QualityDate { get; set; }
    }
}
