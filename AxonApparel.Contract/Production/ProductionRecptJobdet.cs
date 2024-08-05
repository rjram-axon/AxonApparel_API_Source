using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProductionRecptJobdet
    {
        public int Prod_Recpt_JobDetid { get; set; }
        public int Prod_Recpt_Detid { get; set; }
        public int Prod_Recpt_Masid { get; set; }
        public string Job_Ord_No { get; set; }
        public string ProdPrgNo { get; set; }
        public decimal Received_Qty { get; set; }
        public string LotNo { get; set; }
        public decimal Sec_Qty { get; set; }
        public int DisRowId { get; set; }
        public int ProcessOrdDetid { get; set; }
        public int ProcessOrdJobDetid { get; set; }
        public int LotRowid { get; set; }
        public string IssLot { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public string Order_No { get; set; }
        public string Ref_No { get; set; }

       
        public int productionordid { get; set; }
        public decimal orderqty { get; set; }
        public decimal bal { get; set; }
        public int sno { get; set; }
    }
}
