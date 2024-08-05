using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProductionRecptDet
    {
        public int Prod_Recpt_Detid { get; set; }
        public int Prod_Recpt_Masid { get; set; }
        public int ProcessOrdId { get; set; }
        public int itemid { get; set; }
        public string item { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public decimal Received_qty { get; set; }
        public decimal Sec_Qty { get; set; }
        public decimal rate { get; set; }
        public decimal apprate { get; set; }
        public decimal Invoice_Qty { get; set; }
        public string closed { get; set; }
        public decimal IPMarkup_rate { get; set; }
        public decimal OPMarkup_Rate { get; set; }
        public int IssuedSizeID { get; set; }
        public decimal WasQty { get; set; }
        public string Order_No { get; set; }
        public string Ref_No { get; set; }

        public string productionorder { get; set; }
        public int productionordid { get; set; }
        public decimal orderqty { get; set; }
        public decimal bal { get; set; }
        public int sno { get; set; }
        public string recptno { get; set; }
    }
}
