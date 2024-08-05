using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingReturn
    {
        public string JobOrderNo { get; set; }
        public int CuttingOrdid { get; set; }
        public int CuttingReturnid { get; set; }
        public string CuttingOrderNo { get; set; }
        public int Cuttingissueid { get; set; }
        public string CuttingReturnNo { get; set; }
        public DateTime CuttingReturnDate { get; set; }
        public string CuttingIssueNo { get; set; }
        public DateTime CuttingIssueDate { get; set; }
        public string OrderType { get; set; }
        public string Processor { get; set; }
        public int Processorid { get; set; }
        public decimal IssueQty { get; set; }
        public decimal Balance { get; set; }        
        public int ToLocation { get; set; }
        public string RetLocType { get; set; }
        public string Remarks { get; set; }
        public string Incharge { get; set; }
        public int Inchargeid { get; set; }
        public string OrdType { get; set; }
        public int Createdby { get; set; }

        public int Companyid { get; set; }
        public string Company { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string style { get; set; }
        public string CompanyUnit { get; set; }

        public int Cutting_Cancel_masid { get; set; }
        public string Cutting_Cancel_no { get; set; }
        public string Cutting_Cancel_date { get; set; }
        public string Cancel_Ref_no { get; set; }
        public string Cancel_Ref_date { get; set; }
        public string CancelOrClose { get; set; }

        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public string StoreName { get; set; }
        public int StoreUnitID { get; set; }
        public string Process { get; set; }                                 

        public List<CuttingReturnDetail> CuttingReturnDetail { get; set; }
        public List<Cutting_Wastage_Det> WstageList { get; set; }
    }
}
