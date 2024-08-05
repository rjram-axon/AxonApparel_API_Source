using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingOrderDetail
    {
        public int CuttingOrderId { get; set; }
        public int CuttingOrderDetId { get; set; }
        public int CuttingOrdId { get; set; }
        public int CuttingOrdDetId { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int PlannedSizeid { get; set; }
        public string InOrOut { get; set; }
        public string Inp_op { get; set; }
        public decimal Consumption { get; set; }
        public decimal Grammage { get; set; }        
        public decimal weight { get; set; }
        public decimal OrderQty { get; set; }
        public decimal ordqty { get; set; }
        public decimal Issuedqty { get; set; }
        public decimal issqty { get; set; }
        public decimal rate { get; set; }
        public decimal receivedqty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal MarkupRate { get; set; }
        public decimal Markupvalue { get; set; }
        public decimal CancelQty { get; set; }

        //ItemStockOutward Properties
        public DateTime Outwardate { get; set; }
        public string TransNo { get; set; }
        public string TransType { get; set; }
        public string JobOrderNo { get; set; }
        public string ProdIssueDetId { get; set; }
        public string UnitOrOther { get; set; }
        public decimal qty { get; set; }
        public int StockId { get; set; }
        public int CuttingIssueId { get; set; }
        public int CuttingIssueDetId { get; set; }
    }
}
