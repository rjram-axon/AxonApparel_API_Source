using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDeliveryReturn
    {
        public int ReturnId { get; set; }
        public int Issueid { get; set; }
        public string IssueNo { get; set; }
        public string ReturnNo { get; set; }
        public DateTime ReturnDate { get; set; }
        public string Remarks { get; set; }
        public string StockType { get; set; }
        public string Unit_Supplier_self { get; set; }
        public string OType { get; set; }
        public int Desunitid { get; set; }
        public string Desunit { get; set; }
        public int CreatedBy { get; set; }
        public string QualityMade { get; set; }
        public string ItemType { get; set; }
        public string OrdNo { get; set; }
        public string RefNo { get; set; }
        public int BMasId { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public string Reference { get; set; }
        public int UnSupId { get; set; }
        public string UnSup { get; set; }
        public List<StoresDeliveryReturnDet> StoresDeliRDet { get; set; }



    }
}
