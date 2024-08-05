using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingReceiptDetails
    {
        public int CuttingOrdDetId { get; set; }
        public int CuttingReceiptId { get; set; }        
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int ColorId { get; set; }
        public int Ordqty { get; set; }
        public int Balqty { get; set; }
        public string Color { get; set; }
        public decimal Rate { get; set; }
        public decimal Grammage { get; set; }
        public decimal Weight { get; set; }
        public int Recqty { get; set; }
        public int Nobundle { get; set; }
       
        public decimal Apprate { get; set; }
        public decimal BalWgt { get; set; }
    }
}
