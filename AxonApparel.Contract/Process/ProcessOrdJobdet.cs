using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessOrdJobdet
    {
        public int ProcessJobDetid { get; set; }
        public int ProcessnOrdid { get; set; }
        public int ProcessOrddetid { get; set; }
        public decimal ProgQty { get; set; }
        public decimal OrderQty { get; set; }
        public decimal issued_qty { get; set; }
        public decimal received_qty { get; set; }
        public decimal Return_Qty { get; set; }
        public decimal Damage_qty { get; set; }
        public decimal Cancel_Qty { get; set; }
        public string Job_ord_no { get; set; }
        public string ProdPrgNo { get; set; }
        public decimal Returnable_Qty { get; set; }
        public bool Closed { get; set; }
        public decimal Inp_CancelQty { get; set; }
        public decimal OrdSecQty { get; set; }
        public decimal Loss_Qty { get; set; }
        public string buy_ord_ship { get; set; }
        public int itemid { get; set; }
        public int colorid { get; set; }
        public int sizeid { get; set; }
        public string ipop { get; set; }
        public int PlannedSizeID { get; set; }
        public int opitemid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
        public decimal rate { get; set; }
        public decimal apprate { get; set; }
    }
}
