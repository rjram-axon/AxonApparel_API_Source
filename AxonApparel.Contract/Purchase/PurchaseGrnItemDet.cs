using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseGrnItemDet
    {
        public int Grn_DetId { get; set; }
        public int Grn_MasId { get; set; }
        public int SNo { get; set; }
        public int itemid { get; set; }
        public int sizeid { get; set; }
        public int colorid { get; set; }
        public string item { get; set; }
        public string size { get; set; }
        public string color { get; set; }
        public decimal received_qty { get; set; }
        public int uomId { get; set; }
        public string puom { get; set; }
        public int suomId { get; set; }
        public string suom { get; set; }
        public decimal rate { get; set; }
        public decimal Amt { get; set; }
        public decimal AllowValue { get; set; }
        public decimal Erate { get; set; }
        public decimal balance { get; set; }
        public decimal invoiced_qty { get; set; }
        public int debit_id { get; set; }
        public decimal excess_qty { get; set; }
        public decimal debit_rate { get; set; }
        public int MfrId { get; set; }
        public decimal Sec_Qty { get; set; }
        public int Excess_Stockid { get; set; }
        public decimal rejected_qty { get; set; }
        public decimal shortage_qty { get; set; }
        public decimal accepted_qty { get; set; }
        public decimal return_qty { get; set; }
        public decimal debit_qty { get; set; }
        public decimal receivable_qty { get; set; }
        public decimal Qlty_Excess { get; set; }
        public decimal Excess_return { get; set; }
        public string itemremarks { get; set; }
        public bool Closed { get; set; }
        public int Short_stkid { get; set; }
        public int Reject_stkid { get; set; }
        public string QltyItemRemarks { get; set; }
        public decimal ReturnQty { get; set; }
        public int Grn_RtnId { get; set; }
        public string MPurId { get; set; }
        public string CTransNo { get; set; }
        public string CTransType { get; set; }
        public int RateSno { get; set; }

    }

}
