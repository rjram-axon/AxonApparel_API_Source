using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDelivery
    {
        public int IssueId { get; set; }
        public int Companyunitid { get; set; }
        public string Unit { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public string Unit_supplier_self { get; set; }
        public string Joborderno { get; set; }
        public string Issueno { get; set; }     
        public string remarks { get; set; }
        public string Job_Mac_Gen { get; set; }
        public string issue_Commit { get; set; }
        public string reqorstock { get; set; }
        public string unit_or_other { get; set; }
        public string ItemType { get; set; }
        public string GatePassVehicle { get; set; }
        public string QualityMade { get; set; }
        public string QltyRemarks { get; set; }   
        public DateTime Issuedate { get; set; }
        public int desunitid { get; set; }
        public int issueunit { get; set; }
        public int RequestnerId { get; set; }
        public string Requestner { get; set; }
        public int FromStoreUnitID { get; set; }
        public int CreatedBy { get; set; }
        public int Deptid { get; set; }
        public string Dept { get; set; }
        public int SplNo { get; set; }
        public int Buyerid { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public int BMasId { get; set; }
        public int JobMasId { get; set; }
        public int IgroupId { get; set; }
        public DateTime ODate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reference { get; set; }
        public string UnitSup { get; set; }
        public decimal RIssId { get; set; }
        public string Style { get; set; }
        public Nullable<int> Processid { get; set; }
        public List<StoresDeliveryDet> StoresDelDet { get; set; }
        public List<StoresDeliveryOrder> StoresDelOrd { get; set; }
        public List<StoresDeliveryStock> StoresDelStock { get; set; }
       
    }


}
