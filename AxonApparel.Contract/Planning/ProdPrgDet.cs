using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdPrgDet
    {
        public int Prodprgdetid { get; set; }
        public Nullable<int> Prodprgid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public string prodno { get; set; }
        public int itemgrpid { get; set; }
        public string itemgrp { get; set; }
        public string uom { get; set; }
        public int uomid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public decimal ActualPlan_Qty { get; set; }
        public decimal Prog_Op_Qty { get; set; }
        public decimal order_qty { get; set; }
        public string InorOut { get; set; }
        public string CatType { get; set; }
        public Nullable<int> LastProcessid { get; set; }
        public Nullable<decimal> BalanceQty { get; set; }
        public Nullable<decimal> Issue_qty { get; set; }
        public Nullable<decimal> Receipt_Qty { get; set; }
        public Nullable<decimal> Return_Qty { get; set; }
        public Nullable<decimal> Damage_qty { get; set; }
        public Nullable<decimal> Cancel_Qty { get; set; }
        public Nullable<decimal> Tolerance { get; set; }
        public Nullable<decimal> Returnable_Qty { get; set; }
        public Nullable<decimal> Closure_qty { get; set; }
        public decimal Excess_Qty { get; set; }
        public Nullable<decimal> Inp_CancelQty { get; set; }
        public Nullable<decimal> transferIn { get; set; }
        public Nullable<decimal> transferOut { get; set; }
        public Nullable<decimal> IP_MarkupRate { get; set; }
        public Nullable<decimal> MarkupValue { get; set; }
        public string AltItem { get; set; }
        public decimal Dely_Qty { get; set; }
        public decimal SecQty { get; set; }
        public decimal OrderSecQty { get; set; }
        public decimal IssSecQty { get; set; }
        public decimal RecptSecQty { get; set; }
        public string Amended { get; set; }
        public Nullable<decimal> Dely_Returnqty { get; set; }
        public Nullable<decimal> Loss_Qty { get; set; }
        public string buy_ord_ship { get; set; }
        public string required { get; set; }

    }
}
