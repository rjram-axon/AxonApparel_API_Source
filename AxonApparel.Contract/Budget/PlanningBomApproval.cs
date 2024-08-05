using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningBomApproval
    {
        public int Cost_Defn_id { get; set; }
        public int AccreqId { get; set; }
        public int Processid { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int uomid { get; set; }
        public string uom { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal PoRate { get; set; }

        public string Apply_Type { get; set; }
        public string IsApproved { get; set; }
        public string Plan_Type { get; set; }
        public decimal Actual_Qty { get; set; }
        public decimal Actual_Rate { get; set; }
        public int CurrencyID { get; set; }
        public decimal ExRate { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal AppRate { get; set; }
        public decimal AppCurrencyRate { get; set; }
        public string DisplayOption { get; set; }
        public decimal AppQty { get; set; }
        public DateTime AppDate { get; set; }
        public decimal FirstRate { get; set; }
        public string IsSecQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal AppSecQty { get; set; }
        public decimal ActualSecQty { get; set; }
        public decimal Invoice_Qty { get; set; }
        public decimal Invoice_Rate { get; set; }
        public decimal Invoice_SecQty { get; set; }
        public decimal ReturnQty { get; set; }


        public decimal amount { get; set; }
        public decimal exchgerate { get; set; }
        public string curr { get; set; }
        public int itmgrpid { get; set; }
        public string itmgrp { get; set; }
        public long sno { get; set; }
        public string check { get; set; }

        public string process { get; set; }
        public string Itmtype { get; set; }

        public decimal CMCost { get; set; }
        public decimal FinPer { get; set; }
        public decimal MarkUpvalue { get; set; }
        public decimal Gaficharges { get; set; }
        public decimal Qizcharges { get; set; }
        public int Cost_defn_bom_firstid { get; set; }


        public char LockOrder { get; set; }
        public bool LockPrgSeq { get; set; }
        public bool LockPlanning { get; set; }
        public int LockFabric { get; set; }
        public int LockYarn { get; set; }
        public int LockAcc { get; set; }
        public int LockCon { get; set; }
    }
}
