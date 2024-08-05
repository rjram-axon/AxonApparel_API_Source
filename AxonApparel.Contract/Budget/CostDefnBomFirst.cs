using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public class CostDefnBomFirst
    {
        public int Cost_defn_bom_firstid { get; set; }
        public int Cost_Defn_id { get; set; }
        public int Cost_Defn_BOMid { get; set; }
        public int? Processid { get; set; }
        public int Itemid { get; set; }
        public int ColorID { get; set; }
        public int SizeID { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public int UOMID { get; set; }
        public string Access_Type { get; set; }
        public decimal Actual_Qty { get; set; }
        public decimal Actual_Rate { get; set; }
        public int CurrencyId { get; set; }
        public decimal ExRate { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal AppRate { get; set; }
        public decimal AppCurrencyRate { get; set; }
        public string DisplayOption { get; set; }
        public decimal AppQty { get; set; }
        public DateTime lUpdateDate { get; set; }

        public decimal Profitper { get; set; }
        public decimal CostArrive { get; set; }
        public decimal sale_prf_per { get; set; }
        public decimal pcswt { get; set; }
        public string Order_No { get; set; }
        public int styleid { get; set; }
        public decimal SalePrice { get; set; }
        public decimal sale_Profit { get; set; }
        public decimal Drawback_Percent { get; set; }
        public string check { get; set; }
        public decimal CMCost { get; set; }
        public decimal FinPer { get; set; }
        public decimal MarkUpvalue { get; set; }
        public decimal Gaficharges { get; set; }
        public decimal Qizcharges { get; set; }
        public int ApprovedBy { get; set; }
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
