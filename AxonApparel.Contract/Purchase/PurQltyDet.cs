using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurQltyDet
    {
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Uomid { get; set; } 
        public int Grn_detid { get; set; }
        public int Grnmfrid { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
        public string QltyItemRemarks { get; set; }
        public string Itemremarks { get; set; }
        public decimal rate { get; set; }
        public decimal grnqty { get; set; }
        public decimal excess_qty { get; set; }
        public decimal grnaccept { get; set; }
        public decimal grnreject { get; set; }
        public decimal grnreturn { get; set; }
        public decimal grnshortage { get; set; }
        public decimal grnreceivable { get; set; }
        public decimal grndebit { get; set; }
        //

        public decimal Eexcess_qty { get; set; }
        public decimal Egrnaccept { get; set; }
        public decimal Egrnreject { get; set; }
        public decimal Egrnreturn { get; set; }
        public decimal Egrnshortage { get; set; }
        public decimal Egrnreceivable { get; set; }
        public decimal Egrndebit { get; set; }
        public decimal Eexcess_return { get; set; }
        //
        public decimal qltyexcess { get; set; }
        public decimal excess_return { get; set; }
        public decimal Debit { get; set; }

        public string CTransNo { get; set; }
        public string CTransType { get; set; }

        public List<PurQltyDet> PurQDet { get; set; }
        public List<PurQltyOrder> PurQOrdDet { get; set; }
    }
}
