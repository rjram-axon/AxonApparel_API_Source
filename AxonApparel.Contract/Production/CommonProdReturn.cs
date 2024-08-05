using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProdReturn
    {
        public int Prodprgdetid { get; set; }
        public int Prodissdetid { get; set; }
        public int ProdPrgId { get; set; }
        public int UnitId { get; set; }
        public int ProcessId { get; set; }
        public string ProdPrgNo { get; set; }
        public int ProdIssueId { get; set; }
        public string ProdIssueNo { get; set; }
        public DateTime ProdIssueDate { get; set; }
        public string OrderNo { get; set; }
        public string JobOrderNo { get; set; }
        public int StyleId { get; set; }
        public string Style { get; set; }
        public string Processor { get; set; }
        public decimal Orderqty { get; set; }
        public decimal Issueqty { get; set; }
        public decimal Balqty { get; set; }


        public string JobNo { get; set; }
        public decimal Returnqty { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public int StoreUnitId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public int SupplierId { get; set; }
        public int UomId { get; set; }
        public string Size { get; set; }
        public int ItemStockid {get;set;}
        public decimal RejectQty { get; set; }
        public decimal ReworkQty { get; set; }
        public int ReturnDetID { get; set; }
    }
}
