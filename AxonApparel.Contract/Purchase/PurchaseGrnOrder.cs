using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseGrnOrder
    {
        public int Grn_DetOrdId { get; set; }
        public int grn_detid { get; set; }
        public decimal quantity { get; set; }
        public decimal OldQty { get; set; }
        public int pur_ord_detid { get; set; }
        public int actual_mfrid { get; set; }
        public decimal PoRate { get; set; }
        public decimal Invoiced_Qty { get; set; }
        public decimal Rate_Diff { get; set; }
        public decimal Excess_Qty { get; set; }
        public int OItemid { get; set; }
        public int OColorid { get; set; }
        public int OSizeid { get; set; }
        public int OUomid { get; set; }
        public string GrnPurOrdNo { get; set; }
        public string GrnPurOrdNoId { get; set; }
        public string Manufacturer { get; set; }
        public DateTime PoDate { get; set; }
        public decimal Balance { get; set; }
        public decimal Rate { get; set; }
        public int GOSupId { get; set; }
        public int GOCompId { get; set; }
        public string GOrnMasID { get; set; }
        public decimal BOldQty { get; set; }
        public string PurIndType { get; set; }

    }









}
