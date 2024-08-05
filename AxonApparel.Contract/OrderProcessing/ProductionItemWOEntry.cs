using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionItemWOEntry
    {
        public int ItemId { get; set; }
        public int ItemSeq { get; set; }
        public string Item { get; set; }
        public int BaseUnit { get; set; }
        public string Color { get; set; }
        public string OrderNo { get; set; }
        public string Order_no { get; set; }
        public decimal PQty { get; set; }
        public string OrdNo { get; set; }
        public int Colorid { get; set; }
        public int ComboId { get; set; }
        public int SizeRow { get; set; }
        public string Size { get; set; }
        public int SizeId { get; set; }
        public int ShipRow { get; set; }
        public decimal OrderQty { get; set; }
        public decimal Allowance { get; set; }
        public decimal AllowQty { get; set; }
        public decimal ProdQty { get; set; }

        public string Buy_Ord_Ship { get; set; }
        public int StyleRowId { get; set; }
        public int StyleRow { get; set; }
        public int SSNO { get; set; }
        public int Buy_Ord_DetId { get; set; }
    }
}
