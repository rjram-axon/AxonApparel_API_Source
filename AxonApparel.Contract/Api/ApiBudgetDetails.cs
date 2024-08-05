using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class Budgetdetails
    {
       
        public IQueryable<Budegetorderdetails> orderdetails { get; set; }
        public IQueryable<ApiBudgetDetails> budget { get; set; }
        public IQueryable<Commercialdetials> commerical { get; set; }

    }

    public class ApiBudgetDetails
    {
        public int Seqno { get; set; }
        public string Access_Type { get; set; }
        public string Order_no { get; set; }
        public string style { get; set; }
        public string Process { get; set; }
        public string Component { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public Nullable<int> itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public decimal AppRate { get; set; }
        public decimal Actual_Rate { get; set; }
        public decimal Quantity { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> styleid { get; set; }
        public int Processid { get; set; }
        public Nullable<int> uomid { get; set; }
        public string uom { get; set; }
        public int Currencyid { get; set; }
        public decimal Exrate { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal AppCurrencyRate { get; set; }
        public string IsSecQty { get; set; }
        public int status { get; set; }
        public int cost_defn_bomid { get; set; }
        public string ItemType { get; set; }
        public decimal porate { get; set; }
    }
    
    
    public class Commercialdetials
    {
        public string Cost_Defn_No { get; set; }
        public int Cost_Defn_id { get; set; }
        public int CommercialID { get; set; }
        public string Commercial { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string CostType { get; set; }
        public int Cost_Defn_COMid { get; set; }
        public Nullable<decimal> Amount { get; set; }
    }
    public  class Budegetorderdetails
    {
        public string company { get; set; }
        public string style { get; set; }
        public string buyer { get; set; }
        public string order_no { get; set; }
        public string ref_no { get; set; }
        public string style1 { get; set; }
        public string shipdate { get; set; }
        public Nullable<decimal> quantity { get; set; }
        public Nullable<decimal> price { get; set; }
        public Nullable<decimal> value { get; set; }
        public string Abbreviation { get; set; }
        public Nullable<decimal> Exchangerate { get; set; }
        public byte decimalplace { get; set; }
        public string guom { get; set; }
        public int cost_defn_id { get; set; }
        public int styleid { get; set; }
        public int cost_defn_id1 { get; set; }
        public Nullable<decimal> saleprice { get; set; }
        public decimal Drawback_Percent { get; set; }
        public Nullable<decimal> sale_profit { get; set; }
        public Nullable<decimal> sale_Profit_percent { get; set; }
        public Nullable<decimal> Salesratemargin { get; set; }
    }


}
