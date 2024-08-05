using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurQltyOrder
    {

        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int UomId { get; set; }
        public int Grn_MasId { get; set; }
        public int grn_detid { get; set; }
        public int pur_ord_detid { get; set; }
        public int styleid { get; set; }
        public int pur_ord_buyjobid { get; set; }
        public int actmfrid { get; set; }
        public int expmfrid { get; set; }
        public string pur_ord_no { get; set; }
        public string purchase_type { get; set; }
        public string PORemarks { get; set; }
        public string order_no { get; set; }
        public string style { get; set; }
        public string itemcode { get; set; }
        public string expmfr { get; set; }
        public string actmfr { get; set; }
        public decimal PurRecvdQty { get; set; }
        public decimal porderqty { get; set; }
        public decimal grnordrate { get; set; }
        public decimal refConversion { get; set; }
        public decimal ExRate { get; set; }
        public decimal POExcess_Qty { get; set; }
        public decimal orderqty { get; set; }

        public decimal accept_qty { get; set; }
        public decimal receivable_qty { get; set; }
        public decimal QltyExcessQty { get; set; }
        public decimal debit_qty { get; set; }



        public decimal Eaccept_qty { get; set; }
        public decimal Ereceivable_qty { get; set; }
        public decimal EQltyExcessQty { get; set; }
        public decimal Edebit_qty { get; set; }


        public decimal ExReturnqty { get; set; }
        public string PurIndType { get; set; }
    }


}
