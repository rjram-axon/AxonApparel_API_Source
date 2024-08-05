using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingReceipt
    {
        public int BuyOrdMasId { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public string Style { get; set; }
        public int Qty { get; set; }
        public int StyleId { get; set; }
        public int ShiftId { get; set; }
        public int ToStoreId { get; set; }
        public string ProdPrgNo { get; set; }
        public string Employee { get; set; }
        public int Employeeid { get; set; }
        public string CuttingOrdNo { get; set; }
        public int ProdPrgId { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public int CuttingOrdId { get; set; }
        public int CuttingReceiptId { get; set; }
        public string CuttingReceiptNo { get; set; }
        public DateTime CuttingReceiptDate { get; set; }
        public string Processor { get; set; }
        public string WorkDivision { get; set; }
        public int WorkDivisionId { get; set; }
        public int Orderqty { get; set; }
        public int Balance { get; set; }
        public string Amend { get; set; }
        public string JobNo { get; set; }
        public string Remarks { get; set; }
        public string ConvType { get; set; }
        public int CreatedBy { get; set; }
        public string CompanyName { get; set; }
        public string CompanyUnitName { get; set; }
        public string WorkDivisionName { get; set; }
        public string JobOrderNo { get; set; }
        public DateTime CuttingOrderDate { get; set; }
        public string OrdType { get; set; }
        public string Process { get; set; }

        public int ParentUnitid {get;set;}
        public string Storetype {get;set;}
        public string StoreName { get; set; }
        public int StoreUnitID {get;set;}
                                                   

        public List<CuttingReceiptDetails> cuttingreceiptdet { get; set; }
        public List<CuttingBundle> cuttingbundle { get; set; }
    }
}
