using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProInvDet
    {
        public int Process_InvDetid { get; set; }
        public int Process_Invid { get; set; }
        public int Proc_Recpt_Detid { get; set; }
        public int Proc_Recpt_Masid { get; set; }
        public string closed { get; set; }
        public string IsSecQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal Invoice_Qty { get; set; }
        public decimal BalQty { get; set; }
        public decimal GrnRate { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public decimal GrnQty { get; set; }
        public decimal AcptQty { get; set; }
        public decimal DebtQty { get; set; }
        public decimal OrdQty { get; set; }
        public string ValidateProcessQty { get; set; }
        public decimal IPMarkup_rate { get; set; }
        public decimal OPMarkup_Rate { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public string Proc_recpt_no { get; set; }
        public decimal AppRate { get; set; }
    }

}
