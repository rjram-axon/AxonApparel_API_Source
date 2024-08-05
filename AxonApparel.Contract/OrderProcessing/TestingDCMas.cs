using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TestingDCMas
    {
        public int TestingDCId { get; set; }
        public string DCNo { get; set; }
        public DateTime DCDate { get; set; }
        public int CompanyId { get; set; }
        public int SupplierId { get; set; }
        public int ColorId { get; set; }
        public string Supplier { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public int OrderId { get; set; }
        public string OrderNo { get; set; }
        public int TestOn { get; set; }
        public decimal TestValue { get; set; }
        public string VehicleNo { get; set; }
        public string HSNCODE { get; set; }
        public string CancelNarr { get; set; }
        public int GatePassNo { get; set; }
        public int DebitOnSuppID { get; set; }
        public int DebitOnUnitID { get; set; }
        public int TaxID { get; set; }
        public int CreatedBy { get; set; }
        public int ModifyBy { get; set; }
        public DateTime Modify_Date { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }

        public List<TestingDCDet> Testing_dc_det { get; set; }
    }
}
