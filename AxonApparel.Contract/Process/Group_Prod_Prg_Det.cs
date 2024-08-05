using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Group_Prod_Prg_Det
    {
        public int GrpProdPgmdetid { get; set; }
        public Nullable<int> GrpProdPrgid { get; set; }
        public Nullable<int> Prodprgid { get; set; }
        public Nullable<int> Processid { get; set; }
        public string Process { get; set; }
        public Nullable<int> Itemid { get; set; }
        public string Item { get; set; }
        public Nullable<int> Colorid { get; set; }
        public string Color { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public string Size { get; set; }
        public Nullable<decimal> Prog_Op_Qty { get; set; }
        public Nullable<decimal> BalanceQty { get; set; }
        public Nullable<decimal> GrpQty { get; set; }
        public string InorOut { get; set; }
        public string ProdPrgNo { get; set; }
        public decimal rate { get; set; }
        public decimal Grprate { get; set; }
        public decimal apprate { get; set; }
        public int Prodprgdetid { get; set; }
        public string AltItem { get; set; }
        public string Amended { get; set; }
        public decimal Issue_qty { get; set; }
        public decimal order_qty { get; set; }


    }
}
