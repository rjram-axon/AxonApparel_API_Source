using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public  class GenIssueMas
    {
        public int IssueId { get; set; }
        public string IssueNo { get; set; }
        public DateTime IssueDate { get; set; }
        public int CompanyID { get; set; }
        public string company { get; set; }
        public string UnitType { get; set; }
        public int UnitId { get; set; }
        public string unit { get; set; }
        public string InvoiceType { get; set; }
        public string invoice { get; set; }
        public string Remarks { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string IssueOrRecpt { get; set; }
        public int Processid { get; set; }
        public string process { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public string VehicleNo { get; set; }
        public int RequestnerId { get; set; }
        public int storeunitid { get; set; }
        public int CreatedBy { get; set; }
        public int ToDiviid { get; set; }
        public int ReqMasId { get; set; }
        public string ReqMasNo { get; set; }

        public List<GenIssueDet> GenDet { get; set; }
        public List<GenIssueStock> GenStkDet { get; set; }
        public List<GenIssueAddless> GenAdLsDet { get; set; }
    }
}
