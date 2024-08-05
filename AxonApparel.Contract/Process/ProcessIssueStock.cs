using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessIssueStock
    {
        public int ProcessIssStockId { get; set; }
        public int ProcessIssueId { get; set; }
        public string ProcessIssueNo { get; set; }
        public int ProcessIssueJobid { get; set; }
        public string Job_ord_no { get; set; }
        public int ItemStockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal Returnable_Qty { get; set; }
        public decimal Markup_Rate { get; set; }
        public string LotNo { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public decimal balqty { get; set; }
        public string process { get; set; }
        public int jmasid { get; set; }
        public int opitemid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
        public string ProdPrgNo { get; set; }
    }
}
