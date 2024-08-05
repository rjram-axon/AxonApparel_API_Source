using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api{
 
    public class BudgetApproveMaster
    {
        public string orderno { get; set; }
        public int styleid { get; set; }
        public int cost_defn_id { get; set; }
        public decimal ProfitPercent { get; set; }
        public string Approved { get; set; }
        public decimal SalePrice { get; set; }
        public decimal Drawback_Percent { get; set; }
        public decimal sale_Profit { get; set; }
        public decimal sale_Profit_percent { get; set; }
        public int ApprovedBy { get; set; }
        public IList<BudgetApprovedetails> budgetdet { get; set; }
        public IList<BudgetApprovedetails> commdet { get; set; }
    }
    public class BudgetApprovedetails
    {
        public int cost_defn_bomid { get; set; }
        public decimal AppRate { get; set; }
        public decimal AppQty { get; set; }

    }

}
