using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace AxonApparel.Domain
{
    public class TestingDCReceiptMas
    {
        public int TestingDCId { get; set; }
        public string TestingDCNo { get; set; }
        public int TestingDCReceiptId { get; set; }
        public string DCReceiptNo { get; set; }
        public DateTime DCReceiptDate { get; set; }
        public int SupplierId { get; set; }
        public string Supplier {get;set;}
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public int OrderId { get; set; }
        public string OrderNo { get; set; }
        public string OrderRefNo { get; set; }
        public string BillNo { get; set; }
        public DateTime BillDate { get; set; }
        public string Remarks { get; set; }
        public int GSTTaxID { get; set; }
        public decimal TestValue { get; set; }
        public decimal CGSTPer { get; set; }
        public decimal CGSTValue { get; set; }
        public decimal SGSTPer { get; set; }
        public decimal SGSTValue { get; set; }
        public decimal IGSTPer { get; set; }
        public decimal IGSTValue { get; set; }
        public decimal TotalValue { get; set; }
        public int CreatedBy { get; set; }
        public int ModifyBy { get; set; }
        public DateTime ModifyDate { get; set; }

        public List<TestingDCReceiptDet> Testing_DC_Receipt_det { get; set; }
    }
}
