using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Cost_defn_Bom
    {
        public int Cost_Defn_id { get; set; }
        public int Cost_Defn_BOMid { get; set; }
        public int Processid { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal PoRate { get; set; }
        public int UOMid { get; set; }
        public string Access_Type { get; set; }
        public decimal Actual_Qty { get; set; }
        public decimal Actual_Rate { get; set; }
        public int CurrencyID { get; set; }
        public decimal ExRate { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal AppRate { get; set; }
        public decimal AppCurrencyRate { get; set; }
        public string DisplayOption { get; set; }
        public decimal AppQty { get; set; }
        public DateTime lUpdateDate { get; set; }
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


        public decimal salesprice { get; set; }
        public decimal saleprofit { get; set; }
        public decimal drawbackper { get; set; }
        public decimal saleper { get; set; }
        public Nullable<decimal> ProfitPercent { get; set; }
        public decimal DecimalPlace { get; set; }
        public string Lock { get; set; }

        public string LockSeqPrgm { get; set; }
        public string LockOrder { get; set; }
        public string LockPlanning { get; set; }
        public string LockConsumption { get; set; }
        public string LockFabric { get; set; }
        public string LockYarn { get; set; }
        public string LockAccesories { get; set; }
        public string LockPacking { get; set; }

        public Nullable<decimal> Salesratemargin { get; set; }

    }
}
