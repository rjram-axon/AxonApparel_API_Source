using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class CompPrgDet
    {
        public int Prodprgdetid { get; set; }
        public int Prodprgid { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }        
        public string component { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Componentid { get; set; }
        public decimal ActualPlan_Qty { get; set; }
        public decimal Prog_Op_Qty { get; set; }
        public string CatType { get; set; }
        public int LastProcessid { get; set; }
        public decimal Issue_qty { get; set; }
        public decimal Receipt_Qty { get; set; }
        public decimal Return_Qty { get; set; }
        public decimal IP_MarkupRate { get; set; }
        public decimal MarkupValue { get; set; }
        public int CColorID { get; set; }
        public decimal Rejectedqty { get; set; }
        public string prodpgmno { get; set; }
        public int processid { get; set; }
        public string process { get; set; }
        public string Required { get; set; }
        public string remarks { get; set; }
    }
}
