using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public  class Cost_Defn_Mas
    {
        public int Cost_Defn_id { get; set; }
        public string Cost_Defn_No { get; set; }
        public Nullable<System.DateTime> Cost_Defn_date { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> Currencyid { get; set; }
        public Nullable<decimal> ExchangeRate { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Companyid { get; set; }
        public Nullable<decimal> ProfitPercent { get; set; }
        public Nullable<decimal> CostArrived { get; set; }
        public Nullable<int> styleid { get; set; }
        public string Approved { get; set; }
        public Nullable<System.DateTime> AppDate { get; set; }
        public string AppRemarks { get; set; }
        public Nullable<decimal> AppCostArrived { get; set; }
        public Nullable<decimal> SalePrice { get; set; }
        public decimal Drawback_Percent { get; set; }
        public Nullable<decimal> sale_Profit { get; set; }
        public decimal sale_Profit_percent { get; set; }
        public Nullable<decimal> PcsWt { get; set; }
        public string Amend_Reason { get; set; }
        public string Amend { get; set; }
        public Nullable<bool> first_budget { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ApprovedBy { get; set; }
        public string Verify { get; set; }
        public decimal CMCost { get; set; }
        public decimal FinPer { get; set; }
        public decimal MarkUpvalue { get; set; }
        public decimal Gaficharges { get; set; }
        public decimal Qizcharges { get; set; }
        public string BuyerMerchen { get; set; }
        public string PA { get; set; }
        public decimal ImpCharges { get; set; }
        public decimal ExpCharges { get; set; }
        public decimal FinPerValue { get; set; }
        public decimal QizchargesValue { get; set; }
        public decimal GafichargesValue { get; set; }
        public decimal ImpChargesValue { get; set; }
        public decimal ExpChargesValue { get; set; }
        public decimal ShipRate { get; set; }
        public decimal OrderValue { get; set; }

        public string LockSeqPrgm { get; set; }
        public string LockOrder { get; set; }
        public string LockPlanning { get; set; }
        public string LockConsumption { get; set; }
        public string LockFabric { get; set; }
        public string LockYarn { get; set; }
        public string LockAccesories { get; set; }
        public string LockPacking { get; set; }
        public Nullable<decimal> Salesratemargin { get; set; }

        public List<Cost_defn_Bom> ListDetails { get; set; }
        public List<CostDefnCom> Listofcom { get; set; }

        public List<CostDefnBomFirst> Listofbomfirst { get; set; }
   
    }
}
