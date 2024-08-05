using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessOrdDet
    {
        public int processorddetid { get; set; }
        public int processordid { get; set; }
        public int itemid { get; set; }
        public string item { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public string inp_op { get; set; }
        public decimal order_output_qty { get; set; }
        public decimal issued_qty { get; set; }
        public decimal rate { get; set; }
        public decimal received_qty { get; set; }
        public decimal Return_Qty { get; set; }
        public decimal Damage_qty { get; set; }
        public decimal Cancel_Qty { get; set; }
        public decimal Returnable_Qty { get; set; }
        public decimal Inp_CancelQty { get; set; }
        public decimal Markup_Rate { get; set; }
        public decimal Markup_Value { get; set; }
        public int PlannedSizeID { get; set; }
        public decimal OrdSecQty { get; set; }
        public string ItemRemarks { get; set; }
        public decimal Loss_Qty { get; set; }
        public int IN_OUT_UOMID { get; set; }
        public int IssueSizeID { get; set; }
        public DateTime ReqDate { get; set; }
        public string Loop_Len { get; set; }
        public string Gauge { get; set; }
        public decimal TaxAppVal { get; set; }
        public string CTransNo { get; set; }
        public int CTransId { get; set; }
        public int FinDiaid { get; set; }
        public string FinDia { get; set; }
        public decimal FinGsm { get; set; }
        public int opitemid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
        public Nullable<decimal> AllowPer { get; set; }
        public Nullable<decimal> QtywithoutAllow { get; set; }
    }
}
